"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TextIcon } from "../text-logo";
import { logoutUser } from "../../actions/auth";

export const AdminNav = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="text-center w-auto py-8 space-x-18 bg-[#021024] content-center ">
            <TextIcon />
            <Link href='/admin/home' className={pathname.startsWith('/admin/home') ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                Home
            </Link>
            <Link href='/admin/projects' className={pathname.startsWith('/admin/projects') ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                Projects
            </Link>
            <Link href='/admin/ordinances' className={pathname.startsWith(`/admin/ordinances`) ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                Ordinances
            </Link>
            <Link href='/admin/announcement' className={pathname.startsWith('/admin/announcement') ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                Announcement
            </Link>
            <Link href='/admin/community-feedback' className={pathname.startsWith('/admin/feedback') ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>  
                Community Feedback
            </Link>
            <a className="text-black bg-white p-5 cursor-pointer" onClick={() => logoutUser(router)}>
                Log Out
            </a>
        </div>
    )
}