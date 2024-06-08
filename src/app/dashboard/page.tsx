import { db } from "@/utils/drizzle/client";
import { createClient } from "@/utils/supabase/server";
import { getFileStorageUrl } from "@/utils/utils";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { dances } from "../../../drizzle/schema";
import { DanceCard } from "./_components/danceCard";
import NoContent from "./_components/noContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <main className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-row flex-wrap gap-4 sm:gap-6 lg:gap-10 mt-10">
        {dancesList.length === 0 && <NoContent />}
        {dancesList.map((element) => (
          <DanceCard
            key={element.id}
            id={element.id}
            title={element.title!}
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
    </main>
  );
}
