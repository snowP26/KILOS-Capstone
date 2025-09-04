"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CircleCheck } from "lucide-react";
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
import { getPendingOrdinanceFile } from "@/src/app/actions/ordinances";
import { getDisplayName } from "@/src/app/actions/convert";

export default function SubmitOrdinances() {
  const params = useParams();
  const id = params.id as string;
  const [refresh, setRefresh] = useState(0);
  const [ordinance, setOrdinance] = useState<ordinance | null>(null);
  const [files, setFiles] = useState<ordinanceFiles | null>(null);
  const [approval, setApproval] = useState<ordinance_approvals[]>([]);

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
        return; // do not save
      }
    }

    await updateApproval(editingRow, formData);
    setEditingRow(null);
    setRefresh((prev) => prev + 1);
  };

  const fetchData = async () => {
    const data = await getOrdinanceByName(id);
    const ordinanceStatus = await getApprovalPerOrdinance(data?.id);
    const pendingFile = await getPendingOrdinanceFile(data?.id);
    setApproval(ordinanceStatus);
    setOrdinance(data as ordinance);
    setFiles(pendingFile);
  };

  useEffect(() => {
    fetchData();
  }, [refresh, id]);

  return (
    <div className="bg-[#E6F1FF] h-screen mt-10">
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

      <div className="mx-25">
        <p className="font-bold text-3xl mt-8 mb-2 ml-30">
          Ordinance {ordinance?.title}
        </p>
        <hr className="border-t border-black w-[90%] mx-auto mt-3 mb-2" />
        <p className="text-md mb-2 ml-30">{ordinance?.description}</p>

        <div className="mx-20 mt-10">
          <Table className="bg-white w-full rounded-lg overflow-hidden shadow-md border">
            <TableCaption className="mt-2 text-sm text-gray-500">
              Status of Proposed Ordinance for Each Reading
            </TableCaption>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-32 text-center font-semibold">
                  Stage
                </TableHead>
                <TableHead className="text-center font-semibold">
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
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          a.status === "pending"
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
        {files ? (
          <div className="mx-20 mt-10">
            <div
              className="bg-white py-2 px-10 w-fit mt-2 flex flex-row gap-2 rounded-[8px]"
              onClick={() => {
                window.open(files.url, "_blank")
              }}
            >
              <CircleCheck fill="#A3C4A8" size="18" className="self-center" />
              <p>{getDisplayName(files.name)}</p>
              <p>{files.type.toUpperCase()}</p>
            </div>
          </div>
        ) : (
          <div>
            <h1>No files</h1>
          </div>
        )}

        {/* <button onClick={() => getFilesPerOrdinance(ordinance?.id as number)}>
          Hello
        </button> */}
      </div>
    </div>
  );
}
