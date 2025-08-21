"use client";

import React from "react";
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

export default function ViewOrdinance() {
  const params = useParams();
  const id = params?.id as string;

  const ordinanceNum = id.replace(/^o-/, "Ordinance ");

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
            <BreadcrumbPage className="font-bold">
              {ordinanceNum}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <p className="font-bold text-3xl mt-8 mb-2 ml-30">{ordinanceNum}</p>
      <hr className="border-t border-black w-[90%] mx-auto mt-3 mb-2" />
      <p className="text-md mb-2 ml-30">
        An Ordinance Institutionalizing the Bula Youth Leadership Summit and
        Declaring It as an Annual Municipal Activity
      </p>

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
            <TableRow>
              <TableCell className="max-w-[150px] text-center">
                First Reading
              </TableCell>
              <TableCell>
                <p className="text-center font-medium bg-[#052659] rounded-2xl text-white w-auto">
                  Approved
                </p>
              </TableCell>
              <TableCell className="text-center italic">
                January 1, 2000
              </TableCell>
              <TableCell className="text-center italic">
                January 10, 2000
              </TableCell>
              <TableCell className="text-center">Sangguniang Bayan</TableCell>
              <TableCell className="text-center">
                Please collaborate with LYDO to draft the ordinance for the 2nd
                reading.
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell className="w-[150px] text-center">
                Second Reading
              </TableCell>
              <TableCell>
                <p className="text-center font-medium bg-[#052659] rounded-2xl text-white ">
                  In Progress
                </p>
              </TableCell>
              <TableCell className="text-center italic">
                January 11, 2000
              </TableCell>
              <TableCell className="text-center italic">
                March 10, 2000
              </TableCell>
              <TableCell className="text-center">
                Local Youth Development Office
              </TableCell>
              <TableCell className="text-center">-</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell className="max-w-[150px] text-center">
                Third Reading
              </TableCell>
              <TableCell>
                <p className="text-center font-medium bg-[#052659] rounded-2xl text-white ">
                  Pending
                </p>
              </TableCell>
              <TableCell className="text-center italic">
                March 11, 2000
              </TableCell>
              <TableCell className="text-center italic">
                April 1, 2000
              </TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center">-</TableCell>
            </TableRow>
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
