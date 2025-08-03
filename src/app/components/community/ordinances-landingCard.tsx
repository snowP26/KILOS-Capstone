import React from 'react'

export const OrdinancesLandingCard = () => {
    return (
        <div className=" bg-blue-100 rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)] place-content-center">
            <div className="flex flex-row mt-3">
                <div className="ml-10 w-40 h-30 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 ">
                    No Image
                </div>

                <div className="ml-10 flex flex-col justify-around">
                    <strong className="text-balance">
                        An Ordinance Providing Educational Assistance to 
                        Indigent but Deserving Youth in the Municipality of Bula
                    </strong>
                    <span>Ordinance 2001-2002</span>
                </div>
            </div>

            <div className="flex flex-row mt-8 mb-2 ml-10">
                <p className="font-semibold mr-2">Ordinance Author:</p>
                <p className="italic">Pedro Dela Cruz</p>
            </div>
        </div>
  )
}

