"use server";

import { db } from "@/utils/drizzle/client";
import { dances } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { getFileStorageUrl } from "@/utils/utils";

export default async function deleteDance(id: string) {
  try {
    const supabase = createClient();

    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if (!userId) {
      throw new Error("Invalid user");
    }

    const data = await db.select().from(dances).where(eq(dances.id, id));

    const { error } = await supabase.storage
      .from("dances")
      .remove([getFileStorageUrl(userId, data[0].fileName!)]);

    if (error) {
      throw new Error(error.message);
    }

    await db.delete(dances).where(eq(dances.id, id));
    revalidateTag("/");
    return { success: "La danse a été supprimée" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Une erreur est survenue lors de la suppression" };
  }
}
