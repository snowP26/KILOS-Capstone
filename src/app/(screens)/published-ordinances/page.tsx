"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ComNav } from "../../components/community/nav";
import LocationSelect from "../../components/community/locselect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Search } from "lucide-react";
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

export default function ViewPublishedOrdinances() {
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
                            Published Ordinances
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
                    <form className="flex flex-col w-screen gap-2 items-center md:w-[70%] justify-center md:flex-row" onSubmit={handleSearch}>
                        <LocationSelect onChange={setSearchLoc} widthClass="sm:w-[20%]" />
                        <div className="relative w-[80%] md:w-[70%] sm:max-w-[400px] md:max-w-[683px]">
                            <div className="absolute inset-y-0 left-1 pl-3 flex items-center pointer-events-none">
                                <Search />
                            </div>
                            <input
                                type="text"
                                name="Search-bar"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for ordinances"
                                className="pl-13 p-3 bg-[#D9D9D9] rounded-lg w-full placeholder-gray-600"
                            />
                        </div>
                        <Button type="submit" className="cursor-pointer md:w-[10%] h-[100%] py-3 px-5 bg-[#052659] text-white rounded-lg hover:bg-white hover:text-[#052659] hover:border-black hover:border">
                            Search
                        </Button>
                    </form>
                </div>
            </div>

            <div className="flex flex-col mx-5 sm:mx-20 xl:mx-50 my-10 gap-5">

                {/*start of ordinance Card */}
                <div
                    
                    className="flex flex-col items-center lg:flex-row lg:gap-2 cursor-pointer"
                >
                    <div className="w-full bg-gray-100 rounded-t-2xl md:w-[50%] md:bg-transparent lg:w-[30%] xl:h-60 xl:pl-50">
                        <Avatar className="object-cover w-full h-full">
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="w-full lg:h-fit lg:w-[70%] bg-[#E6F1FF] rounded-b-2xl lg:rounded-2xl p-5 shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">
                        <h1 className="font-bold text-2xl truncate">
                            Ordinance 2001-001
                        </h1>
                        <p className="text-black font-semibold mt-3 mb-10 line-clamp-3">
                            An Ordinance Makiiba samuya sa paghabi kan sarong ciudad nin Naga na mas bukas sa pakikipag diyalogo, mas ligtas, asin mas inklusibong ciudad para sa satuyang mga tugang na miyembro kan komunidad kan LGBTQIA+.
                            Mag-iribahan kita ngunyan na Sabado, Hunyo 21, 2025 sa Museo ni Jesse Robredo para sa "HIBLA: Weaving Safety, Dignity, and Dialogue" kun sain gaganapon an mga minasunod:
                        </p>
                        <p className="text-xl font-thin">
                            Juan Dela Cruz
                        </p>
                        <p className="text-sm font-thin">
                            February 10, 2001
                        </p>

                    </div>
                </div>
                {/*end of ordinance Card */}

                {/*start of ordinance Card */}
                <div
                    
                    className="flex flex-col items-center lg:flex-row lg:gap-2 cursor-pointer"
                >
                    <div className="w-full bg-gray-100 rounded-t-2xl md:w-[50%] md:bg-transparent lg:w-[30%] xl:h-60 xl:pl-50">
                        <Avatar className="object-cover w-full h-full">
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="w-full lg:h-fit lg:w-[70%] bg-[#E6F1FF] rounded-b-2xl lg:rounded-2xl p-5 shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">
                        <h1 className="font-bold text-2xl truncate">
                            Ordinance 2001-001
                        </h1>
                        <p className="text-black font-semibold mt-3 mb-10 line-clamp-3">
                            An Ordinance Makiiba samuya sa paghabi kan sarong ciudad nin Naga na mas bukas sa pakikipag diyalogo, mas ligtas, asin mas inklusibong ciudad para sa satuyang mga tugang na miyembro kan komunidad kan LGBTQIA+.
                            Mag-iribahan kita ngunyan na Sabado, Hunyo 21, 2025 sa Museo ni Jesse Robredo para sa "HIBLA: Weaving Safety, Dignity, and Dialogue" kun sain gaganapon an mga minasunod:
                        </p>
                        <p className="text-xl font-thin">
                            Juan Dela Cruz
                        </p>
                        <p className="text-sm font-thin">
                            February 10, 2001
                        </p>

                    </div>
                </div>
                {/*end of ordinance Card */}
            </div>

        </div>
    );
}
