"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePendingAction } from "@/utils/hooks/usePendingAction";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  CheckIcon,
  Loader,
  PencilIcon,
  PinIcon,
  TrashIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import { Dance } from "../../../../drizzle/schema";
import editDance from "@/actions/editDance";
import togglePinDance from "@/actions/togglePinDance";
import deleteDance from "@/actions/deleteDance";

export function DanceCard({
  dance,
  videoUrl,
}: {
  dance: Dance;
  videoUrl: string;
}) {
  const { id, title, description, pinned } = dance;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isPending, editDanceAction] = usePendingAction(editDance, () =>
    setIsEditing(false),
  );

  const [isPinning, pinDanceAction] = usePendingAction(togglePinDance);

  const [isDeletionPending, deleteDanceAction] = usePendingAction(
    deleteDance,
    () => {
      setIsDeleteModalOpen(false);
    },
  );

  return (
    <Card className="w-full rounded-lg shadow-lg lg:w-1/3 lg:max-w-sm">
      <video
        playsInline
        preload="metadata"
        controls
        className="aspect-video w-full rounded-t-lg object-contain"
      >
        <source src={videoUrl + "#t=0.1"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <CardContent className="flex h-36 flex-col gap-4">
        {isEditing ? (
          <form id="edit-dance" action={editDanceAction}>
            <input type="hidden" name="id" value={id} />
            <Input
              type="text"
              name="title"
              value={editTitle}
              required
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-lg font-medium"
            />
            <Textarea
              value={editDescription}
              name="description"
              placeholder="Ajoute une description"
              required
              onChange={(e) => setEditDescription(e.target.value)}
              className="text-sm"
            />
          </form>
        ) : (
          <div className="px-2 py-3">
            <h3 className="pb-3 text-lg font-medium">{editTitle}</h3>
            <p className="text-sm">{editDescription}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-between">
        {isEditing ? (
          <>
            {isPending ? (
              <Loader className="h-5 w-5 motion-safe:animate-spin" />
            ) : (
              <>
                <button
                  className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-500"
                  id="save-dance"
                  form="edit-dance"
                  type="submit"
                >
                  <CheckIcon className="ml-2 h-5 w-5" />
                </button>
                <Button
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setEditTitle(title);
                    setEditDescription(description);
                    setIsEditing(false);
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <Button
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
            >
              <PencilIcon className="h-5 w-5" />
              <span className="sr-only">Edit</span>
            </Button>
            {isPinning ? (
              <Loader className="h-5 w-5 motion-safe:animate-spin" />
            ) : (
              <Button
                className={`text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500`}
                size="icon"
                variant="ghost"
                onClick={() => pinDanceAction(id)}
              >
                <PinIcon
                  className={`h-5 w-5 ${pinned ? "fill-current" : ""}`}
                />
                <span className="sr-only">Pin</span>
              </Button>
            )}
            <AlertDialog open={isDeleteModalOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <TrashIcon className="h-5 w-5" />
                  <span className="sr-only">Delete</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Etes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Attention, cette action est définitive et ne peut pas être
                    annulée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setIsDeleteModalOpen(false)}
                    disabled={isDeletionPending}
                  >
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeletionPending}
                    onClick={() => deleteDanceAction(id)}
                  >
                    {isDeletionPending ? (
                      <Loader className="h-5 w-5 motion-safe:animate-spin" />
                    ) : (
                      "Supprimer"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
