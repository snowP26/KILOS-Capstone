import React, { useEffect, useState } from 'react'
import { authorIDtoName } from '../../actions/convert';
import { openOrdinancePDF } from '../../actions/ordinances';
import { FileText } from "lucide-react";

type ordinanceCard = {
    title: string,
    description: string,
    author: number,
    id: number,
};

export const OrdinancesLandingCard = ({ title, description, author, id }: ordinanceCard) => {
    const [authorName, setAuthorName] = useState("Loading...");

    useEffect(() => {
        const fetchAuthor = async () => {
            const name = await authorIDtoName(author);
            setAuthorName(name ?? "Unknown Author");
        };
        fetchAuthor();
    }, [author]);

    return (
        <div
            className="bg-white w-[80%] max-w-75 mx-auto min-h-90 max-h-full sm:min-h-100 sm:max-w-full sm:w-[90%] md:min-h-110 md:max-h-130 md:w-full lg:min-h-full lg:w-full rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer relative group"
            onClick={async () => await openOrdinancePDF(id)}
        >
            {/* Hover overlay */}
            <div className="absolute inset-0 rounded-md bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <FileText className="w-10 h-10 text-white drop-shadow-md" />
            </div>

            <div className="flex flex-col gap-5 mt-3 lg:flex-row mx-10">
                <div className="w-20 h-20 md:w-30 md:min-w-30 md:h-30 lg:min-w-20 lg:w-20 lg:h-20 mt-5 rounded-full bg-gray-300 flex items-center self-center justify-center text-gray-500 group-hover:bg-gray-300 transition-colors">
                    No Image
                </div>

                <div className="mt-5 md:gap-2 flex flex-col justify-around sm:ml-10 md:ml-0">
                    <strong className="text-balance font-medium mb-5 sm:mb-0 line-clamp-2 group-hover:text-blue-800 transition-colors">
                        {description}
                    </strong>
                    <span className="font-medium line-clamp-2 text-gray-700 group-hover:text-blue-900 transition-colors">
                        Ordinance {title}
                    </span>
                </div>
            </div>

            <div className="flex flex-row mt-8 mb-2 pb-4 ml-10 text-xs sm:text-sm">
                <p className="font-semibold mr-2">Ordinance Author:</p>
                <p className="italic text-gray-600 group-hover:text-gray-800 transition-colors">{authorName}</p>
            </div>
        </div>
    )
}
