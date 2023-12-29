"use server";
import { db } from "@/db/drizzle";
import { supabase } from "@/db/supabase";
import { revalidateTag } from "next/cache";
import { dances, users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const AddDance = async (values: FormData) => {
  const video = values.get("video");
  const name = values.get("name") as string;
  if (video instanceof File) {
    await supabase.storage.from("dances").upload("public/" + video.name, video);
    const userId = await db
      .select({ field1: users.id })
      .from(users)
      .where(eq(users.name, "mehdi"));
    await db
      .insert(dances)
      .values({ name: name, fileName: video.name, userId: userId[0].field1 });
    revalidateTag("dances");
  } else {
    console.log("Video not found in form");
  }
};
