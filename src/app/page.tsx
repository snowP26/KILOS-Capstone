import LocationSelect from "./components/community/locselect";
import { ComNav } from "./components/community/nav";
import { OrdinancesLandingCard } from "./components/community/ordinances-landingCard";
import { Title } from "./components/community/title";
import { UpcomingEventCard } from "./components/community/upcoming-eventCard";


export default function Home() {
  return (
    <div>
      <ComNav />
      <div className="min-h-screen overflow-y-auto">
        <Title />

        <div className="flex flex-col items-center mx-25 relative z-10 sm:flex-row sm:justify-between sm:items-end">
          <p className="text-2xl font-bold text-center mb-3 sm:mb-0 sm:text-start">Upcoming Events</p>
          <div className="overflow-visible">
            <LocationSelect />
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
            <LocationSelect />
          </div>
        </div>

        <hr className="border-t border-black w-[90%] mx-auto my-3" />

        <div className="flex flex-row justify-center gap-10">
          <div className="mt-10 mx-10 grid grid-col-1 md:mx-20 md:grid-cols-2 md:grid-rows-2 gap-5 w-[100%]">
            <OrdinancesLandingCard />
            <OrdinancesLandingCard />
            <OrdinancesLandingCard />
            <OrdinancesLandingCard />
          </div>
        </div>
        <p className="underline text-xl mr-15 sm:mx-40 my-5 text-end">See All</p>
      </div>
    </div>
  );
}
