"use client";

import { editDance } from "@/actions/editDance";
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

  const [isPending, editDanceAction] = usePendingAction(editDance, () =>
    setIsEditing(false),
  );

  return (
    <Card className="max-w-sm rounded-lg shadow-lg">
      <video controls className="w-full rounded-t-lg">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <CardContent className="flex flex-col space-y-4 px-6 py-4">
        {isEditing ? (
          <form id="edit-dance" action={editDanceAction}>
            <input type="hidden" name="id" value={id} />
            <Input
              name="title"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="text-sm text-gray-500 dark:text-gray-400"
            />
            <Textarea
              name="description"
              value={editDescription}
              required
              onChange={(e) => setEditDescription(e.target.value)}
              className="text-base text-gray-700"
            />
          </form>
        ) : (
          <>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex-1">
              {description}
            </p>
          </>
        )}
      </CardContent>
      <CardFooter className="flex items-center max-h-12 justify-between bg-gray-100 p-4 dark:bg-gray-800">
        {isEditing ? (
          <>
            {isPending ? (
              <span className="text-gray-500">Enregistrement en cours...</span>
            ) : (
              <>
                <button
                  className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-500"
                  id="save-dance"
                  form="edit-dance"
                >
                  <CheckIcon className="h-5 w-5 ml-2" />
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
            <Button
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
              size="icon"
              variant="ghost"
            >
              <PinIcon className="h-5 w-5" />
              <span className="sr-only">Pin</span>
            </Button>
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
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>{" "}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
