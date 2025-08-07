import React from 'react'

import { UserNav } from '@/src/app/components/user/nav_user'
import { Info } from 'lucide-react'

export default function FacebookPage () {
  return (
    <div>
        <UserNav />
        <div className="flex flex-row">

            <div className="w-1/5 bg-white h-fit border-black border rounded-[10px] pt-5 mt-2 ml-3">
                <p className="text-xl font-semibold ml-4 text-center">Bula Municipal Youth Officials</p>
                <hr className="border-t border-black w-[90%] mx-auto my-3" />
                <div className="mt-5">
                    <p className="bg-[#E6F1FF] rounded-[10px] drop-shadow-xl/25 mx-5 my-7 px-5 py-4 font-semibold ">All Announcements</p>
                    <p className="text-gray-500 my-10 mx-10 font-semibold">Public Safety</p>
                    <p className="text-gray-500 my-10 mx-10 font-semibold">Events</p>
                </div>
            </div>


            <div className="w-3/5 my-2 mx-3">
                {/* <AnnouncementCard/>
                <AnnouncementCard/>
                <AnnouncementCard/> */}
            </div>
            <div className="w-1/5 mr-3">
                {/* <Button className="bg-[#052659] w-[100%] my-2">Create Announcement</Button> */}

                <div className=" bg-white rounded-[10px] pt-5 h-fit pb-5">
                <p className="text-center text-2xl font-semibold">Pinned Announcements</p>
                <div className="justify-items-center mt-5">
                    {/* <PinnedAnnouncementCard />
                    <PinnedAnnouncementCard />
                    <PinnedAnnouncementCard /> */}
                </div>
                </div>
            </div>
            
        </div>
    </div>
    
  )
}

