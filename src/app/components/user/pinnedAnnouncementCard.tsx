import React from 'react'
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
  DialogFooter,
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
    // <div className="bg-[#E6F1FF] rounded-[8px] my-2 pl-5 w-70 py-2">
    //     <p className="font-semibold text-md">{header}</p>

    //     <div className="flex flex-row place-items-center gap-3 mb-2">
    //         <p className="text-white bg-[#58AEFF] rounded-2xl text-center w-15 text-xs">{announcementType.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}</p>
    //         <p className="font-thin">{author}</p>
    //     </div>

    //     <p className="mr-8 mb-2 text-xs truncate">
    //         {body}
    //     </p>
    // </div>

    <Dialog>
      <DialogTrigger className="mb-5">
        <div className="cursor-pointer w-70 xl:w-40 2xl:w-60 min-h-fit max-h-full justify-items-start p-5 bg-[#E6F1FF] rounded-md shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
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
          <div className="mt-7 mb-10 flex flex-col xl:flex-row justify-between">
            <div className="flex flex-col">
              <p className="font-semibold text-xl">Header</p>
              <p className="mb-3 text-white bg-[#58AEFF] rounded-2xl text-center min-w-15 max-w-fit px-2 text-xs">
                Hello
              </p>
              <p className="pb-3 lg:pb-0 lg:w-150">
                Body
              </p>
            </div>
            Photo

          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}