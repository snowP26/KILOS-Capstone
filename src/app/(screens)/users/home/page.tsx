"use client";

import { DbRecentFeedbackCard } from "@/src/app/components/user/db-recentFeedbackCard";
import { DbCalendarCard } from "@/src/app/components/user/db-calendarCard";

import { useEffect, useState } from "react";
import { getHomeFeedback } from "@/src/app/actions/home";
import { homeFeedback } from "@/src/app/lib/definitions";

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
    <div>
      <div className="flex flex-row bg-[#E6F1FF] h-[100vh]">
        <div className="flex-col w-[17%] h-[80%] border-black border-2 overflow-hidden rounded-2xl mt-5 ml-5 place-items-center">
          <p className="font-bold text-3xl text-center mt-5">Recent Feedback</p>
          {feedback.map((data) => (
            <DbRecentFeedbackCard
              key={data.id}
              header={data.header}
              date={new Date(data.created_at).toLocaleDateString("en-US", {
                month: "long", 
                day: "numeric", 
                year: "numeric", 
              })}
            />
          ))}
        </div>

        <div className="flex-col w-[80%]">
          <DbCalendarCard />
        </div>
      </div>
    </div>
  );
}
