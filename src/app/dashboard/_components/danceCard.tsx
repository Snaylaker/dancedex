"use client";

import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editDance } from "@/actions/editDance";
import { deleteDance } from "@/actions/deleteDance";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, XIcon } from "lucide-react";

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

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(title);
    setEditDescription(description);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    setIsProcessing(true);
    await editDance(formData);
    toast({ description: "Les informations ont été mises à jour" });
    setIsProcessing(false);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    await deleteDance(id);
    setIsProcessing(false);
    toast({ description: "La video a été suprimée" });
  };

  return (
    <Card className="w-full max-w-md">
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <video controls className="w-full rounded-t-lg">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <CardContent className="space-y-4 pt-4 min-h-48">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 justify-between">
                  <input type="hidden" name="id" value={id} />
                  <Input
                    type="text"
                    name="title"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="text-lg font-medium"
                    disabled={isProcessing}
                  />
                  <Textarea
                    name="description"
                    value={editDescription}
                    required
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="text-sm text-gray-500 dark:text-gray-400"
                  />
                  <div className="flex justify-end">
                    <Button size="sm" onClick={handleSubmit} disabled={isProcessing}>
                      <span className="sr-only">Save title</span>
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleCancel} disabled={isProcessing}>
                      <XIcon className="h-5 w-5" />
                      <span className="sr-only">Cancel editing</span>
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{title}</h3>
                  <div className="flex items-center gap-2"> </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card >
  );
}
