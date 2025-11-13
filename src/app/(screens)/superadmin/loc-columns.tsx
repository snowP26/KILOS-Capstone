"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EllipsisVertical, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Users = {
    youth_official_id: string
    created_at: string
    firstname: string
    lastname: string
    position_title: string
    position_role: string
    email: string
    registration_code: string

}

export const locColumns: ColumnDef<Users>[] = [
    {
        accessorKey: "youth_official_id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const rawDate = row.getValue("created_at") as Date;
            if (rawDate) {
                const formattedDate = new Date(rawDate).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });
                return <span>{formattedDate}</span>;
            }
            return <span>-</span>
        },
    },
    {
        accessorKey: "firstname",
        header: () => <div className="text-center">First Name</div>,
        cell: ({ row }) => {
            const firstname = row.getValue("firstname") as string;

            if (!firstname) {
                return (
                    <span className="text-gray-400 italic">
                        Registration code has not been assigned
                    </span>
                );
            }

            return <span>{firstname || "-"}</span>;
        },
    },
    {
        accessorKey: "lastname",
        header: () => <div className="text-center">Last Name</div>,
        cell: ({ row }) => {
            const lastname = row.getValue("lastname") as string;

            if (!lastname) {
                return <span>-</span>; 
            }

            return <span>{lastname || "-"}</span>;
        },
    },
    {
        accessorKey: "registration_code",
        header: () => <div className="text-center">Registration Code</div>
    },
    {
        accessorKey: "position_title",
        header: () => <div className="text-center">Position</div>
    },
    {
        accessorKey: "position_role",
        header: () => <div className="text-center">Role</div>
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="cursor-pointer justify-center w-full text-center"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#1D1A1A] text-white">
                        <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.youth_official_id)}
                        >
                            Copy Registration Code
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
