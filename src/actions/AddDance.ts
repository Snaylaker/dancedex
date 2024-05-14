"use server";
import { db } from "@/db/drizzle";
import { revalidateTag } from "next/cache";
import { dances, users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import supabase from "@/db/supabase";

//@ts-ignore
export async function addDance(_, values: FormData) {
  const video = values.get("video");
  const title = values.get("title") as string;
  if (video instanceof File) {
    await supabase.storage.from("dances").upload("public/" + video.name, video);
    const userId = await db
      .select({ field1: users.id })
      .from(users)
      .where(eq(users.name, "mehdi"));
    await db
      .insert(dances)
      .values({ title: title, fileName: video.name, userId: userId[0].field1 });
    revalidateTag("/");
    return "done";
  } else {
    console.log("im loooooooost error");
  }
}
