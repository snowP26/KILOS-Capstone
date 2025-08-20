"use client";

// Created by James, this is the navigation bar component for the community side view. 

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const ComNav = () => {
    const pathname = usePathname(); // use this to check the current tab the user is on.
    const router = useRouter(); // use this for /app navigation

    return(
        <nav className="flex items-center justify-between py-5 px-20 border-b-2 sticky top-0 bg-white z-50">
            <h1 className="inline-block text-[#0073FF] font-bold text-3xl cursor-pointer" onClick={()=> {router.push("/")}}>KILOS</h1>
            <div className="flex space-x-12">
                <Link href='/' className={pathname === "/" ? "mr-4 text-black font-bold text-lg" : "mr-4 text-gray-500 text-lg"}>
                    Home
                </Link>
                <Link href='/feedback' className={pathname.startsWith("/feedback")  ? "mr-4 text-black font-bold text-lg" : "mr-4 text-gray-500 text-lg"}>
                    Share your Insights
                </Link>
            </div>
            <Link href='/login' className={pathname.startsWith("/login")  ? "mr-4 text-black font-bold text-md" : "mr-4 text-gray-500 text-md"}>
                Login as Official
            </Link>
        </nav>
    )
}