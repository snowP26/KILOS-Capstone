"use client";

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { project } from '@/src/app/lib/definitions';
import { getProjectByTitle } from '@/src/app/actions/projects';

export default function ViewProjectBudget() {
    const router = useRouter();
    const params = useParams();
    const projectID = Array.isArray(params.id)
        ? params.id[0]
        : params.id;

    const [project, setProject] = useState<project | null>(null)

    useEffect(() => {
        const setData = async () => {
            if (projectID) {
                const data = await getProjectByTitle(projectID)
                setProject(data)
            }
        }

        setData()
    }, [])

    return (
        <div className="bg-[#E6F1FF] min-h-screen max-h-full mt-10">
            <Breadcrumb className="ml-5 xl:ml-20">
                <BreadcrumbList>
                    <Button className="group gap-0 relative bg-[#E6F1FF] cursor-pointer" variant="link" onClick={() => router.back()}>
                        <ArrowLeft color="black" />
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </div>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical" />
                    </div>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users/projects">Current Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/users/projects/${projectID}`}>View Project</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">View Project Budget</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-2 sm:mx-10 xl:mx-25">
                <p className="font-bold text-xl xl:text-3xl mt-8 mb-2 xl:mb-6">{project?.title}</p>

                <div className="flex flex-col md:flex-row gap-5 h-10 justify-between">
                    <Button className="text-black bg-[#A3C4A8] h-10 cursor-pointer hover:bg-black hover:text-[#A3C4A8]" onClick={() => router.push(`/users/projects/${projectID}`)}>View Project Details</Button>
                    <div className="flex flex-row gap-2">
                        <p className="text-black font-medium text-sm md:text-base content-center">Set Budget for Project:</p>
                        <p className="text-[#28A745] text-base md:text-xl font-medium content-center">&#8369;999,999,999.00</p>
                    </div>

                </div>

                <div className="mt-20 xl:mt-10">
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
                                <TableCell className="flex justify-center">
                                    <p className="-center text-center font-medium min-w-30 max-w-full px-5 bg-[#052659] rounded-2xl text-white">For Approval</p>
                                </TableCell>
                                <TableCell className="max-w-[150px] text-center">Product Name 1</TableCell>
                                <TableCell className="text-center">Php 123,456,789</TableCell>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell className="flex justify-center">
                                    <Dialog>
                                        <DialogTrigger>
                                            <Image className="cursor-pointer hover:bg-gray-300"/>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl text-center">Item 1 Receipt Photo</DialogTitle>
                                                <DialogDescription >
                                                    <hr className="border-t border-black w-full my-3" />
                                                    <div className="bg-black aspect-3/4 object-cover">

                                                    </div>
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300" /></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell className="flex justify-center">
                                    <p className="text-center font-medium min-w-30 max-w-full px-5 bg-[#052659] rounded-2xl text-white">Approved</p>
                                </TableCell>
                                <TableCell className="max-w-[150px] text-center">Product Name 2</TableCell>
                                <TableCell className="text-center">Php 123,456,789</TableCell>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300" /></TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300" /></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell className="flex justify-center">
                                    <p className="text-center font-medium min-w-30 max-w-full px-5 bg-[#052659] rounded-2xl text-white">Rejected</p>
                                </TableCell>
                                <TableCell className="max-w-[150px] text-center">Product Name 3</TableCell>
                                <TableCell className="text-center">Php 123,456,789</TableCell>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300" /></TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300" /></TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            <TableRow>
                                <TableCell className="flex justify-center">
                                    <p className="text-center font-medium min-w-30 max-w-full px-5 bg-[#052659] rounded-2xl text-white">Resubmit</p>
                                </TableCell>
                                <TableCell className="max-w-[150px] text-center">Product Name 4</TableCell>
                                <TableCell className="text-center">Php 123,456,789</TableCell>
                                <TableCell className="text-center">1</TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300" /></TableCell>
                                <TableCell className="justify-items-center"><Image className="cursor-pointer hover:bg-gray-300" /></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>


        </div>
    )
}