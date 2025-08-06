import React from 'react'

export const OrdinancesCard = () => {
  return (
    <div className=" flex flex-row mx-40 my-5">
        <div className="w-[10%] mx-10">
            <div className=" bg-blue-300 w-40 h-40 rounded-full">
                
            </div>
        </div>
        


        <div className="bg-white rounded-[20px] w-[90%] px-10 py-5 mr-5">
            <p className="font-semibold text-2xl">Ordinance 2001-001</p>
            <p className="font-semibold text-xl truncate my-2 mr-10 w-250 ">
                An Ordinance Establishing a Curfew for Minors in the Municipality of Bula
            </p>
            <p className="text-xl font-thin">Juan Dela Cruz</p>
            <p className="text-xs font-thin">February 10, 2001</p>
        </div>
        
    </div>
  )
}

