import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"

import { Quote } from "lucide-react";

type feedbackCardProps = {
    header: string;
    body: string;
    date: string;
    isWhite: boolean;
};

export const FeedbackCard = ({ header, body, date, isWhite }: feedbackCardProps) => {
    const bgColor = isWhite ? "bg-white" : "bg-[#E6F1FF]";

    return (
        <Dialog>
            <DialogTrigger className="m-10">
                <div
                    className={`cursor-pointer p-5 h-100 w-100 ${bgColor} rounded-md shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                >
                    <Quote fill="black" />
                    <p className="m-5 font-semibold text-4xl">{header}</p>

                    <p className="m-5 text-gray-500 text-sm">{body}</p>

                    <div className="flex flex-row justify-end">
                        <p className="font-thin text-xs mr-5 content-center">{date}</p>
                        <Quote fill="black" />
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

                    {/* start of "if no comments" */}
                    <div className="flex h-20 items-center justify-center">
                        <p className="text-3xl font-semibold text-gray-400">No comments</p>
                    </div>
                    {/* end of "if no comments" */}

                    {/* start of Comments */}
                    <p className="font-semibold text-3xl mb-4">Comments</p>
                    <div className="flex flex-row h-fit">
                        <div className="w-[20%] justify-items-center">
                            <div className="w-12 h-12 rounded-full bg-black">
                                {/* image placeholder */}
                            </div>
                        </div>
                        <div className="w-[80%] bg-white rounded-xl p-3 text-black text-justify">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>
                    {/* end of Comments */}
                    <Quote fill="black" size="40px" className="self-end mt-5" />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

