import { Input } from "@/components/ui/input"

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto">
      <div className="flex items-center w-full bg-white border border-gray-300 rounded-full shadow-sm dark:bg-gray-950 dark:border-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-2xl">
        <div className="pl-4">
          <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Rechercher une passe par titre"
          className="flex-1 py-2 pr-4 text-sm bg-transparent border-none focus:outline-none focus:ring-0 dark:text-gray-50 transition-all duration-300 ease-in-out"
        />
      </div>
    </div>
  )
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
