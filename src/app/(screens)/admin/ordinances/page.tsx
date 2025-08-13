"use client";

import React from 'react'
import { Button } from '@/components/ui/button'


export default function Ordinances() {
    return (
        <div className="bg-[#E6F1FF] min-h-screen mt-10">
            <p className="font-bold text-3xl mt-8 mb-7 ml-30">Proposed Ordinances</p>

            <div className="mx-30 mb-3 place-self-end">
                <Button className="text-white bg-[#052659] h-10 cursor-pointer hover:bg-white hover:text-[#052659]">View Budget Breakdown</Button>
            </div>

            <div className="bg-white rounded-[8px] border drop-shadow-lg p-5 mx-30 mb-3 cursor-pointer hover:shadow-xl transition-all hover:border-blue-300" onClick={() => router.push("/users/ordinances/view-pending/o-2021-022")}>
                <p className="font-semibold text-2xl">Ordinance 2021-022</p>
                <p className="max-w-350 truncate text-sm overflow-clip pt-2">
                    An Ordinance Institutionalizing the Bula Youth Leadership Summit and Declaring It as an
                    Annual Municipal Activity. An Ordinance Institutionalizing the Bula Youth Leadership Summit
                    and Declaring It as an Annual Municipal Activity.
                </p>
            </div>

        </div>
    )
}