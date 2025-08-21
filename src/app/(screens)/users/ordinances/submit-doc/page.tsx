"use client";

import React, { RefObject, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input';
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useRouter } from 'next/navigation';
import { postOrdinance } from '@/src/app/actions/ordinances';

export default function SubmitDoc() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null) as RefObject<HTMLFormElement>

    return (
        <div className="bg-[#E6F1FF] h-screen mt-10">
            <Breadcrumb className="ml-20">
                <BreadcrumbList>
                    <Button className="group gap-0 relative bg-[#E6F1FF] cursor-pointer" variant="link">
                        <ArrowLeft color="black"/>
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100" onClick={() => router.back()}> 
                            Return
                        </div>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical"/>
                    </div>
                    
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users/ordinances/">Ordinance & Resolutions</BreadcrumbLink>
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
                <form className="bg-white w-[70%] px-20 rounded-[16px] py-10" ref={formRef} onSubmit={(e) => postOrdinance(e, formRef)}>

                    <div className="w-[70%]">
                        <p className="font-semibold">Ordinance Title</p>
                        <Input className="bg-[#E6F1FF] placeholder:italic" placeholder="eg. An ordinance..." name="description"/>
                    </div>

                    <div className="max-w-100 mt-5">
                        <p className="font-semibold">Ordinance Year and Number</p>
                        <div className='flex flex-row space-x-2'>
                            <Input className="bg-[#E6F1FF] placeholder:italic w-[30%]" placeholder="eg. 2000" name="title-year" maxLength={4}/>
                            <strong>-</strong>
                            <Input className="bg-[#E6F1FF] placeholder:italic w-[25%]" placeholder="eg. 001" name="title-number" maxLength={4}/>
                        </div>
                    </div>

                    <p className="font-semibold pt-5">Ordinance Document</p>
                    <p className="text-gray-500 italic text-xs" >Please submit the PDF of the ordinance.</p>

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

                    <div className="w-55 mt-2">
                        <Input type="file" className="cursor-pointer hover:bg-gray-300" name="document"/>
                    </div>
                    

                    <div className="place-self-end">
                        <Button className="bg-[#A3C4A8] text-black hover:font-bold rounded-[16px] cursor-pointer hover:bg-accent hover:text-accent-foreground hover:border-[#a3c4a8] hover:border-1 transition-all">
                            Submit Ordinance/Resolution
                        </Button>
                    </div>
                </form>

            </div>

        </div>
    )
}