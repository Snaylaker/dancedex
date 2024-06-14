"use server";

import { dances } from "../../drizzle/schema";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/utils/drizzle/client";

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
