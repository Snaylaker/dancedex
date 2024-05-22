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
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(title); // Reset to initial title
    setEditDescription(description); // Reset to initial description
  };

  //@ts-ignore
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    setIsProcessing(true);
    await editDance(formData);
    setIsProcessing(false);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    await deleteDance(id);
    setIsProcessing(false);
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
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
          >
            <input type="hidden" name="id" value={id} />
            <Input
              type="text"
              name="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-xl font-bold"
              disabled={isProcessing}
            />
            <Textarea
              name="description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="text-base text-gray-700"
              disabled={isProcessing}
            />
            <div className="flex justify-between">
              <Button type="submit" disabled={isProcessing}>Save</Button>
              <Button variant="secondary" onClick={handleCancel} disabled={isProcessing}>
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
              <Button onClick={handleEdit} disabled={isProcessing}>Modifier</Button>
              <Button variant="secondary" onClick={handleDelete} disabled={isProcessing}>
                Supprimer
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
