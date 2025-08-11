"use client";

import { ComNav } from "@/src/app/components/community/nav";
import { CommunityBanner } from "@/src/app/components/community/community-banner";
import { FeedbackCard } from "@/src/app/components/community/feedbackCard";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { locations } from "@/src/app/lib/definitions";
import { notFound } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  type Location = typeof validLocations[number];
  function isValidLocation(value: string): value is Location {
    return (validLocations as readonly string[]).includes(value);
  }
  const validLocations = locations;

  if (!isValidLocation(id)) {
    notFound();
  }

  const toProperCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div>
      <ComNav />
      <div className="mt-10">
        <CommunityBanner id={toProperCase(id.replace("-", " "))} />
      </div>

      <p className="text-4xl font-bold text-center">Community Feedback</p>
      <div className="flex justify-center mt-5">
        <Button className="bg-blue-900">Post a Feedback</Button>
      </div>

      <div className="mx-25">
        <div className="flex flex-wrap justify-center">
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
        </div>
      </div>
    </div>
  );
}
