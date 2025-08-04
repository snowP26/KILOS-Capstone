"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TextIcon } from "../text-logo";

export const UserNav = () => {
    const pathname = usePathname();

    return (
        <div className="text-center w-auto py-8 space-x-18 bg-[#021024] content-center ">
            <TextIcon />
            <Link href='/' className={pathname === '/s' ? 'p-4 bg-white text-black ' : ''}>
                Home
            </Link>
            <Link href='/' className="p-4 bg-white text-[#052659] rounded-md font-bold">
                Projects
            </Link>
            <Link href='/' className="text-white">
                Ordinances
            </Link>
            <Link href='/'>
                Announcement
            </Link>
            <Link href='/'>
                Facebook Page
            </Link>
            <Link href='/'>  
                Commuinity Feedback
            </Link>
            <Link href='/'>
                Log Out
            </Link>
        </div>
    )
}