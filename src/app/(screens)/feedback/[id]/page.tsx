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
import { RefObject, useEffect, useRef, useState } from "react";
import { getFeedback, postFeedback } from "@/src/app/actions/feedback";
import { locNameToID } from "@/src/app/actions/convert";

export default function Page() {
  const toProperCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const params = useParams();
  const id = params.id as string;
  const formRef = useRef<HTMLFormElement>(null) as RefObject<HTMLFormElement>;
  const [feedback, setFeedback] = useState<commFeedback[]>([]);
  const loc_name = toProperCase(id.replace("-", " "));

  const validLocations = locations;
  type Location = (typeof validLocations)[number];
  function isValidLocation(value: string): value is Location {
    return (validLocations as readonly string[]).includes(value);
  }

  if (!isValidLocation(id)) {
    notFound();
  }

  useEffect(() => {
    const fetchFeedbackData = async () => {
      const data = await getFeedback(loc_name);
      if (data) {
        setFeedback(data);
      } else {
        setFeedback([]);
      }
    };

    fetchFeedbackData();
  }, []);

  return (
    <div>
      <ComNav />
      <div className="mt-10">
        <CommunityBanner id={loc_name} />
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
            <form
              onSubmit={(e) => postFeedback(e, formRef, loc_name)}
              ref={formRef}
            >
              <DialogHeader>
                <DialogTitle>Submit Feedback</DialogTitle>
                <DialogDescription>
                  Share your thoughts with the community.
                </DialogDescription>
              </DialogHeader>
              <Input
                placeholder="Enter your feedback header..."
                name="header"
              />
              <Input placeholder="Enter your feedback body..." name="body" />
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="cursor-pointer">Submit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mx-25">
        <div className="flex flex-wrap justify-center">
          {feedback.map((data) => (
            <FeedbackCard
              key={data.id}
              header={data.header}
              body={data.body}
              date={new Date(data.created_at)
                .toLocaleString("en-US", {
                  month: "long", 
                  day: "numeric", 
                  year: "numeric", 
                  hour: "numeric", 
                  minute: "2-digit", 
                  hour12: true, 
                })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
