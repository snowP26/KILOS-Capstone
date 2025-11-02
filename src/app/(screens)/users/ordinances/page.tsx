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

export default function Ordinances() {
  const [ordinances, setOrdinances] = useState<ordinance[]>([]);
  const [loadingOrdinances, setLoadingOrdinances] = useState(true);
  const [filter, setFilter] = useState(false)
  const router = useRouter();
  const { role } = useUserRole();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingOrdinances(true)
      try {
        const data = await getOrdinancesByLocID(filter);
        setOrdinances(data);
      } finally {
        setLoadingOrdinances(false);
      }
    };
    fetchData();
  }, [filter]);

  const normalizedRole = role?.trim().toLowerCase();

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
      <p className="text-xl font-semibold text-gray-700 mb-2">
        No Ordinances Available
      </p>
      <p className="text-gray-500 max-w-md mb-6">
        Looks like there are no ordinances at the moment.
        {normalizedRole === "legislative"
          ? " You can start by submitting a new one."
          : " Please check back later for updates."}
      </p>

      {normalizedRole === "legislative" && (
        <Button
          className="bg-[#052659] text-white cursor-pointer hover:bg-white hover:text-[#052659] hover:border-[1px] hover:border-black"
          onClick={() => router.push("/users/ordinances/submit-doc")}
        >
          Submit Ordinance
        </Button>
      )}
    </div>
  );
  
  const SkeletonList = () => (
    <div className="mt-5 space-y-4 px-40">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-4 bg-white rounded-xl shadow-md flex flex-col gap-2 animate-pulse"
        >
          <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );

  const OrdinanceList = () => (
    <div className="flex flex-wrap justify-center lg:flex-col mx-5 sm:mx-20 xl:mx-50 my-10 gap-5">
      {ordinances.map((data) => (
        <div
          key={data.id}
          className="pb-5 cursor-pointer"
          onClick={async () => await openOrdinancePDF(data.id)}
        >
          <OrdinancesCard
            className="transition-transform duration-300 hover:-translate-y-1 rounded-xl"
            id={data.id}
            title={data.title}
            description={data.description}
            author={data.author}
            submit_date={new Date(data.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          />
        </div>
      ))}
    </div>
  );

  if (normalizedRole === "legislative") {
    return (
      <div className="bg-[#E6F1FF] min-h-screen max-h-full">
        <div className="flex flex-col sm:flex-row justify-between mt-15 mx-3 lg:mx-40">
          <p className="font-bold text-2xl sm:text-3xl">Ordinances & Resolutions</p>

          <div className="flex flex-row gap-2 self-center">
            <Button
              className="bg-white text-[#052659] border-[1px] border-black cursor-pointer hover:bg-[#052659] hover:text-white"
              onClick={() => router.push("/users/ordinances/view-pending")}
            >
              View Pending
            </Button>
            <Button
              className="bg-[#052659] text-white cursor-pointer hover:bg-white hover:text-[#052659] hover:border-[1px] hover:border-black"
              onClick={() => router.push("/users/ordinances/submit-doc")}
            >
              Submit Ordinance
            </Button>
          </div>
        </div>

        <hr className="border-t border-black w-[90%] mx-auto my-3" />

        <div className="mr-10 xl:mr-35 place-self-end">
          <Select onValueChange={(value) => {
            setFilter(value === "true")
          }}>
            <SelectTrigger className="w-[100%] bg-white cursor-pointer">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="false">Newest Ordinance</SelectItem>
                <SelectItem value="true">Oldest Ordinance</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Ordinances or Skeleton */}
        {loadingOrdinances ? <SkeletonList /> : <OrdinanceList />}
      </div>
    );
  }

  if (normalizedRole === "executive" || normalizedRole === "treasurer") {
    return (
      <div className="bg-[#E6F1FF] min-h-screen max-h-fit">
        <div className="mt-15 mx-3 lg:mx-40">
          <p className="font-bold text-2xl sm:text-3xl">Ordinances & Resolutions</p>
        </div>

        <hr className="border-t border-black w-[90%] mx-auto my-3" />

        {/* Sort By */}
        <div className="mr-10 xl:mr-35 place-self-end">
          <Select>
            <SelectTrigger className="w-[100%] bg-white cursor-pointer">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newest ordinance">Newest Ordinance</SelectItem>
                <SelectItem value="oldest ordinance">Oldest Ordinance</SelectItem>
                <SelectItem value="submission date">Submission Date</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {loadingOrdinances ? (
          <SkeletonList />
        ) : ordinances.length === 0 ? (
          <EmptyState />
        ) : (
          <OrdinanceList />
        )}
      </div>
    );
  }

  return null;
}
