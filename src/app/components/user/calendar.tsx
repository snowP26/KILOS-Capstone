'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CirclePlus, ChevronLeft, ChevronRight, CircleQuestionMark } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
}

interface ContinuousCalendarProps {
  onClick?: (_day: number, _month: number, _year: number) => void;
  events?: CalendarEvent[];
}

export const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({ onClick, events = [] }) => {
  const today = new Date();
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const monthOptions = monthNames.map((month, index) => ({ name: month, value: `${index}` }));

  const scrollToDay = (monthIndex: number, dayIndex: number) => {
    const targetDayIndex = dayRefs.current.findIndex(
      (ref) => ref && ref.getAttribute('data-month') === `${monthIndex}` && ref.getAttribute('data-day') === `${dayIndex}`,
    );

    const targetElement = dayRefs.current[targetDayIndex];

    if (targetDayIndex !== -1 && targetElement) {
      const container = document.querySelector('.calendar-container');
      const elementRect = targetElement.getBoundingClientRect();
      const is2xl = window.matchMedia('(min-width: 1536px)').matches;
      const offsetFactor = is2xl ? 3 : 2.5;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const offset = elementRect.top - containerRect.top - (containerRect.height / offsetFactor) + (elementRect.height / 2);

        container.scrollTo({
          top: container.scrollTop + offset,
          behavior: 'smooth',
        });
      } else {
        const offset = window.scrollY + elementRect.top - (window.innerHeight / offsetFactor) + (elementRect.height / 2);

        window.scrollTo({
          top: offset,
          behavior: 'smooth',
        });
      }
    }
  };

  const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
  const handleNextYear = () => setYear((prevYear) => prevYear + 1);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const monthIndex = parseInt(event.target.value, 10);
    setSelectedMonth(monthIndex);
    scrollToDay(monthIndex, 1);
  };

  const handleTodayClick = () => {
    setYear(today.getFullYear());
    scrollToDay(today.getMonth(), today.getDate());

    console.log(`year: ${year} \n tdy: ${today.getMonth()}`)
  };

  const handleDayClick = (day: number, month: number, year: number) => {

    if (onClick) {
      if (month < 0) {
        onClick(day, 11, year - 1);
      } else {
        onClick(day, month, year);
      }
    }
  }

  // const handleAddEvent = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!newEventTitle || !date) return;

  //   const newEvent: CustomEvent = {
  //     id: String(Date.now()),
  //     title: newEventTitle,
  //     start: date,
  //   };

  //   setCurrentEvents((prev) => [...prev, newEvent]);
  //   setNewEventTitle("");
  //   setDate(undefined);
  //   setIsDialogOpen(false);
  // };

  useEffect(() => {
    handleTodayClick();
  }, []);

  const generateCalendar = useMemo(() => {
    const today = new Date();

    const daysInYear = (): { month: number; day: number }[] => {
      const daysInYear = [];
      const startDayOfWeek = new Date(year, 0, 1).getDay();

      if (startDayOfWeek < 6) {
        for (let i = 0; i < startDayOfWeek; i++) {
          daysInYear.push({ month: -1, day: 32 - startDayOfWeek + i });
        }
      }

      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          daysInYear.push({ month, day });
        }
      }

      const lastWeekDayCount = daysInYear.length % 7;
      if (lastWeekDayCount > 0) {
        const extraDaysNeeded = 7 - lastWeekDayCount;
        for (let day = 1; day <= extraDaysNeeded; day++) {
          daysInYear.push({ month: 0, day });
        }
      }

      return daysInYear;
    };

    const calendarDays = daysInYear();

    const calendarWeeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push(calendarDays.slice(i, i + 7));
    }

    const calendar = calendarWeeks.map((week, weekIndex) => (
      <div className="flex w-full" key={`week-${weekIndex}`}>
        {week.map(({ month, day }, dayIndex) => {
          const index = weekIndex * 7 + dayIndex;
          const isNewMonth = index === 0 || calendarDays[index - 1].month !== month;
          const isToday = today.getMonth() === month && today.getDate() === day && today.getFullYear() === year;
          const dayEvents = month >= 0
            ? events.filter(
              (ev) =>
                ev.start.getDate() === day &&
                ev.start.getMonth() === month &&
                ev.start.getFullYear() === year
            )
            : [];

          return (
            <div
              key={`${month}-${day}`}
              ref={(el) => { dayRefs.current[index] = el; }}
              data-month={month}
              data-day={day}
              onClick={() => handleDayClick(day, month, year)}
              className={`relative z-10 m-[-0.5px] group aspect-square w-full grow cursor-pointer rounded-xl border font-medium transition-all hover:z-20 hover:border-cyan-400 sm:-m-px size-auto sm:rounded-2xl sm:border-2 lg:rounded-3xl`}
            >
              <div className="flex flex-row items-center gap-1 absolute left-1 top-1">
                {/* Day number */}
                <span
                  className={`flex size-5 items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm lg:size-8 lg:text-base 
                    ${isToday
                      ? "bg-blue-500 font-semibold text-white"
                      : month < 0
                        ? "text-gray-400"
                        : "text-gray-800"
                    }`}
                >
                  {day}
                </span>

                {/* Show question mark only if there are events */}
                {dayEvents.length > 0 && (
                  <CircleQuestionMark className="w-4 h-4 text-red-500" />
                )}
              </div>

              {isNewMonth && (
                <span className="absolute bottom-0.5 left-0 w-full truncate px-1.5 text-sm font-semibold text-gray-300 sm:bottom-0 sm:text-lg lg:bottom-2.5 lg:left-0 lg:-mb-1 lg:w-full lg:px-0 lg:text-xl xl:left-3.5  2xl:mb-[-4px] 2xl:text-2xl">
                  {monthNames[month]}
                </span>
              )}

              {dayEvents.length > 0 && (
                <div className="hidden md:absolute md:left-2 md:right-2 md:bottom-2 md:flex md:flex-col md:gap-1">
                  {dayEvents.slice(0, 2).map((ev) => (
                    <div key={ev.id} className="lg:hidden xl:block truncate text-xs font-medium rounded px-1 py-0.5 bg-purple-500 text-white max-w-full">
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
                  )}
                </div>
              )}

              <button type="button" className="absolute right-2 top-2 rounded-full opacity-0 transition-all focus:opacity-100 group-hover:opacity-100">
                <CirclePlus
                  className="size-8 scale-90 text-white transition-all hover:scale-100 group-focus:scale-100"
                  aria-hidden="true"
                  width="24" height="24"
                  fill="orange"
                />
              </button>

            </div>
          );
        })}
      </div>
    ));

    return calendar;
  }, [year]);

  useEffect(() => {
    const calendarContainer = document.querySelector('.calendar-container');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const month = parseInt(entry.target.getAttribute('data-month')!, 10);
            setSelectedMonth(month);
          }
        });
      },
      {
        root: calendarContainer,
        rootMargin: '-75% 0px -25% 0px',
        threshold: 0,
      },
    );

    dayRefs.current.forEach((ref) => {
      if (ref && ref.getAttribute('data-day') === '15') {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="calendar-container max-h-full rounded-2xl bg-white pb-10 text-gray-800 shadow-xl">
      <div className="sticky -top-px w-full rounded-t-2xl bg-white px-5 pt-7 sm:px-8 sm:pt-8">
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Select name="month" value={`${selectedMonth}`} options={monthOptions} onChange={handleMonthChange} />
            <button onClick={handleTodayClick} type="button" className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 lg:px-5 lg:py-2.5">
              Today
            </button>
            {/* <button type="button" className="whitespace-nowrap rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 sm:rounded-xl lg:px-5 lg:py-2.5">
              + Add Event
            </button> */}
          </div>
          <div className="flex w-fit items-center justify-between">
            <button
              onClick={handlePrevYear}
              className="cursor-pointer rounded-full border border-gray-300 p-1 transition-colors hover:bg-gray-100 sm:p-2"
            >
              <ChevronLeft className="size-5 text-gray-800" />
            </button>
            <h1 className="min-w-16 text-center text-lg font-semibold sm:min-w-20 sm:text-xl">{year}</h1>
            <button
              onClick={handleNextYear}
              className="cursor-pointer rounded-full border border-gray-300 p-1 transition-colors hover:bg-gray-100 sm:p-2"
            >
              <ChevronRight className="size-5 text-gray-800" />
            </button>
          </div>
        </div>
        <div className="grid w-full grid-cols-7 justify-between text-gray-500">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="w-full border-b border-gray-200 py-2 text-center font-semibold">
              {day}
            </div>
          ))}
        </div>
      </div>
      <ScrollArea className="h-70 sm:h-100 md:h-110 lg:h-120 xl:h-130 2xl:h-140">
        <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">
          {generateCalendar}
        </div>
      </ScrollArea>
    </div>
  );
};

export interface SelectProps {
  name: string;
  value: string;
  label?: string;
  options: { 'name': string, 'value': string }[];
  onChange: (_event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const Select = ({ name, value, label, options = [], onChange, className }: SelectProps) => (
  <div className={`relative ${className}`}>
    {label && (
      <label htmlFor={name} className="mb-2 block font-medium text-gray-800">
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded-lg border border-gray-300 bg-white py-1.5 pl-2 pr-6 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:rounded-xl sm:py-2.5 sm:pl-3 sm:pr-8 focus:rounded-b-none"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);