"use server";

import { db } from "@/utils/drizzle/client";
import { dances } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function deleteDance(id: string) {
  await db.delete(dances).where(eq(dances.id, id));
  revalidateTag("/");
}
