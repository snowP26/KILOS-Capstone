"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { TextIcon } from "./text-logoUser";
import { logoutUser } from "../../actions/auth";

export const UserNav = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: "Home", path: "/users/home" },
        { label: "Projects", path: "/users/projects" },
        { label: "Ordinances", path: "/users/ordinances" },
        { label: "Announcement", path: "/users/announcement" },
        { label: "Facebook Page", path: "/users/facebook-page" },
        { label: "Community Feedback", path: "/users/community-feedback" },
    ];

    const handleNavigate = (path: string) => {
        router.push(path);
        window.scrollTo(0, 0);
        setIsOpen(false);
    };

    const getMenuClassname = () => {
        if (isOpen) {
            return [
                "flex",
                "absolute",
                "top-19",
                "bg-[#021024]",
                "w-full",
                "p-8",
                "left-0",
                "gap-5",
                "flex-col",
                "z-40",
            ].join(" ");
        }
        return [
            "hidden",
            "lg:flex",
            "lg:w-300",
            "lg:justify-between",
            "items-center",
            "gap-8",
        ].join(" ");
    };

    return (
        <nav className="flex sticky top-0 py-5 z-50 bg-[#021024] sm:p-6 md:justify-center">
            <div className="container w-full flex mx-5 justify-between sm:items-center md:justify-between lg:justify-around xl:w-[90%] gap-30">
                {/* Logo */}
                <TextIcon />

                {/* Menu Items */}
                <div className={getMenuClassname()}>
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => handleNavigate(item.path)}
                            className={
                                pathname.startsWith(item.path)
                                    ? "p-4 bg-white text-[#052659] rounded-md font-bold cursor-pointer"
                                    : "text-white cursor-pointer"
                            }
                        >
                            {item.label}
                        </button>
                    ))}

                    <button
                        onClick={() => logoutUser(router)}
                        className="mt-10 lg:mt-0 px-5 py-2 bg-red-200 text-red-900 font-medium rounded-md shadow-sm hover:bg-red-300 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Log Out
                    </button>
                </div>

                <div className="flex items-center lg:hidden">
                    <Menu
                        onClick={() => setIsOpen(!isOpen)}
                        className="cursor-pointer text-white"
                    />
                </div>
            </div>
        </nav>
    );
};
