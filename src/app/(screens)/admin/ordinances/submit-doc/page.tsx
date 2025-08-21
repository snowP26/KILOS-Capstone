"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function SubmitOrdinances() {
    const router = useRouter();

    return (
        <div className="bg-[#E6F1FF] h-screen mt-10">
            <Breadcrumb className="ml-20">
                <BreadcrumbList>
                    <Button className="group gap-0 relative bg-[#E6F1FF] cursor-pointer" variant="link" onClick={() => router.push("/admin/ordinances")}>
                        <ArrowLeft color="black" />
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </div>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical" />
                    </div>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/ordinances">Proposed Ordinances</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">Submit an Ordinance</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>


                <p className="font-bold text-3xl mt-8 mb-2 ml-30">Submit an Ordinance</p>
                <hr className="border-t border-black w-[90%] mx-auto my-3" />

                <div className="justify-items-center mt-10">
                    <div className="bg-white w-[70%] px-20 rounded-[16px] py-10 shadow-lg/30">

                        <form className="w-[70%]">
                            <p className="font-semibold">Ordinance Title</p>
                            <Input className="bg-[#E6F1FF] placeholder:italic" placeholder="eg. An ordinance..." />
                        </form>

                        <form className="w-100 mt-5">
                            <p className="font-semibold">Ordinance Year and Ordinance Number</p>
                            <Input className="bg-[#E6F1FF] placeholder:italic" placeholder="eg. 2000 - 001" />
                        </form>

                        <p className="font-semibold pt-5">Ordinance Document</p>
                        <p className="text-gray-500 italic text-xs">Please submit the PDF of the ordinance.</p>

                        {/* <div className="flex h-[150px] w-[600px] mt-3 items-center justify-center rounded-md border border-dashed border-gray-400 text-sm">
                            <div className="flex flex-row gap-2">
                                <div className="bg-gray-300 rounded-full w-10 h-10 content-center">
                                    <ImagePlus className="place-self-center"/>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-row gap-1">
                                        <p className="font-semibold">Drop your Image or</p>
                                        <p className="text-[#3B4EFF] font-semibold underline"></p>
                                    </div>
                                    <p className="text-gray-500 text-xs">JPEG or .PNG only</p>
                                </div>
                            </div>
                    </div> */}

                        <form className="w-55 mt-2">
                            <Input type="file" className="cursor-pointer hover:bg-gray-300" />
                        </form>


                        <div className="place-self-end">
                            <Button className="bg-[#A3C4A8] text-black hover:font-bold rounded-[16px] cursor-pointer hover:bg-accent hover:text-accent-foreground hover:border-[#a3c4a8] hover:border-1 transition-all">
                                Submit Ordinance/Resolution
                            </Button>
                        </div>
                    </div>

                </div>

            </div>
    )
}