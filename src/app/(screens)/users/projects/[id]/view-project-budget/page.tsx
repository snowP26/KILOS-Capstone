"use client";

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'
import { ArrowLeft, CirclePlus, Image, ImagePlus } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { project, project_budget } from '@/src/app/lib/definitions';
import { getProjectBudgetById, getProjectByID } from '@/src/app/actions/projects';
import { ScrollArea } from '@/components/ui/scroll-area';


export default function ViewProjectBudget() {
    const router = useRouter();
    const params = useParams();
    const blob = Array.isArray(params.id) ? params.id[0] : params.id;

    const projectID = blob ? Number(blob.split("-").pop()) : undefined;

    const [project, setProject] = useState<project | null>(null)
    const [budget, setBudget] = useState<project_budget[]>([])

    useEffect(() => {
        const setData = async () => {
            if (projectID) {
                const data = await getProjectByID(projectID)

                setProject(data)
                const budget = await getProjectBudgetById(projectID);
                setBudget(budget)
            }
        }

        setData()
    }, [projectID])

    return (
        <div className="bg-[#E6F1FF] min-h-screen max-h-full mt-10">
            <Breadcrumb className="ml-5 xl:ml-20">
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
                        <BreadcrumbLink href="/users/projects">Current Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/users/projects/${project?.title}-${projectID}`}>View Project</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">View Project Budget</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mx-2 sm:mx-10 xl:mx-25">
                <p className="font-bold text-xl xl:text-3xl mt-8 mb-2 xl:mb-6">{project?.title}</p>

                <div className="flex flex-col md:flex-row gap-5 h-10 justify-between">
                    <Button
                        className="text-black bg-[#A3C4A8] h-10 cursor-pointer hover:bg-black hover:text-[#A3C4A8]"
                        onClick={() => router.push(`/users/projects/${project?.title}-${projectID}`)}>
                        View Project Details
                    </Button>
                    <div className="flex flex-row gap-2">
                        <p className="text-black font-medium text-sm md:text-base content-center">Set Budget for Project:</p>
                        <p className="text-[#28A745] text-base md:text-xl font-medium content-center">
                            {project?.budget !== undefined
                                ? new Intl.NumberFormat("en-PH", {
                                    style: "currency",
                                    currency: "PHP",
                                    minimumFractionDigits: 2,
                                }).format(project.budget)
                                : "₱0.00"}
                        </p>
                    </div>

                </div>

                <div className="mt-20 xl:mt-10">
                    <Table className="bg-white w-[100%]">
                        <TableCaption className="mt-2">Breakdown of project materials used in the project.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center w-50">Status</TableHead>
                                <TableHead className="text-center">Item Name</TableHead>
                                <TableHead className="text-center">Price</TableHead>
                                <TableHead className="text-center">Amt.</TableHead>
                                <TableHead className="text-center">Receipt</TableHead>
                                <TableHead className="text-center">Photo</TableHead>
                            </TableRow>
                        </TableHeader>

                        {budget.map((data) => (
                            <TableBody key={data.id}>
                                <TableRow>
                                    <TableCell className="flex justify-center">
                                        <p className="self-center text-center font-medium min-w-30 max-w-full px-5 bg-[#052659] rounded-2xl text-white">
                                            {data.status}
                                        </p>
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
                                    <TableCell className="text-center">
                                        <Dialog>
                                            <DialogTrigger>
                                                <Image className="cursor-pointer hover:bg-gray-300" />
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl text-center">{data.item_name} Receipt Photo</DialogTitle>
                                                    <hr className="border-t border-black w-full my-3" />
                                                    <img src={data.receiptURL} className=" aspect-3/4 object-cover" />
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Dialog>
                                            <DialogTrigger>
                                                <Image className="cursor-pointer hover:bg-gray-300" />
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl text-center">{data.item_name} Item Photo</DialogTitle>
                                                    <hr className="border-t border-black w-full my-3" />
                                                    <img src={data.receiptURL} className=" aspect-3/4 object-cover" />
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ))

                        }
                    </Table>
                </div>

                {/* Treasurer view */}
                <div className="mt-20 xl:mt-10">
                    <Table className="bg-white w-[100%]">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center w-50">Status</TableHead>
                                <TableHead className="text-center">Item Name</TableHead>
                                <TableHead className="text-center">Price</TableHead>
                                <TableHead className="text-center">Amt.</TableHead>
                                <TableHead className="text-center">Receipt</TableHead>
                                <TableHead className="text-center">Photo</TableHead>
                            </TableRow>
                        </TableHeader>

                        {budget.map((data) => (
                            <TableBody key={data.id}>
                                <TableRow>
                                    <TableCell className="flex justify-center">
                                        <Dialog>
                                            <DialogTrigger>
                                                <p className="self-center text-center font-medium min-w-30 max-w-full px-5 bg-[#052659] rounded-2xl text-white">
                                                    {data.status}
                                                </p>
                                            </DialogTrigger>
                                            <DialogContent className="bg-[#E6F1FF]">
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl font-bold text-center">Product Name 1</DialogTitle>
                                                    <hr className="border-t border-black w-full mt-3" />
                                                    <div className="self-end">
                                                        <p className="self-center text-center font-medium min-w-30 max-w-full px-5 bg-[#052659] rounded-2xl text-white">
                                                            {data.status}
                                                        </p>
                                                    </div>
                                                    <p className="text-2xl font-semibold">
                                                        Comment
                                                    </p>
                                                    <div className="bg-white mb-5">
                                                        <ScrollArea className="py-5">
                                                            <p className="max-h-100 px-5">
                                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                                                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac turpis ac leo malesuada bibendum. Mauris volutpat mauris vel velit fermentum auctor. Phasellus malesuada eros orci, in tincidunt velit vulputate eu. Ut vulputate massa eu risus varius cursus.

                                                                Fusce ac metus a velit euismod feugiat. Nulla et urna vel nisl tristique tincidunt. Quisque id dictum nisl. In ac magna a urna venenatis tincidunt et vel leo. Donec sit amet felis sit amet odio faucibus pretium nec et risus. Suspendisse potenti. Aenean consequat, turpis id suscipit dapibus, libero urna facilisis nisl, sit amet scelerisque felis tortor in justo. Nunc viverra, urna in tempus faucibus, felis velit auctor lorem, vel iaculis sapien est eu neque.

                                                                Aliquam erat volutpat. Integer ultricies urna sit amet magna feugiat interdum. Sed venenatis ligula non augue lacinia, vel tincidunt metus accumsan. Nam ut risus erat. Ut tempus risus ut odio tempor, a vehicula mi fermentum. Sed malesuada purus vitae tortor euismod suscipit. Aliquam at venenatis dui. Proin suscipit interdum mauris, nec pharetra leo fermentum in. Morbi fringilla, sem id tincidunt suscipit, purus nisl auctor enim, id faucibus libero nisi nec velit.

                                                                Maecenas interdum leo ut nisi convallis, a feugiat velit efficitur. Nulla facilisi. Mauris gravida lacus nec erat cursus, a malesuada odio volutpat. Donec auctor, felis sit amet auctor bibendum, lectus sapien congue libero, nec aliquam nisi magna nec nisi. Curabitur ut ipsum sit amet felis varius elementum. Proin at ante et augue faucibus posuere. Vivamus vestibulum, odio eget consequat cursus, neque enim auctor sapien, nec euismod odio ante ac elit.

                                                                Proin condimentum lectus in ligula tincidunt mollis. Aenean vitae velit tristique, facilisis augue eu, vulputate ante. Sed fermentum malesuada lorem, sit amet feugiat justo lobortis id. Sed iaculis, ante nec tincidunt egestas, augue nisi convallis lectus, eget varius dui urna ac nisl. Vestibulum gravida erat at leo vestibulum, vel fermentum eros tincidunt. Donec consectetur fringilla orci, sit amet rhoncus velit vehicula ut.

                                                                Fusce a velit nec ante varius vulputate ac vel nunc. In maximus ut lorem ut eleifend. Nulla facilisi. Suspendisse feugiat posuere nulla, vel vestibulum lorem euismod id. Mauris ornare sapien in quam egestas, at vehicula nisl efficitur. Sed laoreet tempus nunc, non aliquet dui sollicitudin in. Quisque tempor nunc ac euismod posuere. Nulla facilisi. Etiam eget erat at nisl sollicitudin tempor at et libero.
                                                            </p>
                                                        </ScrollArea>
                                                    </div>

                                                    {/* IF REJECTED  */}
                                                    <Button className="self-end w-fit cursor-pointer bg-red-700 text-white hover:bg-white hover:text-red-700 hover:border-black hover:border">
                                                        Delete Item
                                                    </Button>

                                                    {/* IF RESUBMIT */}
                                                    <Button className="self-end w-fit cursor-pointer bg-[#A3C4A8] text-black hover:bg-black hover:text-[#A3C4A8] hover:border-black hover:border">
                                                        Resubmit
                                                    </Button>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
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
                                    <TableCell className="text-center">
                                        <Dialog>
                                            <DialogTrigger>
                                                <Image className="cursor-pointer hover:bg-gray-300" />
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl text-center">{data.item_name} Receipt Photo</DialogTitle>
                                                    <hr className="border-t border-black w-full my-3" />
                                                    <img src={data.receiptURL} className=" aspect-3/4 object-cover" />
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Dialog>
                                            <DialogTrigger>
                                                <Image className="cursor-pointer hover:bg-gray-300" />
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl text-center">{data.item_name} Item Photo</DialogTitle>
                                                    <hr className="border-t border-black w-full my-3" />
                                                    <img src={data.receiptURL} className=" aspect-3/4 object-cover" />
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="flex justify-center">
                                        <p>
                                            -
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <input
                                            type="text"
                                            className="border rounded p-1 w-full text-center"
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <input
                                            type="text"
                                            className="border rounded p-1 w-full text-center"
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <input
                                            type="text"
                                            className="border rounded p-1 w-full text-center"
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div
                                            className="flex w-auto items-center bg-gray-300 justify-center rounded-md border border-dashed border-gray-400 text-sm cursor-pointer hover:bg-gray-100  lg:place-self-center"
                                        >

                                            <div className="rounded-full w-7 h-7 m-1 flex items-center justify-center">
                                                <ImagePlus size={20}/>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div
                                            className="flex w-auto items-center bg-gray-300 justify-center rounded-md border border-dashed border-gray-400 text-sm cursor-pointer hover:bg-gray-100  lg:place-self-center"
                                        >

                                            <div className="rounded-full w-7 h-7 m-1 flex items-center justify-center">
                                                <ImagePlus size={20}/>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ))

                        }
                    </Table>
                    <div
                        className="flex items-center justify-center gap-2 h-10 w-full border-t border-b border-dashed border-gray-400 bg-white text-blue-500 font-medium cursor-pointer transition-colors hover:bg-blue-100 hover:border-blue-500"

                    >
                        <CirclePlus size={16} />
                        <span>Add Item</span>
                    </div>
                </div>


            </div>
        </div>
    )
}