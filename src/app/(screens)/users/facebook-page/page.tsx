import React from 'react'


import { Info } from 'lucide-react'
import { MapPin } from 'lucide-react'
import { Mail } from 'lucide-react'
import { Phone } from 'lucide-react'
import { FbInboxCard } from '@/src/app/components/user/fb-inboxCard'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function FacebookPage() {
    return (
        <div className="w-[100%] min-h-screen max-h-fit">
            {/* Title */}
            <p className="font-bold text-2xl mt-6 mx-10 sm:text-3xl">
                Facebook Page
            </p>
            <hr className="border-t border-black w-[90%] lg:w-[95%] mx-auto mt-1" />

            <div className="flex flex-col lg:flex-row">

                {/* Information */}
                <div className="bg-white w-[90%] mt-6 pb-5 self-center h-fit rounded-[10px] lg:self-start lg:mt-3 lg:ml-3 lg:pt-5 lg:w-[25%] xl:w-1/5 ">
                    <p className="text-xl mt-3 font-semibold text-center text-shadow-lg lg:text-md lg:mt-0 lg:mx-5">Bula Municipal Youth Officials</p>
                    <hr className="border-t border-black w-[90%] mx-auto my-3" />

                    {/* Information items */}
                    <div className="mx-auto w-[90%] space-y-3">
                        <div className="w-full flex flex-row gap-5 md:gap-2 lg:my-5 lg:gap-2 xl:my-10">
                            <Info className="w-[10%] h-full self-center md:p-3 lg:p-0" />
                            <p className="text-sm md:text-lg lg:text-sm self-center w-[90%]">In the Service of the Bulaeño Youth
                            </p>
                        </div>
                        <div className="w-full flex flex-row gap-5 md:gap-2 lg:my-5 lg:gap-2 xl:my-10">
                            <MapPin className="w-[10%] h-full self-center md:p-3 lg:p-0"/>
                            <p className="text-sm md:text-lg lg:text-sm self-center w-[90%]">Bula, Camarines Sur</p>
                        </div>
                        <div className="w-full flex flex-row gap-5 md:gap-2 lg:my-5 lg:gap-2 xl:my-10">
                            <Mail className="w-[10%] h-full self-center md:p-3 lg:p-0"/>
                            <p className="text-sm md:text-lg lg:text-sm self-center w-[90%] italic underline">bmyouthofficials@gmail.com</p>
                        </div>
                        <div className="w-full flex flex-row gap-5 md:gap-2 lg:my-5 lg:gap-2 xl:my-10">
                            <Phone className="w-[10%] h-full self-center md:p-3 lg:p-0"/>
                            <p className="text-sm md:text-lg lg:text-sm self-center w-[90%] italic underline">+639001118392</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-row w-[70%] gap-0.5 mt-10 self-center text-center lg:hidden">
                    <div className="bg-[#052659] w-[100%] text-white shadow-md shadow-gray-400 text-xs lg:text-lg p-2 rounded-tl-2xl rounded-bl-2xl cursor-pointer">
                        <p>Feed</p>
                    </div>
                    <div className="bg-[#052659] w-[100%] opacity-60 text-gray-400 shadow-lg shadow-blue-800/40 text-xs lg:text-lg p-2 rounded-tr-2xl rounded-br-2xl cursor-pointer">
                        <p>Page Inbox</p>
                    </div>
                </div>

                {/* start of fb post card */}
                <div className="w-[90%] mt-3 self-center lg:w-[50%] xl:w-3/5 lg:my-2 lg:mx-3">
                    <Button className="w-[100%] rounded-[20px] bg-[#B2D3FF] font-bold text-black hover:bg-black hover:text-[#B2D3FF] cursor-pointer">Create a new post</Button>
                    <div className="bg-white rounded-2xl w-[100%] px-5 pb-2 mt-3 mb-2 lg:mt-2">
                        <div className="w-full flex flex-row justify-between">

                            <div className="w-full mt-5 flex flex-row gap-2">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col self-center">

                                    <p className="font-semibold text-md xl:text-xl">Bula Municipal Youth Officials</p>

                                    <div className="flex flex-row gap-1">
                                        <p className="text-sm font-thin">January 1</p>
                                        <p className="text-sm font-thin">at</p>
                                        <p className="text-sm font-thin">2:20 pm</p>
                                    </div>
                                </div>
                            </div>

                            <div className="self-center">
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger></NavigationMenuTrigger>
                                            <NavigationMenuContent className="bg-[#E6F1FF]">
                                                <ul className="grid w-[80px] gap-3">
                                                    <li>
                                                        <NavigationMenuLink asChild>
                                                            <p className="hover:bg-blue-900 hover:text-white text-center">Edit</p>
                                                        </NavigationMenuLink>
                                                        <NavigationMenuLink asChild>
                                                            <p className="hover:bg-blue-900 hover:text-white text-center">Delete</p>
                                                        </NavigationMenuLink>
                                                        <NavigationMenuLink asChild>
                                                            <p className="hover:bg-blue-900 hover:text-white text-center">Copy Link</p>
                                                        </NavigationMenuLink>
                                                    </li>
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                        </div>

                        <div className="mt-8">
                            <p>
                                BIG THINGS START WITH SMALL DIGS! 🌱
                                <br /><br />
                                It only takes one step—and one shovel—to start something bigger. This June 25, we&apos;re not just planting trees.
                                We&apos;re planting hope, setting down roots, and growing a future that&apos;s greener and stronger for Bula. ✨
                                <br /><br />
                                The Bula Municipal Youth Officials invite you to move with nature, and take part in our EnviroWARRIOR:
                                YOUTH TREE GROWING ACTIVITY happening in LA Victoria, Bula, Camarinues Sur at 8:00 AM.
                                <br /><br />
                                Let&apos;s plant today, so tomorrow can breathe better! 🍃
                                <br /><br />
                                🎨 : Adrian Abonita
                                <br />
                                ✍️ : Ron Avery Ystelle Baldovia
                            </p>
                        </div>

                        <div className="my-5">
                            {/* image placeholder */}
                            <div className="bg-black aspect-2/3 object-cover"></div>
                        </div>

                    </div>
                    {/* end of fb post card */}

                </div>
                <div className="self-center mb-5 w-[95%] lg:w-[25%] xl:w-1/5 lg:mr-3 lg:self-start">
                    {/* <Button className="bg-[#052659] w-[100%] my-2">Create Announcement</Button> */}

                    <div className="bg-white rounded-[10px] mt-2 pt-5 h-fit pb-5">
                        <p className="text-center text-2xl font-semibold">Page Inbox</p>
                        <hr className="border-t border-black w-[90%] mx-auto mt-5" />
                        <div>
                            <FbInboxCard />
                            <FbInboxCard />
                            <FbInboxCard />
                            <FbInboxCard />
                            <FbInboxCard />
                            {/* <PinnedAnnouncementCard />
                        <PinnedAnnouncementCard />
                        <PinnedAnnouncementCard /> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )

}

