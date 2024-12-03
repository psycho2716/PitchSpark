import { notFound } from "next/navigation";
import { auth } from "@/auth";
import StartupForm from "@/components/startup-form";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import MainLayout from "@/components/layout/main-layout";

async function getStartupDetails(id: string) {
    try {
        const startup = await client.fetch(STARTUP_BY_ID_QUERY, { id });
        if (!startup) return null;

        return {
            id: startup._id,
            title: startup.title,
            description: startup.description,
            category: startup.category,
            image: startup.image,
            pitch: startup.pitch
        };
    } catch (error) {
        console.error("Error fetching startup:", error);
        return null;
    }
}

export default async function UpdateStartupPage({ params }: { params: { id: string } }) {
    const session = await auth();
    if (!session?.user) {
        return notFound();
    }

    const startup = await getStartupDetails(params.id);
    if (!startup) {
        return notFound();
    }

    return (
        <MainLayout
            tag="Update your startup"
            heading="Edit your startup details"
            subHeading="Make changes to your startup information"
        >
            <div className="startup-form-container">
                <StartupForm initialData={startup} isUpdate={true} />
            </div>
        </MainLayout>
    );
}
