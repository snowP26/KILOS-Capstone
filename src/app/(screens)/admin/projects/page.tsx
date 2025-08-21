"use client";

import React from 'react'

import { ProjectCard } from '@/src/app/components/admin/project-card';


export default function Projects()  {
  return (
    <div className="bg-[#E6F1FF] h-dvh">

      <p className="font-bold text-3xl m-10">Proposed Projects</p>
      <div className="flex flex-wrap justify-center gap-5">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />    
      </div>

    </div>
  )
}