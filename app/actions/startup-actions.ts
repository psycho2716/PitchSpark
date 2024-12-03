"use server";

import { revalidatePath } from "next/cache";
import { writeClient } from "@/sanity/lib/write-client";
import { auth } from "@/auth";
import { Startup } from "@/sanity/types";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs/promises";
import slugify from "slugify";

async function saveImage(
  image: File | null,
  id: string,
  title: string,
): Promise<string> {
  if (!image || !id) return "";

  const today = new Date();
  const year = today.getFullYear();
  const day = String(today.getDate()).padStart(2, "0"); // Ensure two digits
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const formattedDate = `${year}-${month}-${day}`;

  // Set the image filename
  const extension = path.extname(image.name).toLowerCase();
  const safeTitle = slugify(title, { lower: true, strict: true });
  const fileName = `${randomUUID()}-${formattedDate}-${safeTitle}${extension}`;

  const dirPath = path.join(process.cwd(), "public", "startups", id);
  const filePath = path.join(dirPath, fileName);

  // Ensure the directory exists
  await fs.mkdir(dirPath, { recursive: true });

  // Convert File to Buffer and save
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await fs.writeFile(filePath, buffer);

  return `${process.env.NEXT_PUBLIC_APP_URL}/startups/${id}/${fileName}`;
}

export async function createStartup({
  title,
  description,
  category,
  imageFile,
  pitch,
}: {
  title: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  category: FormDataEntryValue | null;
  imageFile: File | null;
  pitch: string | undefined;
}) {
  try {
    // Validate user authentication
    const session = await auth();
    if (!session?.user) {
      throw new Error("User is not authenticated.");
    }

    // Validate and process form inputs
    if (!title || !description || !category) {
      throw new Error("Title, description, and category are required.");
    }

    const titleString = title.toString();
    const descriptionString = description.toString();
    const categoryString = category.toString();
    const userId = session.user.id;

    // Save the image and generate a URL
    const imageUrl = await saveImage(
      imageFile,
      userId!.toString(),
      titleString,
    );

    // Generate a slug for the startup
    const slug = slugify(titleString, { lower: true, strict: true });

    // Prepare the startup document
    const startupData = {
      _type: "startup",
      title: titleString,
      description: descriptionString,
      category: categoryString,
      pitch,
      image: imageUrl,
      author: { _type: "reference", _ref: userId },
      slug: { _type: "slug", current: slug },
      views: 0,
    };

    // Write to Sanity
    await writeClient.create(startupData);

    // Revalidate the homepage
    revalidatePath("/");

    return { error: null, status: "SUCCESS" };
  } catch (error) {
    console.error(error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to create startup.",
      status: "ERROR",
    };
  }
}

export async function updateStartup({
  id,
  title,
  description,
  category,
  imageFile,
  pitch,
}: {
  id: string | undefined;
  title: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  category: FormDataEntryValue | null;
  imageFile: File | null;
  pitch: string | undefined;
}) {
  try {
    // Validate user authentication
    const session = await auth();
    if (!session?.user) {
      throw new Error("User is not authenticated.");
    }

    // Validate and process form inputs
    if (!title || !description || !category) {
      throw new Error("Title, description, and category are required.");
    }

    const titleString = title.toString();
    const descriptionString = description.toString();
    const categoryString = category.toString();
    const userId = session.user.id;

    // Save the image and generate a URL if a new image is provided
    let imageUrl = "";
    if (imageFile) {
      imageUrl = await saveImage(imageFile, userId!.toString(), titleString);
    }

    // Generate a slug for the startup
    const slug = slugify(titleString, { lower: true, strict: true });

    // Prepare the startup document
    const startupData: Partial<Startup> = {
      title: titleString,
      description: descriptionString,
      category: categoryString,
      pitch,
      slug: { _type: "slug", current: slug },
    };

    if (imageUrl) {
      startupData.image = imageUrl;
    }

    // Update the startup in Sanity
    await writeClient.patch(id!).set(startupData).commit();

    return { error: null, status: "SUCCESS" };
  } catch (error) {
    console.error(error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to update startup.",
      status: "ERROR",
    };
  }
}

export async function deleteStartup(id: string) {
  try {
    // Validate user authentication
    const session = await auth();
    if (!session?.user) {
      throw new Error("User is not authenticated.");
    }

    // Fetch the startup to get the image URL and check for references
    const startup = await writeClient.fetch(
      `*[_type == "startup" && _id == $id][0]`,
      { id },
    );

    if (!startup) {
      throw new Error("Startup not found.");
    }

    // Remove references from playlists
    const playlists = await writeClient.fetch(
      `*[_type == "playlist" && references($id)]`,
      {
        id,
      },
    );

    for (const playlist of playlists) {
      await writeClient
        .patch(playlist._id)
        .unset([`select[_ref=="${id}"]`])
        .commit();
    }

    // Extract the image path from the URL
    const imageUrl = startup.image;
    if (imageUrl) {
      try {
        const imagePath = path.join(
          process.cwd(),
          "public",
          new URL(imageUrl).pathname,
        );
        await fs.unlink(imagePath);
        console.log(`Deleted image: ${imagePath}`);
      } catch (error) {
        console.error(`Failed to delete image: ${imageUrl}`, error);
      }
    }

    // Delete the startup from Sanity
    await writeClient.delete(id);

    return { error: null, status: "SUCCESS" };
  } catch (error) {
    console.error("Error deleting startup:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to delete startup.",
      status: "ERROR",
    };
  }
}
