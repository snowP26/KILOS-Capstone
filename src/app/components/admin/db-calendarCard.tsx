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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import { getMeeting, getParticipantsByLoc, updateAttendees } from "../../actions/meeting";
import { Meetings } from "../../lib/definitions";
import { Participants } from "../user/participants";


type Participants = {
  id: number;
  firstname: string;
  lastname: string;
  role: string
  position: string;
}

export const DbCalendarCard = () => {

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [currentEvents, setCurrentEvents] = useState<Meetings[]>([]);
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [participants, setParticipants] = useState<Participants[] | null>([])
  const [isMeetingDialogOpen, setIsMeetingDialogOpen] = useState(false);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [emails, setEmails] = useState("");
  const [selectedModality, setSelectedModality] = useState<"Online" | "Onsite">(
    "Online"
  );
  const [createMeeting, setCreateMeeting] = useState(0)
  const [selected, setSelected] = useState<number[]>([])

  // --- Retrieve saved events ---
  const fetchMeetingData = async () => {
    const data = await getMeeting();
    if (data) {
      const sorted = [...data].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      setCurrentEvents(sorted);
    }


  };

  useEffect(() => {

  }, [refresh]);

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

  // --- Create meeting handler ---
  const handleCreateMeeting = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date) {

      return;
    }

    const formData = new FormData(e.currentTarget);
    const header = formData.get("header") as string;
    const details = formData.get("details") as string;
    const time = formData.get("time") as string;


    if (!date) {
      Swal.fire({
        icon: "warning",
        title: "No date selected",
        text: "Please pick a date before creating a meeting.",
      });
      return;
    }

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

    await updateAttendees(selected, data.id);
    await fetchMeetingData();
    setDate(undefined);
    setSelectedModality("Online");
    setIsMeetingDialogOpen(false);
    setNewEventTitle("");
    setEmails("")

    setIsMeetingDialogOpen(false)
  };

  const eventsForSelectedDay = currentEvents.filter((event) => {
    const d = new Date(event.date);
    return (
      d.getDate() === selectedDate?.day &&
      d.getMonth() === selectedDate?.month &&
      d.getFullYear() === selectedDate?.year
    );
  });

  useEffect(() => {
    const loadData = async () => {
      await fetchMeetingData();
    };
    loadData();
  }, [refresh]);

  useEffect(() => {
    const getParticipants = async () => {
      setSelected([])
      const data = await getParticipantsByLoc()
      setParticipants(data)
    }

    getParticipants()
  }, [createMeeting])

  return (
    <>
      <div>
        <div className="flex flex-col mb-10 lg:flex-row">
          <div className="w-full rounded-2xl lg:w-[70%] lg:mt-2 lg:mx-3 lg:max-h-180 xl:w-[80%]">
            <div className="mb-2">
              <DateTodayCard />
            </div>
            <ContinuousCalendar
              onClick={handleDayClick}
              events={currentEvents}
            />
          </div>

          <div className="w-full lg:w-[30%] xl:w-[20%]">

            <div className="bg-white shadow-[-4px_4px_4px_rgba(0,0,0,0.15),4px_4px_4px_rgba(0,0,0,0.15)] lg:shadow-[4px_4px_4px_rgba(0,0,0,0.15)] h-209 rounded-2xl p-5 mt-2">
              <div className="text-3xl font-bold text-center">
                Upcoming Events
              </div>
              <ScrollArea className="px-0 w-full mt-5">
                <ul className="max-h-[700px]">
                  {currentEvents.length <= 0 && (
                    <div className="text-center">No Events Present</div>
                  )}

                  {currentEvents.length > 0 &&
                    currentEvents.map((event) => (
                      <li key={event.id} className="flex justify-center">
                        <Dialog>
                          <DialogTrigger>
                            <div className="bg-[#5483B3] text-white w-55 lg:w-45 p-5 mt-2 rounded-2xl cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_4px_rgba(0,0,0,0.15)]">
                              <div className="font-bold text-xl text-center w-full truncate">
                                {event.header}
                              </div>
                              <div className="flex flex-row  text-sm">
                                <p className="pr-1">Host:</p>
                                {event.users
                                  ? `${event.users.firstname} ${event.users.lastname}`
                                  : "Unknown Host"}
                              </div>
                              <div className="flex flex-row">
                                <p className="pr-1">Date:</p>
                                <div>
                                  {new Date(event.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </div>
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="bg-[#E6F1FF] w-full">
                            <DialogHeader>
                              <DialogTitle className="text-start text-xl lg:text-3xl lg:text-center">
                                {event.header}
                              </DialogTitle>
                              <hr className="border-t border-black w-full lg:w-full" />
                              <div className="flex flex-wrap gap-2 justify-center text-center">
                                <div className="bg-[#C1E8FF] border border-gray-600 rounded-2xl px-2">
                                  <p className="text-sm">
                                    {event.users
                                      ? `${event.users.firstname} ${event.users.lastname}`
                                      : "Unknown Host"}
                                  </p>
                                </div>
                                <div className="bg-[#C1E8FF] border border-gray-600 rounded-2xl px-2">
                                  <p className="text-sm">{event.modality}</p>
                                </div>
                                <div className="bg-[#C1E8FF] border border-gray-600 rounded-2xl px-2">
                                  <p className="text-sm">
                                    {new Date(event.date).toLocaleDateString("en-UK", {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric"
                                    })}
                                  </p>
                                </div>
                                <div className="bg-[#C1E8FF] border border-gray-600 rounded-2xl px-2">
                                  <p className="text-sm">
                                    {new Date(event.date).toLocaleTimeString("en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </p>
                                </div>
                              </div>

                              <div className="bg-white text-balance h-100 mt-2 rounded-[20px] shadow-[4px_4px_4px_rgba(0,0,0,0.15),-4px_4px_4px_rgba(0,0,0,0.15)]">
                                <ScrollArea className="h-[90%] m-3 ">
                                  <p className="p-5">
                                    {event.details}
                                  </p>
                                </ScrollArea>
                              </div>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
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
          {eventsForSelectedDay.length > 0 ? (
            <ScrollArea className="max-h-[300px] mt-4">
              <ul className="space-y-3">
                {eventsForSelectedDay.map((event) => (
                  <li key={event.id} className="flex justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="bg-[#5483B3] w-full p-4 rounded-2xl cursor-pointer hover:bg-[#052659] hover:text-white transition">
                          <div className="font-bold text-lg text-center truncate">
                            {event.header}
                          </div>
                          <div className="flex flex-row text-sm justify-center">
                            <p className="pr-1 font-semibold">Time:</p>
                            <p>
                              {new Date(event.date).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </p>
                          </div>
                          <div className="flex flex-row text-sm justify-center">
                            <p className="pr-1 font-semibold">Host:</p>
                            <p>
                              {event.users
                                ? `${event.users.firstname} ${event.users.lastname}`
                                : "Unknown Host"}
                            </p>
                          </div>
                        </div>
                      </DialogTrigger>

                      <DialogContent className="bg-[#E6F1FF] w-full max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="text-center text-2xl font-bold">
                            {event.header}
                          </DialogTitle>
                          <hr className="border-t border-black w-full mt-2" />

                          <div className="flex flex-wrap gap-2 justify-center text-center mt-3">
                            <div className="bg-[#C1E8FF] border border-gray-600 rounded-2xl px-2">
                              <p className="text-sm">
                                {event.users
                                  ? `${event.users.firstname} ${event.users.lastname}`
                                  : "Unknown Host"}
                              </p>
                            </div>
                            <div className="bg-[#C1E8FF] border border-gray-600 rounded-2xl px-2">
                              <p className="text-sm">{event.modality}</p>
                            </div>
                            <div className="bg-[#C1E8FF] border border-gray-600 rounded-2xl px-2">
                              <p className="text-sm">
                                {new Date(event.date).toLocaleDateString("en-UK", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                            <div className="bg-[#C1E8FF] border border-gray-600 rounded-2xl px-2">
                              <p className="text-sm">
                                {new Date(event.date).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white text-balance h-100 mt-4 rounded-[20px] shadow-[4px_4px_4px_rgba(0,0,0,0.15),-4px_4px_4px_rgba(0,0,0,0.15)]">
                            <ScrollArea className="h-[90%] m-3">
                              <p className="p-5 text-sm text-gray-700">{event.details}</p>
                            </ScrollArea>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <div className="text-center text-gray-500 mt-4">
              No meetings scheduled for this day.
            </div>
          )}

          <Button
            onClick={() => setIsMeetingDialogOpen(true)}
            className="bg-[#E6F1FF] text-black border border-dashed border-black hover:text-white mt-4 cursor-pointer"
          >
            Set Up a Meeting
          </Button>
        </DialogContent>
      </Dialog>

      {/* --- Meeting Creation Dialog --- */}
      <Dialog open={isMeetingDialogOpen} onOpenChange={setIsMeetingDialogOpen}>
        <DialogContent className="bg-[#E6F1FF] w-full max-w-2xl rounded-2xl p-6 md:p-8 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-xl md:text-3xl font-semibold text-[#052659]">
              Set Up a Meeting
            </DialogTitle>
            <hr className="border-t border-black/30 w-[90%] mx-auto mt-3" />
          </DialogHeader>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              Swal.fire({
                title: "Please wait...",
                text: "Processing your request.",
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
                },
              });

              await handleCreateMeeting(e);
              setSelected([])
              Swal.close();

            }
            }
            className="md:mt-6 space-y-3 md:space-y-6">
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
                className="border border-gray-300 rounded-xl bg-white placeholder:italic "
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-gray-700">
                Meeting Details
              </Label>
              <Textarea
                placeholder="Describe the agenda or discussion points..."
                className="border w-full max-w-112 border-gray-300 rounded-xl h-28 bg-white placeholder:italic"
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
                      disabled
                      className="w-full bg-white justify-between border border-gray-300 rounded-xl text-left"
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
                  className="border border-gray-300 rounded-xl bg-white cursor-pointer"
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
                <TabsList className="border border-gray-300 rounded-xl overflow-hidden bg-white">
                  <TabsTrigger
                    value="online"
                    className="data-[state=active]:bg-[#052659] cursor-pointer data-[state=active]:text-white"
                  >
                    Online
                  </TabsTrigger>
                  <TabsTrigger
                    value="onsite"
                    className="data-[state=active]:bg-[#052659] cursor-pointer data-[state=active]:text-white"
                  >
                    Onsite
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Participants */}
            <Label className="text-sm font-medium text-gray-700 mb-1">
              Participants ({selected?.length} participants are selected)
            </Label>
            <ScrollArea className="max-w-65 md:max-w-110 pb-2">
              <div className="flex flex-row gap-2 p-2">
                {participants?.map((data) => (
                  <Participants
                    key={data.id}
                    onClick={() => {
                      setSelected((prev) => {
                        if (prev.includes(data.id)) {
                          return prev.filter((id) => id !== data.id);
                        }
                        return [...prev, data.id]
                      })

                    }}
                    className={`${selected.includes(data.id) ? "bg-[#D0E4FF] border-[#052659] cursor-pointer" : " bg-[#E6F1FF] border-gray-300 cursor-pointer"}`}
                    firstname={data.firstname}
                    lastname={data.lastname}
                    role={data.role}
                    position={data.position}
                  />
                ))
                }

              </div>
              <ScrollBar orientation="horizontal" className="[&>div]:bg-gray-400 [&>div:hover]:bg-gray-500 bg-gray-200" />
            </ScrollArea>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#052659] hover:bg-[#052659] text-white rounded-xl py-2 mt-2 cursor-pointer transition"
            >
              Send to Participants
            </Button>
          </form>
        </DialogContent>
      </Dialog>

    </>
  );
};
