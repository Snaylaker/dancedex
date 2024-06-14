import { db } from "@/utils/drizzle/client";
import { createClient } from "@/utils/supabase/server";
import { getFileStorageUrl } from "@/utils/utils";
import { asc, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { dances } from "../../../drizzle/schema";
import { DanceCard } from "./_components/danceCard";
import NoContent from "./_components/noContent";
import SearchBar from "./_components/searchbar";
import { toast } from "@/components/ui/use-toast";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    redirect("/");
  }

  const title = searchParams["title"] as string;

  const dancesList = await db
    .select()
    .from(dances)
    .where(eq(dances.userId, userData.user.id))
    .orderBy(desc(dances.pinned), asc(dances.createdAt));

  return (
    <main className=" mt-10 space-y-8">
      {dancesList.length === 0 ? (
        <NoContent />
      ) : (
        <>
          <SearchBar />
          <div className="flex flex-row flex-wrap gap-4">
            {dancesList
              .filter((dance) => dance.title.startsWith(title ?? ""))
              .map(async (element) => {
                const { data, error } = await supabase.storage
                  .from("dances")
                  .createSignedUrl(
                    getFileStorageUrl(userData.user.id, element.fileName),
                    3600,
                  );
                if (error || !data) {
                  toast({
                    description:
                      "une erreur est survenue lors de la récupération de la vidéo",
                  });
                  return <></>;
                }
                return <DanceCard dance={element} videoUrl={data.signedUrl} />;
              })}
          </div>
        </>
      )}
    </main>
  );
}
