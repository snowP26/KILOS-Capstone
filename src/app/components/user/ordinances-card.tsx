import React, { useEffect, useState } from "react";
import { authorIDtoName } from "../../actions/convert";

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
    <div className={`flex flex-row mx-40 my-5 ${className || ""}`}>
      <div className="w-[10%] mx-10">
        <div className="bg-blue-300 w-40 h-40 rounded-full"></div>
      </div>

      <div className="bg-white rounded-[20px] w-[90%] px-10 py-5 mr-5 hover:shadow-lg hover:transition-all duration-250">
        <p className="font-semibold text-2xl">Ordinance {title}</p>
        <p className="font-semibold text-xl truncate my-2 mr-10 w-250">
          {description}
        </p>
        <p className="text-xl font-thin">{authorName || "Loading..."}</p>
        <p className="text-xs font-thin">{submit_date}</p>
      </div>
    </div>
  );
};
