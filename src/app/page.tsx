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
import { Title } from "./components/community/title";

export default function Home() {
  const router = useRouter();

  const [refresh, setRefresh] = useState(0);


  const [projLoc, setProjLoc] = useState<string | null>(null);
  const [ordinanceLoc, setOrdinanceLoc] = useState<string | null>(null);
  const [ordinances, setOrdinances] = useState<ordinance[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
    const [searchLoc, setSearchLoc] = useState<string | null>(null);
  const [seeOrdinances, setSeeOrdinances] = useState("All");


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
          <Title onLocationChange={setSearchLoc} />
        </div>

        <div className="flex flex-col items-center mx-25 relative z-10 sm:flex-row sm:justify-between sm:items-end">
          <p className="text-2xl font-bold text-center mb-3 sm:mb-0 sm:text-start">Upcoming Events</p>
          <div className="overflow-visible">
            <LocationSelect onChange={setProjLoc} />
          </div>
        </div>

        <hr className="border-t border-black w-[90%] mx-auto my-3" />
        <div className="flex flex-wrap justify-center gap-5">
          <UpcomingEventCard />
          <UpcomingEventCard />
          <UpcomingEventCard />
          <UpcomingEventCard />
        </div>
        <p className="underline text-xl mr-15 sm:mx-40 mb-25 my-5 text-end">See All</p>

        <div className="flex flex-col items-center mx-25 relative z-10 sm:flex-row sm:justify-between sm:items-end">
          <p className="text-2xl font-bold text-center mb-3 sm:mb-0 sm:text-start">Ordinances</p>
          <div className="overflow-visible">
              <LocationSelect onChange={setOrdinanceLoc} />
          </div>
        </div>

        <hr className="border-t border-black w-[90%] mx-auto my-3" />


        <div className="flex flex-row justify-center gap-10">
          <div className="mt-10 mx-10 grid grid-col-1 md:mx-20 md:grid-cols-2 md:grid-rows-2 gap-5 w-[100%]">
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
        <p className="underline text-xl mr-15 sm:mx-40 my-5 text-end">See All</p>
      </div>
    </div>
  );
}
