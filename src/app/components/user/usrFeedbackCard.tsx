"use client";

import { Quote } from 'lucide-react';

export const UsrFeedbackCard = () => {
  return (
    <div className="m-10 p-5 h-100 w-100 bg-white rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">
        
        <Quote fill='black'/>
        <p className="m-5 font-semibold text-4xl">The new project was great!</p>

        <p className="m-5 text-gray-500 text-sm">
            Naga City is Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
       
        <div className="flex flex-row justify-end">
            <p className="font-thin text-xs mr-5 content-center">Jan 1, 2000</p>
            <Quote fill='black'/>
        </div>
    </div>
  )
}