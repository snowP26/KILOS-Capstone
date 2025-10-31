import React from 'react'
import { Quote } from 'lucide-react';

type recentFeedback = {
  header: string;
  date: string,
}

export const DbRecentFeedbackCard = ({ header, date }: recentFeedback) => {
  return (
    <div className="p-5 mx-3 lg:mx-5 w-full bg-[#C1E8FF] cursor-pointer rounded-md transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[-4px_4px_4px_rgba(0,0,0,0.15)]">

      <div className="mb-2">
        <Quote fill='black' size={15} />
      </div>


      <p className="font-semibold text-xl text-center break-words lg:text-sm">
        {header}
      </p>

      <div className="flex flex-row lg:flex-col justify-end mt-5">
        <p className="font-thin text-xs mr-3">{date}</p>
        <Quote fill='black' size={15} className="lg:self-end" />
      </div>
    </div>
  )
}

