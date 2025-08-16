"use client";

import { ComNav } from "@/src/app/components/community/nav";
import { CommunityBanner } from "@/src/app/components/community/community-banner";
import { FeedbackCard } from "@/src/app/components/community/feedbackCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams, notFound } from "next/navigation";
import { commFeedback, locations } from "@/src/app/lib/definitions";
import { useState } from "react";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const [feedback, setFeedback] = useState<commFeedback>();

  const validLocations = locations;
  type Location = typeof validLocations[number];
  function isValidLocation(value: string): value is Location {
    return (validLocations as readonly string[]).includes(value);
  }

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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-900 cursor-pointer hover:bg-blue-200 hover:text-accent-foreground hover:border-accent-foreground hover:shadow-lg transition-all duration-200">
              Post a Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Submit Feedback</DialogTitle>
              <DialogDescription>
                Share your thoughts with the community.
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Enter your feedback header..."
              value={feedback?.header}
              onChange={}
            />
            <Input
              placeholder="Enter your feedback body..."
              value={feedback?.body}
              onChange={}
            />
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button
                onClick={() => {
                  console.log("Submitted feedback:", feedback);
                  setFeedback(); 
                }}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
