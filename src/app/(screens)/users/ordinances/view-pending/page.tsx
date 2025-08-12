"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function ViewPending() {
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
                        <BreadcrumbLink href="/components">Ordinances & Resolutions</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">Pending Ordinances & Resolutions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <p className="font-bold text-3xl mt-8 mb-2 ml-30">Pending Ordinances & Resolutions</p>
            <hr className="border-t border-black w-[90%] mx-auto mt-3 mb-10" />

            <div className="bg-white rounded-[8px] border-black border drop-shadow-lg p-5 mx-30 mb-3">
                <p className="font-semibold text-2xl">Ordinance 2021-022</p>
                <p className="w-350 truncate text-sm">
                    An Ordinance Institutionalizing the Bula Youth Leadership Summit and Declaring It as an 
                    Annual Municipal Activity. An Ordinance Institutionalizing the Bula Youth Leadership Summit 
                    and Declaring It as an Annual Municipal Activity.
                </p>
            </div>
            <div className="bg-white rounded-[8px] border-black border drop-shadow-lg p-5 mx-30 mb-3">
                <p className="font-semibold text-2xl">Ordinance 2021-022</p>
                <p className="w-350 truncate text-sm">
                    An Ordinance Institutionalizing the Bula Youth Leadership Summit and Declaring It as an 
                    Annual Municipal Activity. An Ordinance Institutionalizing the Bula Youth Leadership Summit 
                    and Declaring It as an Annual Municipal Activity.
                </p>
            </div>
            <div className="bg-white rounded-[8px] border-black border drop-shadow-lg p-5 mx-30 mb-3">
                <p className="font-semibold text-2xl">Ordinance 2021-022</p>
                <p className="w-350 truncate text-sm">
                    An Ordinance Institutionalizing the Bula Youth Leadership Summit and Declaring It as an 
                    Annual Municipal Activity. An Ordinance Institutionalizing the Bula Youth Leadership Summit 
                    and Declaring It as an Annual Municipal Activity.
                </p>
            </div>

        </div>
    )
}