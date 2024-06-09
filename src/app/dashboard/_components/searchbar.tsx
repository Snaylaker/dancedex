import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-center">
      <div className="flex w-full items-center rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:shadow-2xl">
        <div className="pl-4">
          <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Rechercher une passe par titre"
          className="flex-1 border-none bg-transparent py-2 pr-4 text-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-0 dark:text-gray-50"
        />
      </div>
    </div>
  );
}
