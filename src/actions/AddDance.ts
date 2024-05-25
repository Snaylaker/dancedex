"use server";
import { revalidateTag } from "next/cache";
import { dances } from "../../drizzle/schema";
import { createClient } from "@/utils/supabase/server";
import { db } from "@/utils/drizzle/client";
import { getFileStorageUrl } from "@/utils/utils";

export async function addDance(values: FormData) {
  const video = values.get("video");
  const title = values.get("title") as string;
  const description = values.get("description") as string;

  const supabase = createClient();

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  //@ts-ignore
  const filePath = getFileStorageUrl(userId, video.name);

  //@ts-ignore
  await createClient().storage.from("dances").upload(filePath, video);

  await db
    .insert(dances)
    //@ts-ignore
    .values({
      title: title,
      //@ts-ignore
      fileName: video.name,
      userId: userId,
      description: description,
    });
  revalidateTag("/");
}
