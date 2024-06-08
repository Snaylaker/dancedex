"use client"

import signOut from "@/actions/signOut"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "@supabase/supabase-js"
import { LogOutIcon } from "lucide-react"
import AddDance from "./addDance"
import SearchBar from "./searchbar"

export default function NavBar({ user }: { user: User }) {
  return (
    <nav className="bg-neutral-950 border-b-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="text-2xl font-bold text-white my-auto">DanceDex</div>
          <SearchBar />
          <div className="flex justify-end items-center">
            <AddDance />
            <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
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
          </div>
        </div>
      </div>
    </nav>
  )
}
