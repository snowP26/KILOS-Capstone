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
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ordinance, ordinanceFiles } from "@/src/app/lib/definitions";
import { notFound, useParams } from "next/navigation";
import {
  getFilesPerOrdinance,
  getOrdinanceByName,
} from "@/src/app/actions/admin_ordinances";

export default function SubmitOrdinances() {
  const params = useParams();
  const id = params.id as string;
  const [refresh, setRefresh] = useState(0);
  const [ordinance, setOrdinance] = useState<ordinance | null>(null);
  const [files, setFiles] = useState<ordinanceFiles | null>(null);

  const fetchData = async () => {
    const data = await getOrdinanceByName(id);
    setOrdinance(data as ordinance);
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordinance?.approvals &&
              typeof ordinance.approvals === "object" ? (
                Object.entries(ordinance.approvals).map(
                  ([stage, details], index) => (
                    <TableRow
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {/* Stage */}
                      <TableCell className="text-center font-medium">
                        {stage}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="text-center">
                        <Select
                          defaultValue={details.status || "pending"}
                          onValueChange={(value) => {
                            setOrdinance((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    approvals: {
                                      ...prev.approvals,
                                      [stage]: {
                                        ...details,
                                        status: value as
                                          | "in progress"
                                          | "pending"
                                          | "approved"
                                          | "vetoed",
                                      },
                                    },
                                  }
                                : prev
                            );
                          }}
                        >
                          <SelectTrigger className="w-[140px] mx-auto">
                            <SelectValue placeholder="Pending" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in progress">
                                In Progress
                              </SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="vetoed">Vetoed</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </TableCell>

                      {/* Dates */}
                      <TableCell className="text-center">
                        <input
                          type="date"
                          defaultValue={details["start-date"] || ""}
                          className="p-1.5 border border-gray-300 rounded-md text-sm w-[150px] text-center"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <input
                          type="date"
                          defaultValue={details["end-date"] || ""}
                          className="p-1.5 border border-gray-300 rounded-md text-sm w-[150px] text-center"
                        />
                      </TableCell>

                      {/* Approver */}
                      <TableCell className="text-center">
                        <input
                          type="text"
                          defaultValue={details.approver || ""}
                          placeholder="—"
                          className="p-1.5 border border-gray-300 rounded-md text-sm w-[180px] text-center"
                        />
                      </TableCell>

                      {/* Remarks */}
                      <TableCell className="text-center">
                        <textarea
                          defaultValue={details.remarks || ""}
                          placeholder="—"
                          rows={3}
                          className="p-1.5 border border-gray-300 rounded-md text-sm w-full resize-none"
                        />
                      </TableCell>
                    </TableRow>
                  )
                )
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center italic text-gray-500 py-4"
                  >
                    No approval data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mx-20 mt-10">
          <div className="bg-white py-2 px-10 w-fit mt-2 flex flex-row gap-2 rounded-[8px]">
            <CircleCheck fill="#A3C4A8" size="18" className="self-center" />
            <p>Submitted File Placeholder</p>
          </div>
        </div>
        <div className="mx-20 mt-6 flex justify-end gap-4">
          <Button
            variant="outline"
            className="text-gray-700 border-gray-400 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button className="bg-[#052659] text-white hover:bg-[#073b88] transition-colors">
            Submit
          </Button>
        </div>

        <button onClick={() => getFilesPerOrdinance(ordinance?.id as number)}>
          Hello
        </button>
      </div>
    </div>
  );
}
