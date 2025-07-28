"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export const ComNav = () => {
    const pathname = usePathname();

    return(
        <nav>
            <Link href='/' className={pathname === "/" ? "mr-4 text-white font-bold" : "mr-4 text-gray-500"}>
                Home
            </Link>
            <Link href='/feedback' className={pathname === "/feedback" ? "mr-4 text-white font-bold" : "mr-4 text-gray-500"}>
                Share your Insights
            </Link>
            <Link href='/login' className={pathname === "/login" ? "mr-4 text-white font-bold" : "mr-4 text-gray-500"}>
                Login as Official
            </Link>
        </nav>
    )
}