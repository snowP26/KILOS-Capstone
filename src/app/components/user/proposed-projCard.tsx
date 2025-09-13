"use client";

type ProposedProps = {
    Title: string,
    Description: string,
    Status: string
    PhotoURL?: string
}

export const ProposedProjCard = ({ Title, Description, Status, PhotoURL }: ProposedProps) => {
    return (
        <div className="bg-[#E6F1FF] h-[100%] w-full cursor-pointer rounded-2xl px-5 py-3 mb-2 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex flex-row gap-3">
                <img src={PhotoURL} className="bg-black w-20 min-w-15 h-25 rounded-[8px]" />

                <div className="flex flex-col max-w-[70%] h-[100%] gap-1">
                    <p className="font-semibold truncate">{Title}</p>
                    <p className="text-xs h-13 w-[100%] max-h-15 line-clamp-3">{Description}</p>
                    <p className="text-red-500 text-xs w-fit px-3 bg-white rounded-2xl">{Status}</p>
                </div>
            </div>
        </div>
)
}