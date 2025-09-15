"use client";

import React, { useEffect, useState } from "react";
import { ProjectCard } from "@/src/app/components/user/project-card";
import { Button } from "@/components/ui/button";
import { ProposedProjCard } from "@/src/app/components/user/proposed-projCard";
import { useRouter } from "next/navigation";
import { project } from "@/src/app/lib/definitions";
import { getProjects, getProposedProjects, postProject } from "@/src/app/actions/projects";
import { useUserRole } from "@/src/app/actions/role";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription, // ✅ added
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";


export default function Practice() {
    const router = useRouter();
    const [projects, setProjects] = useState<project[] | null>(null);
    const [proposedProjects, setProposedProjects] = useState<project[] | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { role, loading } = useUserRole();
    const normalizedRole = role?.trim().toLowerCase();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProjects();
            const proposed = await getProposedProjects();
            setProjects(data ?? null);
            setProposedProjects(proposed ?? null)
        };

        if (!isDialogOpen) {
            fetchData();
        }
    }, [isDialogOpen]);

    if (loading) {
        return <p className="p-5">Loading...</p>;
    }

    let content;

    if (normalizedRole === "legislative" || normalizedRole === "treasurer") {
        content = (
            <div className="bg-[#E6F1FF] min-h-screen max-h-full">
                <p className="font-bold text-3xl m-10">Current Projects</p>
                <div className="flex flex-wrap justify-center gap-5">
                    {projects?.map((data) => (
                        <div
                            onClick={() => router.push(`/users/projects/${data.title}`)}
                            key={data.id}
                        >
                            <ProjectCard
                                title={data.title}
                                status={data.status}
                                date={data.target_date}
                                imgURL={data.imageURL}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (normalizedRole === "executive") {
        content = (
            <div className="flex flex-col xl:flex-row bg-[#E6F1FF] min-h-screen max-h-full">
                <div className="w-full xl:w-[80%] flex flex-col items-center xl:items-start">
                    <p className="hidden xl:block font-bold text-3xl m-10">
                        Current Projects
                    </p>

                    <p className=" xl:hidden font-bold text-3xl mt-5 mx-10">
                        Current Projects
                    </p>

                    <hr className="border-t border-gray-400 w-[90%] mx-auto my-2 xl:hidden" />

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger onClick={() => setIsDialogOpen(true)}>
                            <div className="w-full my-2 bg-[#93C2FF] text-black cursor-pointer py-1 px-3 rounded-md font-semibold hover:bg-black hover:text-[#93C2FF] xl:hidden">
                                Propose a Project
                            </div>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-3xl mt-5">
                                    Submitted Documents
                                </DialogTitle>
                                <DialogDescription>
                                    Review and upload the required project proposal documents.
                                </DialogDescription>
                                <div className="flex h-[150px] mt-3 items-center justify-center rounded-md border border-dashed border-gray-400 text-sm cursor-pointer hover:bg-gray-100">
                                    <div className="flex flex-row gap-2">
                                        <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center"></div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row gap-1">
                                                <p className="font-semibold">Drop your Project File</p>
                                                <p className="text-[#3B4EFF] font-semibold underline">
                                                    Browse
                                                </p>
                                            </div>
                                            <p className="text-gray-500 text-xs">.PDF only</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#E6F1FF] flex flex-row h-10 items-center w-full rounded-md px-2 space-x-2">
                                    {/* Filename */}
                                    <p className="italic text-sm truncate flex-grow max-w-[50%]">
                                        ProjectFile.pdf
                                    </p>
                                    {/* Progress Bar */}
                                    <div className="flex-grow"></div>
                                </div>

                                <div className="bg-[#E6F1FF] flex flex-row h-10 items-center w-full rounded-md px-2 space-x-2"></div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <div className="mt-5 flex flex-row gap-0.5 xl:hidden">
                        <div className="bg-[#052659] text-white shadow-md shadow-gray-400 p-2 rounded-tl-2xl rounded-bl-2xl">
                            <p>Current Projects</p>
                        </div>
                        <div className="bg-[#052659] opacity-60 text-gray-400 shadow-lg shadow-blue-800/40 p-2 rounded-tr-2xl rounded-br-2xl">
                            <p>Proposed Projects</p>
                        </div>
                    </div>

                    <div className="w-[80%] my-4">
                        <div className="flex flex-wrap justify-center gap-5">
                            {projects?.map((data) => (
                                <div
                                    onClick={() => router.push(`/users/projects/${data.title}`)}
                                    key={data.id}
                                >
                                    <ProjectCard
                                        title={data.title}
                                        status={data.status}
                                        date={data.target_date}
                                        imgURL={data.imageURL}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden xl:flex xl:flex-col w-[20%] mr-5 mb-10">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger onClick={() => setIsDialogOpen(true)}>
                            <div className="w-full my-2 bg-[#93C2FF] text-black cursor-pointer rounded-md font-semibold py-1  hover:bg-black hover:text-[#93C2FF]">
                                Propose a Project
                            </div>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-3xl mt-5 mx-2">
                                    Propose a Project
                                </DialogTitle>
                                <DialogDescription>
                                    Fill out the form below to submit a new project proposal for
                                    approval.
                                </DialogDescription>
                                <hr className="border-t border-black w-full " />

                                <form className="space-y-4" onSubmit={(e) => {
                                    postProject(e);
                                    setFile(null);
                                    (e.target as HTMLFormElement).reset();
                                    setIsDialogOpen(false);
                                }
                                }>
                                    {/* Project Title */}
                                    <div>
                                        <label className="font-semibold block mb-1">Project Title</label>
                                        <Input
                                            className="bg-[#E6F1FF] placeholder:italic"
                                            placeholder="e.g. The KILOS Project"
                                            name="title"
                                            required
                                        />
                                    </div>

                                    {/* Project Details */}
                                    <div>
                                        <label className="font-semibold block mb-1">Project Details</label>
                                        <Textarea
                                            className="bg-[#E6F1FF] h-32 placeholder:italic"
                                            placeholder="e.g. This project is about..."
                                            name="details"
                                            required
                                        />
                                    </div>

                                    {/* Project Document */}
                                    <div>
                                        <label className="font-semibold block mb-1">Project Document</label>
                                        <p className="text-gray-500 italic text-xs mb-2">
                                            Upload your project proposal (.pdf only)
                                        </p>

                                        {/* Hidden input */}
                                        <input
                                            id="document"
                                            type="file"
                                            name="document"
                                            accept=".pdf"
                                            className="hidden"
                                            onChange={(e) => {
                                                const selected = e.target.files?.[0] || null;
                                                setFile(selected);
                                            }}
                                        />

                                        {/* If no file, show dropzone */}
                                        {!file && (
                                            <label
                                                htmlFor="document"
                                                className="flex flex-col items-center justify-center h-[140px] w-full max-w-md mx-auto rounded-md border border-dashed border-gray-400 cursor-pointer hover:bg-gray-100 transition"
                                            >
                                                <div className="flex flex-row items-center gap-2">
                                                    <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
                                                        <ImagePlus />
                                                    </div>
                                                    <div className="flex flex-col text-center">
                                                        <p className="font-semibold">
                                                            Drop your file or{" "}
                                                            <span className="text-[#3B4EFF] underline">Browse</span>
                                                        </p>
                                                        <p className="text-gray-500 text-xs">PDF only</p>
                                                    </div>
                                                </div>
                                            </label>
                                        )}

                                        {/* If file selected, show file details */}
                                        {file && (
                                            <div className="flex items-center justify-between w-full max-w-md mx-auto mt-3 px-3 py-2 bg-[#E6F1FF] rounded-md">
                                                {/* Left side: PDF icon */}
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-red-100 text-red-600 rounded-md p-2">
                                                        📄
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="font-semibold truncate max-w-[200px]">{file.name}</p>
                                                        <p className="text-xs text-gray-600">
                                                            {file.type || "application/pdf"} • {(file.size / 1024 / 1024).toFixed(2)} MB
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Remove button */}
                                                <button
                                                    type="button"
                                                    onClick={() => setFile(null)}
                                                    className="ml-4 text-gray-500 hover:text-red-500 font-bold text-lg"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        )}
                                    </div>


                                    {/* Submit */}
                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            className="bg-[#A3C4A8] text-black rounded-2xl h-9 px-6 cursor-pointer hover:bg-black hover:text-[#A3C4A8]"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <div className="bg-white min-h-[85%] rounded-[8px] py-6 px-2">
                        <p className="font-bold text-2xl text-center mb-4">
                            Proposed Projects
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {proposedProjects?.map((data) => (
                                <div
                                    onClick={() =>
                                        router.push(`/users/projects/proposed-project/${(data.title).trim()}-${data.id}`)
                                    }
                                    key={data.id}
                                    className="min-w-full"
                                >
                                    <ProposedProjCard Title={data.title} Description={data.description} Status={data.status} PhotoURL={data.imageURL}/>
                                </div>

                            ))

                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <main>{content}</main>;
}
