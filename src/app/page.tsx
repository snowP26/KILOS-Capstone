"use client";

import { useEffect, useState } from "react";
import LocationSelect from "./components/community/locselect";
import { ComNav } from "./components/community/nav";
import { OrdinancesLandingCard } from "./components/community/ordinances-landingCard";
import { UpcomingEventCard } from "./components/community/upcoming-eventCard";
import { ordinance, project } from "./lib/definitions";
import { getAllOrdinances, getAllProjects } from "./actions/landingpage";
import { openOrdinancePDF } from "./actions/ordinances";
import { Search, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Title } from "./components/community/title";

export default function Home() {
  const router = useRouter();

  const [refresh, setRefresh] = useState(0);

  const [projLoc, setProjLoc] = useState<string | null>(null);
  const [ordinanceLoc, setOrdinanceLoc] = useState<string | null>(null);
  const [ordinances, setOrdinances] = useState<ordinance[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoc, setSearchLoc] = useState<string | null>(null);
  const [projects, setProjects] = useState<project[]>([]);

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
      const projectsData = await getAllProjects();
      setProjects(projectsData)
    };

    fetchData();
  }, [refresh, ordinanceLoc]);

  return (
    <div>
      <ComNav />
      <div className="min-h-screen overflow-y-auto">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center pb-80">
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

        <div className="flex flex-col items-center relative z-10 sm:w-[90%] sm:place-self-center sm:flex-row sm:justify-between sm:items-end">
          <p className=" text-2xl w-[80%] font-bold text-center mb-3 sm:mb-0 sm:text-start">Upcoming Events</p>
          <div className=" overflow-visible">
            <LocationSelect onChange={setProjLoc} widthClass="sm:w-full" />
          </div>

        </div>

        <hr className="border-t border-black w-[90%] mx-auto my-3" />
        <div className="w-full mt-10 flex flex-wrap justify-center">
          <Carousel opts={{ align: "start", }}
            className="w-full min-w-auto sm:min-w-[70%] md:min-w-[80%] xl:min-w-[90%] max-w-sm"
          >
            <CarouselContent className="-ml-4">
              {projects.map((data) => (
                <CarouselItem
                  className="basis-1/1 md:basis-2/3 lg:basis-2/4 xl:basis-1/3 2xl:basis-3/13"
                  key={data.id}
                >
                  <div className="cursor-pointer transition-all duration-200 hover:bg-white hover:shadow-lg hover:scale-[1.02]" onClick={() => router.push("/view-project/[id]/")}>
                    <UpcomingEventCard
                      title={data.title}
                      imgURL={data.imageURL}
                      loc={data.location}
                      date={data.target_date}
                    />
                  </div>
                </CarouselItem>
              ))
              }
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer" />
            <CarouselNext className="cursor-pointer" />
          </Carousel>
        </div>

        <Button onClick={() => router.push("/upcoming-events/")}
            className="bg-white text-black hover:bg-[#052659] hover:text-white cursor-pointer underline text-xl lg:mr-15 sm:mx-40 mb-25 my-5 flex justify-self-center lg:justify-self-end">
            See All
        </Button>

        <div className="flex flex-col items-center mx-25 relative z-10 sm:flex-row sm:justify-between sm:items-end">
          <p className="text-2xl font-bold text-center mb-3 sm:mb-0 sm:text-start">Ordinances</p>
          <div className="overflow-visible">
            <LocationSelect onChange={setOrdinanceLoc} widthClass="sm:w-[100%]" />
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
                  id={data.id}
                  title={data.title}
                  description={data.description}
                  author={data.author}
                />
              </div>
            ))}

          </div>
        </div>
        <Button onClick={() => router.push("/published-ordinances/")}
            className="bg-white text-black hover:bg-[#052659] hover:text-white cursor-pointer underline text-xl lg:mr-15 sm:mx-40 mb-25 my-5 flex justify-self-center lg:justify-self-end">
            See All
        </Button>
      </div>
    </div>
  );
}
