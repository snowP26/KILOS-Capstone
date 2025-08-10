import React from 'react'
// bg-[#E6F1FF]
export const PinnedAnnouncementCard = () => {
  return (
    <div className="bg-[#E6F1FF] rounded-[8px] my-2 pl-5 w-70 py-2">
        <p className="font-semibold text-md">Announcement Header</p>

        <div className="flex flex-row place-items-center gap-3 mb-2">
            <p className="text-white bg-[#58AEFF] rounded-2xl text-center w-15 text-xs">General</p>
            <p className="font-thin">Author Name</p>
        </div>

        <p className="mr-8 mb-2 text-xs truncate">
            Announcement! lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
            laborum.
        </p>
    </div>
  )
}