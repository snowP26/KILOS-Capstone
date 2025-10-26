import { ImageOff } from 'lucide-react'
import React from 'react'

type cardParams = {
    title: string
    imgURL: string
    loc: number
    date: string
}

export const UpcomingEventCard = ({ title, imgURL, loc, date }: cardParams) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <div className="relative w-70 h-100 sm:h-140 sm:w-90 bg-blue-100 rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex justify-center rounded-t-md">
                {imgURL ? (
                    <img
                        className="h-75 sm:h-110 object-cover rounded-t-md"
                        src={imgURL}
                        alt={title}
                    />
                ) : (
                    <div className="h-75 w-[80%] sm:h-110 flex flex-col items-center justify-center bg-gray-100 rounded-md mt-5">
                        <ImageOff className="w-10 h-10 text-gray-400" />
                        <p className='text-gray-400 italic'>No Image available</p>
                    </div>
                )}
                <div className="bg-blue-100 absolute top-10 right-0 px-5 py-1 rounded-l-md border-y border-l border-b-blue-200">
                    <p className="text-md text-center text-black italic">
                        {formattedDate}
                    </p>
                </div>

            </div>

            <div>
                <p className="mt-2 px-5 text-md font-semibold line-clamp-2 text-center">
                    {title}
                </p>

                <div className="absolute bottom-2 left-3">
                    <div className="flex flex-row text-sm">
                        <p>A project by the</p>
                        {loc == 1 ? (
                            <p className="ml-1 font-semibold">Naga City Youth Officials</p>
                        ) : loc == 2 ? (
                            <p className="ml-1 font-semibold">Bula Youth Officials</p>
                        ) : (
                            <p className="ml-1 font-semibold">Pili Youth Officials</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

