import React, { useState } from 'react'


type ProjectCardProps = {
    title: string,
    status: string,
    date: string,
    imgURL?: string,
}

export const ProjectCard = ({ title, status, date, imgURL }: ProjectCardProps) => {
    const [color, setColor] = useState<string>("");

    return (
        <div className="relative p-5 h-full w-65 lg:w-60 xl:w-90 bg-white rounded-md shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            {imgURL ? (
                <img src={imgURL} className="aspect-3/4 object-cover rounded-md" />
            ) : (
                <div className="flex bg-blue-100 aspect-3/4 object-contain rounded-md items-center justify-center font-bold text-blue-600">
                    {title.charAt(0).toUpperCase()}
                </div>
            )

            }
            <p className="my-5 font-semibold truncate">
                {title}
            </p>

            <div className="flex flex-col xl:flex-row gap-3">
                <div className={`w-fit px-3 py-1 rounded-[10px] text-xs bg-amber-500 ${status === "For Approval" ? "bg-blue-100 text-blue-800"
                        : status === "Approved" ? "bg-green-100 text-green-800"
                            : status === "Action Pending" ? "bg-yellow-100 text-yellow-800"
                                : status === "Declined" ? "bg-red-100 text-red-800"
                                    : status === "Under Review" ? "bg-purple-100 text-purple-800"
                                        : ""
                    }`}>
                    {status}
                </div>
                <div className="w-fit px-3 py-1 rounded-[10px] text-xs bg-[#E6F1FF]">
                    {new Date(date).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    })}
                </div>
            </div>
        </div>
    )
}

