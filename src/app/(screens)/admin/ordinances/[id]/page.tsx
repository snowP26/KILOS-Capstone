"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CircleCheck, Eye } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ordinance,
  ordinance_approvals,
  ordinanceFiles,
} from "@/src/app/lib/definitions";
import { useParams } from "next/navigation";
import {
  getApprovalPerOrdinance,
  getFilesPerOrdinance,
  getOrdinanceByName,
  updateApproval,
} from "@/src/app/actions/admin_ordinances";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import { clearOrdinanceFile, getPendingOrdinanceFile, setOrdinanceFile } from "@/src/app/actions/ordinances";
import { getDisplayName, getLocFromAuth } from "@/src/app/actions/convert";

export default function SubmitOrdinances() {
  const router = useRouter();

  const params = useParams();
  const id = params.id as string;
  const [refresh, setRefresh] = useState(0);
  const [ordinance, setOrdinance] = useState<ordinance | null>(null);
  const [files, setFiles] = useState<ordinanceFiles[]>([]);
  const [approval, setApproval] = useState<ordinance_approvals[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<{ id: number, uploaded: boolean } | null>(null);
  const [uploaded, setUploaded] = useState(0)

  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<ordinance_approvals>>({});

  const handleEdit = (row: ordinance_approvals) => {
    setEditingRow(row.id);
    setFormData(row);
  };

  const handleChange = <K extends keyof ordinance_approvals>(
    field: K,
    value: ordinance_approvals[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!editingRow) return;

    if (formData.status === "approved" || formData.status === "vetoed") {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Once marked as ${formData.status?.toUpperCase()}, this cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, confirm",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) {
        return;
      }
    }

    await updateApproval(editingRow, formData);
    setEditingRow(null);
    setRefresh((prev) => prev + 1);
  };

  const fetchData = async () => {
    setLoading(true)
    const location = await getLocFromAuth()
    const data = await getOrdinanceByName(id);

    if (location !== Number(data?.location)) {
      setLoading(false)
      return null
    }
    const ordinanceStatus = await getApprovalPerOrdinance(data?.id);
    const pendingFile = await getPendingOrdinanceFile(data?.id);
    setApproval(ordinanceStatus);
    setOrdinance(data as ordinance);
    setFiles(pendingFile);
    setSelected(null)
    setLoading(false)
  };


  useEffect(() => {
    fetchData();
  }, [refresh, id]);

  useEffect(() => {
    setUploaded(files.filter((f) => f.uploaded).length)
  }, [refresh])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E6F1FF] px-4">
        <h1 className="text-xl font-semibold text-gray-700">
          Loading Ordinance Details...
        </h1>
        <p className="text-gray-500 mt-2 text-center text-sm">
          Please wait while we fetch the ordinance information.
        </p>
      </div>
    );
  }



  if (ordinance && !loading) {
    return (
      <div className="bg-[#E6F1FF] min-h-screen max-h-full mt-10">
        <Breadcrumb className="ml-5 lg:ml-20">
          <BreadcrumbList>
            <Button
              className="group gap-0 relative bg-[#E6F1FF] cursor-pointer"
              variant="link" onClick={() => router.back()}
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
              <BreadcrumbLink href="/admin/ordinances">
                Proposed Ordinances
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">
                View Proposed Ordinance
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="lg:mx-25">
          <p className="font-bold text-2xl ml-5 mt-8 mb-2 lg:text-3xl lg:ml-30">
            Ordinance {ordinance?.title}
          </p>
          <hr className="border-t border-black w-[90%] mx-auto mt-3 mb-2" />
          <p className="text-sm ml-10 mb-2 lg:text-md lg:ml-30">{ordinance?.description}</p>

          <div className="mt-10 mx-5 lg:mx-20">
            <Table className="bg-white w-full rounded-lg overflow-hidden shadow-md border">
              <TableCaption className="mt-2 mb-2 lg:mb-0 text-sm text-gray-500">
                Status of Proposed Ordinance for Each Reading
              </TableCaption>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="w-32 text-center font-semibold">
                    Stage
                  </TableHead>
                  <TableHead className="min-w-40 text-center font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Date Started
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Date Completed
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Responsible Office
                  </TableHead>
                  <TableHead className="w-[300px] text-center font-semibold">
                    Remarks
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approval.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="text-center">{a.stage}</TableCell>

                    {/* Status */}
                    <TableCell className="text-center">
                      {editingRow === a.id ? (
                        <Select
                          value={formData.status}
                          onValueChange={(val) => handleChange("status", val)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="vetoed">Vetoed</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${a.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : a.status === "in progress"
                              ? "bg-blue-100 text-blue-800"
                              : a.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                          {a.status.toUpperCase()}
                        </span>
                      )}
                    </TableCell>

                    {/* Dates */}
                    <TableCell className="text-center">
                      {editingRow === a.id ? (
                        <Input
                          type="date"
                          value={formData.start_date ?? ""}
                          onChange={(e) =>
                            handleChange("start_date", e.target.value)
                          }
                        />
                      ) : a.start_date ? (
                        new Date(a.start_date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        })
                      ) : (
                        "-"
                      )}
                    </TableCell>

                    <TableCell className="text-center">
                      {editingRow === a.id ? (
                        <Input
                          type="date"
                          value={formData.end_date ?? ""}
                          onChange={(e) =>
                            handleChange("end_date", e.target.value)
                          }
                        />
                      ) : a.end_date ? (
                        new Date(a.end_date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        })
                      ) : (
                        "-"
                      )}
                    </TableCell>

                    {/* Approver */}
                    <TableCell className="text-center">
                      {editingRow === a.id ? (
                        <Input
                          value={formData.approver ?? ""}
                          onChange={(e) =>
                            handleChange("approver", e.target.value)
                          }
                        />
                      ) : (
                        a.approver ?? "-"
                      )}
                    </TableCell>

                    {/* Remarks */}
                    <TableCell className="text-center">
                      {editingRow === a.id ? (
                        <Input
                          value={formData.remarks ?? ""}
                          onChange={(e) =>
                            handleChange("remarks", e.target.value)
                          }
                        />
                      ) : (
                        a.remarks ?? "-"
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-center">
                      {editingRow === a.id ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={handleSave}
                            className="cursor-pointer transition-all"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingRow(null)}
                            className="cursor-pointer transition-all"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : a.status === "approved" || a.status === "vetoed" ? (
                        <span className="text-gray-400 text-sm">Finalized</span>
                      ) : (
                        <Button
                          className="cursor-pointer transition-all"
                          size="sm"
                          onClick={() => handleEdit(a)}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-row items-center gap-3 mt-6 mb-5 lg:mb-10">
            <div className="mx-7 lg:mx-0 flex flex-col justify-center">
              <h1 className="text-gray-600 font-medium">Uploaded Files:</h1>
              <p className="text-sm text-gray-400">Select ordinance file to be uploaded</p>
            </div>

            {selected && (
              <Button
                variant="default"
                size="sm"
                onClick={async () => {
                  await setOrdinanceFile(selected.id, selected.uploaded);
                  setSelected(null);
                  setRefresh((prev) => prev + 1);
                }}
                className="bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 cursor-pointer"
              >
                Set Ordinance File
              </Button>
            )}

            {files.some((f) => f.uploaded) && (
              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  await clearOrdinanceFile(id);
                  setSelected(null);
                  setRefresh((prev) => prev + 1);
                }}
                className="bg-red-600 text-white hover:bg-red-700 active:bg-red-800 cursor-pointer"
              >
                Clear Uploaded File
              </Button>
            )}
          </div>

          <ScrollArea className="w-full px-2 pb-5">
            <div className="grid grid-flow-col grid-rows-2 gap-4 pb-1 px-1">
              {files.length > 0 ? (
                [...files]
                  .sort((a, b) => (b.uploaded ? 1 : 0) - (a.uploaded ? 1 : 0))
                  .map((data) => {
                    const isSelected = selected?.id === data.id;
                    const hasUploaded = files.some((f) => f.uploaded);
                    const isLocked = hasUploaded;

                    return (
                      <div
                        key={data.id}
                        className={`flex items-center justify-between h-[78px] p-4 w-70 lg:w-lg rounded-2xl shadow-md border transition-all duration-200 ${isLocked ? "cursor-auto" : "cursor-pointer"} ${data.uploaded ? "border-green-500 bg-green-200" : isSelected ? "border-blue-300 bg-blue-100" : "border-gray-200 hover:bg-gray-50 bg-white"}`}
                        onClick={() => {
                          if (!isLocked) {
                            setSelected({ id: data.id, uploaded: data.uploaded });
                          }
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800 max-w-40 lg:max-w-90 truncate">
                            {getDisplayName(data.name)}
                          </span>
                          <span className="text-sm text-gray-500">{data.type.toUpperCase()}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(data.url, "_blank")}
                            className="flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="flex justify-center lg:justify-start">
                  <h1 className="mt-10 lg:mt-5 lg:mx-20 bg-white py-2 px-10 w-fit font-semibold italic rounded-[8px]">No files attached.</h1>
                </div>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E6F1FF] px-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Ordinance Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            The ordinance you’re trying to view either doesn’t exist or you don’t have permission to access it.
          </p>
          <Button
            onClick={() => router.push("/admin/ordinances")}
            className="cursor-pointer transition-all"
          >
            Return to Ordinances
          </Button>
        </div>
      </div>
    );
  }
}
