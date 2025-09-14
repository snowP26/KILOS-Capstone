import React from "react";
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

export const ProjectTable = () => {
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
                <TableRow>
                    <TableCell>
                        <p className="text-center">1</p>
                    </TableCell>
                    <TableCell className="italic text-center">bulacoordinator@gmail.com</TableCell>
                    <TableCell className="text-center">
                        <div className="flex-col">
                            <p className="text-[#28A745] font-bold">Approved</p>
                            <p className="text-xs font-thin">on June 20, 2000</p>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <p className="text-center text-[#1270B0] italic underline cursor-help">Hover to view</p>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-70">
                                    <div className="space-y-2">
                                        <p className="text-xs">
                                            The project proposal has been approved by Mr. Gerald Dela Cruz of the office of the coordinator.
                                        </p>
                                        <div className="text-muted-foreground text-xs text-end">
                                            December 2021
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <p className="text-center">2</p>
                    </TableCell>
                    <TableCell className="max-w-[150px] italic text-center">bulacoordinator2@gmail.com</TableCell>
                    <TableCell className="text-[#FF6904] font-bold text-center">Needs Revision</TableCell>
                    <TableCell>
                        <div>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <p className="text-center text-[#1270B0] italic underline cursor-help">Hover to view</p>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-70">
                                    <div className="space-y-2">
                                        <p className="text-xs">
                                            The project proposal has been approved by Mr. Gerald Dela Cruz of the office of the coordinator.
                                        </p>
                                        <div className="text-muted-foreground text-xs text-end">
                                            December 2021
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <p className="text-center">3</p>
                    </TableCell>
                    <TableCell className="max-w-[150px] italic text-center">bulamayor@gmail.com</TableCell>
                    <TableCell className="text-[#FF6904] font-bold text-center">Pending</TableCell>
                    <TableCell>
                        <div>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <p className="text-center text-[#1270B0] italic underline cursor-help">Hover to view</p>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-70">
                                    <div className="space-y-2">
                                        <p className="text-xs">
                                            The project proposal has been approved by Mr. Gerald Dela Cruz of the office of the coordinator.
                                        </p>
                                        <div className="text-muted-foreground text-xs text-end">
                                            December 2021
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <p className="text-center">4</p>
                    </TableCell>
                    <TableCell className="max-w-[150px] italic text-center">bulacoordinator@gmail.com</TableCell>
                    <TableCell className=" text-center">
                        <div className="flex-col">
                            <p className="text-[#28A745] font-bold">Approved</p>
                            <p className="text-xs font-thin">on June 20, 2000</p>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <p className="text-center text-[#1270B0] italic underline cursor-help">Hover to view</p>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-70">
                                    <div className="space-y-2">
                                        <p className="text-xs">
                                            The project proposal has been approved by Mr. Gerald Dela Cruz of the office of the coordinator.
                                        </p>
                                        <div className="text-muted-foreground text-xs text-end">
                                            December 2021
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}