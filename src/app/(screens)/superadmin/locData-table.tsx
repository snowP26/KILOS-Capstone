"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    ColumnDef,
    flexRender,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createNewCode } from "../../actions/super_admin"
import { useParams, useRouter } from "next/navigation"
import { locNameToID } from "../../actions/convert"
import Swal from "sweetalert2"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const router = useRouter()
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })
    const params = useParams();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)

        const positionTitle = formData.get("positionTitle") as string
        const positionRole = formData.get("positionRole") as string
        const loc = (params?.id as string).replace(/-/g, " ")
        const locID = await locNameToID(loc)

        try {
            await createNewCode(locID, positionTitle, positionRole)

            Swal.fire({
                icon: "success",
                title: "Position Added",
                text: `${positionTitle} (${positionRole}) has been successfully created. Please refresh the page.`,
                timer: 1250
            })
                setIsDialogOpen(false)
                form.reset()

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong while creating the position.",
                timer: 1250
            })
        }
    }


    return (
        <div>
            <div className="flex items-center mx-5 lg:mx-0 py-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto bg-[#1D1A1A] text-white cursor-pointer">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="overflow-hidden mx-5 lg:mx-0 rounded-md border">
                <Table>
                    <TableHeader className="bg-[#1D1A1A]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-white">
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
                                    data-state={row.getIsSelected() && "selected"} className="text-center"
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
            </div>
            <div className="flex items-center justify-between py-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="cursor-pointer">
                            Add Position
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>
                            Create Role
                        </DialogTitle>
                        <DialogDescription>
                            Generate a registration code for the users.
                        </DialogDescription>
                        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                            {/* Position Title */}
                            <div className="flex flex-col text-left">
                                <label htmlFor="positionTitle" className="text-sm font-medium">
                                    Position Title
                                </label>
                                <input
                                    id="positionTitle"
                                    name="positionTitle"
                                    type="text"
                                    placeholder="Enter position title"
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Position Role */}
                            <div className="flex flex-col text-left">
                                <label htmlFor="positionRole" className="text-sm font-medium">
                                    Position Role
                                </label>
                                <select
                                    id="positionRole"
                                    name="positionRole"
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Legislative">Legislative</option>
                                    <option value="Executive">Executive</option>
                                    <option value="Treasurer">Treasurer</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <Button type="submit" className="cursor-pointer">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>


                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-[#1D1A1A] text-white cursor-pointer"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-[#1D1A1A] text-white cursor-pointer"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}