"use client";

import React, { useState } from "react";
import { Info, MapPin, Mail, Phone } from "lucide-react";
import { FbInboxCard } from "@/src/app/components/user/fb-inboxCard";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

type FbPostResponse = {
    success?: boolean;
    fbPostId?: string;
    error?: string;
};

export default function FacebookPage() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<FbPostResponse | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a photo");
            return;
        }

        setLoading(true);
        setResponse(null);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("message", message);

            const res = await fetch("/api/facebook/post", {
                method: "POST",
                body: formData,
            });

            const data: FbPostResponse = await res.json();
            setResponse(data);
            if (data.success) {
                setFile(null);
                setMessage("");
                setIsFormOpen(false);
            }
        } catch (err) {
            if (err instanceof Error) {
                setResponse({ error: err.message });
            } else {
                setResponse({ error: "Unknown error" });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#E6F1FF] w-[100%] min-h-screen max-h-fit">
            <div className="flex flex-row">
                {/* Sidebar Info */}
                <div className="w-1/5 bg-white h-fit rounded-[10px] pt-5 mt-2 ml-3">
                    <p className="text-xl font-semibold ml-4 text-center text-shadow-lg">
                        Bula Municipal Youth Officials
                    </p>
                    <hr className="border-t border-black w-[90%] mx-auto my-3" />
                    <div className="mt-5">
                        <div className="flex flex-row gap-5 my-10 mx-10">
                            <Info />
                            <p className="text-sm self-center">
                                In the Service of the Bulaeño Youth
                            </p>
                        </div>
                        <div className="flex flex-row gap-5 my-10 mx-10">
                            <MapPin />
                            <p className="text-sm self-center">Bula, Camarines Sur</p>
                        </div>
                        <div className="flex flex-row gap-5 my-10 mx-10">
                            <Mail />
                            <p className="text-sm italic underline self-center">
                                bmyouthofficials@gmail.com
                            </p>
                        </div>
                        <div className="flex flex-row gap-5 my-10 mx-10">
                            <Phone />
                            <p className="text-sm italic underline self-center">
                                +639001118392
                            </p>
                        </div>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="w-3/5 my-2 mx-3">
                    {/* Create Post Button */}
                    <Button
                        className="w-[100%] rounded-[20px] bg-[#B2D3FF] font-bold text-black"
                        onClick={() => setIsFormOpen(!isFormOpen)}
                    >
                        {isFormOpen ? "Cancel" : "Create a new post"}
                    </Button>

                    {/* Form */}
                    {isFormOpen && (
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-xl p-4 mt-3 space-y-3"
                        >
                            <textarea
                                className="w-full p-2 border rounded"
                                rows={3}
                                placeholder="Write a caption..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            />

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white"
                            >
                                {loading ? "Posting..." : "Post"}
                            </Button>

                            {response && (
                                <div className="mt-2 text-sm">
                                    {response.success ? (
                                        <p className="text-green-600">
                                            ✅ Post successful! ID: {response.fbPostId}
                                        </p>
                                    ) : (
                                        <p className="text-red-600">❌ {response.error}</p>
                                    )}
                                </div>
                            )}
                        </form>
                    )}

                    {/* Example Post Card (static, replace with actual later) */}
                    <div className="bg-white rounded-2xl w-[100%] pl-10 pr-10 pb-2 mt-3 mb-2">
                        <div className="flex flex-row  pt-5 justify-between">
                            <div className="flex flex-row gap-2">
                                <div className="w-15 h-15 bg-black rounded-full self-center"></div>
                                <div className="flex flex-col self-center">
                                    <p className="font-semibold text-xl">
                                        Bula Municipal Youth Officials
                                    </p>
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
                                                            <p className="hover:bg-blue-900 hover:text-white text-center">
                                                                Edit
                                                            </p>
                                                        </NavigationMenuLink>
                                                        <NavigationMenuLink asChild>
                                                            <p className="hover:bg-blue-900 hover:text-white text-center">
                                                                Delete
                                                            </p>
                                                        </NavigationMenuLink>
                                                        <NavigationMenuLink asChild>
                                                            <p className="hover:bg-blue-900 hover:text-white text-center">
                                                                Copy Link
                                                            </p>
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
                                BIG THINGS START WITH SMALL DIGS! 🌱 <br />
                                <br />
                                It only takes one step—and one shovel—to start something bigger.
                                This June 25, we&apos;re not just planting trees. We&apos;re
                                planting hope, setting down roots, and growing a future that&apos;s greener and stronger for Bula. ✨
                            </p>
                        </div>

                        <div className="my-5">
                            {/* image placeholder */}
                            <div className="bg-black w-90 h-100 justify-self-center"></div>
                        </div>
                    </div>
                </div>

                {/* Inbox */}
                <div className="w-1/5 mr-3">
                    <div className="bg-white rounded-[10px] mt-2 pt-5 h-fit pb-5">
                        <p className="text-center text-2xl font-semibold">Page Inbox</p>
                        <hr className="border-t border-black w-[90%] mx-auto mt-5" />
                        <div>
                            <FbInboxCard />
                            <FbInboxCard />
                            <FbInboxCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
