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
    SidebarRail,
} from "@/components/ui/sidebar"


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

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent className="text-white">
                <NavItems items={data.navItems} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
