"use client";

import { getAnnouncments, postAnnouncements, getPhoto } from "../../actions/announcements";
import { useEffect, useRef, useState } from "react";
import { announcement } from "../../lib/definitions";

export default function Announcements() {
  const formRef = useRef<HTMLFormElement>(null) as React.RefObject<HTMLFormElement>;
  const [announcements, setAnnouncements] = useState<announcement[]>([]);

  const updateAnnouncements = async () => {
    const updatedData = await getAnnouncments();

    if (updatedData) {
      const processed = await Promise.all(updatedData.map(async (item) => {
        if (item.photo) {
          const  publicUrl = await getPhoto(item.photo);
          return { ...item, photo: publicUrl };
        } else {
          return { ...item, photo: null };
        }
      }));

      setAnnouncements(processed);
    }
  };



  useEffect(() => {
    updateAnnouncements();
  }, [announcements])

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      {/* Add Announcement Form */}
      <div className="border rounded-lg p-4 shadow-md bg-white">
        <h2 className="text-lg font-semibold mb-4">Add New Announcement</h2>
        <form className="space-y-4" ref={formRef} onSubmit={(e) => postAnnouncements(e, formRef)}>
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Body Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              name="body"
              placeholder="Write your announcement here..."
              rows={4}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Image Upload Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Add Announcement
          </button>
        </form>
      </div>

      {/* Announcement List */}
      <div className="space-y-4">
        {announcements.map((data) => (
          <div
            key={data.id}
            className="border rounded-lg p-4 shadow-md bg-white space-y-2"
          >
            <h3 className="text-md font-semibold">{data.header}</h3>
            <p className="text-sm text-gray-600">
              {data.body}
            </p>

            {data.photo && (
              <img
                src={data.photo}
                alt="Announcement"
                className="w-full rounded-md object-cover max-h-60"
              />
            )}

            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-yellow-400 text-black rounded hover:bg-yellow-500 transition">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
