"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SquarePen, Trash2, MessageSquareWarning } from "lucide-react";
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
import { getProposedProjectByID } from "@/src/app/actions/projects";
import { ProjectTable } from "@/src/app/components/user/table";
import { ProjectDetails } from "@/src/app/components/user/project-details";

export default function ViewProposedProject() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.id as string;
    const projectId = slug.split("-").pop();

    const [project, setProject] = useState<project | null>(null);
    const [showDetails, setShowDetails] = useState(false); // <-- NEW STATE

    useEffect(() => {
        const fetchData = async () => {
            if (projectId) {
                const data = await getProposedProjectByID(projectId);
                setProject(data && data.length > 0 ? data[0] : null);
            }
        };

        fetchData();
    }, [projectId]);

    return (
        <div className="bg-[#E6F1FF] h-fit xl:h-screen mt-10">
            <Breadcrumb className="xl:ml-20">
                <BreadcrumbList>
                    <Button
                        className="group gap-0 relative bg-[#E6F1FF] cursor-pointer"
                        variant="link"
                        onClick={() => router.back()} // FIX: added ()
                    >
                        <ArrowLeft color="black" />
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </div>
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
                        <div className="bg-black mt-10 w-[70%] h-120 sm:h-[80%] xl:w-[80%] xl:h-130">
                            {/* image placeholder */}
                        </div>
                        <div className="flex flex-row w-[80%] justify-between my-3">
                            <p className="font-medium text-xl text-[#17A1FA]">Project Poster</p>
                            <div className="flex flex-row gap-2">
                                <SquarePen className="cursor-pointer hover:bg-gray-300 rounded-[5px]" />
                                <Trash2 className="cursor-pointer hover:bg-gray-300 rounded-[5px]" />
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
            </div>
        </div>
    );
}
