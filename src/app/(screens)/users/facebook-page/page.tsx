import React from 'react'


import { Info } from 'lucide-react'
import { MapPin } from 'lucide-react'
import { Mail } from 'lucide-react'
import { Phone } from 'lucide-react'
import { FbInboxCard } from '@/src/app/components/user/fb-inboxCard'
import { Button } from '@/components/ui/button'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function FacebookPage() {
    return (
        <div className="bg-[#E6F1FF] w-[100%] min-h-screen max-h-fit">
            <div className="flex flex-row">

                {/* start of fb post card */}
                <div className="w-1/5 bg-white h-fit rounded-[10px] pt-5 mt-2 ml-3">
                    <p className="text-xl font-semibold ml-4 text-center text-shadow-lg">Bula Municipal Youth Officials</p>
                    <hr className="border-t border-black w-[90%] mx-auto my-3" />
                    <div className="mt-5">
                        <div className="flex flex-row gap-5 my-10 mx-10">
                            <Info />
                            <p className="text-sm self-center">In the Service of the Bulaeño Youth</p>
                        </div>
                        <div className="flex flex-row gap-5 my-10 mx-10">
                            <MapPin />
                            <p className="text-sm self-center">Bula, Camarines Sur</p>
                        </div>
                        <div className="flex flex-row gap-5 my-10 mx-10">
                            <Mail />
                            <p className="text-sm italic underline self-center">bmyouthofficials@gmail.com</p>
                        </div>
                        <div className="flex flex-row gap-5 my-10 mx-10">
                            <Phone />
                            <p className="text-sm italic underline self-center">+639001118392</p>
                        </div>
                    </div>
                </div>


                <div className="w-3/5 my-2 mx-3">
                    <Button className="w-[100%] rounded-[20px] bg-[#B2D3FF] font-bold text-black">Create a new post</Button>
                    <div className="bg-white rounded-2xl w-[100%] pl-10 pr-10 pb-2 mt-3 mb-2">
                        <div className="flex flex-row  pt-5 justify-between">
                            <div className="flex flex-row gap-2">
                                <div className="w-15 h-15 bg-black rounded-full self-center"></div>
                                <div className="flex flex-col self-center">
                            
                                    <p className="font-semibold text-xl">Bula Municipal Youth Officials</p>

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
                                <br/><br/>
                                It only takes one step—and one shovel—to start something bigger. This June 25, we're not just planting trees. 
                                We're planting hope, setting down roots, and growing a future that's greener and stronger for Bula. ✨
                                <br/><br/>
                                The Bula Municipal Youth Officials invite you to move with nature, and take part in our EnviroWARRIOR: 
                                YOUTH TREE GROWING ACTIVITY happening in LA Victoria, Bula, Camarinues Sur at 8:00 AM.
                                <br/><br/>
                                Let's plant today, so tomorrow can breathe better! 🍃
                                <br/><br/>
                                🎨 : Adrian Abonita
                                <br/>
                                ✍️ : Ron Avery Ystelle Baldovia
                            </p>
                        </div>
                       
                        <div className="my-5">
                             {/* image placeholder */}
                            <div className="bg-black w-90 h-100 justify-self-center"></div>
                        </div>

                    </div>
                    {/* end of fb post card */}

                </div>
                <div className="w-1/5 mr-3">
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

