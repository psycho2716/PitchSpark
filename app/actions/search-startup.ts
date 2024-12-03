"use server";

import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { STARTUPS_QUERY, PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { PostProps } from "@/types/type";

interface SearchResponse {
    posts: PostProps[];
    topStartups: { title: string; select: PostProps[] } | null;
}

export async function fetchStartups({ query }: { query?: string }): Promise<SearchResponse> {
    const params = { search: query || null };

    const [startups, topStartups] = await Promise.all([
        sanityFetch({ query: STARTUPS_QUERY, params }),
        client.fetch<{ title: string; select: PostProps[] }>(PLAYLIST_BY_SLUG_QUERY, {
            slug: "top-3-startups"
        })
    ]);

    return {
        posts: (startups.data || []) as unknown as PostProps[],
        topStartups: topStartups || null
    };
}
