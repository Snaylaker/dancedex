import { db } from "@/utils/drizzle/client";
import { createClient } from "@/utils/supabase/server";
import { getFileStorageUrl } from "@/utils/utils";
import { asc, desc, eq } from "drizzle-orm";
import { redirect, useSearchParams } from "next/navigation";
import { dances } from "../../../drizzle/schema";
import { DanceCard } from "./_components/danceCard";
import NoContent from "./_components/noContent";
import SearchBar from "./_components/searchbar";

export default async function Home(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/");
  }

  //@ts-ignore
  const title = searchParams.searchParams.title;

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
          <div className="flex flex-row flex-wrap gap-4">
            {dancesList
              .filter((element) => element.title?.includes(title ?? ""))
              .map((element) => (
                <DanceCard
                  key={element.id}
                  id={element.id}
                  title={element.title!}
                  pinned={element.pinned!}
                  description={element.description!}
                  videoUrl={
                    supabase.storage
                      .from("dances")
                      .getPublicUrl(
                        getFileStorageUrl(data.user.id, element.fileName!),
                      ).data.publicUrl
                  }
                />
              ))}
          </div>
        </>
      )}
    </main>
  );
}
