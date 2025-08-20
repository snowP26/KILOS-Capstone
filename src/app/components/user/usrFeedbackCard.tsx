"use client";

import { Quote } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { UsrTextarea } from '@/components/ui/UsrTextarea'; 
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const UsrFeedbackCard = () => {
  return (
    <Dialog>
      <DialogTrigger className="m-10">
        <div className="cursor-pointer p-5 h-100 w-100 bg-white rounded-md shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <Quote fill='black' />
          <p className="m-5 font-semibold text-4xl">The new project was great!</p>

          <p className="m-5 text-gray-500 text-sm">
            Naga City is Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <div className="flex flex-row justify-end">
            <p className="font-thin text-xs mr-5 content-center">Jan 1, 2000</p>
            <Quote fill='black' />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#E6F1FF]">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center">Amo na po ading Bula?</DialogTitle>
          <p className="text-justify mt-5">
            Bula is Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="flex flex-row text-xs gap-2 mt-5 mb-5 justify-end">
            <p>Posted:</p>
            <p>January 1, 2000</p>
            <p>12:00 PM</p>
          </div>
          <hr className="border-t border-black w-[100%] mx-auto my-3" />

          {/* start of "if no comment" */}
          <div className="flex h-20 items-center justify-center">
            <p className="text-3xl font-semibold text-gray-400">No comments</p>
          </div>
          {/* end of "if no comment" */}

          {/* start of Comments */}
          <p className="font-semibold text-3xl mb-4">Comments</p>
          <div className="flex flex-row h-fit">
            <div className="w-[20%] justify-items-center">
              <div className="w-12 h-12 rounded-full bg-black">
                {/* image placeholder */}
              </div>
            </div>
            <div className="w-[80%] bg-white rounded-xl p-3 text-black text-justify">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          {/* end of Comments */}

          {/* start of "Add a Comment" */}
          <div className="flex flex-row h-fit">
            <div className="w-[20%] justify-items-center">
              <div className="w-12 h-12 rounded-full bg-black">
                {/* image placeholder */}
              </div>
            </div>
            <div className="flex flex-col w-[80%] rounded-xl text-black text-justify">
              <UsrTextarea className="max-w-[100%] h-50 wrap-anywhere border-black placeholder:italic" placeholder="Add a Comment..."></UsrTextarea>
              <Button className="mt-2 w-fit self-end bg-[#B2D3FF] text-black rounded-full border-black border cursor-pointer hover:bg-black hover:text-[#B2D3FF] ">Submit Comment</Button>
            </div>
          </div>
          {/* end of "Add a Comment" */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}