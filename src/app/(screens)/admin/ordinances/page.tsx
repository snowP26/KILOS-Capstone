"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ordinance } from "@/src/app/lib/definitions";
import { getPendingOrdinances } from "@/src/app/actions/admin_ordinances";

export default function Ordinances() {
  const router = useRouter();
  const [refresh, setRefresh] = useState(0);
  const [ordinances, setOrdinances] = useState<ordinance[]>([]);

  const fetchData = async () => {
    const data = await getPendingOrdinances();
    if (data) return setOrdinances(data);

  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div className="bg-[#E6F1FF] min-h-screen max-h-full mt-10">
      <p className="font-bold text-2xl text-center mt-8 mb-7 lg:text-start lg:text-3xl lg:ml-30">Proposed Ordinances</p>

      <div className="flex justify-center lg:mx-30 mb-3 lg:place-self-end">
        <Button className="text-white bg-[#052659] h-10 cursor-pointer hover:bg-white hover:text-[#052659]" variant="link" onClick={() => router.push("/admin/ordinances/submit-doc")}>
          Submit an Ordinance
        </Button>
      </div>

      {ordinances.map((data) => (
        <div
            key={data.id}
          className="bg-white rounded-[8px] border drop-shadow-lg p-5 mx-5 lg:mx-30 mb-3 cursor-pointer hover:shadow-xl transition-all hover:border-blue-300"
          onClick={() => router.push(`/admin/ordinances/${data.id}`)}
        >
          <p className="font-semibold text-2xl">{data.title}</p>
          <p className="max-w-350 truncate text-sm overflow-clip pt-2">
            {data.description}
          </p>
        </div>
      ))}
    </div>
  );
}
