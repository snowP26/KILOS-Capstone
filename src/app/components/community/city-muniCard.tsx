"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';



export const CityMuniCard = ({ name }: { name: string }) => {
  const router = useRouter();


  const handleClick = (params: string) => {
    return router.push(`/feedback/${params}`)
  }

  const convertString = () => {
    return name.trim().toLowerCase().replace(/ /g, "-");
  }


  return (
    <div className="h-125 w-100 cursor-pointer">
        <div 
            className="rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)] h-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" 
            onClick={() => handleClick(convertString())}>
            <img src="/NagaYOBanner.svg" alt="" className="object-cover w-full h-full rounded-md"></img>
        </div>
        <p className="mt-3 text-xl font-semibold text-center">
            {name}
        </p>
    </div>
  )
}