import { supabase } from "@/db/supabase";
import { DanceCard } from "@/components/DanceCard";
import { getDances } from "@/queries/GetDances";
import AddDanceForm from "@/components/AddDanceForm";

export default async function Home() {
  const data = await getDances();
  return (
    <div className="flex min-h-screen flex-col gap-7 bg-gray-100">
      <header className="bg-blue-600 p-4 text-white">
        <h1 className="m-a text-xl font-bold">DanceDex</h1>
      </header>
      <main className="mx-auto flex max-w-screen-xl flex-col gap-4">
        <div className="flex flex-row flex-wrap gap-10">
          {data.map((element) => (
            <DanceCard
              key={element.id}
              id={element.id}
              title={element.name!}
              description="description"
              videoUrl={
                supabase.storage
                  .from("dances")
                  .getPublicUrl("public/" + element.fileName).data.publicUrl
              }
            />
          ))}
          <AddDanceForm />
        </div>
      </main>
    </div>
  );
}
