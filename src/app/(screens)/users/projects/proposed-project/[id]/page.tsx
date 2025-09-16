"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SquarePen, Trash2, MessageSquareWarning, Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SubmitDocCard } from "@/src/app/components/user/submit-docCard";
import { project } from "@/src/app/lib/definitions";
import { deleteProjectPhoto, getProposedProjectByID, uploadPhotoByID } from "@/src/app/actions/projects";
import { ProjectTable } from "@/src/app/components/user/table";
import { ProjectDetails } from "@/src/app/components/user/project-details";
import Swal from "sweetalert2";

export default function ViewProposedProject() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.id as string;
    const projectId = slug.split("-").pop();


    const [project, setProject] = useState<project | null>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [tempPosterFile, setTempPosterFile] = useState<File | null>(null);
    const [refresh, setRefresh] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            if (projectId) {
                const data = await getProposedProjectByID(projectId);
                setProject(data && data.length > 0 ? data[0] : null);
            }
        };

        setTempPosterFile(null)
        fetchData();
    }, [projectId, refresh]);

    return (
        <div className="bg-[#E6F1FF] h-fit xl:h-screen mt-10">
            <Breadcrumb className="xl:ml-20">
                <BreadcrumbList>
                    <Button
                        className="group gap-0 relative bg-[#E6F1FF] cursor-pointer"
                        variant="link"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft color="black" />
                        <span className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </span>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical" />
                    </div>

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            onClick={() => router.push(`/users/projects/`)}
                            className="cursor-pointer"
                        >
                            Current Projects
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">
                            View Proposed Project: {(decodeURIComponent(slug)).replace(/-\d+$/, "")}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-2 sm:mx-10 xl:mx-25">
                <p className="font-bold text-xl xl:text-3xl mt-8 mb-2 xl:mb-6">{project?.title}</p>

                <div className="flex flex-col xl:flex-row gap-1 place-items-center min-h-fit max-h-screen">
                    {/* LEFT SIDE POSTER */}
                    <div className="bg-white mt-10 w-[80%] h-full sm:h-150 xl:w-[35%] xl:h-155 justify-items-center place-content-center">
                        {project?.imageURL ? (
                            <div className="relative w-[70%] h-120 sm:h-[80%] xl:w-[80%] xl:h-130 flex items-center justify-center">
                                <img
                                    src={`${project.imageURL}?t=${new Date().getTime()}`}
                                    alt="Project Poster"
                                    className="w-full h-full object-cover rounded-md"
                                    onClick={() => console.log(project.imageURL)}
                                />
                                <div className="absolute top-3 right-3 flex gap-2">
                                    {/* <SquarePen
                                        className="cursor-pointer rounded-full bg-white/90 p-2 shadow-md hover:bg-gray-100 hover:text-blue-500 active:scale-95 transition"
                                        strokeWidth={2.3}
                                        size={32}
                                    /> */}
                                    <Trash2
                                        className="cursor-pointer rounded-full bg-white/90 p-2 shadow-md hover:bg-red-50 hover:text-red-500 active:scale-95 transition"
                                        strokeWidth={2.3}
                                        size={32}
                                        onClick={async () => {
                                            const result = await Swal.fire({
                                                title: "Delete Project Poster?",
                                                text: "This action cannot be undone.",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#d33",
                                                cancelButtonColor: "#3085d6",
                                                confirmButtonText: "Yes, delete it!",
                                                cancelButtonText: "Cancel",
                                            });

                                            if (result.isConfirmed) {
                                                await deleteProjectPhoto(project.id);
                                                Swal.fire("Deleted!", "Your project poster has been removed.", "success");
                                                setRefresh((prev) => prev + 1)
                                            }
                                        }
                                        }
                                    />
                                </div>
                            </div>

                        ) : tempPosterFile ? (
                            <div className="flex flex-col items-center justify-center w-[70%] h-120 sm:h-[80%] xl:w-[80%] xl:h-130 overflow-hidden">
                                <img
                                    src={URL.createObjectURL(tempPosterFile)}
                                    alt="Temp Poster Preview"
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                        ) : (
                            <label
                                htmlFor="poster-upload"
                                className="flex flex-col items-center justify-center w-[70%] h-120 sm:h-[80%] xl:w-[80%] xl:h-130 border-2 border-dashed border-gray-400 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                            >
                                <svg
                                    className="w-10 h-10 text-gray-400 mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4-4l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                                <p className="text-gray-500">Drop your poster here</p>
                                <p className="text-sm text-gray-400">or click to upload</p>
                                <input
                                    id="poster-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setTempPosterFile(file);
                                            console.log("Selected file:", file);
                                        }
                                    }}
                                />
                            </label>
                        )}

                        <div className="flex flex-row w-[80%] justify-between my-3">
                            <p className="font-medium text-xl text-[#17A1FA]">Project Poster</p>
                            <div className="flex flex-row gap-2">
                                {tempPosterFile && !project?.imageURL && (
                                    <div className="flex flex-row gap-3">
                                        {/* Save Poster Button */}
                                        <button
                                            onClick={async () => {
                                                if (project?.id !== undefined && tempPosterFile) {
                                                    await uploadPhotoByID(project.id, tempPosterFile);
                                                    setRefresh((prev) => prev + 1);
                                                }
                                            }}
                                            className="group flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 active:scale-95 transition cursor-pointer"
                                        >
                                            <Save size={18} />
                                            <span
                                                className="opacity-0 max-w-0 h-0 p-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[120px] transition-all duration-300 ease-in-out group-hover:h-5 "
                                            >Save Poster</span>
                                        </button>
                                        <button
                                            onClick={() => setTempPosterFile(null)}
                                            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300 active:scale-95 transition cursor-pointer"
                                        >
                                            <Trash2 size={18} />
                                            <span>Cancel</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE CONTENT */}
                    <div className="flex flex-col justify-between bg-white mb-10 w-[80%] xl:w-[80%] xl:h-155 xl:mt-10 xl:mb-0">
                        <div>
                            <div className="bg-[#FFA500] mx-10 mt-5 text-white flex flex-row w-fit px-3 py-1 gap-1 rounded-md">
                                <MessageSquareWarning />
                                <p>Action Pending</p>
                            </div>
                            <hr className="border-t mt-8 border-gray-200 w-full" />

                            <div className="min-h-fit max-h-105 mb-50 xl:mb-0 overflow-y-scroll w-full">
                                {showDetails ? <ProjectDetails /> : <ProjectTable />}
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-row gap-2 justify-end mb-5 mx-20">
                                <Button
                                    onClick={() => setShowDetails((prev) => !prev)}
                                    className="bg-[#E6F1FF] text-black cursor-pointer hover:bg-black hover:text-[#E6F1FF]"
                                >
                                    {showDetails ? "View Project Status" : "View Project Details"}
                                </Button>
                                <SubmitDocCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

