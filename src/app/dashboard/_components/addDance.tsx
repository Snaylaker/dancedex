"use client";

import { useFormStatus } from "react-dom";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addDance } from "@/actions/addDance";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>Enregistrer la danse</Button>
  )
}

export default function AddDance() {
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
            toast({
              description: "La video a été ajouté",
            })
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Titre</Label>
              <Input name="title"
                required
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left">Description</Label>
              <Input required name="description" className="col-span-3" />

            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Séléctionnez une video</Label>
              <Input required name="video" type="file" placeholder="Aucune video seléctionée" className="col-span-3" />
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
