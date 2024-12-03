"use server";

import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { PostProps } from "@/types/type";

const TOP_3_STARTUPS_QUERY = `
  *[_type == "startup" && views >= 10] | order(views desc) [0...3] {
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

const TOP_3_PLAYLIST_QUERY = `*[_type == "playlist" && slug.current == "top-3-startups"][0]._id`;

export async function updateTop3StartupsPlaylist() {
    try {
        // Get top 3 startups by views
        const topStartups = await client.fetch(TOP_3_STARTUPS_QUERY);

        // Get the playlist document ID
        const playlistId = await client.fetch(TOP_3_PLAYLIST_QUERY);

        if (!playlistId) {
            // Create new playlist if it doesn't exist
            await writeClient.create({
                _type: "playlist",
                title: "Top 3 Startups",
                slug: { _type: "slug", current: "top-3-startups" },
                select: topStartups.map((startup: PostProps) => ({
                    _type: "reference",
                    _ref: startup._id,
                    _key: startup._id
                }))
            });
        } else {
            // Update existing playlist
            await writeClient
                .patch(playlistId)
                .set({
                    select: topStartups.map((startup: PostProps) => ({
                        _type: "reference",
                        _ref: startup._id,
                        _key: startup._id
                    }))
                })
                .commit();
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to update top-3-startups playlist:", error);
        return { success: false, error: "Failed to update playlist" };
    }
}
