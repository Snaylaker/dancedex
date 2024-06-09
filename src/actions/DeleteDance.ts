"use server";

import { db } from "@/utils/drizzle/client";
import { dances } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function deleteDance(id: string) {
  try {
    await db.delete(dances).where(eq(dances.id, id));
    revalidateTag("/");
    return { success: "La danse a été supprimée" };
  } catch (error) {
    return { error: "Une erreur est survenue lors de la suppression" };
  }
}
