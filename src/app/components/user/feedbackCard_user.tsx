'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { feedbackComment } from "../../lib/definitions";
import { getComments, postComment } from "../../actions/feedback";
import { authorIDtoName } from "../../actions/convert";

type feedbackCardProps = {
  header: string;
  feedbackID: number;
  body: string;
  date: string;
  isWhite: boolean;
};

export const FeedbackCard = ({
  feedbackID,
  header,
  body,
  date,
  isWhite,
}: feedbackCardProps) => {
  const bgColor = isWhite ? "bg-white" : "bg-[#E6F1FF]";
  const formRef = useRef<HTMLFormElement>(null);
  const [comments, setComments] = useState<feedbackComment[]>([]);
  const [authorNames, setAuthorNames] = useState<Record<number, string>>({});
  const [refresh, setRefresh] = useState(0)

  const loadComments = async () => {
    const data = await getComments(feedbackID);
    const names: Record<number, string> = {};

    for (const comment of data) {
      if (!authorNames[comment.author_id]) {
        const name = await authorIDtoName(comment.author_id);
        names[comment.author_id] = name ?? "Unknown User";
      }
    }


    setAuthorNames((prev) => ({ ...prev, ...names }));
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, [refresh]);

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.map((p) => p[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <Dialog onOpenChange={(open) => open && loadComments()}>
      <DialogTrigger className="m-5 xl:m-10">
        <div
          className={`flex flex-col cursor-pointer w-60 h-60 lg:py-10 lg:px-10 lg:h-100 lg:w-100 p-8 rounded-md shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${bgColor}`}
        >

          <div className="justify-around flex flex-col h-full">
            <Quote fill="black" />

            <>
              <p className="m-5 font-semibold text-4xl truncate sm:whitespace-normal sm:line-clamp-2">{header}</p>

              <p className="m-5 text-gray-500 text-sm truncate sm:whitespace-normal sm:line-clamp-3">{body}</p>
            </>

            <div className="flex flex-row place-self-end ">
              <p className="font-thin text-xs mr-5 content-center">{date}</p>
              <Quote fill="black" />
            </div>
          </div>
          
        </div>

      </DialogTrigger>

      <DialogContent className="bg-[#E6F1FF]">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center mt-5">{header}</DialogTitle>
          <p className="text-justify mt-5">{body}</p>
          <div className="flex flex-row text-xs gap-2 mt-5 mb-5 justify-end">
            <p>{date}</p>
          </div>
          <hr className="border-t border-black w-[100%] mx-auto my-3" />

          {comments.map((data) => {
            const name = authorNames[data.author_id] ?? "Loading...";
            return (
              <div key={data.id} className="flex flex-row items-start gap-3 mb-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                    {name !== "Loading..." ? getInitials(name) : "?"}
                  </div>
                </div>

                {/* Comment content */}
                <div className="flex-1 bg-white rounded-xl p-3 text-black shadow">
                  <div className="md:flex justify-between items-center mb-1">
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(data.created_at).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">{data.content}</p>
                </div>
              </div>
            );
          })}

          {/* Add Comment Form */}
          <form
            className="mt-5 flex flex-col gap-3"
            ref={formRef}
            onSubmit={async (e) => {
              await postComment(e, formRef, feedbackID);
              await loadComments();
              formRef.current?.reset();
              setRefresh((prev) => prev + 1)
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
              className="self-end bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors cursor-pointer"
            >
              Post
            </button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
