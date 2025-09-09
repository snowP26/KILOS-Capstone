import React, { useEffect, useState } from 'react'
import { authorIDtoName } from '../../actions/convert';

type ordinanceCard = {
    title: string,
    description: string,
    author: number,
};

export const OrdinancesLandingCard = ({ title, description, author }: ordinanceCard) => {
    const [authorName, setAuthorName] = useState("Loading...");

    useEffect(() => {
        const fetchAuthor = async () => {
            const name = await authorIDtoName(author);
            setAuthorName(name ?? "Unknown Author");
        };
        fetchAuthor();
    }, [author]);

    return (
        <div className="bg-blue-100 rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)] place-content-center">
            <div className="flex flex-col mt-3 lg:flex-row mx-10">
                <div className="w-40 h-40 md:w-40 md:min-w-40 md:h-40 mt-5 rounded-full bg-gray-200 flex items-center self-center justify-center text-gray-500 ">
                    No Image
                </div>

                <div className="mt-5 flex flex-col justify-around sm:ml-10">
                    <strong className="text-balance mb-5 sm:mb-0">
                        {description}

                    </strong>
                    <span>Ordinance {title}</span>
                </div>
            </div>

            <div className="flex flex-row mt-8 mb-2 ml-10 text-xs sm:text-sm">
                <p className="font-semibold mr-2">Ordinance Author:</p>
                <p className="italic">{authorName}</p>
            </div>
        </div>
    )
}

