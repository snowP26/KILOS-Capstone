import React from 'react'

export const FbInboxCard = () => {
  return (
    <>
        <div className="flex flex-row w-[100%] place-content-center gap-3 mt-3">
            {/* image */}
            <div className="w-15 h-15 bg-black rounded-full">

            </div>
            <div className="flex flex-col gap-1 justify-center w-55">
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
                <div>
                    <p className="text-xs truncate">Hello! I am inquiring about the youth officials</p>
                </div>

            </div>
        </div>
        <hr className="border-t border-black w-[90%] mx-auto mt-3" />
    </>
    
  )
}

