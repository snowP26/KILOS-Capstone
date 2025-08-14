"use client";

import React from 'react'
import { UserNav } from '@/src/app/components/user/nav_user';
import { useRouter } from 'next/navigation';

import { ProjectCard } from '@/src/app/components/user/project-card';


export default function Projects() {
  const router = useRouter();

  return (
    <div className="bg-[#E6F1FF] h-dvh">

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
      </div>

    </div>
  )
}