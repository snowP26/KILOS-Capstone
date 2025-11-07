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
import { getComments } from "../../actions/feedback";
import { authorIDtoName } from "../../actions/convert";


type feedbackCardProps = {
  header: string;
  body: string;
  feedbackID: number;
  date: string;
  isWhite: boolean;
};

export const FeedbackCard = ({
  header,
  body,
  feedbackID,
  date,
  isWhite,
}: feedbackCardProps) => {
  const bgColor = isWhite ? "bg-white" : "bg-[#E6F1FF]";
  const formRef = useRef<HTMLFormElement>(null);
  const [comments, setComments] = useState<feedbackComment[]>([]);
  const [authorNames, setAuthorNames] = useState<Record<number, string>>({});
  const [refresh, setRefresh] = useState(0);

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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

  return (
    <Dialog>
      <DialogTrigger className="m-5 xl:m-10">
        <div
          className={` flex flex-col cursor-pointer w-60 h-60 sm:h-70 lg:py-10 lg:px-10 lg:h-100 lg:w-100 p-8 rounded-md shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${bgColor}`}
        >

          <div className="justify-around flex flex-col h-full">
            <Quote fill="black" />

            <div className="">
              <p className="lg:m-5 font-semibold text-4xl truncate sm:whitespace-normal sm:line-clamp-2">{header}</p>

              <p className="text-gray-500 text-sm truncate sm:whitespace-normal sm:line-clamp-3">{body}</p>
            </div>

            <div className="flex flex-row place-self-end ">
              <p className="font-thin text-xs mr-5 content-center">{date}</p>
              <Quote fill="black" />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className={bgColor}>
        <DialogHeader>
          <Quote fill="black" size="40px" />
          <DialogTitle className="text-3xl text-center">{header}</DialogTitle>
          <p className="text-justify mt-5">{body}</p>
          <div className="flex flex-row text-xs gap-2 mt-5 mb-5 justify-end">
            <p>Posted:</p>
            <p>{date}</p>
          </div>
          <hr className="border-t border-black w-[100%] mx-auto my-3" />

          {comments.map((data) => {
            const name = authorNames[data.author_id] ?? "Loading...";
            return (
              <div
                key={data.id}
                className="flex flex-row items-start gap-3 mb-4"
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                    {name !== "Loading..." ? getInitials(name) : "?"}
                  </div>
                </div>

                {/* Comment content */}
                <div className="flex-1 bg-white border border-gray-300 rounded-xl p-3 text-black shadow">
                  <div className="flex justify-between items-center mb-1">
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
          {/* end of Comments */}
          <Quote fill="black" size="40px" className="self-end mt-5" />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
