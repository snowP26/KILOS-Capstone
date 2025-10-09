"use client";

import React, { useEffect, useState } from 'react'
import { commFeedback } from '@/src/app/lib/definitions';
import { getLocFromAuth } from '@/src/app/actions/convert';
import { getFeedback } from '@/src/app/actions/feedback';
import { FeedbackCard } from '@/src/app/components/community/feedbackCard';

export default function CommunityFeedback() {
  const [feedback, setFeedback] = useState<commFeedback[]>()

  useEffect(() => {
    const fetchFeedbackData = async () => {
      const location = await getLocFromAuth() as number;
      const data = await getFeedback(location)
      if (data) {
        setFeedback(data)
      } else {
        setFeedback([])
      }
    }

    fetchFeedbackData();


  }, [])

  return (
    <div className="bg-[#E6F1FF] min-h-screen max-h-full">


      <p className="font-bold text-xl mt-10 ml-7 md:text-2xl md:ml-13 lg:ml-15 xl:mt-15 xl:mx-40 xl:text-3xl">Community Feedback</p>
      <hr className="border-t border-black w-[90%] mx-auto mt-1 mb-3 xl:my-3" />
      <p className="text-gray-400 font-thin ml-3 md:ml-10 xl:ml-45">Click on a card to view the feedback and its comments.</p>

      <div className="mx-25">
        <div className="flex flex-wrap justify-center">
          {feedback?.map((data) => (
              <FeedbackCard
                key={data.id}
                feedbackID={data.id}
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
                isWhite={true}
              />
            ))
          }
        </div>
      </div>

    </div>
  )
}