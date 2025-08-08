"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { OrdinancesCard } from '@/src/app/components/user/ordinances-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select"

export default function Ordinances() {
  return (
    <div className="bg-[#E6F1FF] min-h-screen max-h-fit">
      <div className="flex flex-row justify-between mt-15 mx-40">
        <p className="font-bold text-3xl">Ordinances & Resolutions</p>

        <div className="flex flex-row gap-2">
          <Button className="bg-white text-[#052659] border-[1px] border-black cursor-pointer hover:bg-[#052659] hover:text-white">View Pending</Button>
          <Button className="bg-[#052659] text-white cursor-pointer hover:bg-white hover:text-[#052659]">Submit Document</Button>
        </div>
      </div>

      <hr className="border-t border-black w-[90%] mx-auto my-3" />

      {/* SortBy Placeholder */}
      <div className="mr-35 place-self-end">
        <Select>
          <SelectTrigger className="w-[100%] bg-white cursor-pointer">
            <SelectValue className="placeholder:italic" placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectItem value="newest ordinance">Newest Ordinance</SelectItem>
              <SelectItem value="oldest ordinance">Oldest Ordinance</SelectItem>
              <SelectItem value="submission date">Submission Date</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="pb-5">
        <OrdinancesCard />
        <OrdinancesCard />
      </div>

    </div>
  )
}
