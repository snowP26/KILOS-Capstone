import React from 'react'

interface PinnedAnnouncementCardProps {
  header: string;
  body: string;
  author: string;
  announcementType: string;
}

export const PinnedAnnouncementCard: React.FC<PinnedAnnouncementCardProps> = ({header, body, author, announcementType}) => {
  return (
    <div className="bg-[#E6F1FF] rounded-[8px] my-2 pl-5 w-70 py-2">
        <p className="font-semibold text-md">{header}</p>

        <div className="flex flex-row place-items-center gap-3 mb-2">
            <p className="text-white bg-[#58AEFF] rounded-2xl text-center w-15 text-xs">{announcementType.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}</p>
            <p className="font-thin">{author}</p>
        </div>

        <p className="mr-8 mb-2 text-xs truncate">
            {body}

        </p>
    </div>
  )
}