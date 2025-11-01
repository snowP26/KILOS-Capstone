"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ComNav } from "../../../components/community/nav";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableFooter,
    TableRow,
} from "@/components/ui/table";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ViewProject() {
    const router = useRouter();
    const [showDetails, setShowDetails] = useState(true);

    return (
        <div className="bg-[#EEF2ED] min-h-screen max-h-full">
            <ComNav />
            <Breadcrumb className="ml-5 lg:mt-2 xl:ml-20">
                <BreadcrumbList>
                    <Button
                        className="group gap-0 relative cursor-pointer"
                        variant="link"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft color="black" />
                        <span className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </span>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical" />
                    </div>

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            onClick={() => router.push(`/upcoming-events/`)}
                            className="cursor-pointer"
                        >
                            Upcoming Events
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">
                            View Project: Title
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className="mt-10 mb-5 text-2xl font-bold text-center lg:text-start lg:mx-10 xl:mx-20">
                HIBLA: Weaving Safety, Dignity, and Dialogue
            </h1>
            <div className="flex flex-col px-5 mt-10 lg:flex-row lg:gap-5 xl:px-20">
                <div className="h-full lg:w-[30%] place-self-center">
                    <div className=" bg-black aspect-3/4 object-cover">
                        {/* <img>

                        </img> */}
                    </div>

                    <div className="flex flex-row gap-2 justify-center my-5">
                        <div className="bg-amber-200 px-3 py-2 font-semibold rounded-md">
                            Naga City
                        </div>
                        <div className="bg-amber-200 px-3 py-2 font-semibold rounded-md">
                            June 21, 2025
                        </div>
                    </div>
                </div>

                <div className="lg:w-[70%]">
                    <div className="bg-white w-full rounded-md p-5 mb-10 shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">

                        {showDetails ?
                            <ScrollArea className="h-150 lg:h-90 xl:h-150 pr-5">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Aliquam erat volutpat. Integer aliquam purus sit amet luctus venenatis lectus magna fringilla urna. Urna id volutpat lacus laoreet non curabitur gravida arcu ac.

                                    Enim eu turpis egestas pretium aenean pharetra magna. Faucibus scelerisque eleifend donec pretium vulputate sapien. Laoreet sit amet cursus sit amet dictum sit amet justo. Ultrices dui sapien eget mi proin sed libero enim sed. Sollicitudin tempor id eu nisl nunc mi. Tempus quam pellentesque nec nam aliquam sem et tortor. Urna id volutpat lacus laoreet non curabitur gravida arcu ac. Magna sit amet purus gravida quis blandit. Sed libero enim sed faucibus turpis in.

                                    Adipiscing tristique risus nec feugiat in fermentum posuere. Pharetra convallis posuere morbi leo urna. Aenean et tortor at risus viverra adipiscing at in. Dolor purus non enim praesent elementum facilisis leo. At elementum eu facilisis sed. Eget nunc scelerisque viverra mauris in aliquam. Ut tristique et egestas quis. Lectus proin nibh nisl condimentum id venenatis. Lacinia quis vel eros donec ac odio tempor. Ultrices dui sapien eget mi proin sed libero enim sed.

                                    Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Ac turpis egestas integer eget aliquet. Integer feugiat scelerisque varius morbi enim nunc. Dui ut ornare lectus sit amet est placerat. Viverra mauris in aliquam sem fringilla ut morbi. Mauris a diam maecenas sed enim ut. Cras semper auctor neque vitae tempus quam pellentesque. Urna id volutpat lacus laoreet non curabitur gravida arcu ac. Aliquet lectus proin nibh nisl condimentum id venenatis.

                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Aliquam erat volutpat. Integer aliquam purus sit amet luctus venenatis lectus magna fringilla urna. Urna id volutpat lacus laoreet non curabitur gravida arcu ac.

                                    Enim eu turpis egestas pretium aenean pharetra magna. Faucibus scelerisque eleifend donec pretium vulputate sapien. Laoreet sit amet cursus sit amet dictum sit amet justo. Ultrices dui sapien eget mi proin sed libero enim sed. Sollicitudin tempor id eu nisl nunc mi. Tempus quam pellentesque nec nam aliquam sem et tortor. Urna id volutpat lacus laoreet non curabitur gravida arcu ac. Magna sit amet purus gravida quis blandit. Sed libero enim sed faucibus turpis in.

                                    Adipiscing tristique risus nec feugiat in fermentum posuere. Pharetra convallis posuere morbi leo urna. Aenean et tortor at risus viverra adipiscing at in. Dolor purus non enim praesent elementum facilisis leo. At elementum eu facilisis sed. Eget nunc scelerisque viverra mauris in aliquam. Ut tristique et egestas quis. Lectus proin nibh nisl condimentum id venenatis. Lacinia quis vel eros donec ac odio tempor. Ultrices dui sapien eget mi proin sed libero enim sed.

                                    Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Ac turpis egestas integer eget aliquet. Integer feugiat scelerisque varius morbi enim nunc. Dui ut ornare lectus sit amet est placerat. Viverra mauris in aliquam sem fringilla ut morbi. Mauris a diam maecenas sed enim ut. Cras semper auctor neque vitae tempus quam pellentesque. Urna id volutpat lacus laoreet non curabitur gravida arcu ac. Aliquet lectus proin nibh nisl condimentum id venenatis.
                                </p>
                            </ScrollArea>
                            :
                            <div className="xl:h-150 ">
                                <h1 className="text-2xl">Project Budget Breakdown</h1>
                                <hr className="border-t mt-3 border-black w-full" />

                                {/* Scrollable text area */}
                                <ScrollArea className="h-50 max-h-100 lg:h-45 my-2 p-5 xl:p-0">
                                    <div className="flex-1">
                                        <p className=" leading-relaxed pr-4">
                                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                                        </p>
                                    </div>
                                </ScrollArea>
                                <Table className="bg-white w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px] text-center">#</TableHead>
                                            <TableHead className="w-[350px] text-center">Item</TableHead>
                                            <TableHead className="text-center">Amt.</TableHead>
                                            <TableHead className="text-center">Price</TableHead>
                                            <TableHead className="text-center">Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium text-center">001</TableCell>
                                            <TableCell className="text-center">Item #1</TableCell>
                                            <TableCell className="text-center">1</TableCell>
                                            <TableCell className="text-center">$250.00</TableCell>
                                            <TableCell className="text-center">$250.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableFooter className="bg-gray-200">
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-right font-bold">TOTAL:</TableCell>
                                            <TableCell className="text-center">$2,500.00</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>


                            </div>



                        }

                        <Button
                            onClick={() => setShowDetails((prev) => !prev)}
                            className="mt-5 flex justify-self-center lg:justify-self-end cursor-pointer bg-[#A3C4A8] text-black hover:bg-black hover:text-[#A3C4A8]">
                            {showDetails ? "View Budget Breakdown" : "View Project Details"}
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
