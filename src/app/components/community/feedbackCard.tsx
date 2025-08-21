"use client";

import { Quote } from "lucide-react";

type feedbackCardProps = {
  header: string;
  body: string;
  date: string;
};

export const FeedbackCard = ({ header, body, date }: feedbackCardProps) => {
  return (
    <div className="m-10 p-5 h-100 w-100 bg-blue-100 rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">
      <Quote fill="black" />
      <p className="m-5 font-semibold text-4xl">{header}</p>

      <p className="m-5 text-gray-500 text-sm">{body}</p>

      <div className="flex flex-row justify-end">
        <p className="font-thin text-xs mr-5 content-center">{date}</p>
        <Quote fill="black" />
      </div>
    </div>
  );
};
