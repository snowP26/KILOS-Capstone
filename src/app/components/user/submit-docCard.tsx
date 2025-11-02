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
import { useEffect, useState } from "react";
import { addFiles, deleteFile, getFiles } from "../../actions/projects";
import { projectFiles } from "../../lib/definitions";

import { ScrollArea } from "@/components/ui/scroll-area";

import Swal from "sweetalert2";


export const SubmitDocCard = ({ projectID }: { projectID?: number }) => {
    const [tempFiles, setTempFiles] = useState<File[]>([]);
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState<projectFiles[]>([]);
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFiles(projectID ? projectID : 0);
            setFiles(data)
        }

        setTempFiles([])
        fetchData()
    }, [projectID, refresh])

    if (!projectID) {
        return (
            <Button disabled className="bg-gray-300 text-gray-600 cursor-not-allowed">
                No project selected
            </Button>
        );
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-[#E6F1FF] w-fit font-semibold text-sm py-2.5 px-4 rounded-md text-black cursor-pointer hover:bg-black hover:text-[#E6F1FF]">
                    Submit a Document
                </Button>
            </DialogTrigger>

            <DialogContent className="w-110 sm:w-150">
                <DialogHeader className="place-self-start">
                    <DialogTitle className="text-3xl text-center mt-5">
                        Submitted Documents
                    </DialogTitle>
                </DialogHeader>
                <div className="min-w-60 w-auto sm:w-[65%] lg:w-[32%]">
                    <form>
                        <div
                            className="flex h-[150px] w-auto my-3 items-center justify-center rounded-md border border-dashed border-gray-400 text-sm cursor-pointer hover:bg-gray-100 sm:w-[450px] lg:h-[150px]"
                            onClick={() => document.getElementById("pdfUpload")?.click()}
                        >
                            <input
                                type="file"
                                id="pdfUpload"
                                accept="application/pdf"
                                multiple
                                className="hidden"
                                onChange={async (e) => {
                                    if (e.target.files) {
                                        const newFiles = Array.from(e.target.files);
                                        setTempFiles((prev) => [...prev, ...newFiles])
                                        setProgress(0)
                                        await addFiles(newFiles, projectID, (i) => setProgress(i))
                                        setRefresh((prev) => prev + 1)
                                    }
                                }}
                            />

                            <div className="flex flex-row gap-2">
                                <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                                    <ImagePlus />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-row gap-1">
                                        <p className="font-semibold">Drop your Document</p>
                                        <p className="text-[#3B4EFF] font-semibold underline">
                                            Browse
                                        </p>
                                    </div>
                                    <p className="text-gray-500 text-xs">.PDF only</p>
                                </div>
                            </div>
                        </div>
                    </form>

                    <ScrollArea className=" flex  justify-self-center sm:justify-self-start h-50 w-70 sm:w-120 px-5 sm:px-0">
                        {tempFiles.map((data, i) => (
                            <div key={i} className="bg-[#E6F1FF] transition-all ease-in-out flex h-10 w-60 max-w-auto sm:w-115 items-center justify-between rounded-md my-1">
                                <div className="flex flex-row pl-1 justify-between sm:justify-start sm:space-x-2 sm:px-5 w-full lg:space-x-2 lg:max-w-full">
                                    <CircleCheck className="flex-shrink-0" fill="green" size="15" />

                                    <FileText className="flex-shrink-0" size="15" />

                                    {/* Filename */}
                                    <div className="w-full sm:w-[50%] lg:w-[60%]">
                                        <p className="italic text-sm truncate flex-grow w-50 sm:w-full">
                                            {data.name}
                                        </p>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="flex-grow self-center hidden sm:block">
                                        <Progress value={10} />
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="flex-grow hidden sm:block">
                                    <Progress
                                        value={progress}
                                        className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden [&>div]:bg-gradient-to-r [&>div]:from-blue-400 [&>div]:to-blue-600 transition-all duration-300"
                                    />
                                </div>
                            </div>
                        ))}

                        {files.map((data) => (
                            <div
                                key={data.id}
                                className="relative group sm:max-w-[96%] cursor-pointer"
                            >
                                <div
                                    onClick={() => window.open(data.publicUrl, "_blank")}
                                    className="z-10 absolute inset-0 w-full rounded-md bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                >
                                    <FileText className="w-5 h-5 text-white drop-shadow-md" />
                                </div>
                                <div
                                    className=" bg-[#E6F1FF] flex h-10 w-full sm:w-115 items-center justify-between rounded-md pr-5 my-1"
                                >
                                    <div className="flex flex-row pl-1 justify-between w-full sm:justify-start sm:space-x-5 sm:px-5 sm:max-w-[95%] lg:max-w-[70%]">
                                        <CircleCheck className="flex-shrink-0" fill="green" size="15" />
                                        <FileText className="flex-shrink-0" size="15" />
                                        <div className="relative group sm:max-w-[95%] sm:px-1 lg:px-2 cursor-pointer">
                                            {/* Filename */}
                                            <div className="w-[90%] sm:w-[70%] lg:w-full">
                                                <p className="italic text-sm truncate flex-grow w-40 sm:w-full sm:max-w-150 lg:max-w-[90%]">
                                                    {data.filename.split('_').slice(3).join('_')}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                    <CircleX
                                        className="z-50 flex-shrink-0 cursor-pointer text-gray-600 hover:text-red-500 transition-colors duration-200"
                                        size="15"
                                        onClick={async (e) => {
                                            e.stopPropagation();

                                            const result = await Swal.fire({
                                                title: "Delete this file?",
                                                text: "This action cannot be undone.",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#d33",
                                                cancelButtonColor: "#3085d6",
                                                confirmButtonText: "Yes, delete it",
                                                cancelButtonText: "Cancel",
                                                reverseButtons: true,
                                            });

                                            if (result.isConfirmed) {
                                                await deleteFile(data.id)
                                                console.log("delete")
                                                setRefresh((prev) => prev + 1)

                                                await Swal.fire({
                                                    title: "Delete Successful!",
                                                    text: "Your file has been deleted.",
                                                    icon: "success",
                                                    timer: 750,
                                                })
                                            }
                                        }}
                                    />

                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
};
