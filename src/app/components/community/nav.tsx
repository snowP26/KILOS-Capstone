"use client";

// Created by James, this is the navigation bar component for the community side view. 

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu } from 'lucide-react';

export const ComNav = () => {
    const pathname = usePathname(); // use this to check the current tab the user is on.
    const router = useRouter(); // use this for /app navigation

    const [isOpen, setIsOpen] = useState(false);

    function getMenuClassname() {
        let menuClassname = [];

        if (isOpen) {
            menuClassname = [
                "flex",
                "absolute",
                "top-19",
                "bg-[#052659]",
                "w-full",
                "p-8",
                "left-0",
                "gap-5",
                "flex-col",
            ];
        } else {
            menuClassname.push("hidden", "lg:flex", "lg:ml-50", "lg:w-200", "lg:justify-between");
        }
        
        return menuClassname.join(" ");
    };

// nav=flex items-center justify-between py-5 px-20 border-b-2 sticky top-0 bg-white z-50

    return (
        <nav className="flex sticky top-0 border-b-2 py-5 z-50 w-screen bg-white p-4 sm:p-6 md:flex md:justify-between md:items-center">
            <div className="container flex mx-auto justify-center lg:justify-around sm:items-center">
                <h1 className="inline-block text-[#0073FF] font-bold text-3xl cursor-pointer" onClick={() => { router.push("/") }}>KILOS</h1>
                <div className={getMenuClassname()}>
                    <Link href='/' className={pathname === "/" ? "mr-4 text-white text-lg font-bold underline lg:mr-4 lg:text-black lg:font-bold lg:text-lg" : "mr-4 text-gray-400 text-lg lg:mr-4 lg:text-gray-400 lg:text-lg"}>
                        Home
                    </Link>
                    <Link href='/feedback' className={pathname.startsWith("/feedback") ? "mr-4 text-white text-lg font-bold underline lg:mr-4 lg:text-black lg:font-bold lg:text-lg" : "mr-4 text-gray-400 text-lg lg:mr-4 lg:text-gray-500 lg:text-lg"}>
                        Share your Insights
                    </Link>
                    <Link href='/login' className={pathname.startsWith("/login") ? "mr-4 text-white text-lg font-bold underline lg:mr-4 lg:text-black lg:font-bold lg:text-lg" : "mr-4 text-gray-400 text-lg lg:mr-4 lg:text-gray-500 lg:text-lg"}>
                        Login as Official
                    </Link>
                </div>
            </div>

            <div className="flex items-center lg:hidden">
                <Menu
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                    className="cursor-pointer"
                />
            </div>

        </nav>
    )
}