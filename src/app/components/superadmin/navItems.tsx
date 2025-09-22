"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import { useRouter, usePathname } from "next/navigation"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavItems({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    const router = useRouter();
    const pathname = usePathname();


    return (
        <SidebarGroup>
            <SidebarGroupLabel><h1 className="text-[#C1E8FF] font-bold text-3xl">KILOS</h1></SidebarGroupLabel>
            <SidebarMenu className="mt-5">
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>

                                    {/* draft for sidebar active button highlight */}
                                    {item.items?.map((subItem) => {
                                        // ✅ Compute values here, outside of JSX
                                        const normalizedPathname = pathname.replace(/\/$/, "")
                                        const normalizedBaseUrl = subItem.url.replace(/\[id\]/, "").replace(/\/$/, "")
                                        const isActive = normalizedPathname.startsWith(normalizedBaseUrl)

                                        return (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <a
                                                        href={subItem.url}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            router.push(subItem.url)
                                                        }}
                                                        data-active={isActive}
                                                        className={`text-white ${isActive ? "bg-white" : ""
                                                            }`}
                                                    >
                                                        <span>{subItem.title}</span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        )
                                    })}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup >
    )
}
