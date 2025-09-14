"use client";

import React, { RefObject, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";
import { postOrdinance } from "@/src/app/actions/ordinances";

export default function SubmitDoc() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null) as RefObject<HTMLFormElement>;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
            if (file) alert("Only PDF files are allowed.");
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="bg-[#E6F1FF] min-h-screen max-h-fit mt-10">
            <Breadcrumb className="ml-20">
                <BreadcrumbList>
                    <Button
                        className="group gap-0 relative bg-[#E6F1FF] cursor-pointer"
                        variant="link"
                    >
                        <ArrowLeft color="black" />
                        <div
                            className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100"
                            onClick={() => router.back()}
                        >
                            Return
                        </div>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical" />
                    </div>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users/ordinances/">
                            Ordinance & Resolutions
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">
                            Submit an Ordinance
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <p className="font-bold text-3xl mt-8 mb-2 ml-30">Submit an Ordinance</p>
            <hr className="border-t border-black w-[90%] mx-auto my-3" />

            <div className="justify-items-center mt-10">
                <form
                    className="bg-white w-[70%] px-20 rounded-[16px] py-10 shadow-lg/30"
                    ref={formRef}
                    onSubmit={(e) => {
                        postOrdinance(e, formRef);
                        router.push("/users/ordinances");
                    }}
                >
                    <div className="w-[70%]">
                        <p className="font-semibold">Ordinance Title</p>
                        <Input
                            className="bg-[#E6F1FF] placeholder:italic"
                            placeholder="eg. An ordinance..."
                            name="description"
                        />
                    </div>

                    <div className="max-w-100 mt-5">
                        <p className="font-semibold">Ordinance Year and Number</p>
                        <div className="flex flex-row space-x-2">
                            <Input
                                className="bg-[#E6F1FF] placeholder:italic w-[30%]"
                                placeholder="eg. 2000"
                                name="title-year"
                                maxLength={4}
                            />
                            <strong>-</strong>
                            <Input
                                className="bg-[#E6F1FF] placeholder:italic w-[25%]"
                                placeholder="eg. 001"
                                name="title-number"
                                maxLength={4}
                            />
                        </div>
                    </div>

                    <p className="font-semibold pt-5">Ordinance Document</p>
                    <p className="text-gray-500 italic text-xs">
                        Please submit the PDF of the ordinance.
                    </p>

                    {/* Drop Zone (hidden when file is selected) */}
                    {!selectedFile && (
                        <div
                            className="flex h-[150px] w-[600px] mt-3 items-center justify-center rounded-md border border-dashed border-gray-400 text-sm cursor-pointer hover:bg-gray-100"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="flex flex-row gap-2">
                                <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                                    <FileText />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-row gap-1">
                                        <p className="font-semibold">
                                            Drop your Ordinance Document or{" "}
                                        </p>
                                        <p className="text-[#3B4EFF] font-semibold underline">
                                            Browse
                                        </p>
                                    </div>
                                    <p className="text-gray-500 text-xs">.PDF only</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hidden file input */}
                    <Input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        name="document"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />

                    {/* Preview (only when file is selected) */}
                    {selectedFile && (
                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <FileText className="w-8 h-8 text-gray-600" />
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium">{selectedFile.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {(selectedFile.size / 1024).toFixed(1)} KB
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-800"
                                onClick={handleRemoveFile}
                            >
                                <X className="w-4 h-4 mr-1" /> Remove
                            </Button>
                        </div>
                    )}

                    <div className="place-self-end mt-5">
                        <Button className="bg-[#A3C4A8] text-black hover:font-bold rounded-[16px] cursor-pointer hover:bg-accent hover:text-accent-foreground hover:border-[#a3c4a8] hover:border-1 transition-all">
                            Submit Ordinance/Resolution
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
