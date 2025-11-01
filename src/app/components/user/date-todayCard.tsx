import React from 'react'

export const DateTodayCard = () => {
  return (
    <div className="bg-[#021024] w-[100%] h-[100%] rounded-md xl:p-7 pt-5 pb-5 flex flex-col items-center">
      <div className="flex flex-row text-md lg:text-sm">
        <div className="flex flex-row gap-2">
          <p className="text-white font-medium">Today is</p>

          <p className="text-[#C1E8FF] font-bold text-center">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </p>
        </div>

        <p className="text-white">.</p>
      </div>
      
      <div className="flex flex-row text-3xl lg:text-md">
        <div className="flex flex-row gap-2 text-3xl lg:text-md">
          <p className="text-white font-medium">Good Day, </p>
          <p className="text-[#C1E8FF] font-bold">
            James
          </p>
        </div>

        <p className="text-white">
          !
        </p>
      </div>

      

    </div>
  )
}

