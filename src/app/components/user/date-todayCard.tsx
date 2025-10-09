import React from 'react'

export const DateTodayCard = () => {
  return (
    <div className="bg-[#021024] w-[100%] h-[100%] rounded-md p-10 pt-5 pb-10">
      <p className="text-white">Today is...</p>

      <p className="text-[#C1E8FF] font-bold text-center">
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          weekday: "long",
        })}
      </p>
    </div>
  )
}

