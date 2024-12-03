import React, { Suspense } from "react";
import SearchForm from "@/components/search-form";
import StartupCard from "@/components/startup-card";
import PlaylistComponent, { PlaylistSkeleton } from "@/components/playlist";
import MainLayout from "@/components/layout/main-layout";
import { fetchStartups } from "../actions/search-startup";

type HomeProps = {
    searchParams: Promise<{ query?: string }>;
};

const Home = async ({ searchParams }: HomeProps) => {
    const { query } = await searchParams;

    // Call the server action with the query string
    const { posts, topStartups } = await fetchStartups({ query });

    return (
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
                    posts.map((post) => <StartupCard key={post._id} post={post} />)
                ) : (
                    <p className="no-results">No results found.</p>
                )}
            </ul>

            {(topStartups?.select?.length ?? 0) > 0 && <hr className="divider" />}

            <Suspense fallback={<PlaylistSkeleton />}>
                {topStartups && (
                    <PlaylistComponent
                        playListTitle={topStartups.title}
                        data={topStartups.select}
                    />
                )}
            </Suspense>
        </MainLayout>
    );
};

export default Home;
