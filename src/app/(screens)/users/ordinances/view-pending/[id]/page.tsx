"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import { ordinance, ordinance_approvals } from "@/src/app/lib/definitions";
import {
  deletePendingOrdinanceFile,
  getOrdinanceByTitle,
  getPendingOrdinanceFile,
  getPendingOrdinanceStatus,
  uploadOrdinanceFile,
} from "@/src/app/actions/ordinances";
import Swal from "sweetalert2";

type OrdinanceFile = {
  url: string;
  name: string;
  type: string;
};

export default function ViewOrdinance() {
  const params = useParams();
  const id = params?.id as string;
  const [ordinance, setOrdinance] = useState<ordinance[]>([]);
  const [ordinanceFile, setOrdinanceFile] = useState<OrdinanceFile | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ordinanceApprovals, setOrdinanceApprovals] = useState<
    ordinance_approvals[]
  >([]);

  useEffect(() => {
    const setData = async () => {
      const data = await getOrdinanceByTitle(id);
      setOrdinance(data);

      if (data && data.length > 0) {
        const approvals = await getPendingOrdinanceStatus(data[0].id);
        setOrdinanceApprovals(approvals);

        const file = await getPendingOrdinanceFile(data[0].id);
        if (file) setOrdinanceFile(file);
      }
    };

    setData();
  }, [id, selectedFile]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || ordinance.length === 0) return;

    try {
      await uploadOrdinanceFile(selectedFile, ordinance[0].id);
      setSelectedFile(null);

      Swal.fire({
        title: "Success!",
        text: "Your file has been uploaded.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Upload failed:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while uploading.",
        icon: "error",
      });
    }
  };

  const getDisplayName = (fileName: string) => {
    const parts = fileName.split("_");
    return parts.length > 2 ? parts.slice(2).join("_") : fileName;
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This file will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        deletePendingOrdinanceFile(ordinance[0].id);
        setOrdinanceFile(null);

        await Swal.fire({
          title: "Deleted!",
          text: "The file has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("File deletion failed:", error);
        await Swal.fire({
          title: "Error",
          text: "Something went wrong while deleting the file.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="bg-[#E6F1FF] h-screen mt-10">
      {/* Breadcrumb */}
      <Breadcrumb className="ml-20">
        <BreadcrumbList>
          <Button
            className="group gap-0 relative bg-[#E6F1FF] cursor-pointer"
            variant="link"
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
            <BreadcrumbLink href="/users/ordinances/">
              Ordinances & Resolutions
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/users/ordinances/view-pending">
              My Pending Ordinances & Resolutions
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">
              Ordinance {id}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Ordinance Title + Description */}
      {ordinance.map((data) => (
        <div key={data.id}>
          <p className="font-bold text-3xl mt-8 mb-2 ml-30">
            Ordinance {data.title}
          </p>
          <hr className="border-t border-black w-[90%] mx-auto mt-3 mb-2" />
          <p className="text-md mb-2 ml-30">{data.description}</p>
        </div>
      ))}

      {/* Status Table */}
      <div className="mx-20 mt-10">
        <Table className="bg-white w-[100%] rounded-xl shadow">
          <TableCaption className="mt-2">
            Status of Ordinance for each Reading.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px] text-center">-</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Date Started</TableHead>
              <TableHead className="text-center">Date Completed</TableHead>
              <TableHead className="text-center">Responsible Office</TableHead>
              <TableHead className="w-[500px] text-center">Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordinanceApprovals.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="max-w-[150px] text-center">
                  {data.stage}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      data.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : data.status === "in progress"
                        ? "bg-blue-100 text-blue-800"
                        : data.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {data.status.toUpperCase()}
                  </span>
                </TableCell>
                <TableCell className="text-center italic">
                  {data.start_date
                    ? new Date(data.start_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "-"}
                </TableCell>
                <TableCell className="text-center italic">
                  {data.end_date
                    ? new Date(data.end_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "-"}
                </TableCell>
                <TableCell className="text-center">{data.approver}</TableCell>
                <TableCell className="text-center">{data.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* File Section */}
      <div className="mx-20 mt-10">
        <p className="font-semibold text-xl pt-5">Ordinance Document</p>
        <p className="text-gray-500 italic text-md">
          Please submit the PDF of the ordinance or any necessary documents.
        </p>

        {ordinanceFile ? (

          <div className="flex items-center justify-between mt-4 p-4 bg-white rounded-2xl shadow-md max-w-lg border border-gray-200">
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">
                {getDisplayName(ordinanceFile.name)}
              </span>
              <span className="text-sm text-gray-500">
                {ordinanceFile.type.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => window.open(ordinanceFile.url, "_blank")}
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                title="Remove file"
                className="rounded-full hover:bg-red-100"
              >
                <X className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </div>
        ) : selectedFile ? (
          <form
            className="flex items-center justify-between mt-4 p-4 bg-white rounded-2xl shadow-md max-w-lg border border-gray-200"
            onSubmit={handleUpload}
          >
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">
                {selectedFile.name}
              </span>
              <span className="text-sm text-gray-500">
                {selectedFile.type.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 cursor-pointer"
                type="submit"
              >
                Upload
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedFile(null)}
                title="Remove file"
                className="rounded-full hover:bg-red-100"
              >
                <X className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-4 flex">
            <form
              onSubmit={handleUpload}
              className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm max-w-md w-full"
            >
              <label className="flex flex-col items-center justify-center flex-1 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 px-4 py-5 text-center text-gray-500 hover:border-blue-400 hover:bg-blue-50 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16v-8m0 0l-3 3m3-3l3 3m6 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5m14-2l-4-4m0 0L12 4l-4 4"
                  />
                </svg>
                <span className="text-sm font-medium">Upload File</span>
                <span className="text-xs text-gray-400">.PDF only</span>
                <Input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setSelectedFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
