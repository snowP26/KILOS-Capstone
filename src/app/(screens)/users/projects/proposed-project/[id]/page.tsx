"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'
import { ArrowLeft, SquarePen, Trash2, MessageSquareWarning } from 'lucide-react';
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
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { SubmitDocCard } from '@/src/app/components/user/submit-docCard';

export default function ViewProposedProject() {
    const router = useRouter();

    return (
        <div className="bg-[#E6F1FF] h-fit xl:h-screen mt-10">
            <Breadcrumb className="xl:ml-20">
                <BreadcrumbList>
                    <Button className="group gap-0 relative bg-[#E6F1FF] cursor-pointer" variant="link" onClick={() => router.back}>
                        <ArrowLeft color="black" />
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </div>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical" />
                    </div>

                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => router.push(`/users/projects/`)} className="cursor-pointer">Current Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">View Proposed Project</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-2 sm:mx-10 xl:mx-25">
                <p className="font-bold text-xl xl:text-3xl mt-8 mb-2 xl:mb-6">Iheras: Sharing the Christmas Spirit Year 4</p>

                <div className="flex flex-col xl:flex-row gap-1 place-items-center min-h-fit max-h-screen">
                    <div className="bg-white mt-10 w-[80%] h-full sm:h-150 xl:w-[35%] xl:h-155 justify-items-center place-content-center">
                        <div className="bg-black mt-10 w-[70%] h-120 sm:h-[80%] xl:w-[80%] xl:h-130">
                            {/* image placeholder */}
                        </div>
                        <div className="flex flex-row w-[80%] justify-between my-3">
                            <p className="font-medium text-xl text-[#17A1FA]">Project Poster</p>
                            <div className="flex flex-row gap-2">
                                <SquarePen className="cursor-pointer hover:bg-gray-300 rounded-[5px]" />
                                <Trash2 className="cursor-pointer hover:bg-gray-300 rounded-[5px]" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between bg-white mb-10 w-[80%] xl:w-[80%] xl:h-155 xl:mt-10 xl:mb-0">
                        <div>
                            <div className="bg-[#FFA500] mx-10 mt-5 text-white flex flex-row w-fit px-3 py-1 gap-1 rounded-md">
                                <MessageSquareWarning />
                                <p>Action Pending</p>
                            </div>
                            <hr className="border-t mt-8 border-gray-200 w-full" />

                            <div className="min-h-fit max-h-105 mb-50 xl:mb-0 overflow-y-scroll w-full">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-center">#</TableHead>
                                            <TableHead className="text-center">Recipient</TableHead>
                                            <TableHead className="text-center">Status</TableHead>
                                            <TableHead className="text-center">Comments</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <p className="text-center">1</p>
                                            </TableCell>
                                            <TableCell className="italic text-center">bulacoordinator@gmail.com</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex-col">
                                                    <p className="text-[#28A745] font-bold">Approved</p>
                                                    <p className="text-xs font-thin">on June 20, 2000</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <HoverCard>
                                                        <HoverCardTrigger asChild>
                                                            <p className="text-center text-[#1270B0] italic underline cursor-help">Hover to view</p>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent className="w-70">
                                                            <div className="space-y-2">
                                                                <p className="text-xs">
                                                                    The project proposal has been approved by Mr. Gerald Dela Cruz of the office of the coordinator.
                                                                </p>
                                                                <div className="text-muted-foreground text-xs text-end">
                                                                    December 2021
                                                                </div>
                                                            </div>
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <p className="text-center">2</p>
                                            </TableCell>
                                            <TableCell className="max-w-[150px] italic text-center">bulacoordinator2@gmail.com</TableCell>
                                            <TableCell className="text-[#FF6904] font-bold text-center">Needs Revision</TableCell>
                                            <TableCell>
                                                <div>
                                                    <HoverCard>
                                                        <HoverCardTrigger asChild>
                                                            <p className="text-center text-[#1270B0] italic underline cursor-help">Hover to view</p>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent className="w-70">
                                                            <div className="space-y-2">
                                                                <p className="text-xs">
                                                                    The project proposal has been approved by Mr. Gerald Dela Cruz of the office of the coordinator.
                                                                </p>
                                                                <div className="text-muted-foreground text-xs text-end">
                                                                    December 2021
                                                                </div>
                                                            </div>
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <p className="text-center">3</p>
                                            </TableCell>
                                            <TableCell className="max-w-[150px] italic text-center">bulamayor@gmail.com</TableCell>
                                            <TableCell className="text-[#FF6904] font-bold text-center">Pending</TableCell>
                                            <TableCell>
                                                <div>
                                                    <HoverCard>
                                                        <HoverCardTrigger asChild>
                                                            <p className="text-center text-[#1270B0] italic underline cursor-help">Hover to view</p>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent className="w-70">
                                                            <div className="space-y-2">
                                                                <p className="text-xs">
                                                                    The project proposal has been approved by Mr. Gerald Dela Cruz of the office of the coordinator.
                                                                </p>
                                                                <div className="text-muted-foreground text-xs text-end">
                                                                    December 2021
                                                                </div>
                                                            </div>
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <p className="text-center">4</p>
                                            </TableCell>
                                            <TableCell className="max-w-[150px] italic text-center">bulacoordinator@gmail.com</TableCell>
                                            <TableCell className=" text-center">
                                                <div className="flex-col">
                                                    <p className="text-[#28A745] font-bold">Approved</p>
                                                    <p className="text-xs font-thin">on June 20, 2000</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <HoverCard>
                                                        <HoverCardTrigger asChild>
                                                            <p className="text-center text-[#1270B0] italic underline cursor-help">Hover to view</p>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent className="w-70">
                                                            <div className="space-y-2">
                                                                <p className="text-xs">
                                                                    The project proposal has been approved by Mr. Gerald Dela Cruz of the office of the coordinator.
                                                                </p>
                                                                <div className="text-muted-foreground text-xs text-end">
                                                                    December 2021
                                                                </div>
                                                            </div>
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                        </div>
                        <div>
                            <div className="flex flex-row gap-2 justify-end mb-5 mx-20">
                                <Button onClick={() => router.push(`/users/projects/proposed-project/[id]/view-project-details`)} className="bg-[#E6F1FF] text-black cursor-pointer hover:bg-black hover:text-[#E6F1FF]">
                                    View Project Details
                                </Button>
                                <SubmitDocCard />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}