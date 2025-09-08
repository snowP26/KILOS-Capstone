"use client";

import { usePathname, useRouter } from "next/navigation";
import { TextIcon } from "../text-logo";
import { logoutUser } from "../../actions/auth";
import { useState } from "react";
import { Menu } from "lucide-react";

export const UserNav = () => {
    const pathname = usePathname();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    function getMenuClassname() {
        let menuClassname = [];

        if (isOpen) {
            menuClassname = [
                "flex",
                "absolute",
                "top-19",
                "bg-[#021024]",
                "w-full",
                "p-8",
                "left-0",
                "gap-5",
                "flex-col",
            ];
        } else {
            menuClassname.push("hidden", "lg:flex", "lg:w-300", "lg:justify-between", "items-center")
        }

        return menuClassname.join(" ");
    };
// text-center w-auto py-8 space-x-18 content-center 
    return (
        <nav className="flex sticky top-0 py-5 z-50 bg-[#021024] sm:p-6 md:justify-center">
            <div className="container w-full flex mx-5 justify-between sm:items-center md:justify-between lg:justify-around xl:w-[90%] gap-30">
                <TextIcon />
                <div className={getMenuClassname()}>
                    <Link href='/users/home' className={pathname.startsWith('/users/home') ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                        Home
                    </Link>
                    <Link href='/users/projects' className={pathname.startsWith('/users/projects') ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                        Projects
                    </Link>
                    <Link href='/users/ordinances' className={pathname.startsWith('/users/ordinances') ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                        Ordinances
                    </Link>
                    <Link href='/users/announcements' className={pathname.startsWith('/users/announcements') ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                        Announcement
                    </Link>
                    <Link href='/users/facebook-page' className={pathname.startsWith('/users/facebook') ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                        Facebook Page
                    </Link>
                    <Link href='/users/community-feedback' className={pathname.startsWith('/users/community-feedback') ? 'p-4 bg-white text-[#052659] rounded-md font-bold' : "text-white"}>
                        Community Feedback
                    </Link>
                    <a className="text-white mt-10 lg:m-0 cursor-pointer" onClick={() => logoutUser(router)}>
                        Log Out
                    </a>
                </div>

                <div className="flex items-center lg:hidden">
                    <Menu
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                        className="cursor-pointer text-white"
                    />
                </div>
            </div>
        </nav>

    )
}

