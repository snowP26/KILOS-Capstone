"use client";

import { UserRound, LogOut } from "lucide-react";

import { NavItems } from "./navItems";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { logoutUser } from "../../actions/auth";
import { useRouter } from "next/navigation";
import client from "@/src/api/client";
import { locations as locs } from "../../(screens)/superadmin/page";
import { useEffect, useState } from "react";

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [locations, setLocations] = useState<locs[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data, error } = await client.from("location").select("*");

        if (error) {
          throw new Error(error.message);
        }
        console.log(data);
        setLocations(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  const router = useRouter();
  const handleLogout = async () => {
    await logoutUser(router);
  };

  const data = {
    navItems: [
      {
        title: "Locations",
        url: "#",
        icon: UserRound,
        items: [
          ...locations.map((loc) => ({
            title: loc.name,
            url: `../../../superadmin/locations/${loc.name
              .toLowerCase()
              .replace(/\s+/g, "-")}/`,
          })),
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="text-white flex flex-col justify-between h-full">
        <div>
          <NavItems items={data.navItems} />
        </div>

        <div>
          <div className="p-4">
            <Button
              className="group-data-[collapsible=icon]:border-0 w-full flex items-center justify-center gap-2 bg-[#1D1A1A] text-[#C1E8FF] font-medium rounded-xl shadow-sm border border-[#2A2727] hover:bg-[#2A2727] hover:text-white transition-all duration-200 ease-in-out sm:text-sm md:text-base"
              onClick={handleLogout}
            >
              <LogOut
                size={18}
                className="opacity-90 group-data-[collapsible=icon]:ml-10"
              />
              <a className="group-data-[collapsible=icon]:opacity-0">Logout</a>
            </Button>
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
