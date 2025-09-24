"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SquarePen, Image, Save } from "lucide-react";
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
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { project, project_budget } from "@/src/app/lib/definitions";
import {
    getProjectBudgetById,
    getProjectByID,
    updateBudgetStatus, 
} from "@/src/app/actions/projects";

export default function ViewProjectBudget() {
    const router = useRouter();
    const params = useParams();
    const blob = Array.isArray(params.id)
        ? decodeURIComponent(params.id[0] ?? "")
        : decodeURIComponent(params.id ?? "");
    const projectID = Number(blob.split("-").pop());

    const [project, setProject] = useState<project | null>(null);
    const [projectBudget, setProjectBudget] = useState<project_budget[]>([]);
    const [editedRows, setEditedRows] = useState<
        Record<number, { status: string; comment?: string }>
    >({});

    useEffect(() => {
        const getData = async () => {
            const projectData = await getProjectByID(projectID);
            const projectBudgetData = await getProjectBudgetById(projectID);

            if (projectData) setProject(projectData);
            if (projectBudgetData) setProjectBudget(projectBudgetData);
        };

        getData();
    }, [projectID]);

    const handleStatusChange = (id: number, newStatus: string) => {
        setEditedRows((prev) => ({
            ...prev,
            [id]: { ...prev[id], status: newStatus },
        }));
    };

    const handleCommentChange = (id: number, newComment: string) => {
        setEditedRows((prev) => ({
            ...prev,
            [id]: { ...prev[id], comment: newComment },
        }));
    };

    const handleSave = async (id: number) => {
        const row = editedRows[id];
        if (!row) return;

        const success = await updateBudgetStatus(id, row.status, row.comment || "");
        if (success) {
            // Update UI
            setProjectBudget((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, status: row.status, comment: row.comment }
                        : item
                )
            );
            setEditedRows((prev) => {
                const { [id]: _, ...rest } = prev;
                return rest;
            });
        }
    };

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
                                onClick={() => router.back()}
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
                            <BreadcrumbLink
                                href={`/admin/projects/${project?.title}-${project?.id}`}
                            >
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
                    <h1 className="font-bold text-2xl md:text-3xl xl:text-3xl mt-8 mb-2 xl:mb-6">
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
                                <TableHead className="text-center w-32">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {projectBudget.map((data) => {
                                const edited = editedRows[data.id];
                                const currentStatus = edited?.status || data.status || "";
                                return (
                                    <TableRow key={data.id}>
                                        {/* Status */}
                                        <TableCell className="text-center">
                                            <Select
                                                value={currentStatus}
                                                onValueChange={(val) => handleStatusChange(data.id, val)}
                                            >
                                                <SelectTrigger className="w-fit mx-auto">
                                                    <SelectValue placeholder="FOR APPROVAL" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="approved" className="text-[#28A745]">
                                                            For Approval
                                                        </SelectItem>
                                                        <SelectItem value="approved" className="text-[#28A745]">
                                                            Approved
                                                        </SelectItem>
                                                        <SelectItem value="rejected" className="text-[#A7282A]">
                                                            Rejected
                                                        </SelectItem>
                                                        <SelectItem value="resubmit" className="text-[#FF6904]">
                                                            Resubmit
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                            {/* Show comment input if rejected or resubmit */}
                                            {(currentStatus === "rejected" ||
                                                currentStatus === "resubmit") && (
                                                    <Input
                                                        placeholder="Add comment..."
                                                        className="mt-2"
                                                        value={edited?.comment || data.comment || ""}
                                                        onChange={(e) =>
                                                            handleCommentChange(data.id, e.target.value)
                                                        }
                                                    />
                                                )}
                                        </TableCell>

                                        {/* Other row data */}
                                        <TableCell className="text-center">{data.item_name}</TableCell>
                                        <TableCell className="text-center">{data.price}</TableCell>
                                        <TableCell className="text-center">{data.amt}</TableCell>

                                        {/* Receipt */}
                                        <TableCell className="text-center">
                                            {data.receiptURL ? (
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <Image className="mx-auto cursor-pointer hover:text-gray-700" />
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle className="text-2xl text-center">
                                                            {data.item_name} Receipt Photo
                                                        </DialogTitle>
                                                        <hr className="border-t border-black w-full my-3" />
                                                        <img
                                                            src={data.receiptURL}
                                                            className="rounded-md shadow-md max-h-[400px] mx-auto object-contain"
                                                            alt={`${data.item_name} Receipt`}
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            ) : (
                                                <span className="text-gray-400 text-sm">
                                                    No Receipt Photo
                                                </span>
                                            )}
                                        </TableCell>

                                        {/* Product Photo */}
                                        <TableCell className="text-center">
                                            {data.photoURL ? (
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <Image className="mx-auto cursor-pointer hover:text-gray-700" />
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle className="text-2xl text-center">
                                                            {data.item_name} Photo
                                                        </DialogTitle>
                                                        <hr className="border-t border-black w-full my-3" />
                                                        <img
                                                            src={data.photoURL}
                                                            className="rounded-md shadow-md max-h-[400px] mx-auto object-contain"
                                                            alt={`${data.item_name} Photo`}
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            ) : (
                                                <span className="text-gray-400 text-sm">
                                                    No Product Photo
                                                </span>
                                            )}
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-center">
                                            <Button
                                                size="sm"
                                                onClick={() => handleSave(data.id)}
                                                disabled={!editedRows[data.id]}
                                                className="gap-2"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
