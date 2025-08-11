"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input';
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
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

export default function CreateAnnouncement() {
    return (
        <div className="bg-[#E6F1FF] h-screen mt-10">
            <Breadcrumb className="ml-20">
                <BreadcrumbList>
                    <Button className="group gap-0 relative bg-[#E6F1FF] cursor-pointer" variant="link">
                        <ArrowLeft color="black"/>
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </div>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical"/>
                    </div>
                    
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Announcement</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">Create Announcement</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <p className="font-bold text-3xl mt-8 mb-2 ml-30">Create Announcements</p>
            <hr className="border-t border-black w-[90%] mx-auto my-3" />

            <div className="justify-items-center mt-10">
                <div className="bg-white w-[70%] px-20 rounded-[16px] py-10">
                    <div className="flex flex-row justify-between">
                        <div className="w-100">
                            <p className="font-semibold">Announcement Header</p>
                            <Input className="bg-[#E6F1FF] placeholder:italic" placeholder="eg. The Announcement is about KILOS" />
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <p className="font-semibold">Announcement Category:</p>
                            <Select>
                                <SelectTrigger className="w-[180px] bg-[#E6F1FF] cursor-pointer">
                                    <SelectValue className="placeholder:italic" placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#E6F1FF]">
                                    <SelectGroup>
                                        <SelectLabel className="text-xs underline">Categories</SelectLabel>
                                        <SelectItem value="general">General</SelectItem>
                                        <SelectItem value="public safety">Public Safety</SelectItem>
                                        <SelectItem value="events">Events</SelectItem>
                                        <SelectItem value="project">Project</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <p className="font-semibold pt-5">Announcement Body</p>
                    <Textarea className="bg-[#E6F1FF] h-60 placeholder:italic" placeholder="eg. The Announcement is about KILOS" />

                    <p className="font-semibold pt-5">Announcement Image</p>
                    <p className="text-gray-500 italic text-xs">Attach any image if needed. The image will be posted with the announcement.</p>

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
                        <Input type="file" className="cursor-pointer hover:bg-gray-300"/>
                    </div>
                    

                    <div className="place-self-end">
                        <Button className="bg-[#A3C4A8] text-black font-bold rounded-[16px] cursor-pointer hover:bg-black hover:text-[#A3C4A8]">
                            Submit Document
                        </Button>
                    </div>
                </div>

            </div>

        </div>
    )
}
