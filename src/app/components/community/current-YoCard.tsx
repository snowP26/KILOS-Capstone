import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const CurrentYoCard = () => {
  return (
    <div className="relative m-10 p-5 h-90 w-100 bg-blue-100 rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)]">
      <Avatar className="w-[150px] h-[150px] place-self-center">
          <AvatarImage src="https://github.com/shadcn.png"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <p className="font-semibold mt-5 text-2xl text-center">Hon. Keizer Dela Cruz</p>

      <p className="m-5 font-thin absolute bottom-0 left-0">City Youth Mayor</p>
    </div>
  )
}