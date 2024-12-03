import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
    const session = await auth();

    return (
        <nav className="flex justify-between items-center px-7 md:px-14 py-5 border-b border-b-gray-200 fixed top-0 w-full z-50 bg-white">
            <Link href="/">
                <Image src="/logo.png" alt="YC Directory" width={100} height={30} />
            </Link>
            <div className="flex items-center gap-x-4">
                {session?.user ? (
                    <>
                        <Link href="/startup/create">
                            <span className="hidden md:flex text-lg font-medium">
                                Create Startup
                            </span>
                            <BadgePlus className="size-6 md:hidden" />
                        </Link>
                        <form
                            action={async () => {
                                "use server";

                                await signOut({ redirectTo: "/" });
                            }}
                        >
                            <button type="submit" className="flex items-center">
                                <span className="hidden md:flex text-primary text-lg font-medium">
                                    Logout
                                </span>
                                <LogOut className="size-6 md:hidden text-red-500" />
                            </button>
                        </form>

                        <Link href={`/user/${session.user.id || session.user.name}`}>
                            <Avatar className="size-10">
                                <AvatarImage
                                    src={session.user.image || "/avatar.png"}
                                    alt={session.user.name || "Avatar"}
                                />
                            </Avatar>
                        </Link>
                    </>
                ) : (
                    <form
                        action={async () => {
                            "use server";

                            await signIn();
                        }}
                    >
                        <button type="submit">Sign In</button>
                    </form>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
