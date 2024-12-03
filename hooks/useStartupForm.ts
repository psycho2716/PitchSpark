import { useState } from "react";
import { z } from "zod";
import { createPitchSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormStartupErrorProps } from "@/types/type";
import { MDEditorProps } from "@uiw/react-md-editor";
import { toast } from "./use-toast";
import {
  createStartup,
  deleteStartup,
  updateStartup,
} from "@/app/actions/startup-actions";
import { revalidatePath } from "next/cache";

interface FormState {
  error: string | null;
  status: "IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR";
  data: {
    title: string;
    description: string;
    category: string;
    image?: string;
    pitch?: string;
  };
}

const initialState: FormState = {
  error: null,
  status: "IDLE",
  data: {
    title: "",
    description: "",
    category: "",
    image: "",
    pitch: "",
  },
};

export const useStartupForm = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormStartupErrorProps>({});
  const [pitch, setPitch] = useState<MDEditorProps["value"]>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleCreateStartup = async (formData: FormData) => {
    setFormState((prevState) => ({ ...prevState, status: "SUBMITTING" }));

    const formValues = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      image: imageFile?.name,
      pitch,
    };

    try {
      await createPitchSchema(false).parse(formValues);
      const { title, description, category, pitch } = formValues;
      setErrors({});

      // Call the server action
      const { error, status } = await createStartup({
        title,
        description,
        category,
        imageFile,
        pitch,
      });

      if (status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup has been created successfully!",
          variant: "success",
        });

        router.push("/");
      } else {
        setFormState((prevState) => ({
          ...prevState,
          status: "ERROR",
          error,
        }));
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors);
      }
    } finally {
      setFormState((prevState) => ({
        ...prevState,
        status: "IDLE",
      }));
    }
  };

  const handleUpdateStartup = async (
    formData: FormData,
    startupId: string,
    userId?: string,
  ) => {
    setFormState((prevState) => ({ ...prevState, status: "SUBMITTING" }));

    const formValues = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      image: imageFile?.name,
      pitch,
    };

    try {
      await createPitchSchema(true).parse(formValues);
      const { title, description, category, pitch } = formValues;
      setErrors({});

      const { error, status } = await updateStartup({
        id: startupId,
        title,
        description,
        category,
        imageFile,
        pitch,
      });

      if (status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup has been updated successfully!",
          variant: "success",
        });

        revalidatePath(`${userId ? `/user/${userId}` : "/"}`);
        router.push(`${userId ? `/user/${userId}` : "/"}`);
      } else {
        setFormState((prevState) => ({
          ...prevState,
          status: "ERROR",
          error,
        }));
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors);
      }
    } finally {
      setFormState((prevState) => ({
        ...prevState,
        status: "IDLE",
      }));
    }
  };

  const handleDeleteStartup = async (startupId: string) => {
    setFormState((prevState) => ({ ...prevState, status: "SUBMITTING" }));

    try {
      const { error, status } = await deleteStartup(startupId);

      if (status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup has been deleted successfully!",
          variant: "success",
        });

        return true;
      } else {
        setFormState((prevState) => ({
          ...prevState,
          status: "ERROR",
          error,
        }));
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });

        return false;
      }
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        status: "ERROR",
        error:
          error instanceof Error ? error.message : "Failed to delete startup.",
      }));
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete startup.",
        variant: "destructive",
      });
    } finally {
      setFormState((prevState) => ({
        ...prevState,
        status: "IDLE",
      }));
    }
  };

  const handleImageError = (error: string | null | undefined) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      image: error,
    }));
  };

  return {
    formState,
    errors,
    pitch,
    imageFile,
    setPitch,
    setImageFile,
    handleCreateStartup,
    handleUpdateStartup,
    handleDeleteStartup,
    handleImageError,
  };
};
