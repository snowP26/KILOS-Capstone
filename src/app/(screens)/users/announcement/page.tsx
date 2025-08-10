"use client";

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { PinnedAnnouncementCard } from '@/src/app/components/user/pinnedAnnouncementCard';
import { announcement } from '@/src/app/lib/definitions';
import { Pin } from 'lucide-react';
import { fetchPinned, getAnnouncments, getPhoto, setPinned } from '@/src/app/actions/announcements';

import { format } from 'date-fns'



export default function Announcement() {
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
    "press_release"
  ];
  const [pinnedAnnouncements, setPinnedAnnouncements] = useState<number[]>([])
  const [refresh, setRefresh] = useState(0);
  const [announcements, setAnnouncements] = useState<announcement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // use this for create announcment feature
  // |
  // v
  // const setUserFunction = async () => {
  //   const currentUser = await getCurrentUser();
  //   setUser(currentUser as string);
  //   return console.log("Current user:", currentUser);
  // };

  const updateAnnouncements = async () => {
    const updatedData = await getAnnouncments();

    if (updatedData) {
      const processed = await Promise.all(updatedData.map(async (item) => {
        if (item.photo) {
          const publicUrl = await getPhoto(item.photo)
          return { ...item, photo: publicUrl }
        } else {
          return { ...item, photo: null }
        }
      }))

      setAnnouncements(processed);
    }
  }

  const loadPinned = async () => {
    const announcementIds = await fetchPinned();
    setPinnedAnnouncements(announcementIds);

  }

  


  useEffect(() => {
    updateAnnouncements();
    loadPinned();
  }, [refresh])

  return (
    <div className="h-full">
      <div className="flex flex-row">
        <div className="w-1/5 bg-white h-fit rounded-[10px] pt-5 mt-2 ml-3">
          <p className="text-3xl font-semibold ml-4">Category</p>
          <div className="mt-5 flex flex-col gap-3 pb-7">
            {announcementTypes.map((type) => (
              <p
                key={type}
                onClick={() => {
                  if (selectedCategory === type) {
                    return setSelectedCategory("all");
                  }
                  setSelectedCategory(type);
                }}
                className={`font-medium px-4 py-2 text-sm rounded-full cursor-pointer text-center mx-4 transition-all duration-300 ease-in-out
                      ${selectedCategory === type
                    ? "bg-[#E6F1FF] text-blue-700 shadow-md"
                    : "text-gray-600 hover:bg-gray-200 hover:text-black"}`}
              >
                {type
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>
            ))}
          </div>
        </div>


        <div className="w-3/5 my-2 mx-3">
          {/* list of announcements */}
          {announcements.filter((a) => selectedCategory === "all" || a.type === selectedCategory).map((data) => (
            <div key={data.id} className="bg-white rounded-2xl w-[100%] pl-10 pr-10 pb-2 mb-2">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <p className="font-semibold text-xl mt-5">{data.author_email}</p>

                  <div className="flex flex-row gap-5">
                    {/* apply author position/title in the db */}
                    <p className="text-sm font-thin">Author Position/Title</p>
                    <p className="text-sm font-thin">{format(new Date(data.created_at), "MMMM d, yyyy h:mm a")}</p>
                  </div>

                </div>
                <div className="self-center">
                  <Pin
                    className="cursor-pointer"
                    size="25px"
                    onClick={() => {setPinned(data.id)}}
                    fill={pinnedAnnouncements.includes(data.id) ? "black" : "none"}
                  />
                </div>
              </div>

              <p className="mt-3 text-white bg-[#58AEFF] rounded-2xl text-center w-15 text-xs">
                {data.type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>

              <div className="mt-7 mb-10 flex flex-row justify-between">
                <div className="flex flex-col">
                  <p className="font-semibold text-xl">{data.header}</p>
                  <p className="w-150">
                    {data.body}
                  </p>
                </div>
                {data.photo && (
                  <img alt="Announcement image" className="bg-black max-w-50 max-h-50" src={data.photo} />
                )}

              </div>

            </div>
          ))}

        </div>
        <div className="w-1/5 mr-3">
          <Button className="bg-[#052659] w-[100%] my-3">Create Announcement</Button>

          <div className=" bg-white rounded-[10px] pt-5 h-fit pb-5">
            <p className="text-center text-2xl font-semibold">Pinned Announcements</p>
            <div className="justify-items-center mt-5">
              {announcements
                .filter(a => pinnedAnnouncements.includes(a.id))
                .map(a => (
                  <PinnedAnnouncementCard
                    key={a.id}
                    header={a.header}
                    body={a.body}
                    author={a.author_email}
                    announcementType={a.type}
                  />
                ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

