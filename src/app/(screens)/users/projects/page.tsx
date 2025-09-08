"use client";

import React from 'react'
import { ProjectCard } from '@/src/app/components/user/project-card';
import { Button } from '@/components/ui/button';
import { ProposedProjCard } from '@/src/app/components/user/proposed-projCard';
import { useRouter } from 'next/navigation';

export default function Practice() {
    const router = useRouter();

    const Legislatives = false;
    const Executives = true;
    const Treasurer = false;

    let content;

    if (Legislatives) {
        content = (
            <div className="bg-[#E6F1FF] min-h-screen max-h-full">

                <p className="font-bold text-3xl m-10">Current Projects</p>
                <div className="flex flex-wrap justify-center gap-5">
                    <div onClick={() => router.push("/users/projects/[id]")}>
                        <ProjectCard />
                    </div>
                    <div onClick={() => router.push("/users/projects/[id]")}>
                        <ProjectCard />
                    </div>
                    <div onClick={() => router.push("/users/projects/[id]")}>
                        <ProjectCard />
                    </div>
                    <div onClick={() => router.push("/users/projects/[id]")}>
                        <ProjectCard />
                    </div>
                </div>

            </div>
        );
    } else if (Executives) {
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
                            <div onClick={() => router.push("/users/projects/[id]")}>
                                <ProjectCard />
                            </div>
                            <div onClick={() => router.push("/users/projects/[id]")}>
                                <ProjectCard />
                            </div>
                            <div onClick={() => router.push("/users/projects/[id]")}>
                                <ProjectCard />
                            </div>
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
    } else if (Treasurer) {
        content = (
            <div className="bg-[#E6F1FF] min-h-screen max-h-full">

                <p className="font-bold text-3xl m-10">Current Projects</p>
                <div className="flex flex-wrap justify-center gap-5">
                    <div onClick={() => router.push("/users/projects/[id]")}>
                        <ProjectCard />
                    </div>
                    <div onClick={() => router.push("/users/projects/[id]")}>
                        <ProjectCard />
                    </div>
                    <div onClick={() => router.push("/users/projects/[id]")}>
                        <ProjectCard />
                    </div>
                    <div onClick={() => router.push("/users/projects/[id]")}>
                        <ProjectCard />
                    </div>
                </div>

            </div>
        );
    }
    return <main>{content}</main>;
}
