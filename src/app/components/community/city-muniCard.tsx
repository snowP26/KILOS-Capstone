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
            className="rounded-md shadow-[-4px_4px_10px_rgba(0,0,0,0.4)] h-100 hover:border-4 hover:border-blue-400" 
            onClick={() => handleClick(convertString())}>
            {/* <Image src="" alt=""></Image> */}
        </div>
        <p className="mt-3 text-xl font-semibold text-center">
            {name}
        </p>
    </div>
  )
}