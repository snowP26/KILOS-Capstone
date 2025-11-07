"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectCard, StatusType } from "@/src/app/components/admin/project-card";
import { project } from "@/src/app/lib/definitions";
import { getPendingProjects } from "@/src/app/actions/admin_projects";
import { getProjects } from "@/src/app/actions/projects";
import { RouteMatcher } from "next/dist/server/route-matchers/route-matcher";

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState<project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    const getData = async () => {
      const data = await getProjects();
      if (data) {
        const sorted = [...data].sort((a, b) => {
          if (a.status === "Approved" && b.status !== "Approved") return -1;
          if (a.status !== "Approved" && b.status === "Approved") return 1;
          return 0;
        });
        setProjects(sorted);
      } else {
        setProjects([]);
      }
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
      <p className="font-bold text-3xl m-5 lg:m-10">Projects</p>

      <div className="flex flex-wrap justify-center gap-5 lg:gap-3 xl:gap-5">
        {paginatedProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              if (project.status === "Approved") {
                router.push(`/admin/projects/approved-projects/${project.title}-${project.id}`)
              } else {
                router.push(`/admin/projects/${project.title}-${project.id}`);
              }
            }}
            className="cursor-pointer"
          >
            {project.status === "Approved" ? (
              <ProjectCard
                Title={project.title}
                Status={project.status}
                ImgURL={project.imageURL}
                TargetDate={project.target_date}
              />
            ) : (
              <ProjectCard
                Title={project.title}
                Status={project.status as StatusType}
                ImgURL={project.imageURL}
              />
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8 mb-10">
          {/* Previous Button */}
          <button
            className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`cursor-pointer px-3 py-1.5 rounded-md text-sm font-semibold transition ${
                currentPage === i + 1
                  ? "bg-[#052659] text-white border border-[#052659]"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            className="cursor-pointer px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
