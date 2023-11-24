"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Fight = {
  id: number;
  hero: number;
  villain: number;
  result: string;
  hero_name: string | null; // Adjust the type as needed
  villain_name: string | null; // Adjust the type as needed
}

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { delFights } from "@/hooks/deleteFigths";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";



export const columns: ColumnDef<Fight>[] = [

  {

    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
  },


  {
    accessorKey: "id",
    header: "Fight ID",
  },
  {
    accessorKey: "hero",
    header: "Hero ID",
  },
  {
    accessorKey: "hero_name",
    header: "Hero Name",
  },
  {
    accessorKey: "villain",
    header: "Villain ID",
  },
  {
    accessorKey: "villain_name",
    header: "Villain Name",
  },
  {
    accessorKey: "result",
    header: "Result",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

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
            <DropdownMenuItem
              onClick={() => {
              }}
            >
              Fight Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />

          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

