import React from 'react'

type ProjectCardProps = {
    title: string,
    status: string,
    date: string,
    imgURL: string,
}

export const ProjectCard = ({ title, status, date, imgURL }: ProjectCardProps) => {
    return (
        <div className="relative mt-10 p-5 h-135 w-90 bg-white rounded-md shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <img src={imgURL} className="bg-black mx-4 h-100 object-fill" />
            <p className="my-5 font-semibold truncate">
                {title}
            </p>
            <div className="flex flex-row gap-3">
                <div className="px-2 py-1 rounded-[10px] text-xs bg-amber-500 ">
                    {status}
                </div>
                <div className="px-2 py-1 rounded-[10px] text-xs bg-[#E6F1FF]">
                    {date}
                </div>
            </div>
        </div>
    )
}

