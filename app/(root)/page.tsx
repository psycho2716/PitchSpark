import React, { Suspense } from "react";
import SearchForm from "@/components/search-form";
import StartupCard from "@/components/startup-card";

import { PLAYLIST_BY_SLUG_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import { PostProps } from "@/types/type";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import MainLayout from "@/components/layout/main-layout";
import { client } from "@/sanity/lib/client";
import PlaylistComponent, { PlaylistSkeleton } from "@/components/playlist";

const Home = async ({
    searchParams
}: {
    searchParams: {
        query?: string;
    };
}) => {
    const query = (await searchParams).query;
    const params = { search: query || null };

    const [{ data: posts }, topStartups] = await Promise.all([
        sanityFetch({ query: STARTUPS_QUERY, params }),
        client.fetch<{ title: string; select: PostProps[] }>(PLAYLIST_BY_SLUG_QUERY, {
            slug: "top-3-startups"
        })
    ]);

    return (
        <>
            <MainLayout
                tag="Pitch, Vote, and grow!"
                heading="Pitch your startup, connect with entrepreneurs"
                subHeading="Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions"
                heroChildren={<SearchForm query={query} />}
            >
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}"` : "All Startups"}
                </p>

                <ul className="card-grid mt-7">
                    {posts.length > 0 ? (
                        posts.map((post) => <StartupCard key={post._id} post={post as PostProps} />)
                    ) : (
                        <p className="no-results">No results found.</p>
                    )}
                </ul>

                <SanityLive />

                {topStartups?.select.length > 0 && <hr className="divider" />}
            </MainLayout>

            <Suspense fallback={<PlaylistSkeleton />}>
                <PlaylistComponent playListTitle={topStartups?.title} data={topStartups?.select} />
            </Suspense>
        </>
    );
};

export default Home;
