import React from 'react'
import { Quote } from 'lucide-react';

type recentFeedback = {
  header: string;
  date: string,
}

export const DbRecentFeedbackCard = ({ header, date } : recentFeedback) => {
  return (
    <div className="p-5 lg:w-[70%] bg-[#C1E8FF] rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">
        <div className="mb-2">
            <Quote fill='black' size={15}/>
        </div>
        

        <p className="font-semibold text-xl text-center break-words lg:text-sm">
            {header}
        </p>

        <div className="flex flex-row lg:flex-col justify-end mt-5">
            <p className="font-thin text-xs mr-3">{date}</p>
            <Quote fill='black' size={15} className="lg:self-end"/>
        </div>
    </div>
  )
}

