"use client";

import { ComNav } from "@/src/app/components/community/nav";
import { CommunityBanner } from "@/src/app/components/community/community-banner";
import { PostFeedbackCard } from "@/src/app/components/community/post-feedbackCard";
import { useParams, notFound } from "next/navigation";
import { commFeedback, locations } from "@/src/app/lib/definitions";
import {  useEffect,  useState } from "react";
import { getFeedback} from "@/src/app/actions/feedback";
import { locNameToID } from "@/src/app/actions/convert";
import { FeedbackCard } from "@/src/app/components/community/feedbackCard";


export default function Page() {
  const [refresh, setRefresh] = useState(0);
  const [open, setOpen] = useState(false);
  const toProperCase = (str: string) =>
    str
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const params = useParams();
  const id = params.id as string;

  const [feedback, setFeedback] = useState<commFeedback[]>([]);
  const loc_name = toProperCase(id.replace("-", " "));
  const validLocations = locations;
  type Location = (typeof validLocations)[number];
  const isValidLocation = (value: string): value is Location =>
    (validLocations as readonly string[]).includes(value);

  if (!isValidLocation(id)) {
    notFound();
  }

  useEffect(() => {
    const fetchFeedbackData = async () => {
      const locationID = (await locNameToID(loc_name)) as number;
      const data = await getFeedback(locationID);
      setFeedback(data ?? []);
    };
    fetchFeedbackData();
  }, [refresh, loc_name]);

  return (
    <div>
      <ComNav />
      <div className="mt-10">
        <CommunityBanner id={loc_name} />
      </div>

      <p className="font-bold text-center text-2xl sm:text-2xl md:text-3xl lg:text-4xl">Community Feedback</p>
      <div className="flex justify-center mt-5">
        <PostFeedbackCard
          loc_name={loc_name} 
          setRefresh={setRefresh} 
        />
      </div>

      <div className="mx-25">
        <div className="flex flex-wrap justify-center">
          {feedback.map((data) => (
            <FeedbackCard
              key={data.id}
              feedbackID={data.id}
              header={data.header}
              body={data.body}
              date={new Date(data.created_at).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
              isWhite={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
