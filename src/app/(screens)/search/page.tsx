"use client";

import { useState } from "react";
import { searchData } from "@/src/app/actions/landingpage";
import { ordinance } from "@/src/app/lib/definitions";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OrdinancesLandingCard } from "../../components/community/ordinances-landingCard";

export default function OrdinanceSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ordinance[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const data = await searchData(query);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search ordinances..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.length > 0 ? (
          results.map((ord) => (
            <OrdinancesLandingCard
              key={ord.id}
              title={ord.title}
              description={ord.description}
              author={ord.author}
            />
          ))
        ) : (
          <p className="text-gray-500">No ordinances found.</p>
        )}
      </div>
    </div>
  );
}
