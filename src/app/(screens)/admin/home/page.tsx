"use client";


import { DbRecentFeedbackCard } from "@/src/app/components/admin/db-recentFeedbackCard";
import { DbCalendarCard } from "@/src/app/components/admin/db-calendarCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="bg-[#E6F1FF] flex flex-col lg:flex lg:flex-row lg:h-[100vh] lg:mx-5">
      <div className="mt-5 h-[80%] lg:rounded-2xl lg:border-black lg:border-2 lg:w-[20%]">
        <p className="font-bold text-3xl lg:text-xl xl:text-3xl text-center mt-5">Recent Feedback</p>

        <ScrollArea className="sm:hidden lg:block">
          <div className="max-h-[350px] sm:h-auto lg:max-h-[570px]">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center lg:flex-col">
              <div className="w-full flex justify-center sm:w-1/2 lg:w-full">
                <DbRecentFeedbackCard />
              </div>
              <div className="w-full flex justify-center sm:w-1/2 lg:w-full">
                <DbRecentFeedbackCard />
              </div>
              <div className="w-full flex justify-center sm:w-1/2 lg:w-full">
                <DbRecentFeedbackCard />
              </div>
              <div className="w-full flex justify-center sm:w-1/2 lg:w-full">
                <DbRecentFeedbackCard />
              </div>
              <div className="w-full flex justify-center sm:w-1/2 lg:w-full">
                <DbRecentFeedbackCard />
              </div>
              <div className="w-full flex justify-center sm:w-1/2 lg:w-full">
                <DbRecentFeedbackCard />
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="hidden sm:block lg:hidden max-h-[350px] sm:max-h-full xl:h-[690px]">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center lg:flex-col">
            <div className="w-full flex justify-center sm:w-1/2 lg:w-1/3 xl:w-full">
              <DbRecentFeedbackCard />
            </div>
            <div className="w-full flex justify-center sm:w-1/2 lg:w-1/3 xl:w-full">
              <DbRecentFeedbackCard />
            </div>
            <div className="w-full flex justify-center sm:w-1/2 lg:w-1/3 xl:w-full">
              <DbRecentFeedbackCard />
            </div>
            <div className="w-full flex justify-center sm:w-1/2 lg:w-1/3 xl:w-full">
              <DbRecentFeedbackCard />
            </div>
          </div>
        </div>


      </div>

      <div className="mt-10 w-[90%] self-center lg:w-[90%] lg:mt-0 lg:self-start">
        <DbCalendarCard />
      </div>
    </div>

  );
}