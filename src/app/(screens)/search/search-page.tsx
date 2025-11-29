"use client";

import { searchData } from "@/src/app/actions/landingpage";
import { OrdinancesLandingCard } from "@/src/app/components/community/ordinances-landingCard";
import { ordinance } from "@/src/app/lib/definitions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, use, Suspense } from "react";
import { Button } from "@/components/ui/button";
import LocationSelect from "@/src/app/components/community/locselect";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const locationID = searchParams.get("loc");
  const loc = locationID ? parseInt(locationID, 10) : undefined;
  const [results, setResults] = useState<ordinance[]>([]);

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
    const fetchData = async () => {
      if (!query && !locationID) {
        setResults([]);
        return;
      }

      const data = await searchData(query, loc);
      setResults(data ?? []);
    };

    fetchData();
  }, [query, locationID, loc]);

  useEffect(() => {
    setSearchQuery(query);
    setSearchLoc(locationID ?? null);
  }, [query, locationID]);

  return (
    <Suspense>
      <Breadcrumb className="ml-2 mt-5 lg:mt-2 xl:ml-20">
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
              Search Results
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full max-w-5xl mx-auto mt-5">
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

        <h1 className="font-bold text-lg text-center mb-10 lg:text-2xl lg:mb-6">
          Search Results for: <span className="text-blue-600">{query}</span>
        </h1>

        {results.length > 0 ? (
          <div className="w-[90%] mx-auto mb-10 grid grid-cols-1 gap-4 sm:w-full sm:mx-0 md:grid-cols-2 md:w-[90%] md:mx-auto lg:w-[90%] lg:flex lg:flex-wrap xl:w-full">
            {results.map((ord) => (
              // replace this with PublishedOrdinanceCard
              <OrdinancesLandingCard
                key={ord.id}
                id={ord.id}
                title={ord.title}
                description={ord.description}
                author={ord.author}
                location={ord.location}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No ordinances found.</p>
        )}
      </div>
    </Suspense>
  );
}
