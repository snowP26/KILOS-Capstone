"use client";

import {
  locColumns,
  Users,
} from "../../(screens)/superadmin/../../loc-columns";
import { DataTable } from "../../(screens)/superadmin/../../locData-table";

import { SideBar } from "@/src/app/components/superadmin/sideBar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUsersByLoc } from "@/src/app/actions/super_admin";
import { locNameToID } from "@/src/app/actions/convert";

export default function LocationsID() {
  const [data, setData] = useState<Users[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const location = Array.isArray(params.id)
          ? params.id[0]
          : params.id;
        if (!location) return;

        const locID = await locNameToID(location);

        const youthOfficials = await getUsersByLoc(locID);
        console.log(await getUsersByLoc(locID))
        setData(youthOfficials || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    console.log(params.id)

    fetchUsers();
  }, [params.id]);
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
          <h1 className="text-black text-4xl font-bold underline">Bula</h1>
        </div>

        <div className="text-black container mx-auto pb-10">
          <DataTable columns={locColumns} data={data} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
