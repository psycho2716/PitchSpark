"use client";

import { useStartupForm } from "@/hooks/useStartupForm";
import FormStartupInput from "./form-startup-input";
import FormStartupTextarea from "./startup-form-textarea";
import FormMarkDownInput from "./form-markdown-input";
import { Button } from "./ui/button";
import { FormImageInput } from "./startup-image-Input";
import useUser from "@/hooks/useUser";

interface StartupFormProps {
    initialData?: {
        id?: string;
        title?: string | null;
        description?: string | null;
        category?: string | null;
        image?: string | null;
        pitch?: string | null;
    };
    isUpdate?: boolean;
}

const StartupForm = ({ initialData = {}, isUpdate = false }: StartupFormProps) => {
    const user = useUser();
    const {
        formState,
        errors,
        pitch,
        imageFile,
        setPitch,
        setImageFile,
        handleCreateStartup,
        handleUpdateStartup,
        handleImageError
    } = useStartupForm();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (isUpdate && initialData.id) {
            handleUpdateStartup(formData, initialData.id, user?.id);
        } else {
            handleCreateStartup(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="startup-form" encType="multipart/form-data">
            <FormStartupInput
                label="Title"
                name="title"
                placeholder="Startup Title"
                error={errors.title}
                defaultValue={initialData?.title || ""}
                required
            />
            <FormStartupTextarea
                label="Description"
                name="description"
                placeholder="Startup description"
                error={errors.description}
                defaultValue={initialData?.description || ""}
                required
            />
            <FormStartupInput
                label="Category"
                name="category"
                placeholder="(Technology, Education, Finance, Health, etc.)"
                error={errors.category}
                defaultValue={initialData?.category || ""}
                required
            />
            <FormImageInput
                label="Image"
                name="image"
                onChange={(file) => setImageFile(file || null)}
                setError={handleImageError}
                error={errors.image}
                value={imageFile?.name || initialData?.image || ""}
                required={!isUpdate}
            />
            <FormMarkDownInput
                label="Pitch"
                name="pitch"
                placeholder="Briefly describe your startup idea, and what problem does it solve?"
                error={errors.pitch}
                value={pitch || initialData?.pitch || ""}
                onChange={setPitch}
            />
            <Button
                type="submit"
                className="startup-form-btn text-white"
                disabled={formState.status === "SUBMITTING"}
            >
                {formState.status === "SUBMITTING"
                    ? "Submitting..."
                    : isUpdate
                      ? "Update"
                      : "Create"}
            </Button>
        </form>
    );
};

export default StartupForm;
