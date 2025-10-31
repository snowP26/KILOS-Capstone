"use client";

import { DbRecentFeedbackCard } from "@/src/app/components/user/db-recentFeedbackCard";
import { DbCalendarCard } from "@/src/app/components/user/db-calendarCard";

import { useEffect, useRef, useState } from "react";
import { getHomeFeedback } from "@/src/app/actions/home";
import { commFeedback, feedbackComment } from "@/src/app/lib/definitions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { getComments, postComment } from "@/src/app/actions/feedback";
import { authorIDtoName } from "@/src/app/actions/convert";

export default function Home() {
  const [feedback, setFeedback] = useState<commFeedback[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [comments, setComments] = useState<feedbackComment[]>([]);
  const [authorNames, setAuthorNames] = useState<Record<number, string>>({});
  const [activeFeedbackId, setActiveFeedbackId] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getHomeFeedback();
      setFeedback(data);
    };
    getData();
  }, []);

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const loadComments = async (feedbackId: number) => {
    const data = await getComments(feedbackId);
    const names: Record<number, string> = {};

    for (const comment of data) {
      if (!authorNames[comment.author_id]) {
        const name = await authorIDtoName(comment.author_id);
        names[comment.author_id] = name ?? "Unknown User";
      }
    }

    setAuthorNames((prev) => ({ ...prev, ...names }));
    setComments(data);
    setActiveFeedbackId(feedbackId);
  };

  return (
    <div className="bg-[#E6F1FF] flex flex-col lg:flex lg:flex-row lg:h-full lg:mx-5 xl:pb-3">
      <div className="mt-2 h-60 shadow-[-4px_4px_4px_rgba(0,0,0,0.15),4px_4px_4px_rgba(0,0,0,0.15)] mx-5 lg:mx-0 sm:h-70 lg:h-209 rounded-2xl lg:shadow-[-4px_4px_4px_rgba(0,0,0,0.15)] bg-white lg:w-[22%] xl:w-[15%]">
        <p className="font-bold text-3xl lg:text-xl xl:text-3xl text-center mt-5 mb-3">Recent Feedback</p>
        <ScrollArea className="h-[85%]">
          <div className="max-h-[350px] sm:h-auto lg:max-h-[570px]">
            <div className="flex flex-col">
              {feedback.map((data) => (
                <Dialog key={data.id}>
                  <DialogTrigger onClick={() => loadComments(data.id)} className="my-3 flex justify-center self-center md:w-[40%] lg:w-full">
                      <DbRecentFeedbackCard
                        header={data.header}
                        date={new Date(data.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      />
                  </DialogTrigger>
                  <DialogContent className="bg-[#E6F1FF]">
                    <DialogHeader>
                      <DialogTitle className="text-3xl text-center mt-5">{data.header}</DialogTitle>
                      <p className="text-justify mt-5">{data.body}</p>
                      <div className="flex flex-row text-xs gap-2 mt-5 mb-5 justify-end">
                        <p>{new Date(data.created_at).toLocaleString()}</p>
                      </div>
                      <hr className="border-t border-black w-[100%] mx-auto " />

                      {activeFeedbackId === data.id &&
                        comments.map((cmt) => {
                          const name = authorNames[cmt.author_id] ?? "Loading...";
                          return (
                            <div key={cmt.id} className="flex flex-row items-start gap-3 mb-4">
                              {/* Avatar */}
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                                  {name !== "Loading..." ? getInitials(name) : "?"}
                                </div>
                              </div>

                              {/* Comment content */}
                              <div className="flex-1 bg-white rounded-xl p-3 text-black shadow">
                                <div className="flex justify-between items-center mb-1">
                                  <p className="text-sm font-semibold">{name}</p>
                                  <p className="text-xs text-gray-400">
                                    {new Date(cmt.created_at).toLocaleString("en-US", {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    })}
                                  </p>
                                </div>
                                <p className="text-sm text-gray-700">{cmt.content}</p>
                              </div>
                            </div>
                          );
                        })}

                      {/* Add Comment Form */}
                      <form
                        className="mt-5 flex flex-col gap-3"
                        ref={formRef}
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (!activeFeedbackId) return;
                          await postComment(e, formRef, activeFeedbackId);
                          await loadComments(activeFeedbackId);
                          formRef.current?.reset();
                        }}
                      >
                        <label htmlFor="comment" className="text-lg font-semibold">
                          Add a Comment
                        </label>
                        <textarea
                          id="comment"
                          name="comment"
                          placeholder="Write your comment..."
                          rows={3}
                          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                          required
                        />
                        <button
                          type="submit"
                          className="self-end bg-[#052659] text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors cursor-pointer"
                        >
                          Post
                        </button>
                      </form>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </ScrollArea>

      </div>

      <div className="mt-2 w-[90%] self-center lg:w-[78%] xl:w-[85%] xl:h-209 lg:mt-0 lg:self-start">
        <DbCalendarCard />
      </div>
    </div>
  );
}
