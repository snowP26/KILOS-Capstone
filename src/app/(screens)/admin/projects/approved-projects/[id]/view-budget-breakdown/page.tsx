"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SquarePen, Image, Save, Loader2 } from "lucide-react";
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
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { project, project_budget } from "@/src/app/lib/definitions";
import {
    getProjectBudgetById,
    getProjectByID,
    updateBudget,
    updateBudgetStatus,
} from "@/src/app/actions/projects";
import { Label } from "@/components/ui/label";

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
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const [newBudget, setNewBudget] = useState<number>(0);
    const [refresh, setRefresh] = useState(0);
    const totalSpent = projectBudget.reduce((sum, item) => {
        const price = item.price || 0;
        const amt = item.amt || 0;
        return sum + price * amt;
    }, 0);
    const remainingBudget = (project?.budget ?? 0) - totalSpent;

    useEffect(() => {
        setNewBudget(0)
        const getData = async () => {
            const projectData = await getProjectByID(projectID);
            const projectBudgetData = await getProjectBudgetById(projectID);

            if (projectData) setProject(projectData);
            if (projectBudgetData) setProjectBudget(projectBudgetData);
        };

        getData();
    }, [projectID, refresh]);

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

    const handleEdit = (id: number) => {
        setEditingRowId(id);
        const row = projectBudget.find((item) => item.id === id);
        if (row) {
            setEditedRows((prev) => ({
                ...prev,
                [id]: { status: row.status, comment: row.comment || "" },
            }));
        }
    };

    const handleSave = async (id: number) => {
        const row = editedRows[id];
        if (!row) return;

        const success = await updateBudgetStatus(id, row.status, row.comment || "");
        if (success) {
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
            setEditingRowId(null);
        }
    };

    if (project == undefined) {
        return (
            <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                <p className="text-gray-500 text-sm mt-2">Loading project details...</p>
            </div>
        )
    }

    return (
        <div className="bg-[#E6F1FF] min-h-screen max-h-full py-10">
            {/* Breadcrumb */}
            <div className="mx-5 xl:mx-20">
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
                                View Projects
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href={`/admin/projects/approved-projects/${project.title}-${project.id}`}
                            >
                                {project.title}
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

            <div className="mx-5 lg:mx-20 mt-10 space-y-8">
                {/* Title + Budget Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <h1 className="font-bold text-2xl md:text-3xl xl:text-3xl mt-8 mb-2 xl:mb-6">
                        {project.title}
                    </h1>

                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm">
                        <div className=" bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-12">
                            <div className="flex flex-col items-center sm:items-start">
                                <p className="text-gray-600 text-sm font-medium">Total Spent:</p>
                                <p className="text-red-600 font-bold text-lg">
                                    {new Intl.NumberFormat("en-PH", {
                                        style: "currency",
                                        currency: "PHP",
                                        minimumFractionDigits: 2,
                                    }).format(totalSpent)}
                                </p>
                            </div>
                            <div className="flex flex-col items-center sm:items-start">
                                <p className="text-gray-600 text-sm font-medium">Remaining Budget:</p>
                                <p
                                    className={`font-bold text-lg ${remainingBudget < 0 ? "text-red-600" : "text-green-600"
                                        }`}
                                >
                                    {new Intl.NumberFormat("en-PH", {
                                        style: "currency",
                                        currency: "PHP",
                                        minimumFractionDigits: 2,
                                    }).format(remainingBudget)}
                                </p>
                            </div>
                            <div className="flex flex-col items-center sm:items-start bg-blue-50 border border-blue-200 rounded-xl px-6 py-3 shadow-sm">
                                <div className="flex items-center gap-2">
                                    <p className="text-blue-800 text-xs md:text-base font-medium uppercase ">
                                        Set Budget
                                    </p>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <SquarePen
                                                size="18px"
                                                className="cursor-pointer text-blue-700 hover:text-blue-900"
                                            />
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogTitle className="text-lg font-semibold">
                                                Adjust Budget Allocation
                                            </DialogTitle>
                                            <DialogDescription className="text-sm text-gray-500 mb-4">
                                                Modify the budget allocation for this project. Please ensure that
                                                adjustments are justified and documented properly.
                                            </DialogDescription>

                                            <div className="space-y-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="budget">New Budget Amount (₱)</Label>
                                                    <Input
                                                        id="budget"
                                                        type="number"
                                                        placeholder={`${new Intl.NumberFormat("en-PH", {
                                                            style: "currency",
                                                            currency: "PHP",
                                                            minimumFractionDigits: 2,
                                                        }).format(project.budget ?? 0)}`}
                                                        onChange={(e) => setNewBudget(Number(e.target.value))}
                                                        className="text-right"
                                                    />
                                                </div>
                                            </div>

                                            <DialogFooter className="mt-5">
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <DialogClose asChild>
                                                    <Button
                                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                                        onClick={async () => {
                                                            await updateBudget(project.id, newBudget);
                                                            setRefresh((prev) => prev + 1);
                                                        }}
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <p className="text-[#0050e6] text-lg md:text-2xl font-bold mt-1">
                                    {new Intl.NumberFormat("en-PH", {
                                        style: "currency",
                                        currency: "PHP",
                                        minimumFractionDigits: 2,
                                    }).format(project.budget ?? 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Item Name</TableHead>
                                <TableHead className="text-center">Price</TableHead>
                                <TableHead className="text-center">Amount</TableHead>
                                <TableHead className="text-center">Receipt</TableHead>
                                <TableHead className="text-center">Photo</TableHead>
                                <TableHead className="text-center">Comments</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>

                            {projectBudget.map((data) => {
                                const isEditing = editingRowId === data.id;
                                const edited = editedRows[data.id];
                                const currentStatus = edited?.status || data.status || "";

                                return (
                                    <TableRow key={data.id}>
                                        {/* Status */}
                                        <TableCell className="text-center">
                                            {isEditing ? (
                                                <>
                                                    <Select
                                                        value={currentStatus}
                                                        onValueChange={(val) =>
                                                            handleStatusChange(data.id, val)
                                                        }
                                                    >
                                                        <SelectTrigger className="w-fit mx-auto">
                                                            <SelectValue placeholder="For Approval" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="For Approval">
                                                                    For Approval
                                                                </SelectItem>
                                                                <SelectItem value="Approved">
                                                                    Approved
                                                                </SelectItem>
                                                                <SelectItem value="Rejected">
                                                                    Rejected
                                                                </SelectItem>
                                                                <SelectItem value="Resubmit">
                                                                    Resubmit
                                                                </SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </>
                                            ) : (
                                                <span
                                                    className={`px-3 py-1 rounded-full text-md font-semibold
                                                            ${data.status === "Approved"
                                                            ? "bg-green-100 text-green-800"
                                                            : data.status === "Rejected"
                                                                ? "bg-red-100 text-red-800"
                                                                : data.status === "Resubmit"
                                                                    ? "bg-orange-100 text-orange-800"
                                                                    : data.status === "For Approval" ? "bg-blue-100 text-blue-800"
                                                                        : "bg-gray-100 text-gray-800"
                                                        }`}
                                                >
                                                    {data.status}
                                                </span>
                                            )}
                                        </TableCell>

                                        {/* Other row data */}
                                        <TableCell className="text-center">{data.item_name}</TableCell>
                                        <TableCell className="text-center">
                                            {data.price !== undefined
                                                ? new Intl.NumberFormat("en-PH", {
                                                    style: "currency",
                                                    currency: "PHP",
                                                    minimumFractionDigits: 2,
                                                }).format(data.price)
                                                : "₱0.00"}
                                        </TableCell>
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

                                        {/* Comments */}
                                        <TableCell className="text-center">
                                            {isEditing ? (
                                                <Input
                                                    placeholder="Add comment..."
                                                    className="mt-2 "
                                                    value={edited?.comment || ""}
                                                    onChange={(e) =>
                                                        handleCommentChange(data.id, e.target.value)
                                                    }
                                                />
                                            ) : (
                                                <span className="text-sm text-gray-600">
                                                    {data.comment || "—"}
                                                </span>
                                            )}
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-center">
                                            {isEditing ? (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleSave(data.id)}
                                                    className="gap-2"
                                                >
                                                    <Save className="w-4 h-4" />
                                                    Save
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleEdit(data.id)}
                                                    className="gap-2"
                                                >
                                                    <SquarePen className="w-4 h-4" />
                                                    Edit
                                                </Button>
                                            )}
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
