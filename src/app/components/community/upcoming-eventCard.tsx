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
        <div className="relative p-5 w-70 h-100 sm:h-140 sm:w-90 bg-blue-100 rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">
            <div className="flex justify-center">
                <img
                    className="h-70 sm:h-100 object-fill"
                    src={imgURL}
                    alt={title}
                />
            </div>

            <div>
                <p className="mt-2 text-md font-semibold text-center">{title}</p>

                <p className="mt-1 text-sm text-center text-gray-600">{formattedDate}</p>

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

