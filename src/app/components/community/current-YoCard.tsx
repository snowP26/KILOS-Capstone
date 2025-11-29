import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type YouthOfficialDetails = {
  fullName: string,
  title: string,
}

export const CurrentYoCard = ({ fullName, title }: YouthOfficialDetails) => {
  return (
    <div className="relative m-10 p-5 h-90 w-100 bg-white rounded-md border ">
      <Avatar className="w-[150px] h-[150px] place-self-center">
          <AvatarImage src="https://github.com/shadcn.png"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <p className="font-semibold mt-5 text-2xl text-center">{fullName}</p>

      <p className="m-5 font-thin absolute bottom-0 left-0">{title}</p>
    </div>
  )
}