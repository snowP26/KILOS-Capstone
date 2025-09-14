"use client";

import React, { useState, useEffect } from 'react';
import { formatDate, DateSelectArg, EventClickArg, EventApi } from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { DateTodayCard } from './date-todayCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';


export const DbCalendarCard = () => {

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
                <div className="flex flex-col mb-10 xl:flex-row">
                    <div className="bg-white w-full rounded-2xl xl:w-[80%] xl:mt-10 xl:mx-5 xl:p-10 xl:h-fit">
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
                    <div className="w-full xl:w-[20%]">
                        <div className="mt-5">
                            <DateTodayCard />
                        </div>

                        <div className="border-black border-2 h-[80%] rounded-2xl p-5 mt-5">
                            <div className="text-3xl font-bold text-center">
                                Upcoming Events
                            </div>
                            <ScrollArea className="px-5 mt-5">
                                <ul className=" max-h-[500px]">
                                    {currentEvents.length <= 0 && (
                                        <div className="text-center">
                                            No Events Present
                                        </div>
                                    )}

                                    {currentEvents.length > 0 && currentEvents.map((event: EventApi) => (
                                        <li key={event.id}>
                                            <div className="bg-purple-400 p-5 mt-2 rounded-2xl">
                                                <div className="font-bold text-xl text-center">
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
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>


                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Set up a Meeting</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddEvent}>
                        <div className="flex-col">
                            <input
                                type="text"
                                placeholder="Meeting Header"
                                value={newEventTitle}
                                onChange={(e) => setNewEventTitle(e.target.value)}
                                required
                                className="border-black border-2"
                            />
                            <Button type="submit">Submit</Button>
                        </div>

                    </form>

                </DialogContent>
            </Dialog>
        </>


    )
}

