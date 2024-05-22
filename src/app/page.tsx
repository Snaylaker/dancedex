import { DanceCard } from "@/components/DanceCard";
import { db } from "@/db/drizzle";
import { dances } from "../../drizzle/schema";
import supabase from "@/db/supabase";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import NoContent from "@/components/NoContent";

export default async function Home() {
  const data = await db.select().from(dances).orderBy(dances.id);
  return (
    <div className="flex min-h-screen flex-col gap-7 bg-gray-100">
      <Navbar />
      <main className="mx-auto flex max-w-screen-xl flex-col gap-4">
        <div className="flex flex-row flex-wrap gap-10">
          <Suspense key={Math.random()} fallback={<p>Loading feed...</p>}>
            {data.length === 0 && <NoContent />}
            {data.map((element) => (
              <DanceCard
                key={element.id}
                id={element.id}
                title={element.title!}
                description={element.description!}
                videoUrl={
                  supabase.storage
                    .from("dances")
                    .getPublicUrl("public/" + element.fileName).data.publicUrl
                }
              />
            ))}
          </ Suspense >
        </div>
      </main>
    </div>
  );
}
