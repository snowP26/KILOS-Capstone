"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
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
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
    SelectValue,
    SelectLabel,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useRouter } from 'next/navigation';

export default function ViewProposedProj() {
  const router = useRouter();

    return (
        <div className="bg-[#E6F1FF] h-screen mt-10">
            <Breadcrumb className="ml-20">
                <BreadcrumbList>
                    <Button className="group gap-0 relative bg-[#E6F1FF] cursor-pointer" variant="link" onClick={() => router.push("/admin/projects")}>
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
                        <BreadcrumbPage className="font-bold">View Proposed Project</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-25">
                <p className="font-bold text-3xl mt-8 mb-6">Title of Proposed Project</p>

                <Button className="text-black bg-[#A3C4A8] h-10 cursor-pointer hover:bg-black hover:text-[#A3C4A8]" onClick={() => router.push("/admin/projects/[id]/view-budget-breakdown")}>View Budget Breakdown</Button>

                <div className="flex flex-row gap-1">
                    <div className="bg-white mt-10 w-[35%] h-155 justify-items-center place-content-center">
                        <div className="bg-black w-[80%] h-130">
                            {/* image placeholder */}
                        </div>
                        <p className="font-medium text-xl text-[#17A1FA] mt-3 justify-self-start ml-15">Project Poster</p>
                    </div>

                    <div className="bg-white mt-10 w-[80%] h-155">
                        <div className="flex flex-col h-[90%] mt-5 mx-10 content-between">
                            <div className="h-[10%]">
                                <Select>
                                    <SelectTrigger className="w-[fit%] bg-[#FF7A00] cursor-pointer">
                                        <SelectValue placeholder="Action Pending" />
                                    </SelectTrigger>
                                    <SelectContent className="">
                                        <SelectGroup>
                                            <SelectItem value="newest ordinance" className="text-blue">Under Review</SelectItem>
                                            <SelectItem value="oldest ordinance">Rejected</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="h-[80%] overflow-y-auto mb-5">
                                <Table className="bg-[#E6F1FF] w-[100%]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-center w-50">#</TableHead>
                                            <TableHead className="text-center">Receipient</TableHead>
                                            <TableHead className="text-center">Status</TableHead>
                                            <TableHead className="text-center">Comments</TableHead>
                                            <TableHead className="text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center">1</TableCell>
                                            <TableCell className="text-center">bulacoordinator@gmail.com</TableCell>
                                            <TableCell className="justify-items-center">
                                                <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Approved</p>
                                            </TableCell>
                                            <TableCell className="text-center text-[#1270B0] underline italic cursor-help">Hover to view</TableCell>
                                            <TableCell className="flex flex-row justify-center gap-2">
                                                <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center">2</TableCell>
                                            <TableCell className="text-center">bulacoordinator2@gmail.com</TableCell>
                                            <TableCell className="justify-items-center">
                                                <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Pending</p>
                                            </TableCell>
                                            <TableCell className="text-center text-[#1270B0] underline italic cursor-help">Hover to view</TableCell>
                                            <TableCell className="flex flex-row justify-center gap-2">
                                                <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center">3</TableCell>
                                            <TableCell className="text-center">bulamayor@gmail.com</TableCell>
                                            <TableCell className="justify-items-center">
                                                <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Pending</p>
                                            </TableCell>
                                            <TableCell className="text-center text-[#1270B0] underline italic cursor-help">Hover to view</TableCell>
                                            <TableCell className="flex flex-row justify-center gap-2">
                                                <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center">2</TableCell>
                                            <TableCell className="text-center">bulacoordinator2@gmail.com</TableCell>
                                            <TableCell className="justify-items-center">
                                                <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Pending</p>
                                            </TableCell>
                                            <TableCell className="text-center text-[#1270B0] underline italic cursor-help">Hover to view</TableCell>
                                            <TableCell className="flex flex-row justify-center gap-2">
                                                <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center">2</TableCell>
                                            <TableCell className="text-center">bulacoordinator2@gmail.com</TableCell>
                                            <TableCell className="justify-items-center">
                                                <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Pending</p>
                                            </TableCell>
                                            <TableCell className="text-center text-[#1270B0] underline italic cursor-help">Hover to view</TableCell>
                                            <TableCell className="flex flex-row justify-center gap-2">
                                                <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center">2</TableCell>
                                            <TableCell className="text-center">bulacoordinator2@gmail.com</TableCell>
                                            <TableCell className="justify-items-center">
                                                <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Pending</p>
                                            </TableCell>
                                            <TableCell className="text-center text-[#1270B0] underline italic cursor-help">Hover to view</TableCell>
                                            <TableCell className="flex flex-row justify-center gap-2">
                                                <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center">2</TableCell>
                                            <TableCell className="text-center">bulacoordinator2@gmail.com</TableCell>
                                            <TableCell className="justify-items-center">
                                                <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Pending</p>
                                            </TableCell>
                                            <TableCell className="text-center text-[#1270B0] underline italic cursor-help">Hover to view</TableCell>
                                            <TableCell className="flex flex-row justify-center gap-2">
                                                <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center">2</TableCell>
                                            <TableCell className="text-center">bulacoordinator2@gmail.com</TableCell>
                                            <TableCell className="justify-items-center">
                                                <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Pending</p>
                                            </TableCell>
                                            <TableCell className="text-center text-[#1270B0] underline italic cursor-help">Hover to view</TableCell>
                                            <TableCell className="flex flex-row justify-center gap-2">
                                                <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center">2</TableCell>
                                            <TableCell className="text-center">bulacoordinator2@gmail.com</TableCell>
                                            <TableCell className="justify-items-center">
                                                <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Pending</p>
                                            </TableCell>
                                            <TableCell className="text-center text-[#1270B0] underline italic cursor-help">Hover to view</TableCell>
                                            <TableCell className="flex flex-row justify-center gap-2">
                                                <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center">2</TableCell>
                                            <TableCell className="text-center">bulacoordinator2@gmail.com</TableCell>
                                            <TableCell className="justify-items-center">
                                                <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Pending</p>
                                            </TableCell>
                                            <TableCell className="text-center text-[#1270B0] underline italic cursor-help">Hover to view</TableCell>
                                            <TableCell className="flex flex-row justify-center gap-2">
                                                <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center">2</TableCell>
                                            <TableCell className="text-center">bulacoordinator2@gmail.com</TableCell>
                                            <TableCell className="justify-items-center">
                                                <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Pending</p>
                                            </TableCell>
                                            <TableCell className="text-center text-[#1270B0] underline italic cursor-help">Hover to view</TableCell>
                                            <TableCell className="flex flex-row justify-center gap-2">
                                                <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center">2</TableCell>
                                            <TableCell className="text-center">bulacoordinator2@gmail.com</TableCell>
                                            <TableCell className="justify-items-center">
                                                <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">Pending</p>
                                            </TableCell>
                                            <TableCell className="text-center text-[#1270B0] underline italic cursor-help">Hover to view</TableCell>
                                            <TableCell className="flex flex-row justify-center gap-2">
                                                <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div className="flex flex-row h-10 w-[100%] bg-[#E6F1FF] items-center justify-center gap-2  border-black border-dashed border-1 border-x-0 cursor-pointer hover:bg-gray-300">
                                    <CirclePlus size="15px" />
                                    <p>Add Recipient</p>
                                </div>
                            </div>

                            <div className="h-[10%]">
                                <div className="flex flex-row gap-2 justify-end">
                                    <Button className="bg-[#E6F1FF] text-black cursor-pointer hover:bg-black hover:text-[#E6F1FF]" onClick={() => router.push("/admin/projects/[id]/view-project-details")}>View Project Details</Button>
                                    <Button className="bg-[#A3C4A8] text-black cursor-pointer hover:bg-black hover:text-[#A3C4A8]">Mark as Approved</Button>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div >
    )
}