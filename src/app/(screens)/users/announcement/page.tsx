"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PinnedAnnouncementCard } from "@/src/app/components/user/pinnedAnnouncementCard";
import { announcement } from "@/src/app/lib/definitions";
import { Pin } from "lucide-react";
import {
  fetchPinned,
  getAnnouncments,
  getPhoto,
  setPinned,
} from "@/src/app/actions/announcements";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { authorEmailToInfo } from "@/src/app/actions/convert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

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
  const [announcements, setAnnouncements] = useState<announcement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const updateAnnouncements = async () => {
    setLoading(true);
    const updatedData = await getAnnouncments();

    if (updatedData) {
      const processed = await Promise.all(
        updatedData.map(async (item) => {
          let publicUrl: string | null = null;
          if (item.photo) {
            const photoResult = await getPhoto(item.photo);
            publicUrl = typeof photoResult === "string" ? photoResult : null;
          }
          const authorInfo = await authorEmailToInfo(item.author_email);

          return {
            ...item,
            photo: publicUrl,
            authorName: authorInfo.name,
            authorPosition: authorInfo.position.trim(),
            authorRole: authorInfo.role.trim(),
          };


        })
      );

      setAnnouncements(processed);
    }

    setLoading(false)
  };

  const loadPinned = async () => {
    const announcementIds = await fetchPinned();
    setPinnedAnnouncements(announcementIds);
  };

  useEffect(() => {
    updateAnnouncements();
    loadPinned();
  }, []);

  return (
  <div className="h-full bg-[#E6F1FF]">
    <div className="flex flex-row">
      {/* Category Sidebar */}
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
                  : "text-gray-600 hover:bg-gray-200 hover:text-black"
                }`}
            >
              {type
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </p>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="w-3/5 my-2 mx-3 space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
              <Skeleton className="h-6 w-40 mt-3" />
              <div className="flex gap-4 mt-5">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-5/6" />
                </div>
                <Skeleton className="h-32 w-32 rounded-lg" />
              </div>
            </div>
          ))
        ) : (
          announcements
            .filter(
              (a) => selectedCategory === "all" || a.type === selectedCategory
            )
            .map((data) => (
              <div
                key={data.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">{data.authorName}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                      <span>
                        {data.authorRole} / {data.authorPosition}
                      </span>
                      <span>•</span>
                      <span>
                        {format(new Date(data.created_at), "MMMM d, yyyy h:mm a")}
                      </span>
                    </div>
                  </div>
                  <Pin
                    className="cursor-pointer text-gray-600 hover:text-blue-600"
                    size="22px"
                    onClick={async () => {
                      setPinnedAnnouncements((prev) =>
                        prev.includes(data.id)
                          ? prev.filter((id) => id !== data.id)
                          : [...prev, data.id]
                      );
                      await setPinned(data.id);
                      loadPinned();
                    }}
                    fill={pinnedAnnouncements.includes(data.id) ? "black" : "none"}
                  />
                </div>

                <p className="mt-3 inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  {data.type
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>

                <div className="mt-5 flex gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-xl">{data.header}</p>
                    <p className="mt-2 text-gray-700 leading-relaxed text-justify max-h-40 overflow-clip">{data.body}</p>
                  </div>
                  {data.photo && (
                    <div
                      onClick={() => setSelectedImage(data.photo!)}
                      className="cursor-pointer"
                    >
                      <img
                        alt="Announcement"
                        src={data.photo}
                        className="w-32 h-32 rounded-lg object-cover hover:opacity-90 transition"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
        )}
      </div>

      {/* Pinned Announcements Sidebar */}
      <div className="w-1/5 mr-3 flex flex-col">
        <Button
          className="bg-[#052659] w-full my-3 rounded-xl shadow hover:bg-blue-800 transition cursor-pointer"
          onClick={() =>
            router.push("/users/announcement/create-announcement")
          }
        >
          Create Announcement
        </Button>

        <div className="bg-white rounded-xl shadow-md p-5 flex flex-col">
          <p className="text-center text-xl font-semibold text-gray-800 border-b pb-2">
            Pinned Announcements
          </p>

          <div className="mt-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-1">
            {loading ? (
              // Sidebar skeleton
              Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="bg-[#E6F1FF] rounded-[8px] p-3">
                  <Skeleton className="h-4 w-40 mb-2" />
                  <Skeleton className="h-3 w-28 mb-2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))
            ) : (
              <>
                {announcements
                  .filter((a) => pinnedAnnouncements.includes(a.id))
                  .map((a) => (
                    <PinnedAnnouncementCard
                      key={a.id}
                      header={a.header}
                      body={a.body}
                      author={`${a.authorName}`}
                      announcementType={a.type}
                    />
                  ))}

                {announcements.filter((a) =>
                  pinnedAnnouncements.includes(a.id)
                ).length === 0 && (
                    <p className="text-sm text-gray-500 text-center italic">
                      No pinned announcements
                    </p>
                  )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Full-size Image Modal */}
    <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="hidden">
          <DialogHeader></DialogHeader>
          <DialogTitle></DialogTitle>
        </div>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Full announcement"
            className="w-full h-auto object-contain"
          />
        )}
      </DialogContent>
    </Dialog>
  </div>
);

}
