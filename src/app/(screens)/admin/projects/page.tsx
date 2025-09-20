"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/src/app/components/admin/project-card";
import { project } from "@/src/app/lib/definitions";
import { getPendingProjects } from "@/src/app/actions/admin_projects";

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState<project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; 

  useEffect(() => {
    const getData = async () => {
      const data = await getPendingProjects();
      setProjects(data ?? []);
    };

    getData();
  }, []);

  const totalPages = Math.ceil(projects.length / pageSize);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-[#E6F1FF] min-h-dvh">
      <p className="font-bold text-3xl m-10">Proposed Projects</p>

      <div className="flex flex-wrap justify-center gap-5">
        {paginatedProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => router.push(`/admin/projects/${project.title}-${project.id}`)}
            className="cursor-pointer"
          >
            <ProjectCard
              Title={project.title}
              Status={project.status}
              ImgURL={project.imageURL}
            />
          </div>
        ))}
      </div>

      {/* pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            className="cursor-pointer px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* page numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="cursor-pointer px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
