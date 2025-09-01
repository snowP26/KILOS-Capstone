"use client";

import { useEffect, useState } from "react";
import LocationSelect from "./components/community/locselect";
import { ComNav } from "./components/community/nav";
import { OrdinancesLandingCard } from "./components/community/ordinances-landingCard";
import { UpcomingEventCard } from "./components/community/upcoming-eventCard";
import { ordinance } from "./lib/definitions";
import { getAllOrdinances } from "./actions/landingpage";
import { openOrdinancePDF } from "./actions/ordinances";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [refresh, setRefresh] = useState(0);

  const [searchLoc, setSearchLoc] = useState<string | null>(null);
  const [projLoc, setProjLoc] = useState<string | null>(null);
  const [ordinanceLoc, setOrdinanceLoc] = useState<string | null>(null);
  const [ordinances, setOrdinances] = useState<ordinance[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [seeOrdinances, setSeeOrdinances] = useState("All");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const queryParams = new URLSearchParams();
    queryParams.set("q", searchQuery);
    if (searchLoc) queryParams.set("loc", searchLoc);
    
    router.push(`/search/?${queryParams.toString()}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      const ordinancesData = await getAllOrdinances(ordinanceLoc ?? "");
      setOrdinances(ordinancesData);
    };

    console.log(ordinances)

    fetchData();
  }, [refresh, ordinanceLoc]); 
  
  return (
    <div>
      <ComNav />
      <div className="min-h-screen overflow-y-auto">
        <div className="flex flex-col items-center pb-80">
          <h1 className="text-center mt-20 text-[48px] font-bold">
            <strong className="text-[#0073FF]">K</strong>abataan&apos;s{" "}
            <strong className="text-[#0073FF]">I</strong>ntegrated{" "}
            <strong className="text-[#0073FF]">L</strong>eadership &{" "}
            <strong className="text-[#0073FF]">O</strong>rganizational{" "}
            <strong className="text-[#0073FF]">S</strong>ystem
          </h1>
          <form
            className="mt-4 flex flex-row gap-2 items-center min-w-[1000px]"
            onSubmit={handleSearch}
          >
            <LocationSelect onChange={setSearchLoc} />
            <div className="relative w-[683px]">
              <div className="absolute inset-y-0 left-1 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={24} />
              </div>
              <input
                type="text"
                name="Search-bar"
                placeholder="Search for ordinances"
                value={searchQuery}
                className="pl-13 p-3 bg-[#D9D9D9] rounded-lg w-full placeholder-gray-600"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="cursor-pointer h-[100%] py-3 px-5 bg-[#052659] text-white rounded-lg hover:bg-white hover:text-[#052659] hover:border-black hover:border"
            >
              Search
            </Button>
          </form>
        </div>

        <div className="flex justify-between items-end mx-25 relative z-10">
          <p className="text-2xl font-bold">Upcoming Events</p>
          <div className="overflow-visible">
            <LocationSelect onChange={setProjLoc} />
          </div>
        </div>

        <hr className="border-t border-black w-[90%] mx-auto my-3" />
        <div className="flex flex-row justify-center gap-10">
          <UpcomingEventCard />
          <UpcomingEventCard />
          <UpcomingEventCard />
          <UpcomingEventCard />
        </div>
        <p className="underline text-xl mx-40 mb-25 my-5 text-end">See All</p>

        <div className="flex justify-between items-end mx-25 relative z-10">
          <p className="text-2xl font-bold">Ordinances</p>
          <div className="overflow-visible">
            <LocationSelect onChange={setOrdinanceLoc} />
          </div>
        </div>

        <hr className="border-t border-black w-[90%] mx-auto my-3" />

        <div className="flex flex-row justify-center gap-10 mx-40">
          <div className="mt-10 grid grid-cols-2 grid-rows-2 gap-5 w-[100%]">
            {ordinances.map((data) => (
              <div
                key={data.id}
                onClick={async () => await openOrdinancePDF(data.id)}
                className="cursor-pointer rounded-xl transition-all duration-200 hover:bg-white hover:shadow-lg hover:scale-[1.02]"
              >
                <OrdinancesLandingCard
                  title={data.title}
                  description={data.description}
                  author={data.author}
                />
              </div>
            ))}
          </div>
        </div>
        <p className="underline text-xl mx-40 my-5 text-end">See All</p>
      </div>
    </div>
  );
}
