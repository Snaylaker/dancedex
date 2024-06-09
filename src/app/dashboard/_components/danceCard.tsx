"use client";

import { deleteDance } from "@/actions/deleteDance";
import { editDance } from "@/actions/editDance";
import { togglePinDance } from "@/actions/pinDance";
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
import { CheckIcon, PencilIcon, PinIcon, TrashIcon, X } from "lucide-react";
import { useState } from "react";

export function DanceCard({
  pinned,
  title,
  description,
  id,
  videoUrl,
}: {
  pinned: boolean;
  title: string;
  id: string;
  description: string;
  videoUrl: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const [isPending, editDanceAction] = usePendingAction(editDance, () =>
    setIsEditing(false),
  );

  const [isPinning, pinDanceAction] = usePendingAction(togglePinDance);

  const [isDeletionPending, deleteDanceAction] = usePendingAction(deleteDance);

  return (
    <Card className="max-w-sm self-start rounded-lg shadow-lg">
      <video controls className="w-full rounded-t-lg   object-cover">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <CardContent className="flex flex-col space-y-4 px-6 py-4">
        {isEditing ? (
          <form id="edit-dance" action={editDanceAction}>
            <input type="hidden" name="id" value={id} />
            <Input
              type="text"
              name="title"
              value={editTitle}
              required
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-lg font-medium "
            />
            <Textarea
              value={editDescription}
              name="description"
              placeholder="Ajoute une description"
              required
              onChange={(e) => setEditDescription(e.target.value)}
              className="flex-1 text-sm"
            />
          </form>
        ) : (
          <>
            <h3 className="text-lg font-medium ">{editTitle}</h3>
            <p className="flex-1 text-sm">{editDescription}</p>
          </>
        )}
      </CardContent>
      <CardFooter className="max-h-12 items-center justify-between p-4 ">
        {isEditing ? (
          <>
            {isPending ? (
              <span className="text-gray-300">Enregistrement en cours...</span>
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
                  onClick={() => setIsEditing(false)}
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
              <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
              <Button
                className={`text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 `}
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                  size="icon"
                  variant="ghost"
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
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeletionPending}
                    onClick={() => deleteDanceAction(id)}
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>{" "}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
