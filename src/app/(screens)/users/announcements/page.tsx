"use client";

import { getAnnouncments, postAnnouncements, getPhoto, deleteAnnouncements, getCurrentUser} from "../../../actions/announcements";
import { useEffect, useRef, useState } from "react";
import { announcement } from "../../../lib/definitions";


export default function Announcements() {
  const announcementTypes = [
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
  const formRef = useRef<HTMLFormElement>(null) as React.RefObject<HTMLFormElement>;
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [announcements, setAnnouncements] = useState<announcement[]>([]);
  const [refresh, setRefresh] = useState(0)
  const [user, setUser] = useState<string>("")
  
  const setUserFunction = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser as string);
    return  console.log("Current user:", currentUser);
  };

  const updateAnnouncements = async () => {
    const updatedData = await getAnnouncments();

    if (updatedData) {
      const processed = await Promise.all(updatedData.map(async (item) => {
        if (item.photo) {
          const publicUrl = await getPhoto(item.photo);
          return { ...item, photo: publicUrl };
        } else {
          return { ...item, photo: null };
        }
      }));

      setAnnouncements(processed);
    }

  };

  useEffect(() => {
    setUserFunction();
    updateAnnouncements();
  }, [refresh])

  return (
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-6 p-6">
        {/* Sidebar with category buttons */}
        <aside className="w-full md:w-1/4 space-y-2">
          <h2 className="text-lg font-semibold mb-2">Filter by Type</h2>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`w-full text-left px-4 py-2 rounded-md border ${selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
              }`}
          >
            All
          </button>
          {announcementTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedCategory(type)}
              className={`w-full text-left px-4 py-2 rounded-md border ${selectedCategory === type
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
                }`}
            >
              {type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 space-y-6">
          {/* Add Announcement Form (keep your current form code here) */}
          <div className="border rounded-lg p-4 shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4">Add New Announcement</h2>
            <form className="space-y-4" ref={formRef} onSubmit={async (e) => {
              await postAnnouncements(e, formRef);
              setRefresh((prev) => prev + 1);
            }}>
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
                  className="w-full max-h-36 min-h-36 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  name="type"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="Select announcement type"
                >
                  <option disabled>Select announcement type</option>
                  {announcementTypes.map((type: string) => (
                    <option key={type} value={type}>
                      {type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload Input */}
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className=" block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700hover: file:cursor-pointer"
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
          {/* Filtered Announcement List */}
          <div className="space-y-4">
            {announcements
              .filter((a) => selectedCategory === "all" || a.type === selectedCategory)
              .map((data) => (
                <div
                  key={data.id}
                  className="border rounded-lg p-4 shadow-md bg-white space-y-2"
                >
                  <h3 className="text-md font-semibold">{data.header}</h3>
                  <p className="text-sm text-gray-600">{data.body}</p>
                  <p className="text-xs italic text-gray-500">Type: {data.type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                  {data.photo && (
                    <img
                      src={data.photo}
                      alt="Announcement"
                      className="w-full rounded-md object-cover max-h-60"
                    />
                  )}
                  {user == data.author_email && (
                    
                    <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-yellow-400 text-black rounded hover:bg-yellow-500 transition cursor-pointer">
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
                      onClick={async () => {
                        await deleteAnnouncements(data.id);
                        setRefresh((prev) => prev + 1);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
                  
                </div>
              ))}
          </div>
        </main>
      </div>
  );
}
