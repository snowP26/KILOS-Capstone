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
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Projects() {
    const router = useRouter();
    const [projects, setProjects] = useState<project[]>([]);
    const [proposedProjects, setProposedProjects] = useState<project[]>([]);
    const [currentProjectsPage, setCurrentProjectsPage] = useState(1);
    const [currentProposedPage, setCurrentProposedPage] = useState(1);
    const pageSize = 4;

    const totalProjectsPages = Math.ceil(projects.length / pageSize);
    const totalProposedPages = Math.ceil(proposedProjects.length / pageSize);

    const paginatedProjects = projects.slice(
        (currentProjectsPage - 1) * pageSize,
        currentProjectsPage * pageSize
    );
    const paginatedProposedProjects = proposedProjects.slice(
        (currentProposedPage - 1) * pageSize,
        currentProposedPage * pageSize
    );

    const [file, setFile] = useState<File | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { role, loading } = useUserRole();
    const normalizedRole = role?.trim().toLowerCase();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProjects();
            const proposed = await getProposedProjects();
            setProjects(data ?? []);
            setProposedProjects(proposed ?? []);
        };

        if (!isDialogOpen) {
            fetchData();
        }
    }, [isDialogOpen]);

    if (loading) {
        return (
            <main className="p-6 bg-[#E6F1FF] min-h-screen flex flex-col items-center">
                <p className="font-bold text-3xl mb-8">Loading Projects...</p>
                <div className="flex flex-wrap justify-center gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center w-72 h-60 bg-white rounded-lg shadow-md p-4"
                        >
                            <Skeleton className="h-32 w-full rounded-md mb-3" />
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </main>
        );
    }

    let content;

    if (normalizedRole === "legislative" || normalizedRole === "treasurer") {
        content = (
            <div className="bg-[#E6F1FF] min-h-screen max-h-full w-full flex flex-col items-center">
                <p className="font-bold text-3xl m-10">Current Projects</p>
                <div className="flex flex-wrap justify-center gap-5">
                    {paginatedProjects.length > 0 ? (
                        paginatedProjects.map((project) => (
                            <div
                                key={project.id}
                                onClick={() =>
                                    router.push(`/users/projects/${project.title}-${project.id}`)
                                }
                                className="cursor-pointer"
                            >
                                <ProjectCard
                                    title={project.title}
                                    status={project.status}
                                    imgURL={project.imageURL}
                                    date={project.target_date}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full py-16 px-6 text-center text-gray-600">
                            <p className="text-lg sm:text-xl font-semibold italic text-[#052659]">
                                No approved projects yet
                            </p>
                            <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md">
                                Once projects are approved, they’ll appear here automatically.
                            </p>
                        </div>
                    )}
                </div>

                {totalProjectsPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8 mb-10">
                        <button
                            className="px-4 py-2 cursor-pointer rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() =>
                                setCurrentProjectsPage((p) => Math.max(p - 1, 1))
                            }
                            disabled={currentProjectsPage === 1}
                        >
                            Previous
                        </button>

                        {[...Array(totalProjectsPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentProjectsPage(i + 1)}
                                className={`px-3 py-1.5 rounded-md text-sm font-semibold ${currentProjectsPage === i + 1
                                    ? "bg-[#052659] text-white border border-[#052659]"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 cursor-pointer"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            className="px-4 py-2 cursor-pointer rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() =>
                                setCurrentProjectsPage((p) =>
                                    Math.min(p + 1, totalProjectsPages)
                                )
                            }
                            disabled={currentProjectsPage === totalProjectsPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        );
    } else if (normalizedRole === "executive") {
        content = (
            <div className="flex flex-col lg:flex-row bg-[#E6F1FF] min-h-screen max-h-full">
                {/* Projects Section */}
                <div className="w-full lg:w-[70%] xl:w-[80%] flex flex-col items-center lg:items-start">
                    <p className="font-bold text-3xl m-10">Current Projects</p>

                    <div className="flex flex-wrap justify-center gap-5 w-full px-4">
                        {projects.length > 0 ? (
                            paginatedProjects.map((data) => (
                                <div
                                    onClick={() =>
                                        router.push(`/users/projects/${data.title}-${data.id}`)
                                    }
                                    key={data.id}
                                >
                                    <ProjectCard
                                        title={data.title}
                                        status={data.status}
                                        date={data.target_date}
                                        imgURL={data.imageURL}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full h-[60vh] text-center text-gray-600">
                                <p className="text-lg sm:text-xl font-semibold italic text-[#052659]">
                                    No approved projects yet
                                </p>
                                <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-md">
                                    Once projects are approved, they’ll appear here automatically.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar for Proposed Projects */}
                <div className="hidden lg:flex lg:flex-col lg:w-[30%] w-[20%] mr-5 mb-10">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full my-2 bg-[#93C2FF] text-black cursor-pointer rounded-md font-semibold py-1 hover:bg-black hover:text-[#93C2FF]">
                                Propose a Project
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-3xl mt-5 mx-2">
                                    Propose a Project
                                </DialogTitle>
                                <DialogDescription>
                                    Fill out the form below to submit a new project proposal.
                                </DialogDescription>
                                <hr className="border-t border-black w-full" />

                                <form
                                    className="space-y-4"
                                    onSubmit={(e) => {
                                        postProject(e);
                                        setFile(null);
                                        (e.target as HTMLFormElement).reset();
                                        setIsDialogOpen(false);
                                    }}
                                >
                                    <div>
                                        <label className="font-semibold block mb-1">
                                            Project Title
                                        </label>
                                        <Input
                                            className="bg-[#E6F1FF] placeholder:italic"
                                            placeholder="e.g. The KILOS Project"
                                            name="title"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="font-semibold block mb-1">
                                            Project Details
                                        </label>
                                        <Textarea
                                            className="bg-[#E6F1FF] h-32 placeholder:italic"
                                            placeholder="e.g. This project is about..."
                                            name="details"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="font-semibold block mb-1">
                                            Project Document
                                        </label>
                                        <p className="text-gray-500 italic text-xs mb-2">
                                            Upload your project proposal (.pdf only)
                                        </p>

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
                                                            <span className="text-[#3B4EFF] underline">
                                                                Browse
                                                            </span>
                                                        </p>
                                                        <p className="text-gray-500 text-xs">PDF only</p>
                                                    </div>
                                                </div>
                                            </label>
                                        )}

                                        {file && (
                                            <div className="flex items-center justify-between w-full max-w-md mx-auto mt-3 px-3 py-2 bg-[#E6F1FF] rounded-md">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-red-100 text-red-600 rounded-md p-2">
                                                        📄
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="font-semibold truncate max-w-[200px]">
                                                            {file.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {file.type || "application/pdf"} •{" "}
                                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                                        </p>
                                                    </div>
                                                </div>

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

                    <div className="bg-white min-h-200 max-h-full pb-5 rounded-[8px]">
                        <p className="font-bold text-2xl text-center mb-4">
                            Proposed Projects
                        </p>
                        <div className="flex flex-col gap-4">
                            {paginatedProposedProjects.length > 0 ? (
                                paginatedProposedProjects.map((data) => (
                                    <div
                                        onClick={() =>
                                            router.push(
                                                `/users/projects/proposed-project/${data.title.trim()}-${data.id}`
                                            )
                                        }
                                        key={data.id}
                                        className="min-w-full"
                                    >
                                        <ProposedProjCard
                                            Title={data.title}
                                            Description={data.description}
                                            Status={data.status}
                                            PhotoURL={data.imageURL}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic text-center mt-5">
                                    No proposed projects available yet.
                                </p>
                            )}
                        </div>
                    </div>

                    {totalProposedPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-5 mb-10">
                            <button
                                className="px-4 py-2 cursor-pointer rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() =>
                                    setCurrentProposedPage((p) => Math.max(p - 1, 1))
                                }
                                disabled={currentProposedPage === 1}
                            >
                                Previous
                            </button>

                            {[...Array(totalProposedPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentProposedPage(i + 1)}
                                    className={`px-3 py-1.5 rounded-md text-sm font-semibold ${currentProposedPage === i + 1
                                        ? "bg-[#052659] text-white border border-[#052659]"
                                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 cursor-pointer"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                className="px-4 py-2 cursor-pointer rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() =>
                                    setCurrentProposedPage((p) =>
                                        Math.min(p + 1, totalProposedPages)
                                    )
                                }
                                disabled={currentProposedPage === totalProposedPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return <main>{content}</main>;
}
