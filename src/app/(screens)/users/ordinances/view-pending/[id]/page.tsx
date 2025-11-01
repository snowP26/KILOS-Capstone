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
import { ordinance, ordinance_approvals, ordinanceFiles } from "@/src/app/lib/definitions";
import {
  deletePendingOrdinanceFile,
  getOrdinanceByTitle,
  getPendingOrdinanceFile,
  getPendingOrdinanceStatus,
  uploadOrdinanceFile,
} from "@/src/app/actions/ordinances";
import Swal from "sweetalert2";
import { getDisplayName } from "@/src/app/actions/convert";

export default function ViewOrdinance() {
  const params = useParams();
  const id = params?.id as string;
  const [ordinance, setOrdinance] = useState<ordinance[]>([]);
  const [ordinanceFile, setOrdinanceFile] = useState<ordinanceFiles[]>([]);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [ordinanceApprovals, setOrdinanceApprovals] = useState<
    ordinance_approvals[]
  >([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const setData = async () => {
      const data = await getOrdinanceByTitle(id);
      const ordinanceID = data[0].id
      setOrdinance(data);

      if (ordinanceID) {
        const approvals = await getPendingOrdinanceStatus(ordinanceID);
        setOrdinanceApprovals(approvals);

        const file = await getPendingOrdinanceFile(ordinanceID);
        if (file) {
          setOrdinanceFile(
            Array.isArray(file) ? (file as ordinanceFiles[]) : ([file] as ordinanceFiles[])
          );
        }
      }
    };

    setData();
  }, [id, selectedFile]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedFile([]);
    if (!selectedFile || ordinance.length === 0) return;

    try {
      await uploadOrdinanceFile(selectedFile, ordinance[0].id);
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



  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Deleted files are not going to be retrievable",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        deletePendingOrdinanceFile(ordinance[0].id, selected);

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
    <div className="bg-[#E6F1FF] min-h-screen max-h-fit mt-10 pb-10">
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
                    className={`px-3 py-1 rounded-full text-sm font-medium ${data.status === "pending"
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

        <div className="mt-4 space-y-4">

          {selectedFile.length > 0 && (
            <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <p className="text-blue-800 font-semibold text-lg">Files to Upload</p>
                <Button
                  onClick={() => setSelectedFile([])}
                >
                  Clear All
                </Button>
                <Button
                  onClick={handleUpload}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  Upload All
                </Button>
              </div>

              <div className="flex flex-row flex-wrap gap-4">

                {selectedFile.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border border-blue-200 w-full sm:w-[48%] md:w-[45%] lg:w-[30%]"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-gray-800 w-full truncate overflow-hidden whitespace-nowrap">
                        {file.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {file.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 border-blue-400 text-blue-600 hover:bg-blue-50"
                        onClick={handleUpload}
                      >
                        Upload
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setSelectedFile((prev) => prev.filter((_, index) => index !== i))
                        }
                        title="Remove file"
                        className="rounded-full hover:bg-red-100"
                      >
                        <X className="h-5 w-5 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {selectedFile.length === 0 && ordinanceFile.length > 0 && (
            <>
              <div className="flex flex-row items-center justify-between w-full gap-3 min-h-11">
                <p className="text-gray-600 font-medium">Uploaded Files:</p>

                <div className="flex flex-row items-center gap-2">


                  {selected.length > 0 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDelete}
                      title="Remove file"
                      className="bg-red-100 cursor-pointer text-red-600 border border-red-200 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-200 hover:text-red-800 transition-all duration-200"
                    >
                      Delete Selected ({selected.length})
                    </Button>
                  )}
                </div>
              </div>


              <div className="flex flex-row flex-wrap gap-4">

                <div className="flex items-center justify-between h-[78px] min-w-40 w-full max-w-lg rounded-2xl shadow-md border transition-all duration-200 bg-white">
                  <form
                    onSubmit={handleUpload}
                    className="flex flex-row items-center justify-center gap-3 w-full h-full rounded-2xl"
                  >
                    <label className="flex items-center justify-center mx-3 my-2 flex-1 h-[80%] cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 px-4 py-3 text-gray-500 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
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
                      <div className="ml-3 flex flex-col">
                        <span className="text-sm font-medium">Upload File</span>
                        <span className="text-xs text-gray-400">.PDF only</span>
                      </div>

                      <Input
                        type="file"
                        className="hidden"
                        accept="application/pdf"
                        multiple
                        onChange={(e) => {
                          if (e.target.files) {
                            const filesArray = Array.from(e.target.files);
                            console.log(filesArray);
                            setSelectedFile(filesArray);
                          }
                        }}
                      />
                    </label>
                  </form>
                </div>
                {ordinanceFile.length > 0 && (
                  [...ordinanceFile]
                    .sort((a, b) => (b.uploaded ? 1 : 0) - (a.uploaded ? 1 : 0))
                    .map((data, i) => {
                      const isSelected = selected.includes(data.id)
                      return (
                        <div
                          key={i}
                          className={`flex items-center justify-between h-[78px] p-4 min-w-40 w-full rounded-2xl shadow-md max-w-lg border transition-all duration-200  ${data.uploaded ? "border-green-500 bg-green-200" : isSelected ? "border-blue-300 bg-blue-200" : "border-gray-200 hover:bg-gray-50 bg-white "}`}
                          onClick={() => {
                            setSelected((prev) =>
                              prev.includes(data.id) ? prev.filter((id) => id !== data.id) : [...prev, data.id]
                            )
                          }}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">
                              {getDisplayName(data.name)}
                            </span>
                            <span className="text-sm text-gray-500">{data.type.toUpperCase()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => window.open(data.url, "_blank")}
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Button>

                          </div>
                        </div>
                      )
                    })
                  )
                }
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
