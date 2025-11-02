import React, { useEffect, useState } from "react";
import { authorIDtoName } from "../../actions/convert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText } from "lucide-react";

type OrdinanceCardProps = {
  title: string;
  description: string;
  author: number;
  submit_date: string;
  className?: string
};

export const OrdinancesCard = ({
  title,
  description,
  author,
  submit_date,
  className,
}: OrdinanceCardProps) => {
  const [authorName, setAuthorName] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const fetchAuthor = async () => {
      try {
        const name = await authorIDtoName(author);
        if (isMounted) setAuthorName(name || "Unknown Author");
      } catch (err) {
        console.error("Failed to fetch author:", err);
        if (isMounted) setAuthorName("Unknown Author");
      }
    };

    fetchAuthor();

    return () => {
      isMounted = false;
    };
  }, [author]);

  return (
      <div
        className="flex flex-col items-center lg:flex-row lg:gap-2 cursor-pointer rounded-2xl border-[0.2px] border-gray-300 transform transition-all duration-300 hover:-translate-y-2  hover:shadow-[-4px_4px_4px_rgba(0,0,0,0.15)] lg:border-none lg:hover:shadow-none lg:hover:-translate-y-0 lg:cursor-default relative group"
      >
        {/* Hover overlay */}
        <div className="absolute z-1 inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center lg:hidden">
          <FileText className="w-10 h-10 text-white drop-shadow-md" />
        </div>

        <div className="w-70 bg-white lg:bg-transparent py-2 rounded-t-2xl lg:w-[20%]">
          <Avatar className="object-cover w-35 h-35 place-self-center lg:place-self-end lg:w-50 lg:h-50">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="w-70 h-full lg:h-fit lg:w-[70%] bg-white rounded-b-2xl lg:rounded-2xl p-5 lg:border-[0.2px] lg:border-gray-300 lg:transform lg:transition-all lg:duration-300 lg:hover:-translate-y-2 lg:hover:shadow-[-4px_4px_4px_rgba(0,0,0,0.15)] lg:cursor-pointer relative group">

          {/* Hover overlay */}
          <div className="absolute z-1 inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300  items-center justify-center hidden lg:flex">
            <FileText className="w-10 h-10 text-white drop-shadow-md" />
          </div>
          <h1 className="font-bold text-2xl truncate">
            Ordinance {title}
          </h1>
          <p className="text-black font-semibold min-h-19 mt-3 mb-10 lg:mb-4 line-clamp-3">
            {description}
          </p>
          <p className="text-xl font-thin">
            {authorName || "Loading..."}
          </p>
          <p className="text-sm font-thin">
            {submit_date}
          </p>

        </div>
      </div>
  );
};
