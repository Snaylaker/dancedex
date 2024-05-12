"use client";

import { deleteDance } from "@/actions/DeleteDance";
import { Button } from "./ui/button";

export function DanceCard({
  title,
  description,
  id,
  videoUrl,
}: {
  title: string;
  id: string;
  description: string;
  videoUrl: string;
}) {
  return (
    <div className="max-w-96 rounded-lg bg-white shadow-lg">
      <video controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{title}</div>
        <p className="text-base text-gray-700">{description}</p>
      </div>
      <div className="px-6 py-4">
        <Button onClick={() => deleteDance(id)}>Supprimer la video</Button>
      </div>
    </div>
  );
}
