"use server";

import { db } from "@/db/drizzle";
import { dances } from "../../drizzle/schema";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";

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
    return "done";
  } catch (error) {
    console.log("Error updating dance:", error);
    return "error";
  }
}
