"use client";

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
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
import { addProjectApproval, getProjectApprovals } from '@/src/app/actions/admin_projects';

export default function ViewProposedProj() {
    const router = useRouter();
    const params = useParams();
    const projectID = Array.isArray(params.id) ? decodeURIComponent(params.id[0] ?? "") : decodeURIComponent(params.id ?? "");
    const [showDetails, setShowDetails] = useState(false);
    const [project, setProject] = useState<project | null>(null);
    const [approvals, setApprovals] = useState<project_approvals[] | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            const projectData = await getProjectByID(projectID);
            const id = projectData.id
            const approvalData = await getProjectApprovals(id);
            if (projectData) {
                setProject(projectData);
                setApprovals(approvalData);
            }


        };
        fetchProject();
    }, [projectID]);


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

                <Button className="text-black bg-[#A3C4A8] w-full h-8 sm:w-fit sm:h-10 cursor-pointer hover:bg-black hover:text-[#A3C4A8]" onClick={() => router.push(`/admin/projects/${projectID}/view-budget-breakdown`)}>View Budget Breakdown</Button>

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
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

                                                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

                                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

                                                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus. Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
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
                                        <Select>
                                            <SelectTrigger className="w-[fit%] bg-[#FF7A00] cursor-pointer">
                                                <SelectValue placeholder="Action Pending" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="under-review">Under Review</SelectItem>
                                                    <SelectItem value="rejected">Rejected</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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
                                                {approvals?.map((data, i) => (
                                                    <TableRow key={data.id}>
                                                        <TableCell className="text-center">{i + 1}</TableCell>
                                                        <TableCell className="text-center">{data.recipient}</TableCell>
                                                        <TableCell className="justify-items-center">
                                                            <p className="text-center font-medium w-50 bg-[#052659] rounded-2xl text-white">
                                                                {data.status}
                                                            </p>
                                                        </TableCell>
                                                        <TableCell className="text-center text-[#1270B0] underline italic cursor-help">
                                                            Hover to view
                                                        </TableCell>
                                                        <TableCell className="flex flex-row justify-center gap-2">
                                                            <SquarePen className="cursor-pointer hover:bg-gray-300" />
                                                            <Trash2 className="cursor-pointer hover:bg-gray-300" />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>

                                        <div
                                            className="flex flex-row h-10 w-full bg-[#E6F1FF] items-center justify-center gap-2 border-black border-dashed border-1 border-x-0 cursor-pointer hover:bg-gray-300"
                                            onClick={() => addProjectApproval(project?.id)}>
                                            <CirclePlus size="15px" />
                                            <p>Add Recipient</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-auto md:mr-5 mb-5">
                            <div className="flex flex-col gap-2 justify-end items-center md:flex-row">
                                <Button
                                    className="bg-[#E6F1FF] w-fit text-black cursor-pointer hover:bg-black hover:text-[#E6F1FF]"
                                    onClick={() => setShowDetails(!showDetails)}
                                >
                                    {showDetails ? "View Project Status" : "View Project Details"}
                                </Button>
                                <Button className="bg-[#A3C4A8] w-fit text-black cursor-pointer hover:bg-black hover:text-[#A3C4A8]">
                                    Mark as Approved
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}