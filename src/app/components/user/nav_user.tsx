"use client";

import { usePathname, useRouter } from "next/navigation";
import { TextIcon } from "../text-logo";
import { logoutUser } from "../../actions/auth";

export const UserNav = () => {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { label: "Home", path: "/users/home" },
        { label: "Projects", path: "/users/projects" },
        { label: "Ordinances", path: "/users/ordinances" },
        { label: "Announcement", path: "/users/announcement" },
        { label: "Facebook Page", path: "/users/facebook-page" },
        { label: "Community Feedback", path: "/users/community-feedback" },
    ];

    return (
        <div className="sticky top-0 z-50 text-center w-auto py-8 space-x-18 bg-[#021024] content-center">
            <TextIcon />

            {navItems.map((item) => (
                <button
                    key={item.path}
                    onClick={() => {
                        router.push(item.path);
                        window.scrollTo(0, 0); 
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
                className="text-black bg-white p-5 cursor-pointer"
            >
                Log Out
            </button>
        </div>
    );
};
