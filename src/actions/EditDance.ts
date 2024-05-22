"use server";

import { dances } from "../../drizzle/schema";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/utils/drizzle/client";

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
