"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Save } from "lucide-react";
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
  fetchNotifs,
  getProjectByID,
  uploadPhotoByID,
} from "@/src/app/actions/projects";
import { ScrollArea } from "@/components/ui/scroll-area";
import Swal from "sweetalert2";
import { useUserRole } from "@/src/app/actions/role";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Notifs = {
  id: number;
  project_id: number;
  new_amount: number;
}

export default function ViewProject() {
  const params = useParams();
  const slug = params?.id as string;
  const projectID = Number(slug.split("-").pop());
  const router = useRouter();
  const [project, setProject] = useState<project | null>(null);
  const [loading, setLoading] = useState(false);
  const [tempPosterFile, setTempPosterFile] = useState<File | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [notifs, setNotifs] = useState<Notifs[]>([])
  const { role } = useUserRole();

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const data = await getProjectByID(projectID);
        setProject(data);
        const notif = await fetchNotifs(projectID)
        console.log(notif)
        setNotifs(notif)
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectID, refresh]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FBFF] text-center px-5">
        <div className="w-10 h-10 border-4 border-[#052659] border-t-transparent rounded-full animate-spin mb-4"></div>

        <h1 className="text-lg font-semibold text-gray-700">
          Loading project details...
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Please wait while we fetch your data.
        </p>
      </div>
    );
  }

  if (!project) {
    return <h1>Not found</h1>;
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
            <BreadcrumbLink href="/users/projects">
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
        <div className="flex flex-row items-center">
          <p className="font-bold text-xl xl:text-3xl mt-8 mb-2 xl:mb-6">
            {project.title}
          </p>

<div className="ml-auto relative">
  <Dialog>
    <DialogTrigger asChild>
      <button className="relative p-2 rounded-full hover:bg-gray-100">
        <Bell className="w-6 h-6 cursor-pointer" />

        {/* Notification Count Badge */}
        {notifs.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full">
            {notifs.length}
          </span>
        )}
      </button>
    </DialogTrigger>

    {/* Dialog Content */}
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Notifications</DialogTitle>
      </DialogHeader>

      {/* Notification List */}
      <div className="max-h-[400px] overflow-auto space-y-2">
        {notifs.length > 0 ? (
          notifs.map((notif) => (
            <div
              key={notif.id}
              className="border rounded-lg p-3 text-sm hover:bg-gray-50 transition"
            >
              <p className="font-medium">Budget Updated</p>
              <p className="text-gray-600">
                New Amount: ₱{notif.new_amount}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-6">
            No notifications available
          </p>
        )}
      </div>
    </DialogContent>
  </Dialog>
</div>

        </div>

        <div className="flex flex-col-reverse gap-3 sm:gap-5 sm:h-10 sm:flex-row">
          <Button
            className="text-black bg-[#A3C4A8] w-full h-8 sm:w-fit sm:h-10 cursor-pointer hover:bg-black hover:text-[#A3C4A8]"
            onClick={() =>
              router.push(
                `/users/projects/${project.title.trim()}-${
                  project.id
                }/view-project-budget`
              )
            }
          >
            View Budget Breakdown
          </Button>
          <p className="text-black bg-white rounded-2xl px-5 font-medium content-center w-fit h-8 sm:h-10">
            {new Date(project.target_date).toLocaleString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-1 place-items-center min-h-fit max-h-screen">
          <div className="bg-white mt-10 w-[90%] h-full sm:h-150 lg:w-[35%] lg:h-155 justify-items-center place-content-center">
            {project?.imageURL ? (
              <div className="relative w-[70%] h-120 sm:h-[80%] lg:w-[80%] lg:h-130 flex items-center justify-center">
                <img
                  src={`${project.imageURL}?t=${new Date().getTime()}`}
                  alt="Project Poster"
                  className="w-full h-full object-cover rounded-md"
                  onClick={() => console.log(project.imageURL)}
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Trash2
                    className="cursor-pointer rounded-full bg-white/90 p-2 shadow-md hover:bg-red-50 hover:text-red-500 active:scale-95 transition"
                    strokeWidth={2.3}
                    size={32}
                    onClick={async () => {
                      const result = await Swal.fire({
                        title: "Delete Project Poster?",
                        text: "This action cannot be undone.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, delete it!",
                        cancelButtonText: "Cancel",
                      });

                      if (result.isConfirmed) {
                        await deleteProjectPhoto(project.id);
                        Swal.fire(
                          "Deleted!",
                          "Your project poster has been removed.",
                          "success"
                        );
                        setRefresh((prev) => prev + 1);
                      }
                    }}
                  />
                </div>
              </div>
            ) : tempPosterFile ? (
              <div className="flex flex-col items-center justify-center w-[70%] h-120 sm:h-[80%] lg:w-[80%] lg:h-130 overflow-hidden">
                <img
                  src={URL.createObjectURL(tempPosterFile)}
                  alt="Temp Poster Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ) : role == "Executive" ? (
              <label
                htmlFor="poster-upload"
                className="flex flex-col items-center justify-center mt-2 w-[70%] h-120 sm:h-[80%] lg:w-[80%] lg:h-130 border-2 border-dashed border-gray-400 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
              >
                <svg
                  className="w-10 h-10 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4-4l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <p className="text-gray-500">Drop your poster here</p>
                <p className="text-sm text-gray-400">or click to upload</p>
                <input
                  id="poster-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setTempPosterFile(file);
                    }
                  }}
                />
              </label>
            ) : (
              <div className="flex bg-blue-100 w-[80%] h-120 sm:h-[80%] lg:w-[80%] lg:h-130 object-contain rounded-md items-center justify-center font-bold text-blue-600">
                {project.title.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex flex-row w-[80%] justify-between my-3">
              <p className="font-medium text-xl text-[#17A1FA]">
                Project Poster
              </p>
              <div className="flex flex-row gap-2">
                {tempPosterFile && !project?.imageURL && (
                  <div className="flex flex-row gap-3">
                    {/* Save Poster Button */}
                    <button
                      onClick={async () => {
                        if (project?.id !== undefined && tempPosterFile) {
                          await uploadPhotoByID(project.id, tempPosterFile);
                          setRefresh((prev) => prev + 1);
                        }
                      }}
                      className="group flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 active:scale-95 transition cursor-pointer"
                    >
                      <Save size={18} />
                      <span className="opacity-0 max-w-0 h-0 p-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[120px] transition-all duration-300 ease-in-out group-hover:h-5 ">
                        Save Poster
                      </span>
                    </button>
                    <button
                      onClick={() => setTempPosterFile(null)}
                      className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300 active:scale-95 transition cursor-pointer"
                    >
                      <Trash2 size={18} />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
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
                    {project.description}
                  </p>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
