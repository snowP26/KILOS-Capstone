
import React from 'react'
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pin } from 'lucide-react';


interface PinnedAnnouncementCardProps {
  header: string;
  body: string;
  author: string;
  announcementType: string;
}


export const PinnedAnnouncementCard: React.FC<PinnedAnnouncementCardProps> = ({ header, body, author, announcementType }) => {
  return (

    <Dialog>
      <DialogTrigger className="mb-5">
        <div className="cursor-pointer w-70 xl:w-40 2xl:w-60 min-h-fit max-h-full justify-items-start p-5 bg-[#C1E8FF] rounded-md transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_4px_rgba(0,0,0,0.15)]">
          <p className="font-semibold text-xl xl:text-sm 2xl:text-xl text-black">{header}</p>

          <div className="flex flex-row w-full place-items-center gap-3 mb-2">
            <p className="text-white bg-[#58AEFF] rounded-2xl text-center min-w-fit px-2 text-xs">{announcementType.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}</p>
            <p className="font-thin text-sm xl:text-xs 2xl:text-sm truncate">{author}</p>
          </div>

          <p className="text-start w-full mb-2 text-sm xl:text-xs 2xl:text-sm truncate">
            {body}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#E6F1FF]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <div className="bg-white max-w-115 my-5 px-5 rounded-2xl shadow-[-4px_4px_4px_rgba(0,0,0,0.15),4px_4px_4px_rgba(0,0,0,0.15)] ">
            <div className="flex flex-row">
              <div className="flex flex-col">
                <p className="font-semibold text-sm lg:text-xl mt-5">Author</p>

                <div className="flex flex-row gap-5">
                  {/* apply author position/title in the db */}
                  <p className="text-xs font-thin">Local Municipal Youth Developmental Officer</p>
                  <p className="text-xs font-thin">September 1, 2000</p>
                </div>

              </div>
            </div>
            <div className="mt-7 mb-5 flex flex-col">
              <div className="flex flex-col">
                <p className="font-semibold text-xl">Header</p>
                <p className="mb-3 text-white bg-[#58AEFF] rounded-2xl text-center min-w-15 max-w-fit px-2 text-xs">
                  Hello
                </p>
                <p className="pb-3 lg:pb-10 lg:w-100">
                  Body Body Body Bod Body Bod y Body Body Body Body Body Body Body Body Body Body Body
                </p>
              </div>
              <div className="self-center">
                <div className="bg-black aspect-3/4 object-cover h-70 w-50">
                  <p className="text-white">Image Placeholder</p>
                </div>
              </div>


            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

