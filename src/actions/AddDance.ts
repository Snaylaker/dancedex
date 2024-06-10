"use server";
import { db } from "@/utils/drizzle/client";
import { createClient } from "@/utils/supabase/server";
import { getFileStorageUrl } from "@/utils/utils";
import { revalidateTag } from "next/cache";
import { dances } from "../../drizzle/schema";

export async function AddDance(values: FormData) {
  const video = values.get("video") as File;
  const title = values.get("title") as string;
  const description = values.get("description") as string;
  const supabase = createClient();

  try {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if (!userId) {
      return { error: "Invalid user" };
    }
    const filePath = getFileStorageUrl(userId, video.name);
    const { data, error } = await supabase.storage
      .from("dances")
      .upload(filePath, video);

    if (error) {
      return { error: error.message };
    }
    await db.insert(dances).values({
      title: title,
      fileName: video.name,
      userId: userId,
      description: description,
    });
    revalidateTag("/");
    return { success: "La video a été ajoutée" };
  } catch (error) {
    return { error: "Une erreur est survenue lors de l'ajout de la video" };
  }
}
