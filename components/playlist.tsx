import { PostProps } from "@/types/type";
import React from "react";
import StartupCard from "./startup-card";
import { Skeleton } from "@/components/ui/skeleton";

const PlaylistComponent = ({
  data,
  playListTitle,
  // currentStartupId = ""
}: {
  data: PostProps[];
  playListTitle: string | undefined;
  // currentStartupId?: string;
}) => {
  return (
    <>
      {data?.length > 0 && (
        <div className="max-w-4xl mx-auto pb-7 p-6">
          <p className="text-30-semibold">{playListTitle}</p>
          <ul className="mt-7 card-grid-sm">
            {data.map((post: PostProps) => (
              <StartupCard key={post._id} post={post} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export const PlaylistSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto pb-7">
      <Skeleton className="h-9 w-64 mb-7" />
      <div className="mt-7 card-grid-sm">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-[300px] w-full" />
        ))}
      </div>
    </div>
  );
};

export default PlaylistComponent;
