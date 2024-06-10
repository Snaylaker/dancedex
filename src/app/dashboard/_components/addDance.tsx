"use client";

import { AddDance as AddDanceAction } from "@/actions/AddDance";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePendingAction } from "@/utils/hooks/usePendingAction";
import { Loader, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function AddDance() {
  const [open, setOpen] = useState(false);

  const [isPending, AddingDance] = usePendingAction(AddDanceAction, () => {
    setOpen(false);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
          <span className="ml-2 hidden sm:inline">
            Ajouter une nouvelle danse
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle danse</DialogTitle>
          <DialogDescription>
            Enregister une nouvelle video de danse
          </DialogDescription>
        </DialogHeader>
        <form action={AddingDance}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Titre</Label>
              <Input name="title" required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Description</Label>
              <Input required name="description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Séléctionnez une video</Label>
              <Input
                required
                name="video"
                type="file"
                accept="video/*"
                placeholder="Aucune video seléctionée"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader className="h-5 w-5 motion-safe:animate-spin" />
              ) : (
                "Enregistrer la danse"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
