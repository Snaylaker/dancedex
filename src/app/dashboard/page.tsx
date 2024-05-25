import { eq } from "drizzle-orm";
import { dances } from "../../../drizzle/schema";
import { redirect } from "next/navigation";
import { db } from "@/utils/drizzle/client";
import { createClient } from "@/utils/supabase/server";
import Navbar from "./_components/navbar";
import NoContent from "./_components/noContent";
import { DanceCard } from "./_components/danceCard";
import { getFileStorageUrl } from "@/utils/utils";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/")
  }

  const dancesList = await db.select()
    .from(dances)
    .where(eq(dances.userId, data.user.id))
    .orderBy(dances.createdAt)

  return <>
    <Navbar user={data.user} />
    <div className="flex min-h-screen flex-col mt-7 bg-black-800">
      <main className="mx-auto flex max-w-screen-xl flex-col gap-4">
        <div className="flex flex-row flex-wrap gap-10">
          {dancesList.length === 0 && <NoContent />}
          {dancesList.map((element) => (
            <DanceCard
              key={element.id}
              id={element.id}
              title={element.title!}
              description={element.description!}
              videoUrl={
                supabase.storage.from("dances").getPublicUrl(getFileStorageUrl(data.user.id, element.fileName!)).data.publicUrl
              }
            />
          ))}
        </div>
      </main>
    </div>
  </>
}
