"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText } from "lucide-react";
import { authorIDtoName, locIDtoName } from "../../actions/convert";
import { useEffect, useState } from "react";
import { getOrdinanceURL, openOrdinancePDF } from "../../actions/ordinances";
import Swal from "sweetalert2";

type ordinanceCard = {
    id: number,
    title: string,
    description: string,
    author: number,
    locationID: number
}


export const PublishedOrdinanceCard = ({ id, title, description, author, locationID }: ordinanceCard) => {
    const [authorName, setAuthorName] = useState<string | null>("");
    const [location, setLocation] = useState<string>("");
    const [fileURL, setFileURL] = useState<string>("")

    useEffect(() => {
        const fetchData = async () => {
            const name = await authorIDtoName(author);
            const loc = await locIDtoName(locationID);
            const fileURL = await getOrdinanceURL(id)
            setAuthorName(name);
            setLocation(loc);
            setFileURL(fileURL)
        };
        fetchData();
    }, [author, locationID]);

    return (
        <div
            className="flex flex-col items-center lg:flex-row lg:gap-2 rounded-2xl border-[0.2px] border-gray-300 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[-4px_4px_4px_rgba(0,0,0,0.15)] lg:border-none lg:hover:shadow-none lg:hover:-translate-y-0 lg:cursor-default relative group"
        >
            {/* Hover overlay */}
            <div className="absolute z-1 inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center lg:hidden">
                <FileText className="w-10 h-10 text-white drop-shadow-md" />
            </div>

            <div className="w-70 bg-white lg:bg-transparent py-2 rounded-t-2xl lg:w-[30%]">
                <Avatar className="object-cover w-35 h-35 place-self-center lg:place-self-end lg:w-50 lg:h-50">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>

            <div
                className={`w-70 lg:h-fit lg:w-[70%] bg-white rounded-b-2xl lg:rounded-2xl p-5 lg:border-[0.2px] lg:border-gray-300 lg:transform lg:transition-all lg:duration-300  ${fileURL ? "cursor-pointer lg:hover:-translate-y-2 lg:hover:shadow-[-4px_4px_4px_rgba(0,0,0,0.15)]" : "cursor-not-allowed"} relative group`}
                onClick={async () => {
                    if (fileURL) {
                        window.open(fileURL, "_blank")
                    } 
                    Swal.fire({ 
                            title: "No document found.",
                            text: "This ordinance does not have a file set. Contact your local Youth Official for this issue.",
                            icon: "info",
                            timer: 1250
                        })
                }}
            >

                {fileURL && (
                    <div className="absolute z-1 inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300  items-center justify-center hidden lg:flex">
                        <FileText className="w-10 h-10 text-white drop-shadow-md" />
                    </div>
                )

                }

                <h1 className="font-bold text-2xl truncate">
                    Ordinance {title}
                </h1>
                <p className="text-black font-semibold mt-3 mb-10 lg:mb-4 line-clamp-3">
                    {description}
                </p>
                <p className="text-xl font-thin">
                    {authorName}
                </p>
                <p className="text-sm font-thin">
                    {location}
                </p>

            </div>
        </div >

    );
};
