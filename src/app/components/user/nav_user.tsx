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

    const navItems = [
        { label: "Home", path: "/users/home" },
        { label: "Projects", path: "/users/projects" },
        { label: "Ordinances", path: "/users/ordinances" },
        { label: "Announcement", path: "/users/announcement" },
        { label: "Facebook Page", path: "/users/facebook-page" },
        { label: "Community Feedback", path: "/users/community-feedback" },
    ];

    function getMenuClassname() {
        let menuClassname: string[] = [];

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
                "z-40",
            ];
        } else {
            menuClassname.push(
                "hidden",
                "lg:flex",
                "lg:w-300",
                "lg:justify-between",
                "items-center",
                "gap-8"
            );
        }

        return menuClassname.join(" ");
    }

    return (
        <nav className="flex sticky top-0 py-5 z-50 bg-[#021024] sm:p-6 md:justify-center">
            <div className="container w-full flex mx-5 justify-between sm:items-center md:justify-between lg:justify-around xl:w-[90%] gap-30">
                {/* Logo */}
                <TextIcon />

                {/* Menu items */}
                <div className={getMenuClassname()}>
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => {
                                router.push(item.path);
                                window.scrollTo(0, 0);
                                setIsOpen(false); // close menu on mobile after clicking
                            }}
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
                        className="text-white mt-10 lg:m-0 cursor-pointer hover:underline"
                    >
                        Log Out
                    </button>
                </div>

                {/* Hamburger */}
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
