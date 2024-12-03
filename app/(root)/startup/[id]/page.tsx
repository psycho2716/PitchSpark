import { formatDate } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/live";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/view";
import MainLayout from "@/components/layout/main-layout";
import { client } from "@/sanity/lib/client";
import PlaylistComponent, { PlaylistSkeleton } from "@/components/playlist";
import { PostProps } from "@/types/type";

const md = markdownit();

const Startup = async ({ params }: { params: { id: string } }) => {
    const id = await params.id;

    const [{ data: post }, mostViewed] = await Promise.all([
        sanityFetch({ query: STARTUP_BY_ID_QUERY, params: { id } }),
        client.fetch<{ title: string; select: PostProps[] }>(PLAYLIST_BY_SLUG_QUERY, {
            slug: "most-viewed"
        })
    ]);

    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch || "");

    return (
        <>
            <MainLayout
                tag={formatDate(post._createdAt)}
                heading={post.title}
                subHeading={post.description}
            >
                <Image
                    src={post.image || "/no-pictures.png"}
                    alt={post.title || "startup"}
                    width={600}
                    height={164}
                    className="w-full h-auto rounded-xl"
                />

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link
                            href={`/user/${post.author?._id}`}
                            className="flex gap-2 items-center mb-3"
                        >
                            <Image
                                src={post?.author?.image || "/no-pictures.png"}
                                alt="avatar"
                                width={64}
                                height={64}
                                className="rounded-full drop-shadow-lg"
                            />

                            <div>
                                <p className="text-20-medium">{post?.author?.name}</p>
                                <p className="text-16-medium !text-black-300">
                                    @{post?.author?.username}
                                </p>
                            </div>
                        </Link>

                        <p className="category-tag">{post.category}</p>
                    </div>

                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedContent ? (
                        <article
                            className="prose max-w-4xl font-work-sans break-all"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    ) : (
                        <p className="no-result">No details provided</p>
                    )}
                </div>

                {mostViewed?.select.length > 0 && <hr className="divider" />}
            </MainLayout>

            <Suspense fallback={<PlaylistSkeleton />}>
                <PlaylistComponent
                    playListTitle={mostViewed?.title}
                    data={mostViewed?.select}
                    currentStartupId={post._id}
                />
            </Suspense>

            <Suspense fallback={<Skeleton className="view-skeleton" />}>
                <View id={post._id} authorId={post.author?._id} />
            </Suspense>
        </>
    );
};

export default Startup;
