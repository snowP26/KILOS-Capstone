"use client";

import { searchData } from "@/src/app/actions/landingpage";
import { OrdinancesLandingCard } from "@/src/app/components/community/ordinances-landingCard";
import { ordinance } from "@/src/app/lib/definitions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, use } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const locationID = searchParams.get("loc");
  const loc = locationID ? parseInt(locationID, 10) : undefined;
  const [results, setResults] = useState<ordinance[]>([]);

  const setData = async () => {
    if (!query && !locationID) {
      setResults([]);
      return;
    }

    setResults(await searchData(query, loc));
  };

  useEffect(() => {
    const fetchData = async () => {
      await setData();
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-blue-600">{query}</span>
      </h1>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((ord) => (
            <OrdinancesLandingCard
              key={ord.id}
              title={ord.title}
              description={ord.description}
              author={ord.author}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No ordinances found.</p>
      )}
    </div>
  );
}
