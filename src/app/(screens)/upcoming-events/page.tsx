"use client";

import { useState } from "react";
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
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ViewUpcomingEvents() {
    const router = useRouter();
    const [showDetails, setShowDetails] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchLoc, setSearchLoc] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const queryParams = new URLSearchParams();
        queryParams.set("q", searchQuery);
        if (searchLoc) queryParams.set("loc", searchLoc);

        router.push(`/search/?${queryParams.toString()}`);
    };

    return (
        <div>
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
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center ">
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

            <div className="flex flex-col mx-5 sm:mx-20 xl:mx-50 my-10 gap-5">

                {/*start of project Card */}
                <div 
                onClick={() => router.push("/view-project/[id]/")}
                className="flex flex-col items-center lg:flex-row lg:gap-2 cursor-pointer"
                >
                    <div className="w-full h-60 sm:h-auto lg:h-60 xl:h-60 lg:w-[30%] lg:flex lg:justify-end">
                        <div className="bg-black w-full lg:w-fit h-full aspect-square object-cover rounded-t-2xl lg:rounded-2xl">

                        </div>
                    </div>
                    <div className="w-full lg:h-fit lg:w-[70%] bg-[#E6F1FF] rounded-b-2xl lg:rounded-2xl p-5 shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">
                        <h1 className="font-bold text-2xl truncate">
                            HIBLA: Weaving Safety, Dignity, and Dialogue
                        </h1>
                        <p className="text-gray-600 mt-3 mb-10 line-clamp-3">
                            Makiiba samuya sa paghabi kan sarong ciudad nin Naga na mas bukas sa pakikipag diyalogo, mas ligtas, asin mas inklusibong ciudad para sa satuyang mga tugang na miyembro kan komunidad kan LGBTQIA+.
                            Mag-iribahan kita ngunyan na Sabado, Hunyo 21, 2025 sa Museo ni Jesse Robredo para sa &quot;HIBLA: Weaving Safety, Dignity, and Dialogue&quot; kun sain gaganapon an mga minasunod:
                        </p>

                        <div className="flex flex-row gap-2">
                            <div className="bg-amber-200 px-3 py-2 text-xs font-semibold rounded-2xl">
                                Naga City
                            </div>
                            <div className="bg-amber-200 px-3 py-2 text-xs font-semibold rounded-2xl">
                                June 21, 2025
                            </div>
                        </div>
                    </div>
                </div>
                {/*end of project Card */}

                {/*start of project Card */}
                <div 
                onClick={() => router.push("/view-project/[id]/")}
                className="flex flex-col items-center lg:flex-row lg:gap-2 cursor-pointer"
                >
                    <div className="w-full h-60 sm:h-auto lg:h-60 xl:h-60 lg:w-[30%] lg:flex lg:justify-end">
                        <div className="bg-black w-full lg:w-fit h-full aspect-square object-cover rounded-t-2xl lg:rounded-2xl">

                        </div>
                    </div>
                    <div className="w-full lg:h-fit lg:w-[70%] bg-[#E6F1FF] rounded-b-2xl lg:rounded-2xl p-5 shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">
                        <h1 className="font-bold text-2xl truncate">
                            HIBLA: Weaving Safety, Dignity, and Dialogue
                        </h1>
                        <p className="text-gray-600 mt-3 mb-10 line-clamp-3">
                            Makiiba samuya sa paghabi kan sarong ciudad nin Naga na mas bukas sa pakikipag diyalogo, mas ligtas, asin mas inklusibong ciudad para sa satuyang mga tugang na miyembro kan komunidad kan LGBTQIA+.
                            Mag-iribahan kita ngunyan na Sabado, Hunyo 21, 2025 sa Museo ni Jesse Robredo para sa &quot;HIBLA: Weaving Safety, Dignity, and Dialogue&quot; kun sain gaganapon an mga minasunod:
                        </p>

                        <div className="flex flex-row gap-2">
                            <div className="bg-amber-200 px-3 py-2 text-xs font-semibold rounded-2xl">
                                Naga City
                            </div>
                            <div className="bg-amber-200 px-3 py-2 text-xs font-semibold rounded-2xl">
                                June 21, 2025
                            </div>
                        </div>
                    </div>
                </div>
                {/*end of project Card */}
            </div>

        </div>
    );
}
