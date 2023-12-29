"use client"

import { AddDance } from "@/actions/AddDance"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog"
import { Label } from "@radix-ui/react-label"
import { Button } from "./ui/button"
import { DialogFooter, DialogHeader } from "./ui/dialog"
import { Input } from "./ui/input"

export default function AddDanceForm() {
  return <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Ajouter une nouvelle danse</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Nouvelle danse</DialogTitle>
      <DialogDescription>
        Enregister une nouvelle video de danse
      </DialogDescription>
    </DialogHeader>
    <form action={AddDance}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Séléctionner une video
          </Label>
          <Input id="name" value="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Nom de la video
          </Label>
          <Input id="username" value="@peduarte" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Enregistrer la danse</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
}
// <div className="max-w-96 rounded-lg bg-white shadow-lg">
//   <video controls>
//     <source src={videoUrl} type="video/mp4" />
//     Your browser does not support the video tag.
//   </video>
//   <div className="px-6 py-4">
//     <div className="mb-2 text-xl font-bold">{title}</div>
//     <p className="text-base text-gray-700">{description}</p>
//   </div>
//   <div className="px-6 py-4">
//     <button
//       onClick={() => deleteDance(id)}
//       className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
//     >
//       Read More
//     </button>
//   </div>
// </div>

