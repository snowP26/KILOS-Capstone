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
        <div className="flex flex-row overflow-x-scroll justify-center gap-10">
          <UpcomingEventCard />
          <UpcomingEventCard />
          <UpcomingEventCard />
          <UpcomingEventCard />
        </div>

        <div className="flex justify-between items-end mx-25 relative z-10">
          <p className="text-2xl font-bold">Ordinances</p>
          <div  className="overflow-visible">
            <LocationSelect />
          </div>
        </div>

        <hr className="border-t border-black w-[90%] mx-auto my-3" />
        <div className="flex flex-row overflow-x-scroll justify-center gap-10">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <OrdinancesLandingCard />
            <OrdinancesLandingCard />
            <OrdinancesLandingCard />
            <OrdinancesLandingCard />
          </div>
          
          
        </div>
        

        
      </div>
      
    </div>
  );
}
