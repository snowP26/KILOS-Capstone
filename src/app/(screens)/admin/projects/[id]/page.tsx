"use client";

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, SquarePen, Trash2, CirclePlus } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useParams, useRouter } from 'next/navigation';
import { getProjectByID } from '@/src/app/actions/projects';
import { project, project_approvals } from '@/src/app/lib/definitions';
import { motion, AnimatePresence } from 'framer-motion';
import { addProjectApproval, deleteProjectApproval, getProjectApprovals, updateProjectApproval, updateProjectStatus } from '@/src/app/actions/admin_projects';
import Swal from 'sweetalert2';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card';

const checkStatuses = async (approval: project_approvals[] | null, id: number) => {
    if (!id || !approval) {
        return "null"
    }
    const status = approval.map(data => data.status);
    let projectStatusValue = "Under Review";

    if (status.includes("For Revision")) {
        projectStatusValue = "Action Pending";
        await updateProjectStatus(id, projectStatusValue)
        return projectStatusValue;
    }

    if (status.includes("Declined")) {
        projectStatusValue = "Declined";
        await updateProjectStatus(id, projectStatusValue)
        return projectStatusValue;
    }

    const allAccepted = status.every(s => s === "Accepted");
    if (allAccepted) {
        projectStatusValue = "For Approval";
        await updateProjectStatus(id, projectStatusValue)
        return projectStatusValue;
    }

    if (status.includes("Accepted")) {
        projectStatusValue = "Under Review";
            await updateProjectStatus(id, projectStatusValue)
        return projectStatusValue;
    }

    await updateProjectStatus(id, projectStatusValue)
    return "Pending";
}


