import React, { useEffect, useState } from 'react'
import { authorIDtoName, getUserID } from '../../actions/convert'

export const DateTodayCard = () => {
  const [user, setUser] = useState("")

  useEffect(() => {
    const getUser = async () => {
      const userID = await getUserID()

      const userName = await authorIDtoName(Number(userID))

      setUser(userName?.split(" ")[1] ?? "")
    }

    getUser()
  }, [])

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
        <div className="flex flex-row gap-1 text-2xl sm:text-3xl lg:gap-2 lg:text-3xl lg:text-md">
          <p className="text-white font-medium">Good Day, </p>
          <p className="text-[#C1E8FF] font-bold">
            {user}
          </p>
        </div>

        <p className="text-white">
          !
        </p>
      </div>



    </div>
  )
}

