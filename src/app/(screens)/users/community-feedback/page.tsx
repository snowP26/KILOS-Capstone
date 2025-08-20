"use client";

import React from 'react'
import { useRouter } from 'next/navigation';

import { UserNav } from '@/src/app/components/user/nav_user';

import { UsrFeedbackCard } from '@/src/app/components/user/usrFeedbackCard';
import { PostFeedbackCard } from '@/src/app/components/community/post-feedbackCard';

export default function CommunityFeedback () {
  const router = useRouter();

  return (
    <div className="bg-[#E6F1FF] h-vh">


        <p className="mt-15 mx-40 font-bold text-3xl">Community Feedback</p>
        <hr className="border-t border-black w-[90%] mx-auto my-3" />
        <p className="text-gray-400 font-thin ml-45">Click on a card to add your comments.</p>

        <div className="mx-25">
            <div className="flex flex-wrap justify-center">
                <UsrFeedbackCard/>
                <UsrFeedbackCard/>
                <UsrFeedbackCard/>
                <UsrFeedbackCard/>
                <UsrFeedbackCard/>
                <UsrFeedbackCard/>
                <UsrFeedbackCard/>
            </div>
        </div>

    </div>
  )
}