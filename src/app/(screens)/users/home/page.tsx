"use client";

import { DbRecentFeedbackCard } from "@/src/app/components/user/db-recentFeedbackCard";
import { DbCalendarCard } from "@/src/app/components/user/db-calendarCard";

import { useEffect, useState } from "react";
import { getHomeFeedback } from "@/src/app/actions/home";
import { homeFeedback } from "@/src/app/lib/definitions";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [feedback, setFeedback] = useState<homeFeedback[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getHomeFeedback();
      setFeedback(data);
    };

    getData();
  }, []);

  return (
    <div className="bg-[#E6F1FF] flex flex-col xl:flex xl:flex-row xl:h-[100vh] xl:mx-5">
      <div className="mt-5 h-[80%] xl:rounded-2xl xl:border-black xl:border-2">
        <p className="font-bold text-3xl text-center mt-5">Recent Feedback</p>

        <ScrollArea className="sm:hidden lg:block">
          <div className="max-h-[350px] sm:h-auto lg:max-h-[570px]">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center xl:flex-col">
              {feedback.map((data) => (
              <div key={data.id} className="w-full flex justify-center sm:w-1/2 lg:w-1/3 xl:w-full">

                <DbRecentFeedbackCard
                header={data.header}
                date={new Date(data.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", })}
                />
              </div>
              ))} 
            </div>
          </div>
        </ScrollArea>
        <div className="hidden sm:block lg:hidden max-h-[350px] sm:max-h-full xl:h-[690px]">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center xl:flex-col">
            {feedback.map((data) => (
            <div key={data.id} className="w-full flex justify-center sm:w-1/2 lg:w-1/3 xl:w-full">

              <DbRecentFeedbackCard
              header={data.header}
              date={new Date(data.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", })}
              />
            </div>
            ))}
          </div>
        </div>

      </div>
      <div className="mt-10 w-[90%] self-center xl:w-[90%] xl:mt-0 xl:self-start">
        <DbCalendarCard />
      </div>
    </div>
  );
}
