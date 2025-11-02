"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
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
import { project, project_budget } from "@/src/app/lib/definitions";
import { getProjectBudgetById, getProjectByID } from "@/src/app/actions/projects";
import { locIDtoName } from "@/src/app/actions/convert";

export default function ViewProject() {
    const router = useRouter();
    const [showDetails, setShowDetails] = useState(true);
    const [project, setProject] = useState<project | null>(null);
    const [budget, setBudget] = useState<project_budget[] | null>(null);
    const [location, setLocation] = useState<string | null>(null)
    const params = useParams();
    const totalSpent = budget?.reduce(
        (sum, item) => sum + item.price * item.amt,
        0
    );

    useEffect(() => {
        const setData = async () => {
            if (params?.id) {
                const projectID = Number(params.id)
                const projectData = await getProjectByID(projectID)
                setLocation(await locIDtoName(projectData.location))
                if (projectData === null) {
                    return notFound()
                }
                const budgetData = await getProjectBudgetById(projectID)

                setProject(projectData)
                setBudget(budgetData)
            }

        }

        setData()
    }, [params?.id])

    if (!project) {
        return
    }


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
                {project?.title}
            </h1>
            <div className="flex flex-col px-5 mt-10 lg:flex-row lg:gap-5 xl:px-20">
                <div className="h-full lg:w-[30%] place-self-center">
                    {project.imageURL ? (
                        <img src={project?.imageURL} className=" bg-black aspect-3/4 object-cover" />
                    ) :
                        <div className="flex bg-blue-100 aspect-3/4 object-contain rounded-md items-center justify-center font-bold text-blue-600">
                            {project.title.charAt(0).toUpperCase()}
                        </div>
                    }


                    <div className="flex flex-row gap-2 justify-center my-5">
                        <div className="bg-amber-200 px-3 py-2 font-semibold rounded-md">
                            {location}
                        </div>
                        <div className="bg-amber-200 px-3 py-2 font-semibold rounded-md">
                            {new Date(project?.target_date || Date.now()).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                    </div>
                </div>

                <div className="lg:w-[70%]">
                    <div className="bg-white w-full rounded-md p-5 mb-10 shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">

                        {showDetails ?
                            <ScrollArea className="h-150 lg:h-90 xl:h-150 pr-5">
                                <p>
                                    {project?.description}
                                </p>
                            </ScrollArea>
                            :
                            <div className="xl:h-150 ">
                                <h1 className="text-2xl">Project Budget Breakdown</h1>
                                <hr className="border-t mt-3 border-black w-full" />

                                {/* Scrollable text area */}
                                <ScrollArea className="h-50 max-h-100 lg:h-45 my-2 p-5 xl:p-0">
                                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
                                        <p className="text-justify text-gray-700 leading-relaxed tracking-wide text-sm md:text-base space-y-4">
                                            This budget breakdown has been carefully reviewed, verified, and officially approved by the <span className="font-semibold">Local Government Officials</span> in coordination with the project’s research and development committee to ensure its accuracy, transparency, and alignment with the goals and objectives of the program.
                                            <br />
                                            <br />
                                            All listed items, quantities, and computations have undergone thorough evaluation and validation to confirm that they accurately reflect the project’s intended financial allocations and expenditures. The figures presented herein are deemed final, certified, and officially recognized for documentation and presentation purposes.
                                            <br />
                                            <br />
                                            Any adjustments, reallocations, or updates to this budget—if necessary—will be properly communicated, reviewed, and documented in accordance with standard government protocols and financial reporting procedures to maintain accountability and transparency.
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
                                        {budget?.map((data, i) => (
                                            <TableRow>
                                                <TableCell className="font-medium text-center">{i}</TableCell>
                                                <TableCell className="text-center">{data.item_name}</TableCell>
                                                <TableCell className="text-center">{data.amt}</TableCell>
                                                <TableCell className="text-center">{data.price}</TableCell>
                                                <TableCell className="text-center">{data.amt * data.price}</TableCell>
                                            </TableRow>
                                        ))

                                        }

                                    </TableBody>
                                    <TableFooter className="bg-gray-100 font-semibold">
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="text-right pr-4 py-3 text-gray-700 border-t border-gray-300"
                                            >
                                                Total Spent:
                                            </TableCell>
                                            <TableCell
                                                className="text-center py-3 border-t border-gray-300 text-blue-700"
                                            >
                                                {new Intl.NumberFormat("en-PH", {
                                                    style: "currency",
                                                    currency: "PHP",
                                                    minimumFractionDigits: 2,
                                                }).format(Number(totalSpent))}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="text-right pr-4 py-3 text-gray-700 border-t border-gray-300"
                                            >
                                                Budget Allotted:
                                            </TableCell>
                                            <TableCell
                                                className="text-center py-3 border-t border-gray-300 text-green-700"
                                            >
                                                {new Intl.NumberFormat("en-PH", {
                                                    style: "currency",
                                                    currency: "PHP",
                                                    minimumFractionDigits: 2,
                                                }).format(project?.budget ?? 0)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="text-right pr-4 py-3 text-gray-700 border-t border-gray-300"
                                            >
                                                Remaining Budget:
                                            </TableCell>
                                            <TableCell
                                                className={`text-center py-3 border-t border-gray-300 font-bold ${Number(project?.budget ?? 0) - Number(totalSpent) < 0
                                                    ? "text-red-600"
                                                    : "text-emerald-700"
                                                    }`}
                                            >
                                                {new Intl.NumberFormat("en-PH", {
                                                    style: "currency",
                                                    currency: "PHP",
                                                    minimumFractionDigits: 2,
                                                }).format((project?.budget ?? 0) - Number(totalSpent))}
                                            </TableCell>
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
