"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import { Input } from '@/components/ui/input';
import { ArrowLeft, CircleCheck } from 'lucide-react';
import { Calendar22 } from '@/src/app/components/admin/calender-picker';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
    SelectValue,
    SelectLabel,
} from "@/components/ui/select"

export default function SubmitOrdinances() {
    return (
        <div className="bg-[#E6F1FF] h-screen mt-10">
            <Breadcrumb className="ml-20">
                <BreadcrumbList>
                    <Button className="group gap-0 relative bg-[#E6F1FF] cursor-pointer" variant="link">
                        <ArrowLeft color="black" />
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </div>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical" />
                    </div>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Proposed Ordinances</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">View Proposed Ordinance</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-25">
                <p className="font-bold text-3xl mt-8 mb-2 ml-30">Ordinance 2021 - 022</p>
                <hr className="border-t border-black w-[90%] mx-auto mt-3 mb-2" />
                <p className="text-md mb-2 ml-30">
                    An Ordinance Institutionalizing the Bula Youth Leadership Summit and Declaring It as an Annual Municipal Activity
                </p>

                <div className="mx-20 mt-10">
                    <Table className="bg-white w-[100%]">
                        <TableCaption className="mt-2">Status of Proposed Ordinance for each Readings.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="max-w-[150px] text-center">-</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Date Started</TableHead>
                                <TableHead className="text-center">Date Completed</TableHead>
                                <TableHead className="text-center">Responsible Office</TableHead>
                                <TableHead className="w-[500px] text-center">Remarks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="max-w-[150px] text-center">First Reading</TableCell>
                                <TableCell>
                                    <Select>
                                        <SelectTrigger className="w-[fit%] cursor-pointer justify-self-center">
                                            <SelectValue className="placeholder:text-blue-500" placeholder="In Progress" />
                                        </SelectTrigger>
                                        <SelectContent className="">
                                            <SelectGroup>
                                                <SelectItem value="approved" className="text-[#28A745]">Approved</SelectItem>
                                                <SelectItem value="pending" className="text-[#005AC8]">Pending</SelectItem>
                                                <SelectItem value="vetoed" className="text-[#A7282A]">Vetoed</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-center italic">January 1, 2000</TableCell>
                                <TableCell className="text-center italic">January 10, 2000</TableCell>
                                <TableCell className="text-center font-semibold">Sangguniang Bayan</TableCell>
                                <TableCell className="text-center">
                                    Please collaborate with LYDO to draft the ordinance for the 2nd reading.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell className="w-[150px] text-center">Second Reading</TableCell>
                                <TableCell>
                                    <Select>
                                        <SelectTrigger className="w-[fit%] cursor-pointer justify-self-center">
                                            <SelectValue className="placeholder:text-blue-500" placeholder="In Progress" />
                                        </SelectTrigger>
                                        <SelectContent className="">
                                            <SelectGroup>
                                                <SelectItem value="approved" className="text-[#28A745]">Approved</SelectItem>
                                                <SelectItem value="pending" className="text-[#005AC8]">Pending</SelectItem>
                                                <SelectItem value="vetoed" className="text-[#A7282A]">Vetoed</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-center italic">January 11, 2000</TableCell>
                                <TableCell className="justify-items-center italic">
                                    <Calendar22 />
                                </TableCell>
                                <TableCell className="text-center font-semibold">Local Youth Development Office</TableCell>
                                <TableCell className="text-center">-</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell className="max-w-[150px] text-center">Third Reading</TableCell>
                                <TableCell>
                                    <Select>
                                        <SelectTrigger className="w-[fit%] cursor-pointer justify-self-center">
                                            <SelectValue className="placeholder:text-blue-500" placeholder="In Progress" />
                                        </SelectTrigger>
                                        <SelectContent className="">
                                            <SelectGroup>
                                                <SelectItem value="approved" className="text-[#28A745]">Approved</SelectItem>
                                                <SelectItem value="pending" className="text-[#005AC8]">Pending</SelectItem>
                                                <SelectItem value="vetoed" className="text-[#A7282A]">Vetoed</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="justify-items-center italic">
                                    <Calendar22 />
                                </TableCell>
                                <TableCell className="justify-items-center italic">
                                    <Calendar22 />
                                </TableCell>
                                <TableCell className="text-center">-</TableCell>
                                <TableCell className="text-center">-</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div className="mx-20 mt-10">
                    <div className="bg-white py-2 px-10 w-fit mt-2 flex flex-row gap-2 rounded-[8px]">
                        <CircleCheck fill="#A3C4A8" size="18" className="self-center"/>
                        <p>Submitted File Placeholder</p>
                    </div>
                </div>


            </div>
        </div>
    )
}