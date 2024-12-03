import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";
import { type Profile } from "next-auth";

type GitHubProfile = Profile & {
    id: string;
    login: string;
    bio?: string;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({ user: { name, email, image }, profile }) {
            const ghProfile = profile as GitHubProfile;
            const { id, login, bio } = ghProfile;
            const userExist = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

            if (!userExist) {
                await writeClient.create({
                    _type: "author",
                    id,
                    name,
                    username: login,
                    email,
                    image,
                    bio: bio || ""
                });
            }

            return true;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const ghProfile = profile as GitHubProfile;
                const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: ghProfile.id });

                token.id = user?._id;
            }

            return token;
        },
        async session({ session, token }) {
            Object.assign(session.user, { id: token.id });
            return session;
        }
    }
});
