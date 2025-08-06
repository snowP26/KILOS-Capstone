"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TextIcon } from "../text-logo";
import { logoutUser } from "../../actions/auth";

export const UserNav = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="text-center w-auto py-8 space-x-18 bg-[#021024] content-center ">
            <TextIcon />
            <Link href='/home' className={pathname === '/users/home' ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                Home
            </Link>
            <Link href='/projects' className={pathname === '/users/projects' ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                Projects
            </Link>
            <Link href='/ordinances' className={pathname === '/users/ordinances' ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                Ordinances
            </Link>
            <Link href='/users/announcements' className={pathname === '/users/announcements' ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                Announcement
            </Link>
            <Link href='/users/facebook' className={pathname === '/users/facebook' ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                Facebook Page
            </Link>
            <Link href='/feedback' className={pathname === '/users/feedback' ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>  
                Commuinity Feedback
            </Link>
            <a className="text-black bg-white p-5 cursor-pointer" onClick={() => logoutUser(router)}>
                Log Out
            </a>
        </div>
    )
}