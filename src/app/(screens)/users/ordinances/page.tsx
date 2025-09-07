"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { OrdinancesCard } from "@/src/app/components/user/ordinances-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ordinance } from "@/src/app/lib/definitions";
import {
  getOrdinancesByLocID,
  openOrdinancePDF,
} from "@/src/app/actions/ordinances";
import { useUserRole } from "@/src/app/actions/role";
import Swal from "sweetalert2";

export default function Ordinances() {
  const [ordinances, setOrdinances] = useState<ordinance[]>([]);
  const router = useRouter();
  const { role, loading } = useUserRole();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrdinancesByLocID();
      setOrdinances(data);
    };
    fetchData();
  }, []);

  const normalizedRole = role?.trim().toLowerCase();

  if (normalizedRole === "legislative") {
    return (
      <div className="bg-[#E6F1FF] min-h-screen max-h-fit">
        <div className="flex flex-row justify-between mt-15 mx-40">
          <p className="font-bold text-3xl">Ordinances & Resolutions</p>

          <div className="flex flex-row gap-2">
            <Button
              className="bg-white text-[#052659] border-[1px] border-black cursor-pointer hover:bg-[#052659] hover:text-white"
              onClick={() => router.push("/users/ordinances/view-pending")}
            >
              View Pending
            </Button>
            <Button
              className="bg-[#052659] text-white cursor-pointer hover:bg-white hover:text-[#052659] "
              onClick={() => router.push("/users/ordinances/submit-doc")}
            >
              Submit Ordinance
            </Button>
          </div>
        </div>

        <hr className="border-t border-black w-[90%] mx-auto my-3" />

        {/* Sort By Placeholder */}
        <div className="mr-35 place-self-end">
          <Select>
            <SelectTrigger className="w-[100%] bg-white cursor-pointer">
              <SelectValue
                className="placeholder:italic"
                placeholder="Sort By"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newest ordinance">
                  Newest Ordinance
                </SelectItem>
                <SelectItem value="oldest ordinance">
                  Oldest Ordinance
                </SelectItem>
                <SelectItem value="submission date">
                  Submission Date
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Ordinances List */}
        {ordinances.map((data) => (
          <div
            key={data.id}
            className="pb-5 cursor-pointer"
            onClick={async () => await openOrdinancePDF(data.id)}
          >
            <OrdinancesCard
              className="transition-transform duration-300 hover:-translate-y-1 rounded-xl"
              title={data.title}
              description={data.description}
              author={data.author}
              submit_date={data.created_at}
            />
          </div>
        ))}
      </div>
    );
  }

  if (normalizedRole === "executive" || normalizedRole === "treasurer") {
    return <h1>Treasurer and Executive View</h1>;
  }


  return (
    <div className="bg-[#E6F1FF] min-h-screen max-h-fit animate-pulse">
      <div className="flex flex-row justify-between mt-15 mx-40">
        <div className="h-8 w-72 bg-gray-300 rounded"></div>

        <div className="flex flex-row gap-2">
          <div className="h-10 w-28 bg-gray-300 rounded"></div>
          <div className="h-10 w-36 bg-gray-300 rounded"></div>
        </div>
      </div>

      <hr className="border-t border-gray-400 w-[90%] mx-auto my-3" />

      <div className="mr-35 place-self-end">
        <div className="h-10 w-48 bg-gray-300 rounded"></div>
      </div>

      <div className="mt-5 space-y-4 px-40">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-xl shadow-md flex flex-col gap-2"
          >
            <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
