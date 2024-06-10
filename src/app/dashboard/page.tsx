import { db } from "@/utils/drizzle/client";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/server";
import { getFileStorageUrl } from "@/utils/utils";
import { asc, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { dances } from "../../../drizzle/schema";
import { DanceCard } from "./_components/danceCard";
import NoContent from "./_components/noContent";
import SearchBar from "./_components/searchbar";
import DancesList from "./_components/danceList";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/");
  }

  const dancesList = await db
    .select()
    .from(dances)
    .where(eq(dances.userId, data.user.id))
    .orderBy(desc(dances.pinned), asc(dances.createdAt));

  return (
    <main className="mt-10 space-y-8">
      {dancesList.length === 0 ? (
        <NoContent />
      ) : (
        <>
          <SearchBar />
          <DancesList dances={dancesList} userId={data.user.id} />
        </>
      )}
    </main>
  );
}
