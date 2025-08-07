"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { UserNav } from '@/src/app/components/user/nav_user';
import { OrdinancesCard } from '@/src/app/components/user/ordinances-card';

export default function Ordinances()  {
  return (
    <div className="bg-[#E6F1FF] min-h-screen max-h-fit">
      <UserNav />

      <div className="flex flex-row justify-between mt-15 mx-40">
          <p className="font-bold text-3xl">Ordinances & Resolutions</p>
          
          <div className="flex flex-row gap-2">
              <Button className="bg-white text-[#052659] border-[1px] border-black">View Pending</Button>
              <Button className="bg-[#052659] text-white">Submit Document</Button>
          </div>
      </div>

      <hr className="border-t border-black w-[90%] mx-auto my-3" />

      {/* SortBy Placeholder */}
      <div className="mr-35 place-self-end">
          <Button className="bg-white px-8 text-black">Sort By</Button>
      </div>
      
      <div className="pb-5">
        <OrdinancesCard />
        <OrdinancesCard />
      </div>
      
    </div>
  )
}
