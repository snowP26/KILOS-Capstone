"use client";

import { Progress } from "@/components/ui/progress";
import { ImagePlus, CircleX, CircleCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const SubmitDocCard = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#E6F1FF] w-fit font-semibold text-sm py-2.5 px-4 rounded-md text-black cursor-pointer hover:bg-black hover:text-[#E6F1FF]">
                    Submit a Document
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-3xl text-center mt-5">Submitted Documents</DialogTitle>
                    <div
                        className="flex h-[150px] w-auto my-3 items-center justify-center rounded-md border border-dashed border-gray-400 text-sm cursor-pointer hover:bg-gray-100 lg:h-[150px] lg:w-[300px] lg:place-self-center"
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
                                <p className="text-gray-500 text-xs">.PDF only</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#E6F1FF] flex flex-row h-10 w-60 sm:w-full items-center rounded-md px-2 space-x-2">
                        <CircleCheck className="flex-shrink-0" fill="green" size="15" />

                        <FileText className="flex-shrink-0" size="15" />

                        {/* Filename */}
                        <p className="italic text-sm truncate flex-grow max-w-full lg:max-w-[50%]">
                            ProjectTitle_ProjectProposal.pdf
                        </p>

                        {/* Progress Bar */}
                        <div className="flex-grow hidden sm:block">
                            <Progress value={33} />
                        </div>

                        <CircleX className="flex-shrink-0 cursor-pointer" size="15" />
                    </div>

                    <div className="bg-[#E6F1FF] flex flex-row h-10 w-60 sm:w-full items-center rounded-md px-2 space-x-2">
                        <CircleCheck className="flex-shrink-0" fill="green" size="15" />

                        <FileText className="flex-shrink-0" size="15" />

                        {/* Filename */}
                        <p className="italic text-sm truncate flex-grow max-w-full lg:max-w-[50%]">
                            ProjectTitle_ProjectProposal.pdf
                        </p>

                        {/* Progress Bar */}
                        <div className="flex-grow hidden sm:block">
                            <Progress value={33} />
                        </div>

                        <CircleX className="flex-shrink-0 cursor-pointer" size="15" />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}