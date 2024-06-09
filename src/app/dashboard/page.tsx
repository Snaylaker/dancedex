import { db } from "@/utils/drizzle/client";
import { createClient } from "@/utils/supabase/server";
import { getFileStorageUrl } from "@/utils/utils";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { dances } from "../../../drizzle/schema";
import { DanceCard } from "./_components/danceCard";
import NoContent from "./_components/noContent";
import SearchBar from "./_components/searchbar";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/");
  }

  const dancesList = await db
    .select()
    .from(dances)
    .where(eq(dances.userId, data.user.id))
    .orderBy(dances.createdAt);

  return (
    <main className="flex flex-row flex-wrap gap-4">
      {dancesList.length === 0 ? <NoContent /> : <SearchBar />}
      {dancesList.map((element) => (
        <DanceCard
          key={element.id}
          id={element.id}
          title={element.title!}
          description={element.description!}
          videoUrl={
            supabase.storage
              .from("dances")
              .getPublicUrl(getFileStorageUrl(data.user.id, element.fileName!))
              .data.publicUrl
          }
        />
      ))}
    </main>
  );
}
