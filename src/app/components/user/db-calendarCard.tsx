"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { ContinuousCalendar } from "./calendar";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DateTodayCard } from "./date-todayCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import client from "@/src/api/client";
import { getUserID } from "../../actions/convert";
import Swal from "sweetalert2";
import { updateAttendees } from "../../actions/meeting";

interface CustomEvent {
  id: string;
  title: string;
  start: Date;
}

export const DbCalendarCard = () => {
  // --- States ---
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [currentEvents, setCurrentEvents] = useState<CustomEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMeetingDialogOpen, setIsMeetingDialogOpen] = useState(false);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [emails, setEmails] = useState("");
  const [selectedModality, setSelectedModality] = useState<"Online" | "Onsite">(
    "Online"
  );

  // --- Retrieve saved events ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        try {
          const parsed = JSON.parse(savedEvents);
          if (Array.isArray(parsed)) {
            const typedEvents: CustomEvent[] = parsed.map((e) => ({
              id: e.id,
              title: e.title,
              start: new Date(e.start),
            }));
            setCurrentEvents(typedEvents);
          }
        } catch (error) {
          console.error("Error parsing saved events:", error);
        }
      }
    }
  }, []);

  // --- Persist events ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  // --- Handle selecting a day ---
  const handleDayClick = (day: number, month: number, year: number) => {
    const newDate = new Date(year, month, day);
    setDate(newDate);
    setSelectedDate({ day, month, year });
    setIsDialogOpen(true);
  };

  // --- Add an event (local example) ---
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !date) return;

    const newEvent: CustomEvent = {
      id: String(Date.now()),
      title: newEventTitle,
      start: date,
    };

    setCurrentEvents((prev) => [...prev, newEvent]);
    setNewEventTitle("");
    setDate(undefined);
    setIsDialogOpen(false);
    setIsMeetingDialogOpen(false);
  };

  // --- Helper to clean and validate emails ---
  const cleanEmails = (emails: string) => {
    if (!emails) return [];
    const emailArray = emails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.length > 0);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailArray.filter((email) => emailRegex.test(email));
  };

  // --- Create meeting handler ---
  const handleCreateMeeting = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date) {
      console.error("No date selected.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const header = formData.get("header") as string;
    const details = formData.get("details") as string;
    const time = formData.get("time") as string;
    const rawEmails = formData.get("emails") as string;

    const validEmails = cleanEmails(rawEmails);

    if (!date) {
      Swal.fire({
        icon: "warning",
        title: "No date selected",
        text: "Please pick a date before creating a meeting.",
      });
      return;
    }

    // Combine date + time into one timestamp
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes, seconds || 0, 0);
    const timestampz = combinedDate.toISOString();

    const { data, error } = await client.from("meetings").insert([
      {
        header: header,
        details: details,
        modality: selectedModality,
        date: timestampz,
        host_id: await getUserID(),
      },
    ])
      .select()
      .single();

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to create meeting",
        text: error.message || "Please try again later.",
      });
      return;
    }

    await updateAttendees(validEmails, data.id);
  };

  const eventsForSelectedDay = currentEvents.filter(
    (event) =>
      event.start.getDate() === selectedDate?.day &&
      event.start.getMonth() === selectedDate?.month &&
      event.start.getFullYear() === selectedDate?.year
  );

  // --- JSX return ---
  return (
    <>
      <div>
        <div className="flex flex-col mb-10 lg:flex-row">
          <div className="w-full rounded-2xl lg:w-[70%] lg:mt-10 lg:mx-5 lg:max-h-180 xl:w-[80%]">
            <ContinuousCalendar
              onClick={handleDayClick}
              events={currentEvents}
            />
          </div>

          <div className="w-full lg:w-[30%] xl:w-[20%]">
            <div className="mt-5 bg-white">
              <DateTodayCard />
            </div>

            <div className="border-black border-2 h-[80%] rounded-2xl p-5 mt-5">
              <div className="text-3xl font-bold text-center">
                Upcoming Events
              </div>
              <ScrollArea className="px-0 w-full mt-5">
                <ul className="max-h-[500px]">
                  {eventsForSelectedDay.length <= 0 && (
                    <div className="text-center">No Events Present</div>
                  )}
                  {eventsForSelectedDay.map((event) => (
                    <li key={event.id} className="flex justify-center">
                      <div className="bg-purple-400 w-55 lg:w-45 p-5 mt-2 rounded-2xl cursor-pointer">
                        <div className="font-bold text-xl text-center w-full truncate">
                          {event.title}
                        </div>
                        <div className="flex flex-row">
                          <p className="pr-1">Host:</p>
                          <p>Mayor Kurt Sereno</p>
                        </div>
                        <div className="flex flex-row">
                          <p className="pr-1">Date:</p>
                          <div>
                            {event.start.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      {/* --- Dialog for selected date --- */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#E6F1FF]">
          <DialogHeader>
            <DialogTitle className="mx-5">
              {selectedDate ? (
                <div className="flex flex-row justify-between w-full">
                  <h1 className="text-3xl">{selectedDate.day}</h1>
                  <h1 className="text-3xl">
                    {new Date(
                      selectedDate.year,
                      selectedDate.month
                    ).toLocaleString("default", { month: "long" })}
                  </h1>
                </div>
              ) : (
                <h1 className="text-3xl text-gray-400">No date selected</h1>
              )}
            </DialogTitle>
          </DialogHeader>

          <Button
            onClick={() => setIsMeetingDialogOpen(true)}
            className="bg-[#E6F1FF] text-black border border-dashed border-black hover:text-white mt-4"
          >
            Set Up a Meeting
          </Button>
        </DialogContent>
      </Dialog>

      {/* --- Meeting Creation Dialog --- */}
      <Dialog open={isMeetingDialogOpen} onOpenChange={setIsMeetingDialogOpen}>
        <DialogContent className="bg-[#E6F1FF] w-full max-w-2xl rounded-2xl p-6 md:p-8 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl md:text-3xl font-semibold text-[#052659]">
              Set Up a Meeting
            </DialogTitle>
            <hr className="border-t border-black/30 w-[90%] mx-auto mt-3" />
          </DialogHeader>

          <form onSubmit={handleCreateMeeting} className="mt-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Meeting Header
              </Label>
              <Input
                type="text"
                placeholder="Enter meeting title"
                name="header"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                required
                className="border border-black rounded-xl bg-white placeholder:italic focus:ring-2 focus:ring-[#052659]"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Meeting Details
              </Label>
              <Textarea
                placeholder="Describe the agenda or discussion points..."
                className="border border-black rounded-xl h-28 bg-white placeholder:italic focus:ring-2 focus:ring-[#052659]"
                name="details"
                required
              />
            </div>

            {/* Date & Time */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="date-picker" className="text-sm font-medium">
                  Meeting Date
                </Label>
                <Popover
                  open={isDatePopoverOpen}
                  onOpenChange={setIsDatePopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-full bg-white justify-between border border-black rounded-xl text-left"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon className="ml-2 h-4 w-4 opacity-70" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-2 bg-white border border-gray-300 rounded-xl shadow-md"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        if (d) setDate(d);
                        setIsDatePopoverOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="time-picker" className="text-sm font-medium">
                  Meeting Time
                </Label>
                <Input
                  type="time"
                  name="time"
                  id="time-picker"
                  step="60"
                  defaultValue="10:30"
                  className="border border-black rounded-xl bg-white cursor-pointer"
                />
              </div>
            </div>

            {/* Modality */}
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-gray-700">
                Meeting Modality
              </Label>
              <Tabs
                value={selectedModality.toLowerCase()}
                onValueChange={(val) =>
                  setSelectedModality(val === "online" ? "Online" : "Onsite")
                }
                className="w-fit self-center"
              >
                <TabsList className="border border-black rounded-xl overflow-hidden bg-white">
                  <TabsTrigger
                    value="online"
                    className="data-[state=active]:bg-[#052659] data-[state=active]:text-white"
                  >
                    Online
                  </TabsTrigger>
                  <TabsTrigger
                    value="onsite"
                    className="data-[state=active]:bg-[#052659] data-[state=active]:text-white"
                  >
                    Onsite
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Participants */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Participants (comma-separated emails)
              </Label>
              <Textarea
                name="emails"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder="example@email.com, another@email.com"
                className="border border-black rounded-xl h-20 bg-white placeholder:italic focus:ring-2 focus:ring-[#052659]"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#052659] text-white rounded-xl py-2 mt-2 hover:bg-[#0A4A9C] transition"
            >
              Send to Participants
            </Button>
          </form>
        </DialogContent>
      </Dialog>

    </>
  );
};
