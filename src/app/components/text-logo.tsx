'use client';

import { useRouter } from "next/navigation"

export const TextIcon = () => {
    const router = useRouter();

    return <h1 className="inline-block text-[#C1E8FF] font-bold text-3xl cursor-pointer" onClick={()=> {router.push("/users/home")}}>KILOS</h1>
}