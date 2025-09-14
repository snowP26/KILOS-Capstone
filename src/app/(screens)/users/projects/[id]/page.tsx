"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ViewProject() {
    const router = useRouter();

    return (
        <div className="min-h-screen max-h-full mt-10">
            <Breadcrumb className="xl:ml-20">
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
                        <BreadcrumbPage className="font-bold">View Project</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-2 sm:mx-10 xl:mx-25">
                <p className="font-bold text-xl xl:text-3xl mt-8 mb-2 xl:mb-6">Iheras: Sharing the Christmas Spirit Year 4</p>

                <div className="flex flex-col-reverse gap-3 sm:gap-5 sm:h-10 sm:flex-row">
                    <Button className="text-black bg-[#A3C4A8] w-full h-8 sm:w-fit sm:h-10 cursor-pointer hover:bg-black hover:text-[#A3C4A8]" onClick={() => router.push("/users/projects/[id]/view-project-budget")}>View Budget Breakdown</Button>
                    <p className="text-black bg-white rounded-2xl px-5 font-medium content-center w-fit h-8 sm:h-10">January 1, 2000</p>
                </div>

                <div className="flex flex-col h-full lg:flex-row gap-1 place-items-center min-h-fit max-h-screen">
                    {/* Project poster */}
                    <div className="bg-white mt-10 w-[80%] content-center h-full sm:h-full lg:w-[35%] lg:h-155">
                        <div className="bg-black mt-5 mx-5 aspect-1/2 object-cover xl:aspect-3/5 2xl:aspect-6/7">
                            {/* image placeholder */}
                        </div>
                        <div className="flex flex-row place-self-center items-center w-[80%] justify-between my-3">
                            <p className="font-medium text-xl text-[#17A1FA]">Project Poster</p>
                            <div className="flex flex-row gap-2">
                                <SquarePen className="cursor-pointer hover:bg-gray-300 rounded-[5px]" />
                                <Trash2 className="cursor-pointer hover:bg-gray-300 rounded-[5px]" />
                            </div>
                        </div>
                    </div>
                    {/* Project description */}
                    <div className="bg-white mb-10 w-[80%] lg:w-[80%] lg:h-155 lg:mt-10 lg:mb-0">
                        <div className="bg-[#E6F1FF] m-5 p-5">
                            <p className="text-xl font-semibold">
                                Project Description:
                            </p>
                            <ScrollArea className="mt-5 md:px-3 xl:px-5">
                                <div className="min-h-50 max-h-150 lg:max-h-120">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit congue semper. Nam tempor sem sit amet nulla convallis ullamcorper. Nulla et risus. Cras viverra metus rhoncus sem. Mauris fermentum dictum magna. In ut quam vitae odio lacinia tincidunt. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit congue semper. Nam tempor sem sit amet nulla convallis ullamcorper. Nulla et risus. Cras viverra metus rhoncus sem. Mauris fermentum dictum magna. In ut quam vitae odio lacinia tincidunt. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit congue semper. Nam tempor sem sit amet nulla convallis ullamcorper. Nulla et risus. Cras viverra metus rhoncus sem. Mauris fermentum dictum magna. In ut quam vitae odio lacinia tincidunt. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit congue semper. Nam tempor sem sit amet nulla convallis ullamcorper. Nulla et risus. Cras viverra metus rhoncus sem. Mauris fermentum dictum magna. In ut quam vitae odio lacinia tincidunt. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit congue semper. Nam tempor sem sit amet nulla convallis ullamcorper. Nulla et risus. Cras viverra metus rhoncus sem. Mauris fermentum dictum magna. In ut quam vitae odio lacinia tincidunt. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit congue semper. Nam tempor sem sit amet nulla convallis ullamcorper. Nulla et risus. Cras viverra metus rhoncus sem. Mauris fermentum dictum magna. In ut quam vitae odio lacinia tincidunt. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit congue semper. Nam tempor sem sit amet nulla convallis ullamcorper. Nulla et risus. Cras viverra metus rhoncus sem. Mauris fermentum dictum magna. In ut quam vitae odio lacinia tincidunt. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit congue semper. Nam tempor sem sit amet nulla convallis ullamcorper. Nulla et risus. Cras viverra metus rhoncus sem. Mauris fermentum dictum magna. In ut quam vitae odio lacinia tincidunt. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit congue semper. Nam tempor sem sit amet nulla convallis ullamcorper. Nulla et risus. Cras viverra metus rhoncus sem. Mauris fermentum dictum magna. In ut quam vitae odio lacinia tincidunt. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit congue semper. Nam tempor sem sit amet nulla convallis ullamcorper. Nulla et risus. Cras viverra metus rhoncus sem. Mauris fermentum dictum magna. In ut quam vitae odio lacinia tincidunt. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit congue semper. Nam tempor sem sit amet nulla convallis ullamcorper. Nulla et risus. Cras viverra metus rhoncus sem. Mauris fermentum dictum magna. In ut quam vitae odio lacinia tincidunt. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit congue semper. Nam tempor sem sit amet nulla convallis ullamcorper. Nulla et risus. Cras viverra metus rhoncus sem. Mauris fermentum dictum magna. In ut quam vitae odio lacinia tincidunt. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.

                                </p>
                            </div>
                            </ScrollArea>
                            

                        </div>


                        {/* <div className="bg-[#E6F1FF] w-[90%] h-[50%] ml-3 my-4 xl:h-[90%] xl:mx-5 xl:mt-8 pt-2 xl:pt-5 xl:px-10">
                            <p className="font-semibold text-xl text-center xl:text-2xl xl:text-start">Project Description:</p>
                            <div className="mt-2 xl:h-[90%] xl:w-[100%]">
                                <p className="w-full h-100 xl:h-full overflow-y-auto pl-4 pr-6 xl:px-10">
                                    Lorem 
                                </p>
                            </div>
                            
                        </div> */}
                    </div>
                </div>

            </div>

        </div>
    )
}