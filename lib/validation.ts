import { z } from "zod";

const baseSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters long.")
        .max(100, "Title must be less than 100 characters long."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters long.")
        .max(500, "Description must be less than 500 characters long."),
    category: z.string().min(3, "Category must be at least 3 characters long.")
});

export const createPitchSchema = (isUpdate: boolean) =>
    baseSchema.extend({
        image: isUpdate
            ? z.string().optional()
            : z.string({ required_error: "Startup image is required." }),
        pitch: isUpdate
            ? z.string().optional()
            : z
                  .string()
                  .min(10, "Pitch must be at least 10 characters long.")
                  .max(5000, "Pitch must be less than 5000 characters long.")
    });

export type CreatePitch = z.infer<ReturnType<typeof createPitchSchema>> & {
    _type: "startup";
    slug: { _type: "slug"; current: string };
    author: { _type: "reference"; _ref: string };
    views: number;
    _createdAt: string;
};
