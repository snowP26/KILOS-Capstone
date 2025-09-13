"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PinnedAnnouncementCard } from "@/src/app/components/user/pinnedAnnouncementCard";
import { announcement } from "@/src/app/lib/definitions";
import { Pin } from "lucide-react";
import {
  fetchPinned,
  getAnnouncments,
  getOwnAnnouncements,
  getPhoto,
  setPinned,
} from "@/src/app/actions/announcements";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { authorEmailToInfo } from "@/src/app/actions/convert";

export default function Announcement() {
  const router = useRouter();

  const announcementTypes = [
    "all",
    "general",
    "policy",
    "public_service",
    "administrative",
    "electoral",
    "event",
    "emergency",
    "financial",
    "employment",
    "infrastructure",
    "press_release",
  ];

  const [pinnedAnnouncements, setPinnedAnnouncements] = useState<number[]>([]);
  const [allAnnouncements, setAllAnnouncements] = useState<announcement[]>([]);
  const [myAnnouncements, setMyAnnouncements] = useState<announcement[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "mine" | "pinned">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);

  // fetch all announcements
  const updateAnnouncements = async () => {
    setLoading(true);
    const updatedData = await getAnnouncments();
    if (!updatedData) return;

    const processed = await Promise.all(
      updatedData.map(async (item) => {
        const photoResult = item.photo ? await getPhoto(item.photo) : null;
        const authorInfo = await authorEmailToInfo(item.author_email);
        return {
          ...item,
          photo: typeof photoResult === "string" ? photoResult : null,
          authorName: authorInfo.name,
          authorPosition: authorInfo.position.trim(),
          authorRole: authorInfo.role.trim(),
        };
      })
    );

    setAllAnnouncements(processed);
    setLoading(false);
  };

  // fetch pinned IDs
  const loadPinned = async () => {
    const ids = await fetchPinned();
    setPinnedAnnouncements(ids);
  };

  // fetch my announcements
  const loadMyAnnouncements = async () => {
    const mine = await getOwnAnnouncements();
    if (!mine) return;
    const processed = await Promise.all(
      mine.map(async (item) => {
        const photoResult = item.photo ? await getPhoto(item.photo) : null;
        const authorInfo = await authorEmailToInfo(item.author_email);
        return {
          ...item,
          photo: typeof photoResult === "string" ? photoResult : null,
          authorName: authorInfo.name,
          authorPosition: authorInfo.position.trim(),
          authorRole: authorInfo.role.trim(),
        };
      })
    );
    setMyAnnouncements(processed);
  };

  useEffect(() => {
    updateAnnouncements();
    loadPinned();
    loadMyAnnouncements();
  }, [refresh]);

  // toggle pinned announcements
  const togglePinned = async (id: number) => {
    await setPinned(id);
    setPinnedAnnouncements((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // prepare which list to display
  const displayedAnnouncements = (() => {
    if (activeTab === "all") return allAnnouncements;
    if (activeTab === "mine") return myAnnouncements;
    if (activeTab === "pinned")
      return allAnnouncements.filter((a) =>
        pinnedAnnouncements.includes(a.id)
      );
    return [];
  })().filter(
    (a) => selectedCategory === "all" || a.type === selectedCategory
  );

  return (
    <div className="min-h-screen max-h-full xl:mx-20 bg-[#E6F1FF]">
      {/* Title */}
      <p className="font-bold text-2xl mt-10 mx-10 sm:text-3xl">
        Announcements
      </p>
      <hr className="border-t border-black w-[90%] lg:w-[95%] mx-auto mt-3" />

      <div className="flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="lg:w-[70%] xl:w-4/5 lg:my-2 lg:mx-3">
          {/* Mobile create button */}
          <Button
            className="lg:hidden bg-[#052659] w-[90%] flex justify-self-center my-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
            onClick={() =>
              router.push("/users/announcement/create-announcement")
            }
          >
            Create Announcement
          </Button>

          {/* Tabs + Filter */}
          <div className="flex flex-col mx-5 xl:flex-row xl:justify-between xl:ml-50 xl:mr-10 2xl:ml-100 2xl:mr-15">
            <div className="flex flex-row gap-0.5 my-3 justify-center text-center">
              <div
                className={`${activeTab === "all"
                    ? "bg-[#052659] text-white"
                    : "bg-[#052659] opacity-60 text-gray-400"
                  } shadow-md text-xs lg:text-lg p-2 rounded-tl-2xl rounded-bl-2xl cursor-pointer`}
                onClick={() => setActiveTab("all")}
              >
                <p>Uploaded Announcements</p>
              </div>
              <div
                className={`xl:hidden ${activeTab === "pinned"
                    ? "bg-[#052659] text-white"
                    : "bg-[#052659] opacity-60 text-gray-400"
                  } shadow-md text-xs lg:text-lg p-2 cursor-pointer`}
                onClick={() => setActiveTab("pinned")}
              >
                <p>Pinned Announcements</p>
              </div>
              <div
                className={`${activeTab === "mine"
                    ? "bg-[#052659] text-white"
                    : "bg-[#052659] opacity-60 text-gray-400"
                  } shadow-md text-xs lg:text-lg p-2 rounded-tr-2xl rounded-br-2xl cursor-pointer`}
                onClick={() => setActiveTab("mine")}
              >
                <p>My Announcements</p>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-5 lg:mb-2 self-center">
              <Select onValueChange={(val) => setSelectedCategory(val)}>
                <SelectTrigger className="cursor-pointer place-self-center min-w-[100px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter</SelectLabel>
                    {announcementTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Announcement List */}
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : displayedAnnouncements.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No announcements found
            </p>
          ) : (
            displayedAnnouncements.map((data) => (
              <div
                key={data.id}
                className="bg-white rounded-2xl w-[90%] place-self-center px-5 lg:w-full lg:pl-10 lg:pr-10 pb-2 mb-2"
              >
                {/* Top Section */}
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <p className="font-bold text-sm lg:text-xl mt-5">
                      {data.authorName}
                    </p>

                    <div className="flex flex-row items-center gap-2 lg:gap-5 text-gray-400">
                      <span>
                        {data.authorRole} | {data.authorPosition}
                      </span>
                      <p className="text-xs lg:text-sm font-thin">
                        {format(new Date(data.created_at), "MMMM d, yyyy h:mm a")}
                      </p>
                    </div>
                  </div>

                  <div className="self-center">
                    <Pin
                      className="cursor-pointer hover:text-blue-600"
                      size="25px"
                      onClick={() => togglePinned(data.id)}
                      fill={
                        pinnedAnnouncements.includes(data.id) ? "black" : "none"
                      }
                    />
                  </div>
                </div>

                {/* Body Section */}
                <div className="mt-7 mb-10 flex flex-col xl:flex-row justify-between">
                  <div className="flex flex-col">
                    <p className="font-semibold text-xl">{data.header}</p>
                    <p className="mb-3 text-white bg-[#58AEFF] rounded-2xl text-center min-w-15 max-w-fit px-2 text-xs">
                      {data.type
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </p>
                    <p className="pb-3 lg:pb-0 lg:w-150">{data.body}</p>
                  </div>
                  {data.photo && (
                    <img
                      alt="Announcement image"
                      className="bg-black self-center max-w-50 max-h-50 hover:opacity-90 transition"
                      src={data.photo}
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Section (Pinned Sidebar) */}
        <div className="hidden lg:block lg:w-[30%] xl:w-1/5 mr-3">
          <Button
            className="bg-[#052659] w-[100%] my-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
            onClick={() =>
              router.push("/users/announcement/create-announcement")
            }
          >
            Create Announcement
          </Button>

          <div className="bg-white rounded-[10px] pt-5 h-fit pb-5">
            <p className="text-center text-2xl font-semibold">
              Pinned Announcements
            </p>
            <div className="flex flex-col mt-5 items-center">
              {allAnnouncements
                .filter((a) => pinnedAnnouncements.includes(a.id))
                .map((a) => (
                  <PinnedAnnouncementCard
                    key={a.id}
                    header={a.header}
                    body={a.body}
                    author={a.author_email}
                    announcementType={a.type}
                  />
                ))}
              {allAnnouncements.filter((a) =>
                pinnedAnnouncements.includes(a.id)
              ).length === 0 && (
                  <p className="text-sm text-gray-500 text-center italic">
                    No pinned announcements
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
