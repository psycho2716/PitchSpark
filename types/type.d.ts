import { Author, Startup } from "@/sanity/types";

export type PostProps = Omit<Startup, "author"> & { author?: Author };

declare interface FormStartupErrorProps {
    title?: string | null | undefined;
    description?: string | null | undefined;
    category?: string | null | undefined;
    image?: string | null | undefined;
    pitch?: string | null | undefined;
}
