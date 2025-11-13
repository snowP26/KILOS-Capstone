import React from "react";

export type StatusType = "Approved" | "Action Pending" | "Under Review" | "For Approval" | "Declined";

type ProjectCard = {
  Title: string;
  Status: StatusType;
  ImgURL?: string;
  TargetDate?: string;
};

const colors: Record<StatusType, string> = {
  Approved: "bg-green-200 text-green-700 border border-green-400",
  "Action Pending": "bg-yellow-200 text-yellow-700 border border-yellow-400",
  "Under Review": "bg-blue-200 text-blue-700 border border-blue-400",
  "For Approval": "bg-indigo-200 text-indigo-700 border border-indigo-400",
  Declined: "bg-red-200 text-red-700 border border-red-400",
};

export const ProjectCard = ({ Title, Status, ImgURL, TargetDate }: ProjectCard) => {
  return (
    <div className="relative p-5 h-full w-65 lg:w-60 xl:w-90 bg-white rounded-md shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {ImgURL ? (
        <div className="">
          <img
            src={ImgURL}
            alt="Project"
            className="aspect-3/4 w-full object-cover rounded-md"
          />
        </div>
      ) : (
        <div className="flex bg-blue-100 aspect-3/4 object-contain rounded-md items-center justify-center font-bold text-blue-600">
          {Title.charAt(0).toUpperCase()}
        </div>
      )}

      <p className="my-5 font-semibold truncate">{Title}</p>
      <div className="flex flex-row space-x-2">
        <div className={`w-fit px-2 py-1 rounded-[10px] text-xs ${colors[Status]}`}>
          {Status}
        </div>
        {TargetDate && (
          <div className="w-fit px-2 py-1 rounded-[10px] text-xs bg-[#FFD7C8]">
            {new Date(TargetDate).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric"
            })}
          </div>
        )}
      </div>

    </div>
  );
};
