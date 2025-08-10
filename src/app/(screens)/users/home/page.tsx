"use client";

import { DbRecentFeedbackCard } from "@/src/app/components/user/db-recentFeedbackCard";
import { DbCalendarCard } from "@/src/app/components/user/db-calendarCard";



export default function Home() {
  return (
    <div>
      <div className="flex flex-row bg-[#E6F1FF] h-[100vh]">
        <div className="flex-col w-[17%] h-[80%] border-black border-2 overflow-hidden rounded-2xl mt-5 ml-5 place-items-center">
          <p className="font-bold text-3xl text-center mt-5">Recent Feedback</p>
          <DbRecentFeedbackCard />
          <DbRecentFeedbackCard />
          <DbRecentFeedbackCard />
          <DbRecentFeedbackCard />
          <DbRecentFeedbackCard />
          
        </div>
    
        <div className="flex-col w-[80%]">
          <DbCalendarCard />
        </div>
      </div>
    </div>
  );
}