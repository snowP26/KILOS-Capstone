"use client";

import React, { useEffect, useState } from 'react'

import { commFeedback } from '@/src/app/lib/definitions';
import { FeedbackCard } from '@/src/app/components/community/feedbackCard';
import { getFeedback } from '@/src/app/actions/feedback';
import { getLocFromAuth } from '@/src/app/actions/convert';

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
    <div className="bg-[#E6F1FF] h-vh">


      <p className="mt-15 mx-40 font-bold text-3xl">Ordinances & Resolutions</p>
      <hr className="border-t border-black w-[90%] mx-auto my-3" />
      <p className="text-gray-400 font-thin ml-45">Click on a card to add your comments.</p>

      <div className="mx-25">
        <div className="flex flex-wrap justify-center">
          {
            feedback?.map((data) => (
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
                isWhite={true}
              />
            ))
          }
        </div>
      </div>

    </div>
  )
}