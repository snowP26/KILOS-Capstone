"use client";

type ProposedProps = {
    Title: string,
    Description: string,
    Status: string
    PhotoURL?: string
}

export const ProposedProjCard = ({ Title, Description, Status, PhotoURL }: ProposedProps) => {
    return (

        <div className="flex bg-[#E6F1FF] h-full w-[90%] justify-self-center cursor-pointer border border-gray-300 rounded-2xl px-3 py-3 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex flex-row space-x-2">
                {PhotoURL ? (
                    <img src={PhotoURL} className="bg-black w-20 min-w-15 h-25 rounded-[8px] object-cover" />
                ) : (
                    <div className="flex items-center justify-center w-20 min-w-15 h-25 rounded-[8px] bg-gray-200 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11a4 4 0 118 0 4 4 0 01-8 0z" />
                        </svg>
                    </div>
                )}

                <div className="flex flex-col max-w-[70%] h-[100%] gap-1">
                    <p className="max-w-40 font-semibold truncate">{Title}</p>
                    <p className="text-xs h-13 w-40 max-w-40 truncate max-h-15 lg:line-clamp-3">asdasdaasdasasdasdaasdasasdasdaasdasasdasdaasdasasdasdaasdas</p>
                    <p className={`text-xs w-fit px-3 rounded-2xl ${Status === "For Approval" ? "text-white bg-blue-800"
                        : Status === "Approved" ? "text-white bg-green-800"
                            : Status === "Action Pending" ? "text-white bg-yellow-800"
                                : Status === "Declined" ? "text-white bg-red-800"
                                    : Status === "Under Review" ? "text-white bg-purple-800"
                                        : ""
                    }`}>
                        {Status}
                    </p>
                </div>
            </div>
        </div>
    )
}