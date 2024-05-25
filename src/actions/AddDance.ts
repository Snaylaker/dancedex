"use server";
import { revalidateTag } from "next/cache";
import { dances } from "../../drizzle/schema";
import { createClient } from "@/utils/supabase/server";
import { db } from "@/utils/drizzle/client";
import { getFileStorageUrl } from "@/utils/utils";

export async function addDance(values: FormData) {
  const video = values.get("video") as File;
  const title = values.get("title") as string;
  const description = values.get("description") as string;

  const supabase = createClient();

  const user = await supabase.auth.getUser();
  const userId = user.data.user.id;

  if (!userId) {
    return "error";
  }

  const filePath = getFileStorageUrl(userId, video.name);

  await createClient().storage.from("dances").upload(filePath, video);

  await db.insert(dances).values({
    title: title,
    fileName: video.name,
    userId: userId,
    description: description,
  });
  revalidateTag("/");
}
