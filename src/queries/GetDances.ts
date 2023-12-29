import { db } from "@/db/drizzle";
import { unstable_cache } from "next/cache";
import { dances } from "../../drizzle/schema";

export const getDances = unstable_cache(
  async () => await db.select().from(dances),
  ["dances"],
  { tags: ["dances"] },
);
