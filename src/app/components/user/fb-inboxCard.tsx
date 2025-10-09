import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const FbInboxCard = () => {
    return (
        <>
            <div className="flex flex-row w-[90%] justify-self-center items-center md:w-[80%] md:justify-center md:items-center lg:w-[65%] gap-3 mt-3">
                {/* image */}
                <Avatar className="w-11 h-11">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex grow flex-col gap-1 justify-center md:w-full">
                    {/* name & date */}
                    <div className="flex flex-row justify-between">
                        <p className="font-semibold">
                            Gavril Mariano
                        </p>
                        <p>
                            Jan 2
                        </p>
                    </div>

                    {/* msg */}
                    <div className="w-55 sm:w-full">
                        <p className="text-xs truncate">Hello! I am inquiring about the youth officials</p>
                    </div>

                </div>
            </div>
            <hr className="border-t border-black w-[90%] mx-auto mt-3" />
        </>

    )
}

