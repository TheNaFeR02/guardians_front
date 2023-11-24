"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Fight } from "./columns"
import { delFights } from "@/hooks/deleteFigths"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/client')
    }
  })

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = useState({})
  const [selectedRowsContent, setSelectedRowsContent] = useState<Array<Fight>>([])
  const [selectedRowsIds, setSelectedRowsIds] = useState<Array<number>>([])
  const [deleteTrigger, setDeleteTrigger] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 40,
      },
    },

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      // sorting,
      columnFilters,
      rowSelection,

    },
    meta: {
      addRow: () => {

      },
    }
  })
  // console.log(typeof table.getFilteredRowModel().rows[0])
  // console.log(rowSelection)

  function getIdsToDelete(selectedRowsContent: Array<Fight>) {
    const idsToDelete = selectedRowsContent.map((row) => row.id)
    setSelectedRowsIds(idsToDelete)
  }
  useMemo(() => {
    let selectedRowsContent: Array<Fight> = [];
    Object.keys(rowSelection).filter((rowIdx) =>
      selectedRowsContent.push(table.getFilteredRowModel().rows[parseInt(rowIdx)].original as Fight)
    )
    setSelectedRowsContent(selectedRowsContent)
    getIdsToDelete(selectedRowsContent)

  }, [rowSelection])

  // console.log(selectedRowsContent)



  async function handleDelete() {

    const idListToDelete = selectedRowsContent.map((row) => row.id)
    await delFights(idListToDelete, session?.user.accessAPIToken)
    setDeleteTrigger(!deleteTrigger)
  }

  return (
    <>
      <div className="rounded-md border">
        <div className="flex items-center py-4 px-4">
          <Input
            placeholder="Filter by hero name..."
            value={(table.getColumn("hero_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("hero_name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Button variant="destructive" className="ml-auto" onClick={handleDelete} >
            Delete
          </Button>
        </div>
        <div className="flex-1 text-sm text-muted-foreground py-4 px-4">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div >

    </>

  )
}
