"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { project } from "@/src/app/lib/definitions";
import {
  deleteProjectPhoto,
  getProjectByID,
  uploadPhotoByID,
} from "@/src/app/actions/projects";
import { ScrollArea } from "@/components/ui/scroll-area";
import Swal from "sweetalert2";
import { useUserRole } from "@/src/app/actions/role";
import Image from "next/image";

const ApprovedProjects = () => {
  const params = useParams()
  const raw = Array.isArray(params.id) ? decodeURIComponent(params.id[0] ?? "") : decodeURIComponent(params.id ?? "");
  const projectID = Number(raw.split("-").pop());
  const [project, setProject] = useState<project | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await getProjectByID(projectID);
      setProject(data);
      setLoading(false)
    }

    fetchData();
  }, [projectID])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FBFF] text-center px-5">
        <div className="w-10 h-10 border-4 border-[#052659] border-t-transparent rounded-full animate-spin mb-4"></div>

        <h1 className="text-lg font-semibold text-gray-700">
          Loading project details...
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Please wait while we fetch the project's data.
        </p>
      </div>
    );
  }

  if (!loading && project == null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FBFF]">
        <h1 className="text-2xl font-semibold text-gray-700">Project Not Found</h1>
        <p className="text-gray-500 mt-2">Please check the project link or try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-h-full mt-10">
      <Breadcrumb className="xl:ml-20">
        <BreadcrumbList>
          <Button
            className="group gap-0 relative bg-[#E6F1FF] cursor-pointer"
            variant="link"
            onClick={() => router.back()}
          >
            <ArrowLeft color="black" />
            <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
              Return
            </div>
          </Button>
          <div className="h-5 w-3">
            <Separator className="bg-gray-500" orientation="vertical" />
          </div>

          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/projects">
              Current Projects
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">View Project</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mx-2 sm:mx-10 xl:mx-25">
        <p className="font-bold text-xl xl:text-3xl mt-8 mb-2 xl:mb-6">
          {project?.title}
        </p>

        <div className="flex flex-col-reverse gap-3 sm:gap-5 sm:h-10 sm:flex-row">
          <Button
            className="text-black bg-[#A3C4A8] w-full h-8 sm:w-fit sm:h-10 cursor-pointer hover:bg-black hover:text-[#A3C4A8]"
            onClick={() =>
              router.push(
                `/admin/projects/approved-projects/${project?.title.trim()}-${project?.id
                }/view-budget-breakdown`
              )
            }
          >
            View Budget Breakdown
          </Button>
          <p className="text-black bg-white rounded-2xl px-5 font-medium content-center w-fit h-8 sm:h-10">
            {project?.target_date
              ? new Date(project.target_date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : ""}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-1 place-items-center min-h-fit max-h-screen">
          <div className="bg-white mt-10 w-[90%] h-full sm:h-150 lg:w-[35%] lg:h-155 justify-items-center place-content-center">
            {project?.imageURL && (
              <div className="relative w-[70%] h-120 sm:h-[80%] lg:w-[80%] lg:h-130 flex items-center justify-center">
                <Image
                  src={`${project.imageURL}?t=${new Date().getTime()}`}
                  alt="Project Poster"
                  className="w-full h-full object-cover rounded-md"
                  onClick={() => console.log(project.imageURL)}
                />
              </div>
            ) 
            }


            <div className="flex flex-row w-[80%] justify-between my-3">
              <p className="font-medium text-xl text-[#17A1FA]">
                Project Poster
              </p>
            </div>
          </div>

          <div className="bg-white mb-10 w-[90%] lg:w-[80%] lg:h-155 lg:mt-10 lg:mb-0">
            <div className="bg-[#E6F1FF] w-auto h-full mx-4 my-4 lg:h-[90%] lg:mx-5 lg:mt-8 pt-2 lg:pt-5 lg:px-10">
              <p className="font-semibold text-xl text-center lg:text-2xl lg:text-start">
                Project Description:
              </p>
              <div className="mt-2 lg:h-[90%] lg:w-full">
                <ScrollArea className="w-full h-100 pb-5 lg:pb-0">
                  <p className="lg:h-full pl-4 pr-6 lg:px-10">
                    {project?.description}
                  </p>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ApprovedProjects
