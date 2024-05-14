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
import { useFormState } from "react-dom";
import { Label } from "./ui/label";
import { useState } from "react";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default function AddDanceForm() {
  const [response, formAction, isPending] = useFormState(addDance, null);
  const [open, setOpen] = useState(false);
  console.log(isPending);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={isPending} variant="outline">
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
          action={formAction}
          onSubmit={(event) => {
            wait().then(() => setOpen(false));
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nom de la video</Label>
              <Input name="title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Séléctionner une video</Label>
              <Input name="video" type="file" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Enregistrer la danse</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
