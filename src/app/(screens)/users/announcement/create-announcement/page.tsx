"use client";

import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ImagePlus, X } from 'lucide-react'
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
} from "@/components/ui/select"
import { postAnnouncements } from '@/src/app/actions/announcements';
import { useRouter } from 'next/navigation';

export default function CreateAnnouncement() {
    const announcementTypes = [
        "general",
        "policy",
        "public_service",
        "administrative",
        "electoral",
        "event",
        "emergency",
        "financial",
        "employment",
        "infrastructure",
        "press_release"
    ];
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
        <div className="bg-[#E6F1FF] min-h-screen max-h-fit mt-10">
            <Breadcrumb className="ml-20">
                <BreadcrumbList>
                    <Button className="group gap-0 relative bg-[#E6F1FF] cursor-pointer" variant="link" onClick={() => router.push("/users/announcement")}>
                        <ArrowLeft color="black" />
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </div>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical" />
                    </div>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users/announcement">Announcement</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">Create Announcement</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <p className="font-bold text-3xl mt-8 mb-2 ml-30">Create Announcements</p>
            <hr className="border-t border-black w-[90%] mx-auto my-3" />

            <form className="justify-items-center mt-10" ref={formRef} onSubmit={async (e) => {
                await postAnnouncements(e, formRef);
                router.push("/users/announcement");
            }}>
                <div className="bg-white w-[70%] px-20 rounded-[16px] py-10 shadow-lg/30">
                    <div className="flex flex-row justify-between">
                        <div className="w-100">
                            <p className="font-semibold">Header</p>
                            <Input 
                                className="bg-[#E6F1FF] placeholder:italic" 
                                placeholder="eg. The Announcement is about KILOS"
                                name="title"
                            />
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <p className="font-semibold">Category:</p>
                            <Select name="type" required>
                                <SelectTrigger className="w-[180px] bg-[#E6F1FF] cursor-pointer">
                                    <SelectValue className="placeholder:italic" placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#E6F1FF]">
                                    <SelectGroup>
                                        {announcementTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type
                                                    .replace(/_/g, " ")
                                                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <p className="font-semibold pt-5">Body</p>
                    <Textarea 
                        className="bg-[#E6F1FF] h-60 placeholder:italic" 
                        placeholder="eg. The Announcement is about KILOS" 
                        name="body"
                    />

                    <p className="font-semibold pt-5">Image</p>
                    <p className="text-gray-500 italic text-xs">Attach any image if needed. The image will be posted with the announcement.</p>
                    
                    {!selectedFile && (
                    <div
                        className="flex h-[150px] w-[600px] mt-3 items-center justify-center rounded-md border border-dashed border-gray-400 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={handleClick}
                    >
                        <div className="flex flex-row gap-2">
                            <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                                <ImagePlus />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-1">
                                    <p className="font-semibold">Drop your Image or</p>
                                    <p className="text-[#3B4EFF] font-semibold underline">Browse</p>
                                </div>
                                <p className="text-gray-500 text-xs">JPEG or .PNG only</p>
                            </div>
                        </div>
                    </div>
                    )}

                    {/* Hidden file input */}
                    <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png"
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

                    <div className="place-self-end mt-6">
                        <Button className="bg-[#A3C4A8] text-black font-bold rounded-[16px] cursor-pointer hover:bg-black hover:text-[#A3C4A8]">
                            Submit Announcement
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
