import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CheckIcon,
  MoveVerticalIcon,
  PencilIcon,
  PinIcon,
  TrashIcon,
} from "lucide-react"

export default function DropdownActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          <MoveVerticalIcon className="h-5 w-5" />
          <span className="sr-only">Pin card</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Button
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            size="icon"
            variant="ghost"
          >
            <PencilIcon className="h-5 w-5" />
            <span className="sr-only">Edit title</span>
          </Button>
          Edit Title
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-500"
            size="icon"
            variant="ghost"
          >
            <CheckIcon className="h-5 w-5" />
            <span className="sr-only">Save title</span>
          </Button>
          Save Title
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
            size="icon"
            variant="ghost"
          >
            <TrashIcon className="h-5 w-5" />
            <span className="sr-only">Delete</span>
          </Button>
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            size="icon"
            variant="ghost"
          >
            <PinIcon className="h-5 w-5" />
            <span className="sr-only">Pin card</span>
          </Button>
          Pin Video
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
