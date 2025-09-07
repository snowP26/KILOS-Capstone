import React from "react";

interface PinnedAnnouncementCardProps {
  header: string;
  body: string;
  author: string;
  announcementType: string;
}

export const PinnedAnnouncementCard: React.FC<PinnedAnnouncementCardProps> = ({
  header,
  body,
  author,
  announcementType,
}) => {
  return (
    <div className="bg-[#E6F1FF] rounded-xl shadow-sm hover:shadow-md transition p-4 w-[95%] mx-auto cursor-pointer">
      <p className="font-semibold text-sm text-gray-800 line-clamp-1">{header}</p>

      <div className="flex items-center gap-2 mt-2">
        <span className="px-2 py-0.5 text-[10px] font-medium bg-[#58AEFF] text-white rounded-full">
          {announcementType
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </span>
        <p className="text-xs text-gray-600 truncate">{author}</p>
      </div>
      <p className="mt-2 text-xs text-gray-700 line-clamp-2 text-justify">{body}</p>
    </div>
  );
};
