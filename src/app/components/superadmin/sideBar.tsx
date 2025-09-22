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
            items: [
                {
                    title: "Bula",
                    url: "../../../superadmin/positions/[id]/",
                },
                {
                    title: "Naga City",
                    url: "../../../superadmin/positions/[id]/",
                },
                {
                    title: "Pili",
                    url: "../../../superadmin/positions/[id]/",
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
                    url: "../../../superadmin/locations/[id]/",
                },
                {
                    title: "Naga City",
                    url: "../../../superadmin/locations/[id]/",
                },
                {
                    title: "Pili",
                    url: "../../../superadmin/locations/[id]/",
                },
            ],
        },
    ],
}

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent className="text-white">
                <NavItems items={data.navItems} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
