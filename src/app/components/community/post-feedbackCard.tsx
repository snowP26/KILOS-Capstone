"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { postFeedback } from "@/src/app/actions/feedback";
import Swal from "sweetalert2";

export const PostFeedbackCard = ({
  loc_name,
  setRefresh,
}: {
  loc_name: string;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#052659] cursor-pointer text-white py-2 px-4 rounded-2xl hover:bg-white hover:text-[#052659] hover:border-black hover:border border">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="cursor-pointer">Post a Feedback</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl">Post your Feedback</DialogTitle>
            <hr className="border-t border-black w-[100%] mx-auto my-3" />

            <form
              ref={formRef}
              onSubmit={async (e) => {
                try {
                  await postFeedback(e, formRef, loc_name);
                  setRefresh((prev) => prev + 1);
                  setOpen(false);

                  Swal.fire({
                    icon: "success",
                    title: "Feedback Submitted!",
                    text: "Your feedback has been posted successfully.",
                    timer: 1150
                  });

                  if (formRef.current) {
                    formRef.current.reset();
                  }
                } catch (err) {
                  Swal.fire({
                    icon: "error",
                    title: "Submission Failed",
                    text: "Something went wrong while posting your feedback. Please try again.",
                    confirmButtonColor: "#AD0F0F",
                  });
                }
              }}
            >
              <p className="font-medium text-start">Feedback Header</p>
              <Input
                className="max-w-[100%] mb-5 wrap-anywhere border-gray-300 placeholder:italic"
                placeholder="e.g. Feedback for Youth Programs"
                name="header"
              />

              <p className="font-medium text-start">Feedback Body</p>
              <Textarea
                className="max-w-[100%] h-50 wrap-anywhere  border-gray-300 placeholder:italic"
                placeholder="e.g. The youth programs in our community have been very beneficial..."
                name="body"
              />
              <div className="flex flex-row gap-2 justify-end mt-5">
                <Button
                  type="button"
                  className="bg-[#AD0F0F] cursor-pointer hover:bg-white hover:text-[#AD0F0F] hover:border-black hover:border"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#052659] cursor-pointer hover:bg-white hover:text-[#052659] hover:border-black hover:border"
                  onClick={() => setOpen(false)}
                >
                  Submit
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div >
  );
};
