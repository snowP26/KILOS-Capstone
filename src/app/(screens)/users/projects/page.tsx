"use client";

import React, { useEffect, useState } from "react";
import { ProjectCard } from "@/src/app/components/user/project-card";
import { Button } from "@/components/ui/button";
import { ProposedProjCard } from "@/src/app/components/user/proposed-projCard";
import { useRouter } from "next/navigation";
import { project } from "@/src/app/lib/definitions";
import { getProjects } from "@/src/app/actions/projects";
import { useUserRole } from "@/src/app/actions/role";

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

                    <Button className="w-[80%] my-2 bg-[#93C2FF] text-black cursor-pointer hover:bg-black hover:text-[#93C2FF] xl:hidden">
                        Propose a Project
                    </Button>

                    <div className="mt-5 flex flex-row gap-0.5 xl:hidden">
                        <div className="bg-[#052659] text-white shadow-md shadow-gray-400 p-2 rounded-tl-2xl rounded-bl-2xl">
                            <p>Current Projects</p>
                        </div>
                        <div className="bg-[#052659] opacity-60 text-gray-400 shadow-lg shadow-blue-800/40 p-2 rounded-tr-2xl rounded-br-2xl">
                            <p>Proposed Projects</p>
                        </div>
                    </div>

                    <hr className="border-t border-gray-400 w-[90%] mx-auto my-2 xl:hidden" />

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
                    <Button className="w-full my-2 bg-[#93C2FF] text-black cursor-pointer hover:bg-black hover:text-[#93C2FF]">
                        Propose a Project
                    </Button>
                    <div className="bg-white min-h-[85%] rounded-[8px] py-6 px-2">
                        <p className="font-bold text-2xl text-center mb-4">Proposed Projects</p>
                        <div className="flex flex-wrap gap-4">
                            <ProposedProjCard />
                            <ProposedProjCard />
                            <ProposedProjCard />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <main>{content}</main>;
}
