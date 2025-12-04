import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

type cardParams = {
    id: number
    title: string
    imgURL: string
    loc: number
    date: string
}

export const UpcomingEventCard = ({ id, title, imgURL, loc, date }: cardParams) => {
    const router = useRouter();
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <div onClick={() => router.push(`/view-project/${id}`)} className="cursor-pointer mb-5 relative w-70 h-110 sm:h-110 sm:w-65 md:h-110 md:w-65 bg-white rounded-[45px] shadow-[-4px_4px_10px_rgba(0,0,0,0.4)] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex justify-center rounded-t-md">
                {imgURL ? (
                    <div className="mt-2 w-[95%] h-75 max-h-75">
                        <img
                            className="w-full max-h-full sm:h-110 rounded-[40px]"
                            src={imgURL}
                            alt={title}
                        />
                    </div>

                ) : (
                    <div className="mt-2 h-75 w-[95%] sm:h-75 md:h-75 flex flex-col items-center justify-center bg-gray-300 rounded-[40px]">
                        <ImageOff className="w-10 h-10 text-gray-400" />
                        <p className='text-gray-400 italic'>No image available</p>
                    </div>
                )}
                <div className="bg-white absolute top-10 right-2 px-5 py-1 rounded-l-md border-l-[0.2px] border-y-[0.2px] border-black">
                    <p className="text-md text-center text-black italic">
                        {formattedDate}
                    </p>
                </div>
            </div>

            <div>
                <p className="mt-2 px-5 text-md font-semibold line-clamp-2 text-center">
                    {title}
                </p>

                <div className="absolute bottom-10 left-3 ">
                    <div className="flex flex-row text-xs">
                        <p>A project by the</p>
                        {loc == 1 ? (
                            <p className="ml-1 font-semibold italic">Naga City Youth Officials</p>
                        ) : loc == 2 ? (
                            <p className="ml-1 font-semibold italic">Bula Youth Officials</p>
                        ) : (
                            <p className="ml-1 font-semibold italic">Pili Youth Officials</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

