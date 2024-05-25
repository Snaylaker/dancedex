"use client"

import { useState } from 'react'
import { Menu as MenuIcon, LogOutIcon, X } from 'lucide-react'
import { User } from '@supabase/supabase-js'
import AddDance from './addDance'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import signOut from '@/actions/signOut'

const navigation = [
  { name: 'DanceDex', href: '/dashboard', current: true },
]

export default function NavBar({ user }: { user: User }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:bg-gray-700 hover:text-white"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
            <div className="flex flex-shrink-0 items-center">
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={'text-gray-300 text-xl rounded-md px-3 py-2 font-medium'}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <AddDance />
            <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {
                    //TODO:   make this a button
                  }
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
        </div>
      </div>
    </nav >
  )
}
