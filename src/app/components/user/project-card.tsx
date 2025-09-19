import React from 'react'


type ProjectCardProps = {
    title: string,
    status: string,
    date: string,
    imgURL?: string,
}

export const ProjectCard = ({ title, status, date, imgURL }: ProjectCardProps) => {
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
                <div className="w-fit px-3 py-1 rounded-[10px] text-xs bg-amber-500">
                    {status}
                </div>
                <div className="w-fit px-3 py-1 rounded-[10px] text-xs bg-[#E6F1FF]">
                    {date}
                </div>
            </div>
        </div>
    )
}

