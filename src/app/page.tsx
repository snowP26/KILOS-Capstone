import { ComNav } from "./components/community/nav";
import { Title } from "./components/community/title";
import LocationSelect from "./components/community/locselect";
import { UpcomingEventCard } from "./components/community/upcoming-eventCard";
import { OrdinancesLandingCard } from "./components/community/ordinances-landingCard";

export default function Home() {

  return (
    <div>
      <ComNav />
      <div className="min-h-screen overflow-y-auto">
        <Title />

        <div className="flex justify-between items-end mx-25 relative z-10">
          <p className="text-2xl font-bold">Upcoming Events</p>
          <div  className="overflow-visible">
            <LocationSelect />
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
          <div  className="overflow-visible">
            <LocationSelect />
          </div>
        </div>

        <hr className="border-t border-black w-[90%] mx-auto my-3" />

        <div className="flex flex-row justify-center gap-10 mx-40">
          <div className="mt-10 grid grid-cols-2 grid-rows-2 gap-5 w-[100%]">
            <OrdinancesLandingCard />
            <OrdinancesLandingCard />
            <OrdinancesLandingCard />
            <OrdinancesLandingCard />
          </div>  
        </div>
        <p className="underline text-xl mx-40 my-5 text-end">See All</p>
        
      </div>
      
    </div>
  );
}

