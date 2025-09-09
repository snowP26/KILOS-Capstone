import React from 'react'

export const UpcomingEventCard = () => {
  return (
    <div className="relative mt-10 p-5 w-70 h-100 sm:h-140 sm:w-90 bg-blue-100 rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">
        <div className="bg-black h-70 sm:h-100 object-fill">
            
        </div>
        <div>
            <p className="mt-2 text-md font-semibold text-center">
                HIBLA: Weaving Safety, Dignity, and Dialogue
            </p>

            <div className="absolute bottom-2 left-3">
                <div className="flex flex-row text-sm">
                    <p>
                        A project by the
                    </p>
                    <p className="ml-1 font-semibold">
                        Naga City Youth Officials
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

