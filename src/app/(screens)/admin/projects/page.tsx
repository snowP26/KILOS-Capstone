"use client";

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { project } from '@/src/app/lib/definitions';
import { getProjectByID } from '@/src/app/actions/projects';

export default function ViewProject() {
    const params = useParams();
    const raw = Array.isArray(params.id) ? decodeURIComponent(params.id[0] ?? "") : decodeURIComponent(params.id ?? "");
    const projectID = Number(raw.split("-").pop());
    const router = useRouter();
    const [project, setProject] = useState<project | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            console.log(projectID)
            const data = await getProjectByID(projectID);
            console.log("fetched:", data);
            setProject(data);
        };
        fetchProject();
    }, [projectID]);

    useEffect(() => {
        if (project) {
            console.log("project updated:", project);
        }
    }, [project]);

    if (!project) {
        return <h1>Not found</h1>
    }

    return (
        <div className="min-h-screen max-h-full mt-10">
            <Breadcrumb className="xl:ml-20">
                <BreadcrumbList>
                    <Button className="group gap-0 relative bg-[#E6F1FF] cursor-pointer" variant="link" onClick={() => router.back()}>
                        <ArrowLeft color="black" />
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </div>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical" />
                    </div>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users/projects">Current Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">View Project</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-2 sm:mx-10 xl:mx-25">
                <p className="font-bold text-xl xl:text-3xl mt-8 mb-2 xl:mb-6">{project.title}</p>

                <div className="flex flex-col-reverse gap-3 sm:gap-5 sm:h-10 sm:flex-row">
                    <Button
                        className="text-black bg-[#A3C4A8] w-full h-8 sm:w-fit sm:h-10 cursor-pointer hover:bg-black hover:text-[#A3C4A8]"
                        onClick={() => router.push(`/users/projects/${(project.title).trim()}-${project.id}/view-project-budget`)}
                    >
                        View Budget Breakdown</Button>
                    <p className="text-black bg-white rounded-2xl px-5 font-medium content-center w-fit h-8 sm:h-10">
                        {new Date(project.target_date).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        })}
                    </p>
                </div>


                <div className="flex flex-col xl:flex-row gap-1 place-items-center min-h-fit max-h-screen">
                    <div className="bg-white mt-10 w-[80%] h-full sm:h-150 xl:w-[35%] xl:h-155 justify-items-center place-content-center">
                        {
                            project.imageURL ? (

                                <img src={project.imageURL} className="bg-black mt-10 w-[70%] h-120 sm:h-[80%] xl:w-[80%] xl:h-130" />
                            ) : (
                                <div className="mt-10 flex items-center justify-center w-[70%] h-120 sm:h-[80%] xl:w-[80%] xl:h-130 rounded-[8px] bg-blue-100 text-blue-600 font-bold text-6xl shadow">
                                    {project.title?.charAt(0).toUpperCase()}
                                </div>
                            )
                        }
                        {/* image placeholder */}
                        <div className="flex flex-row w-[80%] justify-between my-3">
                            <p className="font-medium text-xl text-[#17A1FA]">Project Poster</p>
                            <div className="flex flex-row gap-2">
                                <SquarePen className="cursor-pointer hover:bg-gray-300 rounded-[5px]" />
                                <Trash2 className="cursor-pointer hover:bg-gray-300 rounded-[5px]" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white mb-10 w-[80%] xl:w-[80%] xl:h-155 xl:mt-10 xl:mb-0">
                        <div className="bg-[#E6F1FF] w-auto h-full mx-4 my-4 xl:h-[90%] xl:mx-5 xl:mt-8 pt-2 xl:pt-5 xl:px-10">
                            <p className="font-semibold text-xl text-center xl:text-2xl xl:text-start">Project Description:</p>
                            <div className="mt-2 xl:h-[90%] xl:w-full">
                                <p className="w-full h-100 xl:h-full overflow-y-auto pl-4 pr-6 xl:px-10">

                                    {project.description}
                                </p>
                            </div>


                        </div>

                    </div>
                </div>

            </div>

        </div>)}