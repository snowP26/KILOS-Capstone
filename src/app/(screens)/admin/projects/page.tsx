"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import { ProjectCard } from '@/src/app/components/admin/project-card'


export default function Projects()  {
  const router = useRouter();
  
  return (
    <div className="bg-[#E6F1FF] h-dvh">

      <p className="font-bold text-3xl m-10">Proposed Projects</p>
      <div className="flex flex-wrap justify-center gap-5">
          <div className="cursor-pointer" onClick={() => router.push("/admin/projects/[id]")}>
            <ProjectCard />
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/admin/projects/[id]")}>
            <ProjectCard />
          </div>
          <div className="cursor-pointer" onClick={() => router.push("/admin/projects/[id]")}>
            <ProjectCard />
          </div>
          
      </div>

    </div>
  )
}