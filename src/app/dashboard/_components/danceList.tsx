"use client";
import { createClient } from "@/utils/supabase/client";
import { DanceCard } from "./danceCard";
import { getFileStorageUrl } from "@/utils/utils";
import { motion } from "framer-motion";

export default function DancesList({
  dances,
  userId,
}: {
  dances: any[];
  userId: string;
}) {
  const supabase = createClient();
  return (
    <motion.div layout className="py-auto flex flex-row flex-wrap gap-4">
      {dances.map((element) => (
        <DanceCard
          key={element.id}
          id={element.id}
          title={element.title!}
          pinned={element.pinned!}
          description={element.description!}
          videoUrl={
            element.videoUrl
              ? element.videoUrl
              : supabase.storage
                  .from("dances")
                  .getPublicUrl(getFileStorageUrl(userId, element.fileName!))
                  .data.publicUrl
          }
        />
      ))}
    </motion.div>
  );
}
