"use client";

import React from 'react'
import { UserNav } from '@/src/app/components/user/nav_user';
import { ProjectCard } from '@/src/app/components/user/project-card';


export default function Projects()  {
  return (
    <div className="bg-[#E6F1FF] h-dvh">

        <p className="font-bold text-3xl m-10">Current Projects</p>
        <div className="flex flex-wrap justify-center gap-5">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />    
        </div>
    </div>
  )
}