"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ComNav } from "../../components/community/nav";
import LocationSelect from "../../components/community/locselect";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { project } from "../../lib/definitions";
import { getAllProjects } from "../../actions/landingpage";
import { locIDtoName } from "../../actions/convert";

export default function ViewUpcomingEvents() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchLoc, setSearchLoc] = useState<string | null>(null);
    const [events, setEvents] = useState<project[] | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const queryParams = new URLSearchParams();
        queryParams.set("q", searchQuery);
        if (searchLoc) queryParams.set("loc", searchLoc);

        router.push(`/search/?${queryParams.toString()}`);
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getAllProjects();

            const projectsWithLoc = await Promise.all(
                data.map(async (proj) => ({
                    ...proj,
                    locName: await locIDtoName(proj.location),
                }))
            );

            setEvents(projectsWithLoc);
        };

        getData();
    }, []);

    return (
        <div className="bg-[#EEF2ED] min-h-screen max-h-full pb-20">
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
                        <BreadcrumbPage className="font-bold">
                            Upcoming Events
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col items-center mb-40">
                <div className="flex flex-col items-center pb-10 md:mx-2 lg:pb-10">
                    <h1 className="text-center mt-15 text-[50px] m-5 sm:mt-20 sm:m-0 sm:text-[48px] font-bold">
                        <strong className="text-[#0073FF]">K</strong>
                        <a className="hidden sm:inline">abataan&apos;s </a>
                        <strong className="text-[#0073FF]">I</strong>
                        <a className="hidden sm:inline">ntegrated </a>
                        <strong className="text-[#0073FF]">L</strong>
                        <a className="hidden sm:inline">eadership & </a>
                        <strong className="text-[#0073FF]">O</strong>
                        <a className="hidden sm:inline">rganizational </a>
                        <strong className="text-[#0073FF]">S</strong>
                        <a className="hidden sm:inline">ystem</a>
                    </h1>
                </div>
            </div>

            <div className="flex flex-wrap justify-center lg:flex-col mx-5 sm:mx-20 xl:mx-50 my-10 gap-5">
                {events?.map((data) => (
                    < div
                        onClick={() => router.push(`/view-project/${data.id}`)}
                        key={data.id}
                        className="flex flex-col items-center lg:flex-row lg:gap-2"
                    >
                        <div className="cursor-pointer min-w-70 max-w-80 h-60 sm:w-80 sm:h-80 lg:h-60 xl:h-60 lg:w-[30%] lg:flex lg:justify-end">
                            <img src={data.imageURL} className="bg-black w-full lg:w-fit h-full aspect-square object-cover rounded-t-2xl lg:rounded-2xl" />

                        </div>

                        <div className="w-70 sm:w-80 cursor-pointer lg:h-fit lg:w-[70%] bg-white rounded-b-2xl lg:rounded-2xl p-5 border-[0.2px] border-gray-300 transform transition-all duration-300 hover:-translate-y-2  hover:shadow-[-4px_4px_4px_rgba(0,0,0,0.15)]">
                            <h1 className="font-bold text-2xl truncate">
                                {data.title}
                            </h1>
                            <p className="text-gray-600 mt-3 mb-10 line-clamp-3">
                                {data.description}
                            </p>

                            <div className="flex flex-row gap-2">

                                <div className="bg-amber-200 px-3 py-2 text-xs font-semibold rounded-2xl">
                                    {new Date(data.target_date).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </div>
                                <div className="bg-amber-200 px-3 py-2 text-xs font-semibold rounded-2xl">
                                    {data.locName}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }


            </div>

        </div >
    );
}
