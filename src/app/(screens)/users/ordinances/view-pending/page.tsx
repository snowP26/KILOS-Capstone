"use client";

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Router } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useRouter } from 'next/navigation';
import { ordinance } from '@/src/app/lib/definitions';
import { getPendingOrdinances } from '@/src/app/actions/ordinances';

export default function ViewPending() {
    const [ordinances, setOrdinances] = useState<ordinance[]>([])
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPendingOrdinances()
            setOrdinances(data)
        }

        fetchData();
    }, [])

    return (
        <div className="bg-[#E6F1FF] min-h-screen mt-10">
            <Breadcrumb className="ml-20">
                <BreadcrumbList>
                    <Button className="group gap-0 relative bg-[#E6F1FF] cursor-pointer" variant="link" onClick={() => router.push("/users/ordinances")}>
                        <ArrowLeft color="black" />
                        <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-12 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
                            Return
                        </div>
                    </Button>
                    <div className="h-5 w-3">
                        <Separator className="bg-gray-500" orientation="vertical" />
                    </div>

                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users/ordinances/">Ordinances & Resolutions</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">My Pending Ordinances & Resolutions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <p className="font-bold text-3xl mt-8 mb-2 ml-30">My Pending Ordinances & Resolutions</p>
            <hr className="border-t border-black w-[90%] mx-auto mt-3 mb-10" />

            {ordinances.map((data) => (
                <div key={data.id} className="bg-white rounded-[8px] border drop-shadow-lg p-5 mx-30 mb-3 cursor-pointer hover:shadow-xl transition-all hover:border-blue-300" onClick={() => router.push(`/users/ordinances/view-pending/${data.title}`)}>
                    <p className="font-semibold text-2xl">Ordinance {data.title}</p>
                    <p className="max-w-350 truncate text-sm overflow-clip pt-2">
                        {data.description}
                    </p>
                </div>

            ))}

        </div>
    )
}