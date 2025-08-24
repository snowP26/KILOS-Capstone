"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
import { getOrdinanceByTitle, getPendingOrdinanceStatus } from "@/src/app/actions/ordinances";

export default function ViewOrdinance() {
  const params = useParams();
  const id = params?.id as string;
  const [ordinance, setOrdinance] = useState<ordinance[]>([]);
  const [ordinanceApprovals, setOrdinanceApprovals] = useState<ordinance_approvals[]>([])

  useEffect(() => {
    const setData = async () => {
      const data = await getOrdinanceByTitle(id)
      setOrdinance(data)

      if (data && data.length > 0) {
        const approvals = await getPendingOrdinanceStatus(data[0].id);
        setOrdinanceApprovals(approvals);
      }
    }


    setData();
  }, [id])


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
      {
        ordinance.map((data) => (
          <div key={data.id}>
            <p className="font-bold text-3xl mt-8 mb-2 ml-30">Ordinance {data.title}</p>
            <hr className="border-t border-black w-[90%] mx-auto mt-3 mb-2" />
            <p className="text-md mb-2 ml-30">
              {data.description}
            </p>
          </div>
        ))
      }

      <div className="mx-20 mt-10">
        <Table className="bg-white w-[100%]">
          <TableCaption className="mt-2">
            Status of Ordinance for each Readings.
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
                  {data.start_date ? new Date(data.start_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  }) : "-"}
                </TableCell>
                <TableCell className="text-center italic">
                  {data.end_date ? new Date(data.end_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  }) : "-"}
                </TableCell>
                <TableCell className="text-center">{data.approver}</TableCell>
                <TableCell className="text-center">{data.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mx-20 mt-10">
        <p className="font-semibold text-xl pt-5">Ordinance Document</p>
        <p className="text-gray-500 italic text-md">
          Please submit the PDF of the ordinance or any necessary documents.
        </p>
        <div className="w-55 mt-2">
          <Input
            type="file"
            className="bg-white cursor-pointer hover:bg-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
