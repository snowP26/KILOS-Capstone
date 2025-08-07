import React from 'react'

import { Pin } from 'lucide-react';

export const AnnouncementCard = () => {
  return (
    <div className="bg-white rounded-2xl w-[100%] pl-10 pr-10 pb-2 mb-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="font-semibold text-xl mt-5">Author Name</p>

          <div className="flex flex-row gap-5">
            <p className="text-sm font-thin">Author Position/Title</p>
            <p className="text-sm font-thin">Jan 1, 10:30 am</p>
          </div>

        </div>
        <div className="self-center">
          <Pin size="25px"/>
        </div>
      </div>

      <p className="mt-3 text-white bg-[#58AEFF] rounded-2xl text-center w-15 text-xs">General</p>

      <div className="mt-7 mb-10 flex flex-row justify-between">
        <div className="flex flex-col">
          <p className="font-semibold text-xl">Announcement Header</p>
          <p className="w-150">
            Announcement! lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
            laborum. 
          </p>
        </div>
        <div className="bg-black w-50 h-50"></div>
      </div>

    </div>
  )
}