"use client"

import * as React from "react"
import {
    UserRound,
    MapPin,
} from "lucide-react"

import { NavItems } from "./navItems"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
    navItems: [
        {
            title: "Positions",
            url: "#",
            icon: UserRound,
            isActive: true,
            items: [
                {
                    title: "Bula",
                    url: "#",
                },
                {
                    title: "Naga City",
                    url: "#",
                },
                {
                    title: "Pili",
                    url: "#",
                },
            ],
        },
        {
            title: "Locations",
            url: "#",
            icon: MapPin,
            items: [
                {
                    title: "Bula",
                    url: "#",
                },
                {
                    title: "Naga City",
                    url: "#",
                },
                {
                    title: "Pili",
                    url: "#",
                },
            ],
        },
    ],
}

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader
                className="
    sticky top-0 bg-background px-4 py-2 duration-300 ease-in-out
    overflow-hidden"
            >
                <h1 className="text-[#C1E8FF] font-bold text-3xl">KILOS</h1>
            </SidebarHeader>
            <SidebarContent>
                <NavItems items={data.navItems} />
            </SidebarContent>
            <SidebarFooter>

            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
