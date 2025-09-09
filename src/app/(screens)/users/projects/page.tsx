"use client";

import React, { useEffect, useState } from "react";
import { ProjectCard } from "@/src/app/components/user/project-card";
import { Button } from "@/components/ui/button";
import { ProposedProjCard } from "@/src/app/components/user/proposed-projCard";
import { useRouter } from "next/navigation";
import { project } from "@/src/app/lib/definitions";
import { getProjects } from "@/src/app/actions/projects";
import { useUserRole } from "@/src/app/actions/role";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";

export default function Practice() {
    const router = useRouter();
    const [projects, setProjects] = useState<project[] | null>(null);

    const { role, loading } = useUserRole();
    const normalizedRole = role?.trim().toLowerCase();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProjects();
            setProjects(data ?? null);
        };

        fetchData();
    }, []);

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
                                imgURL={data.photo}
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
                    <p className="hidden xl:block font-bold text-3xl m-10">Current Projects</p>

                    <p className=" xl:hidden font-bold text-3xl mt-5 mx-10">Current Projects</p>

                    <hr className="border-t border-gray-400 w-[90%] mx-auto my-2 xl:hidden" />

                    <Dialog>
                        <DialogTrigger>
                            <Button className="w-full my-2 bg-[#93C2FF] text-black cursor-pointer hover:bg-black hover:text-[#93C2FF] xl:hidden">
                                Propose a Project
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-3xl mt-5">Submitted Documents</DialogTitle>
                                <div
                                    className="flex h-[150px] mt-3 items-center justify-center rounded-md border border-dashed border-gray-400 text-sm cursor-pointer hover:bg-gray-100"
                                >
                                    <div className="flex flex-row gap-2">
                                        <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center">

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

                                <div className="bg-[#E6F1FF] flex flex-row h-10 items-center w-full rounded-md px-2 space-x-2">




                                    {/* Filename */}
                                    <p className="italic text-sm truncate flex-grow max-w-[50%]">
                                        ProjectTitle_ProjectProposal.pdf
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="flex-grow">

                                    </div>


                                </div>

                                <div className="bg-[#E6F1FF] flex flex-row h-10 items-center w-full rounded-md px-2 space-x-2">

                                </div>
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
                                        imgURL={data.photo}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden xl:flex xl:flex-col w-[20%] mr-5 mb-10">
                    <Dialog>
                        <DialogTrigger>
                            <Button className="w-full my-2 bg-[#93C2FF] text-black cursor-pointer hover:bg-black hover:text-[#93C2FF]">
                                Propose a Project
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-3xl mt-5 mx-2">Propose a Project</DialogTitle>
                                <hr className="border-t border-black w-full " />

                                <form>
                                    <p className="font-semibold">Project Title</p>
                                    <Input
                                        className="bg-[#E6F1FF] placeholder:italic mb-4"
                                        placeholder="eg. The KILOS Announcement"
                                    />

                                    <p className="font-semibold">Project Details</p>
                                    <Textarea
                                        className="bg-[#E6F1FF] h-50 min-w-full placeholder:italic mb-4"
                                        placeholder="eg. The Announcement is about KILOS"
                                    />

                                    <p className="font-semibold">Project Document</p>
                                    <p className="text-gray-500 italic text-xs">Upload here the project proposal document.</p>


                                    <div
                                        className="flex h-[150px] w-[300px] mt-2 items-center justify-center rounded-md border border-dashed border-gray-400 text-sm cursor-pointer hover:bg-gray-100"
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

                                    <div className="place-self-end">
                                        <Button className="bg-[#A3C4A8] text-black rounded-2xl h-8 cursor-pointer hover:bg-black hover:text-[#A3C4A8]">
                                            Submit
                                        </Button>
                                    </div>
                                </form>


                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <div className="bg-white min-h-[85%] rounded-[8px] py-6 px-2">
                        <p className="font-bold text-2xl text-center mb-4">Proposed Projects</p>
                        <div className="flex flex-wrap gap-4">
                            <div onClick={() => router.push(`/users/projects/proposed-project/[id]`)}>
                                <ProposedProjCard />
                            </div>
                            <div onClick={() => router.push(`/users/projects/proposed-project/[id]`)}>
                                <ProposedProjCard />
                            </div>
                            <div onClick={() => router.push(`/users/projects/proposed-project/[id]`)}>
                                <ProposedProjCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <main>{content}</main>;
}
