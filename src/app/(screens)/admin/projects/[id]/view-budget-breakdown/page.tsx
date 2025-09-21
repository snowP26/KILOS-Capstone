"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, SquarePen, Image } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { project, project_budget } from "@/src/app/lib/definitions";
import { getProjectBudgetById, getProjectByID } from "@/src/app/actions/projects";

export default function ViewBudgetBrkdwn() {
    const router = useRouter();
    const params = useParams();
    const blob = Array.isArray(params.id) ? decodeURIComponent(params.id[0] ?? "") : decodeURIComponent(params.id ?? "");
    const projectID = Number(blob.split("-").pop());
    const [project, setProject] = useState<project | null>(null);
    const [projectBudget, setProjectBudget] = useState<project_budget[]>([]);

    useEffect(() => {
        const getData = async () => {
            const projectData = await getProjectByID(projectID);
            const projectBudgetData = await getProjectBudgetById(projectID);

            if (projectData) setProject(projectData);
            if (projectBudgetData) setProjectBudget(projectBudgetData);
        }

        getData()

    }, [projectID])


    return (
        <div className="bg-[#E6F1FF] min-h-screen py-10">
            {/* Breadcrumb */}
            <div className="mx-20">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Button
                                className="group gap-1 bg-transparent px-0 hover:bg-transparent"
                                variant="ghost"
                                onClick={() => router.push(`/admin/projects/${project?.title}-${project?.id}`)}
                            >
                                <ArrowLeft className="h-5 w-5 text-gray-700" />
                                <span className="hidden group-hover:inline-block transition-all">
                                    Return
                                </span>
                            </Button>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin/projects">
                                Proposed Projects
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/admin/projects/[id]">
                                View Proposed Project
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-semibold">
                                View Budget Breakdown
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="mx-20 mt-10 space-y-8">
                {/* Title + Budget Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <h1 className="font-bold text-2xl md:text-3xl">
                        {project?.title}
                    </h1>

                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm">
                        <p className="text-gray-700 font-medium">Set Budget:</p>
                        <p className="text-[#28A745] text-lg md:text-xl font-bold">
                            ₱999,999,999.00
                        </p>
                        <SquarePen
                            size="18px"
                            className="cursor-pointer text-gray-600 hover:text-black"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="text-center w-40">Status</TableHead>
                                <TableHead className="text-center">Item Name</TableHead>
                                <TableHead className="text-center">Price</TableHead>
                                <TableHead className="text-center">Amount</TableHead>
                                <TableHead className="text-center">Receipt</TableHead>
                                <TableHead className="text-center">Photo</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {projectBudget.map((data) => (
                                <TableRow key={data.id}>
                                    <TableCell className="text-center">
                                        <Select>
                                            <SelectTrigger className="w-fit mx-auto">
                                                <SelectValue placeholder="FOR APPROVAL" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="approved" className="text-[#28A745]">
                                                        APPROVED
                                                    </SelectItem>
                                                    <SelectItem value="rejected" className="text-[#A7282A]">
                                                        REJECTED
                                                    </SelectItem>
                                                    <SelectItem value="resubmit" className="text-[#FF6904]">
                                                        RESUBMIT
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-center">{data.item_name}</TableCell>
                                    <TableCell className="text-center">{data.price}</TableCell>
                                    <TableCell className="text-center">{data.amt}</TableCell>
                                    <TableCell className="text-center">
                                        <Image className="mx-auto cursor-pointer hover:text-gray-700" />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Image className="mx-auto cursor-pointer hover:text-gray-700" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </div>
        </div>
    );
}
