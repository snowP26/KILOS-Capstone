"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ComNav } from "../../components/community/nav";
import LocationSelect from "../../components/community/locselect";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { PublishedOrdinanceCard } from "../../components/community/pub-ordinanceCard";
import { getAllOrdinancesByLocation } from "../../actions/landingpage";
import { ordinance } from "../../lib/definitions";

export default function ViewPublishedOrdinances() {
    const router = useRouter();
    const [ordinances, setOrdinances] = useState<ordinance[]>([])
    const [searchQuery, setSearchQuery] = useState("");
    const [searchLoc, setSearchLoc] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const queryParams = new URLSearchParams();
        queryParams.set("q", searchQuery);
        if (searchLoc) queryParams.set("loc", searchLoc);

        router.push(`/search/?${queryParams.toString()}`);
    };

    useEffect(() => {
        const setData = async () => {
            const data = await getAllOrdinancesByLocation(Number(searchLoc))
            setOrdinances(data)
        }

        setData()
    }, [searchLoc])

    return (
        <div className="bg-[#EEF2ED] min-h-screen max-h-full pb-10">
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
                    <form className="flex flex-col w-screen gap-2 items-center md:w-[70%] justify-center md:flex-row" onSubmit={handleSearch}>
                        <LocationSelect onChange={(value) => {
                            setSearchLoc(value);
                        }}
                            widthClass="sm:w-[20%]" />
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

            <div className="flex flex-wrap justify-center lg:flex-col mx-5 sm:mx-20 xl:mx-50 my-10 gap-5">
                {ordinances.map((data) => (
                    <PublishedOrdinanceCard
                        key={data.id}
                        id={data.id}
                        title={data.title}
                        description={data.description}
                        author={data.author}
                        locationID={Number(data.location)}
                    />
                ))

                }

            </div>

        </div>
    );
}
