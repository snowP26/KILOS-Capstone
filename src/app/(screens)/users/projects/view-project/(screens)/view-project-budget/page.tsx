"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react';
import { Image } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
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

export default function ViewProject() {
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
                        <BreadcrumbLink href="/components">Current Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">View Project</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">View Project Budget</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-25">
                <p className="font-bold text-3xl mt-8 mb-6">Iheras: Sharing the Christmas Spirit Year 4</p>

                <div className="flex flex-row gap-5 h-10 justify-between">
                    <Button className="text-black bg-[#A3C4A8] h-10 cursor-pointer hover:bg-black hover:text-[#A3C4A8]">View Project Details</Button>
                    <div className="flex flex-row gap-2">
                        <p className="text-black font-medium content-center">Set Budget for Project:</p>
                        <p className="text-[#28A745] text-xl font-medium content-center">&#8369;999,999,999.00</p>
                    </div>

                </div>

                <div className="mt-10">
                    <Table className="bg-white w-[100%]">
                        <TableCaption className="mt-2">Breakdown of project materials used in the project.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center w-50">Status</TableHead>
                                <TableHead className="text-center">Item Name</TableHead>
                                <TableHead className="text-center">Price</TableHead>
                                <TableHead className="text-center">Amt.</TableHead>
                                <TableHead className="text-center">Receipt</TableHead>
                                <TableHead className="text-center">Photo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">For Approval</p>
                                </TableCell>
                                <TableCell className="max-w-[150px] text-center">Product Name 1</TableCell>
                                <TableCell className="text-center">Php 123,456,789</TableCell>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300"/></TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300"/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Approved</p>
                                </TableCell>
                                <TableCell className="max-w-[150px] text-center">Product Name 2</TableCell>
                                <TableCell className="text-center">Php 123,456,789</TableCell>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300"/></TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300"/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Rejected</p>
                                </TableCell>
                                <TableCell className="max-w-[150px] text-center">Product Name 3</TableCell>
                                <TableCell className="text-center">Php 123,456,789</TableCell>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300"/></TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300"/></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Resubmit</p>
                                </TableCell>
                                <TableCell className="max-w-[150px] text-center">Product Name 4</TableCell>
                                <TableCell className="text-center">Php 123,456,789</TableCell>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300"/></TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300"/></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>


        </div>
    )
}