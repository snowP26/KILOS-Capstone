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
                        <BreadcrumbLink href="/users/projects">Current Projects</BreadcrumbLink>
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

                    <div className=" bg-white mb-10 w-[80%] xl:w-[80%] xl:h-155 xl:mt-10 xl:mb-0">
                        <div className="flex flex-col justify-between bg-[#E6F1FF] w-fit h-[50%] mx-4 my-4 xl:h-[80%] xl:mx-5 xl:mt-8 pt-2 xl:pt-5 xl:px-10">
                            <p className="font-semibold text-xl text-center xl:text-2xl xl:text-start">Project Description:</p>
                            <div className="mt-2 xl:h-[90%] xl:w-[100%]">
                                <p className="w-full h-100 xl:h-full overflow-y-auto pl-4 pr-6 xl:px-10">
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                                    <br /><br />
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                                    <br /><br />
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                                    <br /><br />
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                                </p>
                            </div>
                            <div>
                                <div className="flex flex-row gap-2 justify-end my-10 mx-5">
                                    <Button onClick={() => router.push(`/users/projects/proposed-project/[id]`)} className="bg-[#E6F1FF] text-black cursor-pointer hover:bg-black hover:text-[#E6F1FF]">
                                        View Project Status
                                    </Button>
                                    <SubmitDocCard />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}