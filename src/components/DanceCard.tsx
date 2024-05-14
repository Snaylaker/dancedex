"use client";

import { useState } from "react";
import { deleteDance } from "@/actions/DeleteDance";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { editDance } from "@/actions/EditDance";

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
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-96 max-w-96 rounded-lg bg-white shadow-lg">
      <video controls className="w-full rounded-t-lg">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-col space-y-4 px-6 py-4">
        {isEditing ? (
          <form
            action={editDance}
            onSubmit={() => {
              setIsEditing(false);
            }}
            className="flex flex-col space-y-4"
          >
            <input type="hidden" name="id" value={id} />
            <Input type="text" name="title" className="text-xl font-bold" />
            <Textarea name="description" className="text-base text-gray-700" />
            <div className="flex justify-between">
              <Button type="submit">Save</Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col space-y-10">
            <div>
              <div className="text-xl font-bold">{title}</div>
              <p className="text-base text-gray-700">{description}</p>
            </div>
            <div className="flex justify-between">
              <Button onClick={handleEdit}>Edit</Button>
              <Button variant="secondary" onClick={() => deleteDance(id)}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
