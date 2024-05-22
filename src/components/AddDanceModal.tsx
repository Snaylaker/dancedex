"use client";

import { addDance } from "@/actions/AddDance";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useFormStatus } from "react-dom";
import { Label } from "./ui/label";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>Enregistrer la danse</Button>
  )
}

export default function AddDanceForm() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className=" h-5 w-5" aria-hidden="true" />
          Ajouter une nouvelle danse
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle danse</DialogTitle>
          <DialogDescription>
            Enregister une nouvelle video de danse
          </DialogDescription>
        </DialogHeader>
        <form
          action={addDance}
          onSubmit={() => {
            wait().then(() => setOpen(false));
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Titre</Label>
              <Input name="title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Description</Label>
              <Input name="description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Séléctionner une video</Label>
              <Input name="video" type="file" placeholder="Aucune video seléctionée" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
