import React from 'react'

export const OrdinancesCard = () => {
  return (
    <div className="flex flex-col place-items-center xl:flex-row xl:mx-20 my-15 shadow-xl rounded-2xl py-5 m-5 xl:m-0 xl:py-0 xl:shadow-none">
        <div className="xl:w-[10%] xl:mx-10">
            <div className=" bg-blue-300 w-40 h-40 rounded-full">
            </div>
        </div>
        


        <div className="bg-white rounded-[20px] w-[90%] px-10 py-5 mt-5 xl:mr-5">
            <p className="font-semibold text-2xl">Ordinance 2001-001</p>
            <p className="font-semibold text-xl xl:truncate my-2 mr-10 ">
                An Ordinance Establishing a Curfew for Minors in the Municipality of Bula
            </p>
            <p className="text-xl font-thin">Juan Dela Cruz</p>
            <p className="text-xs font-thin">February 10, 2001</p>
        </div>
        
    </div>
  )
}

