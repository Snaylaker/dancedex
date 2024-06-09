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
    return { success: "La danse a été mise à jour" };
  } catch (error) {
    return { error: "Une erreur est survenue lors de la mise à jour" };
  }
}
