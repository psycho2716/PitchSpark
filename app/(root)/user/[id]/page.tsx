import { auth } from "@/auth";
import MainLayout from "@/components/layout/main-layout";
import { StartupCardSkeleton } from "@/components/startup-card";
import UserStartups from "@/components/user-startups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Author } from "@/sanity/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const experimental_ppr = true;

const Profile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const id = (await params).id;
  const user = await client.fetch<Author>(AUTHOR_BY_ID_QUERY, { id });

  if (!user) {
    return notFound();
  }
  return (
    <MainLayout className="bg-primary-100">
      <section className="profile-container">
        <div className="profile-card">
          <div className="profile-title">
            <h3 className="text-24-black uppercase text-center">{user.name}</h3>
          </div>
          <Image
            src={user.image || "/avatar.png"}
            alt={user.name || "avatar"}
            width={220}
            height={220}
            className="profile-image"
          />

          <p className="text-30-extrabold mt-7 text-center">{user.username}</p>
          <p className="mt-1 text-center text-14-normal">{user.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
          <p className="text-30-bold">
            {session?.user?.id === id ? "Your" : "All"} Startups
          </p>
          <ul className="card-grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </MainLayout>
  );
};

export default Profile;
