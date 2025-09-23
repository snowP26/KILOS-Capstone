import { locColumns, Users } from "../../(screens)/superadmin/../../loc-columns"
import { DataTable } from "../../(screens)/superadmin/../../locData-table"

import { SideBar } from "@/src/app/components/superadmin/sideBar"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

async function getData(): Promise<Users[]> {
    // Fetch data from your API here.
    return [
        {
            id: "001",
            createdAt: "2025-08-09 15:51:51.68962+08",
            firstName: "James Gabriel",
            lastName: "Verceluz",
            position: "Youth Mayor",
            role: "Executive",
            email: "m@example.com",
            password: "asdasdas",
        },
        {
            id: "002",
            createdAt: "2025-08-09 15:52:51.68962+08",
            firstName: "Jamarcus JanGavril",
            lastName: "Mariano",
            position: "Youth Vice Mayor",
            role: "Treasurer",
            email: "m+1@example.com",
            password: "asdasdas",
        },
    ]
}


export default async function LocationsID() {
    const data = await getData()

    return (
        <SidebarProvider>
            <SideBar />
            <SidebarInset>
                <header className="flex h-15 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink className="hover:text-gray-500 cursor-default">
                                        Manage Locations
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>ID</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <hr className="border-t border-black w-full mx-auto my-3" />

                <div className="text-center mb-10 lg:text-start lg:mx-5 lg:mt-10">
                    <h1 className="text-black text-4xl font-bold underline">
                        Bula
                    </h1>
                </div>


                <div className="text-black container mx-auto pb-10">
                    <DataTable columns={locColumns} data={data} />
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}

