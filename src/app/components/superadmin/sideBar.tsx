"use client"

import * as React from "react"
import {
    UserRound,
    LogOut
} from "lucide-react"

import { NavItems } from "./navItems"

import {
    Sidebar,
    SidebarContent,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { logoutUser } from "../../actions/auth"
import { useRouter } from "next/navigation"

const data = {
    navItems: [
        {
            title: "Locations",
            url: "#",
            icon: UserRound,
            items: [
                {
                    title: "Bula",
                    url: "../../../superadmin/locations/bula/",
                },
                {
                    title: "Naga City",
                    url: "../../../superadmin/locations/naga-city/",
                },
                {
                    title: "Pili",
                    url: "../../../superadmin/locations/pili/",
                },
            ],
        },
    ],
}

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter()
    const handleLogout = async () => {
        await logoutUser(router)
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent className="text-white flex flex-col justify-between h-full">
                <div>
                    <NavItems items={data.navItems} />
                </div>

                <div className="p-4">
                    <Button
                        className="w-full flex items-center justify-center gap-2 bg-[#1D1A1A] text-[#C1E8FF] font-medium rounded-xl shadow-sm border border-[#2A2727] hover:bg-[#2A2727] hover:text-white transition-all duration-200 ease-in-out sm:text-sm md:text-base"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} className="opacity-90" />
                        Logout
                    </Button>
                </div>

            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
