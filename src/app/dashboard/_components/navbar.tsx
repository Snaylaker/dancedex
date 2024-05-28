"use client"

import { LogOutIcon } from 'lucide-react'
import { User } from '@supabase/supabase-js'
import AddDance from './addDance'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import signOut from '@/actions/signOut'
import Link from 'next/link'

export default function NavBar({ user }: { user: User }) {

  return (
    <nav className="bg-gray-900 mx-auto max-w-7xl px-4 ">
      <div className="flex h-16 justify-between">
        <Link className="my-auto text-white text-xl font-bold" href="#">
          DanceDex
        </Link>
        <div className="flex gap-2 items-center">
          <AddDance />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
              <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
              <DropdownMenuItem  >
                <form action={signOut}>
                  <Button variant="ghost" size={"sm"}>
                    <LogOutIcon className="mr-2 h-4 w-4" /> Déconnexion
                  </Button>
                </form>
              </DropdownMenuItem >
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav >
  )
}
