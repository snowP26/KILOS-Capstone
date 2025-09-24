import { posColumns, Users } from "../../(screens)/superadmin/../../pos-columns"
import { DataTable } from "../../(screens)/superadmin/../../posData-table"

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
            position: "Youth Mayor",
            regisCode: "ADZXC2132"
        },
        {
            position: "Youth Vice Mayor",
            regisCode: "ZX23ENAS41"
        },
    ]
}


export default async function PositionsID() {
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
                                        Manage Positions
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

                <div className="mx-5 mt-10">
                    <h1 className="text-black text-4xl font-bold underline">
                        Bula
                    </h1>
                </div>


                <div className="text-black container mx-auto pb-10">
                    <DataTable columns={posColumns} data={data} />
                </div>

            </SidebarInset>
        </SidebarProvider>
    )
}

