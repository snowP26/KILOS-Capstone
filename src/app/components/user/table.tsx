import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@/components/ui/hover-card";
import { project_approvals } from "../../lib/definitions";
import { getApprovalsByID } from "../../actions/projects";

type ProjectTableProps = {
    id?: number;
};

export const ProjectTable = ({ id }: ProjectTableProps) => {

    const [approvals, setApprovals] = useState<project_approvals[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            const data = await getApprovalsByID(id ?? 0)
            setApprovals(data);
            console.log(data)
        }

        fetchData();
    }, [id])

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">#</TableHead>
                    <TableHead className="text-center">Recipient</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Comments</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {approvals.map((data, i) => (
                    <TableRow key={data.id}>
                        <TableCell>
                            <p className="text-center">{i + 1}</p>
                        </TableCell>
                        <TableCell className="italic text-center">{data.recipient}</TableCell>
                        <TableCell className="text-center">
                            <div className="flex-col">
                                <p className="text-[#28A745] font-bold">{data.status}</p>
                                <p className="text-xs font-thin">{data.status_update}</p>
                            </div>
                        </TableCell>
                        <TableCell>
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
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </TableCell>
                    </TableRow>
                ))

                }

            </TableBody>
        </Table>
    )
}