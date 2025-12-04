"use client";

import { useEffect, useState } from "react";
import LocationSelect from "./components/community/locselect";
import { ComNav } from "./components/community/nav";
import { OrdinancesLandingCard } from "./components/community/ordinances-landingCard";
import { UpcomingEventCard } from "./components/community/upcoming-eventCard";
import { ordinance, project } from "./lib/definitions";
import { getAllOrdinances, getAllProjects } from "./actions/landingpage";
import { openOrdinancePDF } from "./actions/ordinances";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {

  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


function chunkArray<T>(array: T[], chunkSize: number) {
  const result: T[][] = []; for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

export default function Home() {
  const router = useRouter();

  const [refresh, setRefresh] = useState(0);

  const [projLoc, setProjLoc] = useState<string | null>(null);
  const [ordinanceLoc, setOrdinanceLoc] = useState<string | null>(null);
  const [ordinances, setOrdinances] = useState<ordinance[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoc, setSearchLoc] = useState<string | null>(null);
  const [projects, setProjects] = useState<project[]>([]);

  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const [ordinanceChunks, setOrdinanceChunks] = useState<ordinance[][]>([]);

  useEffect(() => {
    function updateItemsPerSlide() {
      const width = window.innerWidth;

      if (width >= 1024) {
        setItemsPerSlide(4);
      } else {
        setItemsPerSlide(1);
      }
    }

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);

    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  useEffect(() => { setOrdinanceChunks(chunkArray(ordinances, itemsPerSlide)); }, [ordinances, itemsPerSlide]);

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
      console.log(ordinancesData);
      setOrdinances(ordinancesData);
      const projectsData = await getAllProjects();
      setProjects(projectsData)
    };

    fetchData();
  }, [refresh, ordinanceLoc]);

  return (
    <div className="">
      <ComNav />
      <div className="bg-[#EEF2ED] min-h-screen max-h-full pb-20">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center pb-20 md:pb-40 md:mx-2 lg:pb-80">
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

        <div className="flex flex-col items-center sm:w-[80%] sm:place-self-center sm:flex-row">
          <p className="text-2xl w-full font-bold text-center sm:mb-0 sm:text-start sm:self-center">Upcoming Events</p>
          <Button onClick={() => router.push("/upcoming-events/")}
            className=" text-xl my-3 self-center bg-transparent text-black hover:bg-[#052659] hover:text-white cursor-pointer underline lg:mr-15 lg:justify-self-end">
            See All
          </Button>
        </div>

        {projects && projects.length > 0 ? (
          <>
            <div className="w-[90%] lg:w-[80%] xl:w-[70%] mt-3 flex flex-wrap justify-self-center">
              <Carousel opts={{ align: "start", }}
                className=" w-full max-w-auto"
              >
                <CarouselContent className="-ml-5 gap-5 sm:gap-0">
                  {projects
                    .filter((project) => new Date(project.target_date) >= new Date())
                    .map((data) => (
                      <CarouselItem
                        className="basis-1/1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
                        key={data.id}
                      >
                        <div className="flex justify-center">
                          <UpcomingEventCard
                            id={data.id}
                            title={data.title}
                            imgURL={data.imageURL}
                            loc={data.location}
                            date={data.target_date}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="cursor-pointer -left-4 lg:-left-16" />
                <CarouselNext className="cursor-pointer -right-3 lg:-right-16" />
              </Carousel>

            </div>

          </>

        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p className="text-lg font-medium">No Projects available</p>
            <p className="text-sm text-gray-400">Please check back later.</p>
          </div>
        )

        }
        <div className="mt-15 lg:mt-0 flex flex-col items-center sm:w-[80%] sm:place-self-center sm:flex-row">
          <p className="text-2xl w-full font-bold text-center sm:mb-0 sm:text-start sm:self-center">Ordinances</p>
          <Button onClick={() => router.push("/published-ordinances/")}
            className=" text-xl my-3 self-center bg-transparent text-black hover:bg-[#052659] hover:text-white cursor-pointer underline lg:mr-15 lg:justify-self-end">
            See All
          </Button>
        </div>

        {ordinances && ordinances.length > 0 ? (
          <>
            <div className="md:px-20 lg:px-25 xl:px-50 2xl:px-60">
              <Carousel opts={{ align: "start", }}>
                <CarouselContent className="-ml-4 pb-5">
                  {ordinanceChunks.map((group, index) => (

                    <CarouselItem key={index}
                      className=" basis-1/1 sm:basis-1/2 md:basis-1/2 lg:basis-full lg:gap-2 lg:grid lg:grid-cols-2 lg:grid-rows-2"
                    > {group.map((data) => (
                      <div key={data.id} onClick={async () => await openOrdinancePDF(data.id)}
                      >
                        <OrdinancesLandingCard id={data.id} location={data.location} title={data.title} description={data.description} author={data.author} />
                      </div>
                    ))}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="cursor-pointer left-1 md:-left-12" />
                <CarouselNext className="cursor-pointer right-1 md:-right-15" />
              </Carousel>


            </div>

          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p className="text-lg font-medium">No ordinances available</p>
            <p className="text-sm text-gray-400">Please check back later.</p>
          </div>
        )
        }

      </div>
    </div>
  );
}