export default function ViewProposedProj() {
    const router = useRouter();
    const params = useParams();
    const raw = Array.isArray(params.id) ? decodeURIComponent(params.id[0] ?? "") : decodeURIComponent(params.id ?? "");
    const projectID = Number(raw.split("-").pop());
    const [showDetails, setShowDetails] = useState(false);
    const [project, setProject] = useState<project | null>(null);
    const [approvals, setApprovals] = useState<project_approvals[] | null>(null);
    const [refresh, setRefresh] = useState(0);
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        recipient: "",
        status: "",
        comments: ""
    });
    const [status, setStatus] = useState("action-pending")

    useEffect(() => {
        const fetchProject = async () => {
            if(!projectID) return
            const projectData = await getProjectByID(projectID);
            const approvalData = await getProjectApprovals(projectID);
            if (projectData) {
                setProject(projectData);
                setApprovals(approvalData);
                setStatus(await checkStatuses(approvalData, projectID))
            }

        };
        fetchProject();
    }, [projectID, refresh]);


    const statusColors: Record<string, string> = {
        Pending: "bg-yellow-500",
        "For Revision": "bg-orange-500",
        Declined: "bg-red-500",
        Accepted: "bg-green-600",
        "In Progress": "bg-blue-500",
    };
    const projectStatusColors: Record<string, string> = {
        "Action Pending": "bg-orange-500 hover:bg-orange-600 focus:ring-orange-500",
        "Declined": "bg-red-500 hover:bg-red-600 focus:ring-red-500",
        "Under Review": "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500",
        "For Approval": "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
        "Pending": "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500",
    };



    return (
        <div className="bg-[#E6F1FF] min-h-screen max-h-full mt-10">
            <Breadcrumb className="ml-5 lg:ml-20">
                <BreadcrumbList>
                    <Button className="group gap-0 relative bg-[#E6F1FF] cursor-pointer" variant="link" onClick={() => router.back()}>
                        <ArrowLeft color="black" />
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </div>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical" />
                    </div>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/projects">Proposed Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">View Proposed Project</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-2 sm:mx-10 xl:mx-25">
                <p className="font-bold text-xl xl:text-3xl mt-8 mb-2 xl:mb-6">{project?.title}</p>
                <Button className="text-black bg-[#A3C4A8] w-full h-8 sm:w-fit sm:h-10 cursor-pointer hover:bg-black hover:text-[#A3C4A8]" onClick={() => router.push(`/admin/projects/${project?.title}-${project?.id}/view-budget-breakdown`)}>View Budget Breakdown</Button>


                <div className="flex flex-col lg:flex-row gap-1 place-items-center min-h-fit max-h-screen">
                    <div className="bg-white mt-10 w-[80%] h-full sm:h-150 lg:w-[35%] lg:h-155 justify-items-center place-content-center">
                        {project?.imageURL ? (
                            <img src={project.imageURL} className="bg-black mt-10 w-[70%] h-120 sm:h-[80%] lg:w-[80%] lg:h-130" />
                        ) : (
                            <div className="mt-10 flex items-center justify-center w-[70%] h-120 sm:h-[80%] lg:w-[80%] lg:h-130 rounded-[8px] bg-blue-100 text-blue-600 font-bold text-6xl shadow">
                                {project?.title?.charAt(0).toUpperCase()}
                            </div>
                        )
                        }
                        <p className="font-medium text-xl text-[#17A1FA] my-3 justify-self-start ml-15">Project Poster</p>
                    </div>

                    <div className="bg-white mb-10 w-[80%] lg:w-[80%] lg:h-155 lg:mt-10 lg:mb-0">
                        <AnimatePresence mode="wait">
                            {showDetails ? (
                                <motion.div
                                    key="details"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-[#E6F1FF] w-auto h-full mx-4 my-4 lg:h-[80%] lg:mx-5 lg:mt-8 pt-2 lg:pt-5 lg:px-10"
                                >

                                    <p className="font-semibold text-xl text-center lg:text-2xl lg:text-start">Project Description:</p>
                                    <div className="mt-2 lg:h-[90%] lg:w-full">
                                        <ScrollArea className="w-full h-100 pb-5 lg:pb-0">
                                            <p className="lg:h-full pl-4 pr-6 lg:px-10">
                                                {project?.description}
                                            </p>
                                        </ScrollArea>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="status"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-[80%] flex flex-col flex-1 mt-5 mb-5 mx-10"
                                >
                                    <div className="h-[10%]">
                                        <h1 className={`w-48 text-white font-medium rounded-lg px-3 py-2 shadow-md transition-all duration-200 ease-in-out focus:ring-2 focus:outline-none ${projectStatusColors[status]}`}>{status}</h1>

                                    </div>

                                    <div className="flex-1 overflow-y-auto my-5 lg:mb-5">
                                        <Table className="bg-[#E6F1FF] w-full">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="text-center w-50">#</TableHead>
                                                    <TableHead className="text-center">Receipient</TableHead>
                                                    <TableHead className="text-center">Status</TableHead>
                                                    <TableHead className="text-center">Comments</TableHead>
                                                    <TableHead className="text-center">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {approvals?.map((data, i) => {
                                                    const isEditing = editingRowId === data.id;

                                                    return (
                                                        <TableRow key={data.id}>
                                                            <TableCell className="text-center">{i + 1}</TableCell>

                                                            {/* Recipient cell */}
                                                            <TableCell className="text-center">
                                                                {isEditing ? (
                                                                    <input
                                                                        type="text"
                                                                        value={formData.recipient ?? ""}
                                                                        onChange={(e) =>
                                                                            setFormData({ ...formData, recipient: e.target.value })
                                                                        }
                                                                        className="border rounded p-1 w-full text-center"
                                                                    />
                                                                ) : (
                                                                    data.recipient
                                                                )}
                                                            </TableCell>

                                                            {/* Status cell */}
                                                            <TableCell className="justify-items-center">
                                                                {isEditing ? (
                                                                    <Select
                                                                        value={formData.status ?? "Pending"}
                                                                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                                                                    >
                                                                        <SelectTrigger className="w-full text-center bg-white border rounded">
                                                                            <SelectValue placeholder="Select status" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectItem value="For Revision">For Revision</SelectItem>
                                                                                <SelectItem value="Declined">Declined</SelectItem>
                                                                                <SelectItem value="Accepted">Accepted</SelectItem>
                                                                                <SelectItem value="In Progress">In Progress</SelectItem>
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                ) : (
                                                                    <p className={`text-center font-medium w-50 bg-[#052659] rounded-2xl text-white ${statusColors[data.status] ?? "bg-gray-400"}`}>
                                                                        {data.status}
                                                                    </p>
                                                                )}
                                                            </TableCell>

                                                            {/* Placeholder column */}
                                                            <TableCell>
                                                                {isEditing ? (
                                                                    <textarea
                                                                        value={formData.comments || ""}
                                                                        onChange={(e) =>
                                                                            setFormData({ ...formData, comments: e.target.value })
                                                                        }
                                                                        className="border rounded p-1 w-full text-center bg-white resize-none"
                                                                        rows={2}
                                                                        placeholder="Enter comments..."
                                                                    />
                                                                ) : data.comments ? (
                                                                    <HoverCard>
                                                                        <HoverCardTrigger asChild>
                                                                            <p className="text-center text-[#1270B0] italic underline cursor-help">
                                                                                Hover to view
                                                                            </p>
                                                                        </HoverCardTrigger>
                                                                        <HoverCardContent className="w-70 bg-white px-2 border border-gray-300 rounded-sm shadow-md">

                                                                            <div className="space-y-2">
                                                                                <p className="text-xs px-2 py-1">
                                                                                    {data.comments?.trim() || "No Comments"}
                                                                                </p>
                                                                                <div className="text-muted-foreground text-xs text-end">
                                                                                    {/* If you have a timestamp in your table, display it here */}
                                                                                    {/* {data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : "No date"} */}
                                                                                </div>
                                                                            </div>
                                                                        </HoverCardContent>
                                                                    </HoverCard>
                                                                ) : (
                                                                    <p className="text-center text-gray-400">-</p>
                                                                )}
                                                            </TableCell>


                                                            {/* Actions */}
                                                            <TableCell className="flex justify-center gap-3">
                                                                {isEditing ? (
                                                                    <>
                                                                        {/* Submit button */}
                                                                        <button
                                                                            className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
                                                                            onClick={async () => {
                                                                                const success = await updateProjectApproval(data.id, formData);

                                                                                if (success) {
                                                                                    setEditingRowId(null);
                                                                                    setRefresh((prev) => prev + 1);
                                                                                    Swal.fire("Updated!", "Approval updated successfully.", "success");
                                                                                } else {
                                                                                    Swal.fire("Error!", "Failed to update approval.", "error");
                                                                                }
                                                                            }}
                                                                        >
                                                                            Save
                                                                        </button>

                                                                        {/* Cancel button */}
                                                                        <button
                                                                            className="px-3 py-1 rounded-md bg-gray-400 text-white hover:bg-gray-500"
                                                                            onClick={() => setEditingRowId(null)}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {/* Edit button */}
                                                                        <SquarePen
                                                                            className="cursor-pointer rounded-md text-blue-600 hover:bg-blue-200 transition-colors p-0.5"
                                                                            onClick={() => {
                                                                                setEditingRowId(data.id);
                                                                                setFormData({
                                                                                    recipient: data.recipient,
                                                                                    status: data.status,
                                                                                    comments: data.comments,
                                                                                });
                                                                            }}
                                                                        />

                                                                        {/* Delete button */}
                                                                        <Trash2
                                                                            className="cursor-pointer rounded-md text-red-600 hover:bg-red-200 transition-colors p-0.5"
                                                                            onClick={async () => {
                                                                                const result = await Swal.fire({
                                                                                    title: "Are you sure?",
                                                                                    text: "This action cannot be undone.",
                                                                                    icon: "warning",
                                                                                    showCancelButton: true,
                                                                                    confirmButtonColor: "#d33",
                                                                                    cancelButtonColor: "#3085d6",
                                                                                    confirmButtonText: "Yes, delete it!",
                                                                                });

                                                                                if (result.isConfirmed) {
                                                                                    const success = await deleteProjectApproval(data.id);

                                                                                    if (success) {
                                                                                        setRefresh((prev) => prev + 1);
                                                                                        Swal.fire("Deleted!", "The approval has been removed.", "success");
                                                                                    } else {
                                                                                        Swal.fire("Error!", "Failed to delete the approval.", "error");
                                                                                    }
                                                                                }
                                                                            }}
                                                                        />
                                                                    </>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                        <div
                                            className="flex items-center justify-center gap-2 h-10 w-full rounded-md border border-dashed border-gray-400 bg-blue-50 text-blue-500 font-medium cursor-pointer transition-colors hover:bg-blue-100 hover:border-blue-500"
                                            onClick={() => {
                                                addProjectApproval(project?.id);
                                                setRefresh((prev) => prev + 1);
                                            }}
                                        >
                                            <CirclePlus size={16} />
                                            <span>Add Recipient</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-auto md:mr-5 mb-5">
                            <div className="flex flex-col gap-2 justify-end items-center md:flex-row">
                                <Button
                                    className="bg-[#E6F1FF] w-fit text-black cursor-pointer hover:bg-blue-500 hover:text-[#E6F1FF]"

                                    onClick={() => setShowDetails(!showDetails)}
                                >
                                    {showDetails ? "View Project Status" : "View Project Details"}
                                </Button>
                                {/* <Button
                                    className="bg-[#A3C4A8] text-black cursor-pointer shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg hover:text-accent hover:bg-green-800"
                                    onClick={() => console.log(project?.imageURL)}
                                >
                                    Savesss
                                </Button> */}
                                {status === "For Approval" ? (
                                    <Button
                                        className="bg-[#A3C4A8] w-fit text-black cursor-pointer hover:bg-blue-500 hover:text-[#A3C4A8]"
                                        onClick={() => console.log("Marking as approved...")}
                                    >
                                        Mark as Approved
                                    </Button>) : (<></>)
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}