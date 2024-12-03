import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_ID_QUERY } from "@/sanity/lib/queries";
import { PostProps } from "@/types/type";
import React from "react";
import StartupCard from "./startup-card";

const UserStartups = async ({ id }: { id: string }) => {
    const startups = await client.fetch<PostProps[]>(STARTUPS_BY_AUTHOR_ID_QUERY, { id });

    return (
        <>
            {startups.length > 0 ? (
                startups.map((post: PostProps) => (
                    <StartupCard key={post._id} post={post as PostProps} />
                ))
            ) : (
                <p className="no-results">No Startups available!</p>
            )}
        </>
    );
};

export default UserStartups;
