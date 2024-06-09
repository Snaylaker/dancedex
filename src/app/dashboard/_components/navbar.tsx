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
import { LogOutIcon, MoonIcon, SunIcon } from "lucide-react";
import AddDance from "./addDance";
import { useTheme } from "next-themes";

export default function NavBar({ user }: { user: User }) {
  return (
    <nav className="my-auto flex h-12 items-center justify-between border-b border-border/40 bg-background/95">
      <div className="text-2xl font-semibold tracking-tight">DanceDex</div>
      <div className="flex space-x-2">
        <AddDance />
        <ModeToggle />
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
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
