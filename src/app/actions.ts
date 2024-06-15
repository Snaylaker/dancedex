"use server";
import { db } from "@/utils/drizzle/client";
import { createClient } from "@/utils/supabase/server";
import { getFileStorageUrl, getURL } from "@/utils/utils";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { dances } from "../../drizzle/schema";
import { redirect } from "next/navigation";

const supabase = createClient();

export async function addDance(values: FormData) {
  const video = values.get("video") as File;
  const title = values.get("title") as string;
  const description = values.get("description") as string;

  if (video.size > 1024 * 1024 * 10) {
    return { error: "La taille de la vidéo est supérieure à 10 Mo" };
  }

  try {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if (!userId) {
      return { error: "Invalid user" };
    }
    const userDances = await db
      .select()
      .from(dances)
      .where(eq(dances.userId, userId));

    if (userDances.length > 5) {
      return { error: "Vous avez atteint le nombre maximum de danses" };
    }
    const filePath = getFileStorageUrl(userId, video.name);
    const { error } = await supabase.storage
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
export async function deleteDance(id: string) {
  try {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if (!userId) {
      throw new Error("Invalid user");
    }

    const data = await db.select().from(dances).where(eq(dances.id, id));

    const { error } = await supabase.storage
      .from("dances")
      .remove([getFileStorageUrl(userId, data[0].fileName!)]);

    if (error) {
      throw new Error(error.message);
    }

    await db.delete(dances).where(eq(dances.id, id));
    revalidateTag("/");
    return { success: "La danse a été supprimée" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Une erreur est survenue lors de la suppression" };
  }
}

export async function editDance(values: FormData) {
  const id = values.get("id") as string;
  const title = values.get("title") as string;
  const description = values.get("description") as string;
  try {
    await db
      .update(dances)
      .set({ title, description })
      .where(eq(dances.id, id));
    revalidateTag("/");
    return { success: "La danse a été mise à jour" };
  } catch (error) {
    return { error: "Une erreur est survenue lors de la mise à jour" };
  }
}

export async function signIn() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getURL(),
    },
  });

  if (error) {
    console.log(error);
  }
  redirect(data.url!);
}

export async function signOut() {
  await supabase.auth.signOut();
  redirect("/");
}

export async function togglePinDance(id: string) {
  const data = await db.select().from(dances).where(eq(dances.id, id));
  const pinned = data[0].pinned;
  try {
    await db.update(dances).set({ pinned: !pinned }).where(eq(dances.id, id));
    revalidateTag("/");
    return { success: "La vidéo a été " + (pinned ? "dépinglée" : "épinglée") };
  } catch (error) {
    return { error: "Une erreur est survenue lors de l'épinglage de la vidéo" };
  }
}
