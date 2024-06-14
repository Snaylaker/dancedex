"use client";
import signOut from "@/actions/signOut";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { Loader, LogOutIcon, MoonIcon, PlusIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
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
import { useState } from "react";
import { usePendingAction } from "@/utils/hooks/usePendingAction";
import addDance from "@/actions/addDance";
import { Label } from "@/components/ui/label";

export default function NavBar({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  const [isPending, AddingDance] = usePendingAction(addDance, () => {
    setOpen(false);
  });
  return (
    <nav className="flex h-12 items-center justify-between border-b border-border/40 bg-background/95">
      <div className="text-2xl font-semibold tracking-tight">DanceDex</div>
      <div className="flex space-x-2">
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
        <ModeToggle />
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuItem>
              <form action={signOut}>
                <Button variant="ghost" size={"sm"}>
                  <LogOutIcon className="mr-2 h-4 w-4" /> Déconnexion
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Clair
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Sombre
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Systeme
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
