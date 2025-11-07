"use client";

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CirclePlus, Trash2, Image } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { project, project_budget } from "@/src/app/lib/definitions";
import {
    addBudget,
    csvType,
    deleteBudget,
    deletePhoto,
    getProjectBudgetById,
    getProjectByID,
    uploadCSVItems,
    uploadItemPhoto,
    uploadReceipt,
} from "@/src/app/actions/projects";
import { useUserRole } from "@/src/app/actions/role";
import { Skeleton } from "@/components/ui/skeleton";
import Papa from 'papaparse';



export default function ViewProjectBudget() {

    const router = useRouter();
    const params = useParams();
    const blob = Array.isArray(params.id) ? params.id[0] : params.id;
    const projectID = blob ? Number(blob.split("-").pop()) : undefined;
    const [project, setProject] = useState<project | null>(null);
    const [budget, setBudget] = useState<project_budget[]>([]);
    const { role } = useUserRole();
    const normalizedRole = role?.trim().toLowerCase();
    const formRef = useRef<HTMLFormElement>(null);
    const [refresh, setRefresh] = useState(0);
    const [budgetRefresh, setBudgetRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const totalSpent = budget.reduce(
        (sum, item) => sum + item.price * item.amt,
        0
    );
    const remainingBudget = (project?.budget ?? 0) - totalSpent;

    const handleUploadCSV = (file: File) => {
        if (!file) {
            return;
        }
        
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                await uploadCSVItems(projectID, results.data as csvType[])
                setBudgetRefresh((prev) => prev + 1)
            },
            error: (error) => {
                console.error("Error parsing CSV:", error);
            },
        });

        // kulang pa ng swal
    }

    useEffect(() => {

        const setData = async () => {
            setLoading(true);
            try {
                if (projectID) {
                    const data = await getProjectByID(projectID);
                    setProject(data);
                }
            } finally {
                setLoading(false);
            }
        };

        setData()
    }, [projectID, refresh]);

    useEffect(() => {
        const getItems = async () => {
            const budget = await getProjectBudgetById(projectID ?? 0);
            const sorted = budget.sort((a, b) => {
                if (a.status === "Approved" && b.status !== "Approved") return -1;
                if (a.status !== "Approved" && b.status === "Approved") return 1;
                return 0;
            });

            setBudget(sorted);
        }

        getItems()
    }, [projectID, budgetRefresh])

    const handleExport = () => {
        const headers = ["item_name", "price", "amt"];
        const items = budget.map((data) => [
            data.item_name,
            data.price,
            data.amt
        ])
        const file = [headers.join(','),
        ...items.map(i => i.join(","))].join("\n");
        const fileBlob = new Blob([file], { type: "text/csv;charset=utf-8" })
        const url = URL.createObjectURL(fileBlob);
        const link = document.createElement("a");


        link.href = url;
        link.setAttribute("download", `${project?.title}_Budget.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleDelete = async () => {
        if (selectedRows.length === 0) return; 

        // kulang pa ng Swal
        await deleteBudget(selectedRows);
        setBudgetRefresh((prev) => prev + 1); 
        setSelectedRows([]); 
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FBFF] text-center px-5">
                <div className="w-10 h-10 border-4 border-[#052659] border-t-transparent rounded-full animate-spin mb-4"></div>


                <h1 className="text-lg font-semibold text-gray-700">
                    Loading project details...
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Please wait while we fetch your data.
                </p>
            </div>
        );
    }


    if (!projectID || !project) {
        return (
            <div className="p-10 space-y-6">
                <Skeleton className="h-8 w-2/3 rounded-lg" />
                <div className="flex flex-col md:flex-row gap-5 justify-between">
                    <Skeleton className="h-10 w-48 rounded-lg" />
                    <Skeleton className="h-8 w-40 rounded-lg" />
                </div>

                <div className="mt-10">
                    <div className="border border-gray-200 rounded-md overflow-hidden">
                        <div className="grid grid-cols-6 bg-gray-100 p-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-5 w-full rounded" />
                            ))}
                        </div>
                        <div className="divide-y divide-gray-200">
                            {Array.from({ length: 4 }).map((_, rowIdx) => (
                                <div
                                    key={rowIdx}
                                    className="grid grid-cols-6 gap-3 p-3 items-center"
                                >
                                    {Array.from({ length: 6 }).map((_, colIdx) => (
                                        <Skeleton
                                            key={colIdx}
                                            className="h-5 w-full rounded"
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Remaining Budget Skeleton */}
                <div className="flex gap-3">
                    <Skeleton className="h-6 w-32 rounded" />
                    <Skeleton className="h-6 w-24 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#E6F1FF] min-h-screen max-h-full py-10">

            <Button onClick={handleExport}>EXPORT</Button>
            <Button onClick={handleDelete}>Delete</Button>
            <input
                id="csv-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        handleUploadCSV(file);
                    }
                }}
            />
            <Button
                onClick={() => document.getElementById("csv-upload")?.click()}
            >
                Upload CSV
            </Button>



            <Breadcrumb className="ml-5 lg:ml-20">
                <BreadcrumbList>
                    <Button
                        className="group gap-0 relative bg-[#E6F1FF] cursor-pointer"
                        variant="link"
                        onClick={() => router.back()}
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
                        <BreadcrumbLink href="/users/projects">
                            Current Projects
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={`/users/projects/${project?.title}-${projectID}`}
                        >
                            View Project
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">
                            View Project Budget
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Project Title */}
            <div className="mx-4 sm:mx-10 xl:mx-20">
                <h1 className="font-bold text-2xl xl:text-4xl mt-8 mb-6">
                    {project?.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    <div className="bg-white rounded-xl p-4 shadow text-center">
                        <p className="text-gray-500 text-sm">Set Budget</p>
                        <p className="text-[#28A745] text-xl font-bold">
                            {new Intl.NumberFormat("en-PH", {
                                style: "currency",
                                currency: "PHP",
                                minimumFractionDigits: 2,
                            }).format(project?.budget ?? 0)}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow text-center">
                        <p className="text-gray-500 text-sm">Total Spent</p>
                        <p className="text-red-600 text-xl font-bold">
                            {new Intl.NumberFormat("en-PH", {
                                style: "currency",
                                currency: "PHP",
                                minimumFractionDigits: 2,
                            }).format(totalSpent)}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow text-center">
                        <p className="text-gray-500 text-sm">Remaining</p>
                        <p
                            className={`text-xl font-bold ${remainingBudget < 0 ? "text-red-600" : "text-blue-700"
                                }`}
                        >
                            {new Intl.NumberFormat("en-PH", {
                                style: "currency",
                                currency: "PHP",
                                minimumFractionDigits: 2,
                            }).format(remainingBudget)}
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-20 xl:mt-10">
                    <Table className="bg-white w-[100%]">
                        <TableCaption className="mt-2">Breakdown of project materials used in the project.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">#</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Item Name</TableHead>
                                <TableHead className="text-center">Price per Unit</TableHead>
                                <TableHead className="text-center">Amt.</TableHead>
                                <TableHead className="text-center">Receipt</TableHead>
                                <TableHead className="text-center">Photo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody >
                            {budget.map((data, i) => (
                                <TableRow key={data.id}
                                    onClick={() => {
                                        if (normalizedRole !== 'treasurer') return
                                        if (data.status === "Approved") return
                                        setSelectedRows((prev) => prev.includes(data.id) ? selectedRows.filter((id) => id !== data.id) : [...prev, data.id])

                                    }}
                                    className={` transition-all ${selectedRows.includes(data.id) ? 'bg-gray-200 border border-gray-300 hover:bg-gray-400' : " "}`}
                                >
                                    <TableCell className="text-center">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell className="text-center align-middle">
                                        <div className="flex justify-center">
                                            <p
                                                className={`font-medium px-5 py-1 max-w-30 w-full  rounded-2xl whitespace-nowrap ${data.status === "Approved" ? "bg-green-100 text-green-800"
                                                    : data.status === "Rejected" ? "bg-red-100 text-red-800"
                                                        : data.status === "Resubmit" ? "bg-orange-100 text-orange-800"
                                                            : data.status === "For Approval" ? "bg-blue-100 text-blue-800"
                                                                : "bg-gray-100 text-gray-800"}
                                                    `}
                                            >
                                                {data.status}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-[150px] text-center">{data.item_name}</TableCell>
                                    <TableCell className="text-center">
                                        {new Intl.NumberFormat("en-PH", {
                                            style: "currency",
                                            currency: "PHP",
                                            minimumFractionDigits: 2,
                                        }).format(data.price)}
                                    </TableCell>
                                    <TableCell className="text-center">{data.amt}</TableCell>
                                    <TableCell className="flex justify-center text-center">
                                        {data.receiptURL ? (
                                            <div className="flex flex-row items-center gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition cursor-pointer">
                                                            <Image className="w-7 h-7 text-blue-600 " />
                                                        </button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[500px]">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-2xl text-center">
                                                                {data.item_name} Receipt Photo
                                                            </DialogTitle>
                                                            <hr className="border-t border-black w-full my-3" />
                                                            <img
                                                                src={data.receiptURL}
                                                                className="rounded-md shadow-md max-h-[400px] mx-auto object-contain"
                                                                alt={`${data.item_name} Receipt`}
                                                            />
                                                        </DialogHeader>
                                                    </DialogContent>
                                                </Dialog>

                                                {/* Delete Photo */}
                                                {normalizedRole == 'treasurer' && (
                                                    <button
                                                        className="text-xs cursor-pointer bg-red-500 rounded-sm transition-transform duration-300 hover:scale-110 hover:bg-red-600"
                                                        onClick={async () => {
                                                            await deletePhoto(data.id, false);
                                                            setRefresh((prev) => prev + 1);
                                                        }}
                                                    >
                                                        <Trash2 className="p-1" color="white" />
                                                    </button>
                                                )}
                                            </div>
                                        ) : (normalizedRole == 'treasurer' ? (
                                            <label className="flex items-center cursor-pointer">
                                                <span className="px-3 py-2 bg-gray-100 border rounded-md hover:bg-gray-200 cursor-pointer w-fit">
                                                    Upload Receipt Photo
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;
                                                        await uploadReceipt(data.id, file, project?.title ?? "unknown");
                                                        setRefresh((prev) => prev + 1);
                                                    }}
                                                />
                                            </label>
                                        ) : (
                                            <h1>No photo available</h1>
                                        )
                                        )}
                                    </TableCell>
                                    <TableCell className="justify-items-center">
                                        {data.photoURL ? (
                                            <div className="flex flex-row items-center gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition cursor-pointer">
                                                            <Image className="w-7 h-7 text-blue-600 " />
                                                        </button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[500px]">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-2xl text-center">
                                                                {data.item_name} Photo
                                                            </DialogTitle>
                                                            <hr className="border-t border-black w-full my-3" />
                                                            <img
                                                                src={data.photoURL}
                                                                className="rounded-md shadow-md max-h-[400px] mx-auto object-contain"
                                                                alt={`${data.item_name} Photo`}
                                                            />
                                                        </DialogHeader>
                                                    </DialogContent>
                                                </Dialog>

                                                {/* Delete Photo */}
                                                {normalizedRole == 'treasurer' && (
                                                    <button
                                                        className="text-xs cursor-pointer bg-red-500 rounded-sm transition-transform duration-300 hover:scale-110 hover:bg-red-600"
                                                        onClick={async (e) => {
                                                            await deletePhoto(data.id, true)
                                                            setRefresh((prev) => prev + 1);
                                                        }}
                                                    >
                                                        <Trash2 className="p-1" color="white" />
                                                    </button>
                                                )}
                                            </div>
                                        ) : (normalizedRole == 'treasurer' ? (
                                            <label className="flex items-center cursor-pointer">
                                                <span className="px-3 py-2 bg-gray-100 border rounded-md hover:bg-gray-200 cursor-pointer w-fit">
                                                    Upload Item Photo
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;
                                                        await uploadItemPhoto(data.id, file, project?.title ?? "unknown");
                                                        setRefresh((prev) => prev + 1);
                                                    }}
                                                />
                                            </label>
                                        ) : (
                                            <h1>No photo available</h1>
                                        )
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {normalizedRole == 'treasurer' && (
                                <TableRow>
                                    <TableCell colSpan={7} className="px-2 py-1">

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button
                                                    className="w-full flex items-center justify-center py-3 rounded-md border border-dashed border-gray-400 bg-blue-50 text-blue-500 font-medium cursor-pointer transition-colors hover:bg-blue-100 hover:border-blue-500"
                                                >
                                                    <CirclePlus size={16} />
                                                    <span>Add Item</span>
                                                </button>
                                            </DialogTrigger>

                                            <DialogContent className="sm:max-w-[500px]">
                                                <DialogHeader>
                                                    <DialogTitle className="text-xl font-semibold">Add New Item</DialogTitle>
                                                    <DialogDescription>
                                                        Fill in the details below to add a new item to the project budget.
                                                    </DialogDescription>

                                                </DialogHeader>

                                                {/* Form */}
                                                <form
                                                    className="space-y-4 mt-4"
                                                    ref={formRef}
                                                    onSubmit={async (e) => {
                                                        await addBudget(e, formRef, project.title, projectID)
                                                    }}
                                                >
                                                    {/* Item Name */}
                                                    <div className="flex flex-col gap-2">
                                                        <label className="font-medium">Item Name</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter item name"
                                                            className="border border-gray-300 rounded-md p-2"
                                                            name="item_name"
                                                            required
                                                        />
                                                    </div>

                                                    {/* Price */}
                                                    <div className="flex flex-col gap-2">
                                                        <label className="font-medium">Price (₱)</label>
                                                        <input
                                                            type="number"
                                                            placeholder="0.00"
                                                            step="1.00"
                                                            className="border border-gray-300 rounded-md p-2"
                                                            name="price"
                                                            required
                                                        />
                                                    </div>

                                                    {/* Amount */}
                                                    <div className="flex flex-col gap-2">
                                                        <label className="font-medium">Amount</label>
                                                        <input
                                                            type="number"
                                                            step="any"
                                                            placeholder="0"
                                                            className="border border-gray-300 rounded-md p-2"
                                                            name="amt"
                                                            required
                                                        />
                                                    </div>

                                                    {/* Receipt Upload */}
                                                    <div className="flex flex-col gap-2">
                                                        <label className="font-medium">Receipt</label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="border border-gray-300 rounded-md p-2 cursor-pointer"
                                                            name="receipt"
                                                        />
                                                    </div>

                                                    {/* Item Photo Upload */}
                                                    <div className="flex flex-col gap-2">
                                                        <label className="font-medium">Item Photo</label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="border border-gray-300 rounded-md p-2 cursor-pointer"
                                                            name="item_photo"
                                                        />
                                                    </div>


                                                    {/* Actions */}
                                                    <div className="flex justify-end gap-2 mt-6">
                                                        <DialogClose asChild>
                                                            <Button variant="outline" className="cursor-pointer">
                                                                Cancel
                                                            </Button>
                                                        </DialogClose>
                                                        <Button className="bg-[#052659] text-white hover:bg-[#1A3A6D] cursor-pointer" type="submit">
                                                            Save Item
                                                        </Button>
                                                    </div>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                </div>


            </div>
        </div>
    );
}
