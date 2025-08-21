"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, SquarePen, Image } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function ViewBudgetBrkdwn() {
    const router = useRouter();

    return (
        <div className="bg-[#E6F1FF] h-screen mt-10">
            <Breadcrumb className="ml-20">
                <BreadcrumbList>
                    <Button className="group gap-0 relative bg-[#E6F1FF] cursor-pointer" variant="link" onClick={() => router.push("/admin/projects/[id]")}>
                        <ArrowLeft color="black" />
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </div>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical" />
                    </div>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/projects">Proposed Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/projects/[id]">View Proposed Project</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">View Budget Breakdown</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-25">
                <p className="font-bold text-3xl mt-8 mb-6">Title of Proposed Project</p>

                <div className="flex flex-row gap-2 justify-end">
                    <p className="text-black font-medium content-center">Set Budget for Project:</p>
                    <p className="text-[#28A745] text-xl font-medium content-center">&#8369;999,999,999.00</p>
                    <SquarePen size="18px" className="self-center cursor-pointer hover:bg-gray-300" />
                </div>
                <div className="bg-white p-10 mt-10">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center w-50">Status</TableHead>
                                <TableHead className="text-center">Item Name</TableHead>
                                <TableHead className="text-center">Price</TableHead>
                                <TableHead className="text-center">Amt</TableHead>
                                <TableHead className="text-center">Receipt</TableHead>
                                <TableHead className="text-center">Photo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center">
                                    <Select>
                                        <SelectTrigger className="w-[fit%] cursor-pointer justify-self-center">
                                            <SelectValue className="placeholder:text-blue-500" placeholder="FOR APPROVAL" />
                                        </SelectTrigger>
                                        <SelectContent className="">
                                            <SelectGroup>
                                                <SelectItem value="approved" className="text-[#28A745]">APPROVED</SelectItem>
                                                <SelectItem value="rejected" className="text-[#A7282A]">REJECTED</SelectItem>
                                                <SelectItem value="resubmit" className="text-[#FF6904]">RESUBMIT</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-center">Product Name 1</TableCell>
                                <TableCell className="text-center">Php 123,456,789</TableCell>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell className="justify-items-center gap-2">
                                    <Image className="cursor-pointer hover:bg-gray-300" />
                                </TableCell>
                                <TableCell className="justify-items-center gap-2">
                                    <Image className="cursor-pointer hover:bg-gray-300" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center">
                                    <Select>
                                        <SelectTrigger className="w-[fit%] cursor-pointer justify-self-center">
                                            <SelectValue className="placeholder:text-blue-500" placeholder="FOR APPROVAL" />
                                        </SelectTrigger>
                                        <SelectContent className="">
                                            <SelectGroup>
                                                <SelectItem value="approved" className="text-[#28A745]">APPROVED</SelectItem>
                                                <SelectItem value="rejected" className="text-[#A7282A]">REJECTED</SelectItem>
                                                <SelectItem value="resubmit" className="text-[#FF6904]">RESUBMIT</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-center">Product Name 1</TableCell>
                                <TableCell className="text-center">Php 123,456,789</TableCell>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell className="justify-items-center gap-2">
                                    <Image className="cursor-pointer hover:bg-gray-300" />
                                </TableCell>
                                <TableCell className="justify-items-center gap-2">
                                    <Image className="cursor-pointer hover:bg-gray-300" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>


            </div>
        </div>
    )
}