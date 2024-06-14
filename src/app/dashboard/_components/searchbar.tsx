"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-2xl font-semibold tracking-tight">
        Rechercher une passe par titre
      </div>
      <div className="flex w-full max-w-md items-center rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:shadow-2xl">
        <div className="pl-4">
          <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
        <Input
          type="search"
          onChange={(e) => {
            router.push(
              pathname + "?" + createQueryString("title", e.target.value),
            );
          }}
          placeholder="Commencez à saisir un titre"
          className="flex-1 border-none bg-transparent py-2 pr-4 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-0 dark:text-gray-50"
        />
      </div>
    </div>
  );
}
