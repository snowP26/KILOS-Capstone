"use client";

import React, { useState, useEffect } from 'react';
import { formatDate, DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { DateTodayCard } from './date-todayCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


export const DbCalendarCard = () => {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [newEventTitle, setNewEventTitle] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedEvents = localStorage.getItem("events");
            if (savedEvents) {
                setCurrentEvents(JSON.parse(savedEvents));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("events", JSON.stringify(currentEvents));
        }
    }, [currentEvents]);

    const handleDateClick = (selected: DateSelectArg) => {
        setSelectedDate(selected);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setNewEventTitle("");
    };

    const handleEventClick = (selected: EventClickArg) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event "${selected.event.title}"?`
            )
        ) {
            selected.event.remove();
        }
    };

    const handleAddEvent = (e: React.FormEvent) => {
        e.preventDefault();

        if (newEventTitle && selectedDate) {
            const calendarApi = selectedDate.view.calendar;
            calendarApi.unselect();

            const newEvent = {
                id: `${selectedDate?.start.toISOString()}-${newEventTitle}`,
                title: newEventTitle,
                start: selectedDate?.start,
                end: selectedDate?.end,
            };
            calendarApi.addEvent(newEvent);
            handleCloseDialog();
        }
    };

    return (
        <>
            <div>
                <div className="flex flex-col mb-10 lg:flex-row">
                    <div className="bg-white w-full rounded-2xl lg:w-[70%] lg:mt-10 lg:mx-5 lg:p-10 lg:h-fit xl:w-[80%]">
                        <FullCalendar
                            height='70vh'

                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{ left: "prev", center: "title", right: "next today" }}
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            select={handleDateClick}
                            eventClick={handleEventClick}
                            eventsSet={(events) => setCurrentEvents(events)}
                            initialEvents={typeof window !== "undefined" ? JSON.parse(localStorage.getItem("events") || "[]") : []}
                        />
                    </div>
                    <div className="w-full lg:w-[30%] xl:w-[20%]">
                        <div className="mt-5">
                            <DateTodayCard />
                        </div>

                        <div className="border-black border-2 h-[80%] rounded-2xl p-5 mt-5">
                            <div className="text-3xl font-bold text-center">
                                Upcoming Events
                            </div>
                            <ScrollArea className="px-0 w-full mt-5">
                                <ul className="max-h-[500px]">
                                    {currentEvents.length <= 0 && (
                                        <div className="text-center">
                                            No Events Present
                                        </div>
                                    )}

                                    {currentEvents.length > 0 && currentEvents.map((event: EventApi) => (
                                        <li key={event.id} className="flex justify-center">
                                            <Dialog>
                                                <DialogTrigger>
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
                                                                {formatDate(event.start!, {
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
                                                            Meeting Title
                                                        </DialogTitle>
                                                        <hr className="border-t border-black w-full lg:w-full" />
                                                        <div className="flex flex-wrap gap-2 justify-center text-center">
                                                            <div className="bg-[#C1E8FF] border border-black rounded-2xl px-2">
                                                                <p className="text-sm">
                                                                    Mayor Kurt Sereno
                                                                </p>
                                                            </div>
                                                            <div className="bg-[#C1E8FF] border border-black rounded-2xl px-2">
                                                                <p className="text-sm">
                                                                    Meeting Modality
                                                                </p>
                                                            </div>
                                                            <div className="bg-[#C1E8FF] border border-black rounded-2xl px-2">
                                                                <p className="text-sm">
                                                                    Meeting Date
                                                                </p>
                                                            </div>
                                                            <div className="bg-[#C1E8FF] border border-black rounded-2xl px-2">
                                                                <p className="text-sm">
                                                                    Meeting Time
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="bg-white text-balance h-100 mt-2 rounded-[20px]">
                                                            <ScrollArea className="h-[90%] m-3 ">
                                                                <p className="p-5">
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc at gravida fermentum, erat turpis malesuada leo, vel commodo sapien turpis nec lorem. Integer sit amet est nec purus tincidunt aliquet. Aenean porta vehicula neque, in tempor ex tincidunt at. Suspendisse potenti. Proin quis lorem vehicula, tincidunt neque sed, fermentum elit. Ut dapibus eros eget mauris volutpat, nec tempus justo tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed congue magna sed metus pulvinar, quis cursus nulla lacinia. Aliquam erat volutpat. Donec non lacus at arcu fermentum venenatis. Quisque vitae hendrerit purus. Nulla convallis lorem a justo dapibus, nec dignissim sapien accumsan.

                                                                    Mauris porttitor, augue id tincidunt dignissim, justo augue sagittis leo, a tincidunt arcu metus ac lorem. Curabitur rhoncus lorem a lacus blandit, sit amet gravida ligula laoreet. Suspendisse imperdiet lacus ut blandit dignissim. Sed iaculis libero ut enim congue, nec tincidunt metus bibendum. Morbi pulvinar tellus vel turpis rhoncus imperdiet. Nulla facilisi. Vestibulum iaculis fringilla felis, ac varius elit fringilla nec. Nam sodales lectus eros, at iaculis diam malesuada non. Integer ornare justo libero, at tincidunt nisl dapibus ut.

                                                                    Curabitur rutrum, magna sed varius convallis, enim est efficitur eros, nec sollicitudin nisi sapien non metus. Etiam volutpat, lacus sed bibendum tempor, magna magna malesuada augue, vel dapibus metus neque a nisl. Duis eget tempor eros. Etiam vel eros in elit tristique sagittis ac nec urna. Nullam in sem quis magna cursus vehicula. Nam a orci sapien. Sed fermentum imperdiet pulvinar. Nam sodales nisi et mauris bibendum, et volutpat dolor tristique. Cras vulputate nunc in nulla tincidunt, at pulvinar velit porttitor.

                                                                    Vivamus mattis posuere diam a scelerisque. Nulla ornare nisl eu urna gravida accumsan. Sed sodales magna in turpis finibus facilisis. Duis et purus ut velit pharetra dapibus. Quisque pretium laoreet justo nec vehicula. Morbi ultrices nulla eget sagittis viverra. Aliquam efficitur justo in libero fermentum rutrum. Cras at porttitor sapien. Vestibulum volutpat, risus in commodo vulputate, mi risus hendrerit purus, a bibendum diam mi vel risus. Sed luctus diam sed magna porta, nec pulvinar metus tincidunt.

                                                                    Vivamus mattis posuere diam a scelerisque. Nulla ornare nisl eu urna gravida accumsan. Sed sodales magna in turpis finibus facilisis. Duis et purus ut velit pharetra dapibus. Quisque pretium laoreet justo nec vehicula. Morbi ultrices nulla eget sagittis viverra. Aliquam efficitur justo in libero fermentum rutrum. Cras at porttitor sapien. Vestibulum volutpat, risus in commodo vulputate, mi risus hendrerit purus, a bibendum diam mi vel risus. Sed luctus diam sed magna porta, nec pulvinar metus tincidunt.
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#E6F1FF]">
                    <DialogHeader>
                        <DialogTitle className="mx-5">
                            <div className="flex flex-row justify-between">
                                <h1 className="text-3xl">
                                    9
                                </h1>
                                <h1 className="text-3xl">
                                    January
                                </h1>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <hr className="border-t border-black w-full" />

                    <h1 className="text-3xl py-10 text-gray-400 text-center font-medium">No events for today!</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-[#E6F1FF] place-self-end w-fit text-black cursor-pointer border-1 border-black border-dashed hover:text-white">
                                Set Up a Meeting
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#E6F1FF] w-full">
                            <DialogHeader>
                                <DialogTitle className="text-start text-xl lg:text-3xl lg:text-center">
                                    Set Up a Meeting
                                </DialogTitle>
                                <hr className="border-t border-black w-[90%] lg:w-full" />

                                <form onSubmit={handleAddEvent} className="mt-3">
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Meeting Header"
                                            value={newEventTitle}
                                            onChange={(e) => setNewEventTitle(e.target.value)}
                                            required
                                            className="border-black border w-fit lg:w-full
                                            placeholder:italic self-center lg:self-start"
                                        />
                                        <Textarea
                                            className="h-32 max-w-60 lg:max-w-115 border-black border self-center lg:self-start placeholder:italic"
                                            placeholder="Meeting Body"
                                            name="details"
                                            required
                                        />
                                        <div className="flex flex-col self-center lg:self-start lg:flex-row gap-4 lg:mt-5">
                                            <div className="flex flex-col gap-1">
                                                <Label htmlFor="date-picker" className="px-1">
                                                    Meeting Date
                                                </Label>
                                                <Popover open={open} onOpenChange={setOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            id="date-picker"
                                                            className="w-32 bg-transparent justify-between font-normal cursor-pointer border border-black"
                                                        >
                                                            {date ? date.toLocaleDateString() : "Select date"}
                                                            <ChevronDownIcon />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            captionLayout="dropdown"
                                                            onSelect={(date) => {
                                                                setDate(date)
                                                                setOpen(false)
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <Label htmlFor="time-picker" className="px-1">
                                                    Meeting Time
                                                </Label>
                                                <Input
                                                    type="time"
                                                    id="time-picker"
                                                    step="1"
                                                    defaultValue="10:30:00"
                                                    className="bg-transparent appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none cursor-pointer border border-black w-fit py-4.5"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex w-fit mt-2 mb-5 lg:mb-0 max-w-sm self-center lg:self-start flex-col gap-1">
                                            <Label className="px-1">
                                                Meeting Modality
                                            </Label>
                                            <Tabs defaultValue="online">
                                                <TabsList className="border border-black">
                                                    <TabsTrigger value="online">Online</TabsTrigger>
                                                    <TabsTrigger value="onsite">Onsite</TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="online">
                                                </TabsContent>
                                                <TabsContent value="onsite">
                                                </TabsContent>
                                            </Tabs>
                                        </div>

                                        <Button type="submit" className="bg-[#052659] text-white cursor-pointer hover:text-[#052659] hover:bg-white hover:border hover:border-black place-self-center lg:place-self-end w-fit">
                                            Send to Participants
                                        </Button>
                                    </div>

                                </form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>


                </DialogContent>
            </Dialog>
        </>


    )
}

