"use client";

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'
import { Separator } from "@/components/ui/separator"
import { Input } from '@/components/ui/input';
import { ArrowLeft, ImagePlus, X } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function SubmitOrdinances() {
    const formRef = useRef<HTMLFormElement>(null) as React.RefObject<HTMLFormElement>;
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // clear input
        }
    };

    return (
        <div className="bg-[#E6F1FF] min-h-screen max-h-screen mt-10">
            <Breadcrumb className="ml-5 lg:ml-20">
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
                        <BreadcrumbLink href="/admin/ordinances">Proposed Ordinances</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">Submit an Ordinance</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>


            <p className="font-bold text-2xl mt-8 mb-2 ml-5 lg:text-3xl lg:ml-30">Submit an Ordinance</p>
            <hr className="border-t border-black w-[90%] mx-auto my-3" />

            <div className="justify-items-center mt-10">
                <div className="bg-white w-[90%] lg:w-[70%] px-5 lg:px-20 rounded-[16px] py-10 shadow-lg/30">

                    <form className="w-full">
                        <p className="font-semibold">Ordinance Title</p>
                        <Input className="bg-[#E6F1FF] placeholder:italic" placeholder="eg. An ordinance..." />
                    </form>

                    <form className="w-full lg:w-[70%] mt-5">
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

                    {!selectedFile && (
                        <div
                            className="flex h-[150px] lg:w-[600px] mt-3 items-center justify-center rounded-md border border-dashed border-gray-400 text-sm cursor-pointer hover:bg-gray-100"
                            onClick={handleClick}
                        >
                            <div className="flex flex-row gap-2">
                                <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                                    <ImagePlus />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-row gap-1">
                                        <p className="font-semibold">Drop your Document or</p>
                                        <p className="text-[#3B4EFF] font-semibold underline">Browse</p>
                                    </div>
                                    <p className="text-gray-500 text-xs">PDF only</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hidden file input */}
                    <Input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        name="image"
                        onChange={handleFileChange}
                    />

                    {/* Preview area */}
                    {selectedFile && (
                        <div className="mt-4 flex items-center gap-4">
                            <img
                                src={previewUrl || ""}
                                alt="Preview"
                                className="h-24 w-24 object-cover rounded-md border"
                            />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">{selectedFile.name}</p>
                                <p className="text-xs text-gray-500">
                                    {(selectedFile.size / 1024).toFixed(1)} KB
                                </p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-1 text-red-600 hover:text-red-800"
                                    onClick={handleRemoveFile}
                                >
                                    <X className="w-4 h-4 mr-1" /> Remove
                                </Button>
                            </div>
                        </div>
                    )}


                    <div className="mt-15 place-self-center lg:mt-0 lg:place-self-end">
                        <Button className="bg-[#A3C4A8] text-black hover:font-bold rounded-[16px] cursor-pointer hover:bg-black hover:text-[#A3C4A8] transition-all">
                            Submit Ordinance/Resolution
                        </Button>
                    </div>
                </div>

            </div>

        </div>
    )
}