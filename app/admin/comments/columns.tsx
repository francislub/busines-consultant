"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export type Comment = {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  authorId: string
  storyId: string | null
  articleId: string | null
  author: {
    name: string
    email: string
  }
  story?: {
    title: string
    slug: string
  }
  article?: {
    title: string
    id: string
  }
}

export const commentColumns: ColumnDef<Comment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Content
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const content = row.getValue("content") as string
      return <div className="truncate max-w-[300px]">{content}</div>
    },
  },
  {
    accessorKey: "author.name",
    header: "Author",
    cell: ({ row }) => row.original.author.name,
  },
  {
    id: "source",
    header: "Source",
    cell: ({ row }) => {
      const comment = row.original
      if (comment.storyId) {
        return (
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Story</Badge>
            <span className="truncate max-w-[150px]">{comment.story?.title}</span>
          </div>
        )
      } else if (comment.articleId) {
        return (
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Article</Badge>
            <span className="truncate max-w-[150px]">{comment.article?.title}</span>
          </div>
        )
      }
      return <span>Unknown</span>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return format(new Date(row.original.createdAt), "MMM d, yyyy")
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const comment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(comment.id)}>Copy ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                // View comment
                document.dispatchEvent(new CustomEvent("view-comment", { detail: comment }))
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Edit comment
                document.dispatchEvent(new CustomEvent("edit-comment", { detail: comment }))
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Delete comment
                document.dispatchEvent(new CustomEvent("delete-comment", { detail: comment }))
              }}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

