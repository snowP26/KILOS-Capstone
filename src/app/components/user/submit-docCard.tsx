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
import { addFiles, getFiles } from "../../actions/projects";
import { projectFiles } from "../../lib/definitions";

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

            <DialogContent>
                <DialogHeader className="w-60 place-self-center lg:max-w-full sm:w-[70%] sm:place-self-start ">
                    <DialogTitle className="text-3xl text-center mt-5">
                        Submitted Documents
                    </DialogTitle>
                    <form>
                        <div
                            className="flex h-[150px] w-auto my-3 items-center justify-center rounded-md border border-dashed border-gray-400 text-sm cursor-pointer hover:bg-gray-100 lg:h-[150px] lg:w-[300px] lg:place-self-center"
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

                    {tempFiles.map((data, i) => (
                        <div key={i} className="bg-[#E6F1FF] transition-all ease-in-out flex flex-row h-10 w-60 sm:w-full items-center rounded-md px-2 space-x-2">
                            <CircleCheck className="flex-shrink-0" fill="green" size="15" />

                            <FileText className="flex-shrink-0" size="15" />

                            {/* Filename */}
                            <p className="italic text-sm truncate flex-grow max-w-full lg:max-w-[50%]">
                                {data.name}
                            </p>

                            {/* Progress Bar */}
                            <div className="flex-grow hidden sm:block">
                                <Progress value={progress} />
                            </div>
                        </div>
                    ))
                    }

                    {files.map((data) => (
                        <div
                            key={data.id}
                            className="bg-[#E6F1FF] flex h-10 w-full lg:max-w-full items-center rounded-md pr-5"
                            onClick={() => window.open(data.publicUrl,  "_blank")}
                        >
                            <div className="flex flex-row space-x-2 w-full lg:max-w-full px-2">
                                <CircleCheck className="flex-shrink-0" fill="green" size="15" />

                                <FileText className="flex-shrink-0" size="15" />

                                {/* Filename */}
                                <div className="w-[90%]">
                                    <p className="italic text-sm truncate flex-grow w-35 sm:w-auto sm:max-w-auto lg:max-w-full">
                                        {data.filename.split('_').slice(3).join('_')}
                                    </p>
                                </div>
                            </div>
                            <CircleX className="flex-shrink-0 cursor-pointer" size="15" />
                        </div>
                    ))

                    }
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
