"use client";

import React, { useEffect, useState } from 'react'
import { ProjectCard } from '@/src/app/components/user/project-card';
import { Button } from '@/components/ui/button';
import { ProposedProjCard } from '@/src/app/components/user/proposed-projCard';
import { useRouter } from 'next/navigation';
import { project } from '@/src/app/lib/definitions';
import { getProjects } from '@/src/app/actions/projects';

export default function Practice() {
    const router = useRouter();
    const [projects, setProjects] = useState<project[] | null>(null);

    const Legislatives = false;
    const Executives = true;
    const Treasurer = false;

    let content;

    useEffect(() => {
        const getData = async () => {
            const data = await getProjects();
            setProjects(data ?? null)
        }

        getData()
    }, [])

    if (Legislatives) {
        content = (
            <div className="bg-[#E6F1FF] min-h-screen max-h-full">

                <p className="font-bold text-3xl m-10">Current Projects</p>
                <div className="flex flex-wrap justify-center gap-5">
                    {projects?.map((data) => (
                        <div onClick={() => router.push(`/users/projects/${data.title}`)} key={data.id}>
                            <ProjectCard title={data.title} status={data.status} date={data.target_date} imgURL={data.photo}/>
                        </div>
                    ))
                    }

                </div>

            </div>
        );
    } else if (Executives) {
        content = (
            <div className="bg-[#E6F1FF] min-h-screen max-h-full flex flex-row">
                <div className="w-[80%] ">
                    <p className="font-bold text-3xl m-10">Current Projects</p>
                    <div className="flex flex-wrap justify-center gap-5">
                        {projects?.map((data) => (
                            <div onClick={() => router.push(`/users/projects/${data.title}`)} key={data.id}>
                                <ProjectCard title={data.title} status={data.status} date={data.target_date} imgURL={data.photo}/>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className="w-[20%] mr-5 mb-10">
                    <Button className="w-[100%] my-2 bg-[#93C2FF] text-black cursor-pointer hover:bg-black hover:text-[#93C2FF]">Propose a Project</Button>
                    <div className="bg-white min-h-[85%] rounded-[8px] py-6">
                        <p className="font-bold text-2xl text-center mb-4">Proposed Projects</p>
                        <div className="justify-items-center">
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
            <div>
                <h1>Design 3</h1>
                <p>This is the third design.</p>
            </div>
        );
    } else {
        content = (
            <div>
                <h1>No design selected</h1>
            </div>
        );
    }

    return <main>{content}</main>;
}
