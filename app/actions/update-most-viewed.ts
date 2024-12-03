"use server";

import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { PostProps } from "@/types/type";

const TOP_STARTUPS_QUERY = `
  *[_type == "startup"] | order(views desc) [0...10] {
    _id,
    _type,
    title,
    description,
    category,
    image,
    views,
    author->,
    _createdAt
  }
`;

const PLAYLIST_QUERY = `*[_type == "playlist" && slug.current == "most-viewed"][0]._id`;

export async function updateMostViewedPlaylist() {
  try {
    // Get top 10 startups by views
    const topStartups = await client.fetch(TOP_STARTUPS_QUERY);

    // Get the playlist document ID
    const playlistId = await client.fetch(PLAYLIST_QUERY);

    if (!playlistId) {
      // Create new playlist if it doesn't exist
      await writeClient.create({
        _type: "playlist",
        title: "Most Viewed Startups",
        slug: { _type: "slug", current: "most-viewed" },
        select: topStartups.map((startup: PostProps) => ({
          _type: "reference",
          _ref: startup._id,
          _key: startup._id,
        })),
      });
    } else {
      // Update existing playlist
      await writeClient
        .patch(playlistId)
        .set({
          select: topStartups.map((startup: PostProps) => ({
            _type: "reference",
            _ref: startup._id,
            _key: startup._id,
          })),
        })
        .commit();
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to update most-viewed playlist:", error);
    return { success: false, error: "Failed to update playlist" };
  }
}
