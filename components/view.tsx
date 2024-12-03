import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";
import { auth } from "@/auth";
import { updateMostViewedPlaylist } from "@/app/actions/update-most-viewed";

type ViewsQueryResult = { views: number };

const View = async ({
  id,
  authorId,
}: {
  id: string;
  authorId: string | undefined;
}) => {
  const session = await auth();

  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch<ViewsQueryResult>(STARTUP_VIEWS_QUERY, { id });

  after(async () => {
    if (!session?.user) return;

    if (session?.user.id !== authorId) {
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit();

      // Update the most viewed playlist
      await updateMostViewedPlaylist();
    }
  });

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{totalViews} views</span>
      </p>
    </div>
  );
};

export default View;
