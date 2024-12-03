import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PostProps } from "@/types/type";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CardActionButtons from "./card-action-buttons";
import { auth } from "@/auth";

const StartupCard = async ({ post }: { post: PostProps }) => {
    const session = await auth();

    return (
        <Card className="startup-card group flex flex-col justify-between overflow-hidden transition-all hover:shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <div className="relative h-48 overflow-hidden rounded-lg">
                <Image
                    src={post.image || "/no-pictures.png"}
                    alt={post.title || "Startup"}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105 rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
                    <div>
                        <Badge variant="secondary" className="mb-2 bg-white/80 text-gray-800">
                            {post.category}
                        </Badge>
                        <h3 className="text-xl font-bold text-white line-clamp-2">{post.title}</h3>
                    </div>
                    <Avatar className="h-10 w-10 border-2 border-white">
                        <AvatarImage
                            src={post.author?.image || "/avatar.png"}
                            alt={post.author?.name || "Author"}
                        />
                        <AvatarFallback>{post.author?.name?.charAt(0) || "A"}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <CardContent className="p-4">
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                    <time dateTime={post._createdAt}>{formatDate(post._createdAt)}</time>
                    <div className="flex items-center gap-1">
                        <EyeIcon className="h-4 w-4" />
                        <span>{post.views}</span>
                    </div>
                </div>
                <Link
                    href={`/user/${post.author?._id}`}
                    className="text-xl font-bold hover:underline text-primary"
                >
                    {post.author?.name}
                </Link>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-end gap-2">
                <CardActionButtons post={post} session={session} />
            </CardFooter>
        </Card>
    );
};

export const StartupCardSkeleton = () => {
    return (
        <Card className="startup-card-skeleton">
            <div className="relative h-48 overflow-hidden bg-gray-200">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <Skeleton className="h-6 w-20 mb-2" />
                    <Skeleton className="h-8 w-3/4" />
                </div>
                <Skeleton className="absolute top-4 right-4 h-10 w-10 rounded-full" />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="p-4 pt-0 flex justify-between">
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-20" />
                </div>
                <Skeleton className="h-9 w-28" />
            </div>
        </Card>
    );
};

export default StartupCard;
