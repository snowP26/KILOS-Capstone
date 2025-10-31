'use client';

import React, { useState } from "react";
import { ContinuousCalendar } from "../../components/user/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";


const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function DemoWrapper() {

  const onClickHandler = (day: number, month: number, year: number) => {
    const snackMessage = `Clicked on ${monthNames[month]} ${day}, ${year}`
    console.log(snackMessage)
  }

  return (
      <ScrollArea>
      <div className="relative flex h-screen max-h-screen w-full flex-col gap-4 px-4 pt-4 items-center justify-center">
      <div className="relative h-full overflow-auto mt-20 max-h-[20%]">
        <ContinuousCalendar onClick={onClickHandler} />
      </div>
    </div>
      </ScrollArea>
  );
}