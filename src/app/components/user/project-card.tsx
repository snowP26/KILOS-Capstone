import React from 'react'


type ProjectCardProps = {
    title: string,
    status: string,
    date: string,
    imgURL: string,
}

export const ProjectCard = ({ title, status, date, imgURL }: ProjectCardProps) => {
    return (
        <div className="relative p-5 h-100 w-65 lg:w-60 xl:h-135 xl:w-90 bg-white rounded-md shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <img src={imgURL} className="bg-black mx-4 h-65 xl:h-100 object-fill" />
            <p className="my-5 font-semibold truncate">
                {title}
            </p>
            <div className="flex flex-row gap-3">
                <div className="w-fit px-3 py-1 rounded-[10px] text-xs bg-amber-500 ">
                    {status}
                </div>
                <div className="w-fit px-3 py-1 rounded-[10px] text-xs bg-[#E6F1FF]">
                    {date}
                </div>
            </div>
        </div>
    )
}

