"use client";

import { deleteDance } from "@/actions/DeleteDance";

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
        <button
          onClick={() => deleteDance(id)}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Read More
        </button>
      </div>
    </div>
  );
}
