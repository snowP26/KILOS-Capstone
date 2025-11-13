"use client";

import { ComNav } from "@/src/app/components/community/nav";
import { CommunityBanner } from "@/src/app/components/community/community-banner";
import { PostFeedbackCard } from "@/src/app/components/community/post-feedbackCard";
import { useParams, notFound } from "next/navigation";
import { commFeedback, locations } from "@/src/app/lib/definitions";
import { useEffect, useState } from "react";
import { getFeedback } from "@/src/app/actions/feedback";
import { locNameToID } from "@/src/app/actions/convert";
import { FeedbackCard } from "@/src/app/components/community/feedbackCard";
import { CurrentYoCard } from "@/src/app/components/community/current-YoCard";

export default function Page() {
  const [refresh, setRefresh] = useState(0);
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<commFeedback[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  const toProperCase = (str: string) =>
    str
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const params = useParams();
  const id = params.id as string;

  const loc_name = toProperCase(id.replace("-", " "));
  const validLocations = locations;
  type Location = (typeof validLocations)[number];
  const isValidLocation = (value: string): value is Location =>
    (validLocations as readonly string[]).includes(value);

  if (!isValidLocation(id)) {
    notFound();
  }

  useEffect(() => {
    const fetchFeedbackData = async () => {
      const locationID = (await locNameToID(loc_name)) as number;
      const data = await getFeedback(locationID);
      setFeedback(data ?? []);
      setCurrentPage(1); // reset to first page when data refreshes
    };
    fetchFeedbackData();
  }, [refresh, loc_name]);

  const handleButtonClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // Pagination logic
  const totalPages = Math.ceil(feedback.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFeedback = feedback.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-[#EEF2ED] min-h-screen max-h-full pb-20">
      <ComNav />
      <div className="mt-10">
        <CommunityBanner
          id={loc_name}
          onButtonClick={handleButtonClick}
          isOpen={open}
        />
      </div>

      {open ? (
        <div className="text-center">
          <p className="font-bold text-center text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
            Current Youth Officials
          </p>

          <div className="mx-25">
            <div className="flex flex-wrap justify-center">
              <CurrentYoCard />
              <CurrentYoCard />
              <CurrentYoCard />
              <CurrentYoCard />
              <CurrentYoCard />
              <CurrentYoCard />
              <CurrentYoCard />
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="font-bold text-center text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
            Community Feedback
          </p>
          <div className="flex justify-center mt-5">
            <PostFeedbackCard loc_name={loc_name} setRefresh={setRefresh} />
          </div>

          <div className="mx-25">
            {feedback && feedback.length > 0 ? (
              <>
                <div className="flex flex-wrap justify-center">
                  {currentFeedback.map((data) => (
                    <FeedbackCard
                      key={data.id}
                      feedbackID={data.id}
                      header={data.header}
                      body={data.body}
                      date={new Date(data.created_at).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      isWhite={false}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center my-8 gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-[#052659] text-white hover:bg-[#234c8a] cursor-pointer"
                      }`}
                    >
                      Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded cursor-pointer ${
                          currentPage === i + 1
                            ? "bg-[#052659] text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-[#052659] text-white hover:bg-[#234c8a] cursor-pointer"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p className="text-xl font-semibold">No feedback yet</p>
                <p className="text-sm text-gray-400 mb-4">
                  Be the first to share your thoughts with the community!
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
