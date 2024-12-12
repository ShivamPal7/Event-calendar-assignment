import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({
  currentMonth,
  currentYear,
  days,
  onPrevMonth,
  onNextMonth,
  onDateClick,
  highlightedDates,
}) => {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const isDateHighlighted = (day) => {
    if (!day) return false;
    const date = new Date(currentYear, currentMonth, day).toDateString();
    return highlightedDates.includes(date);
  };

  const isCurrentDate = (day) => {
    const today = new Date();
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  return (
    <div className="w-full max-w-md p-4 bg-gray-50 shadow-xl rounded-xl my-auto">
      <h1 className="font-bebas text-4xl py-2 pl-2">Calendar</h1>
      <div className="flex justify-between items-center py-4 border-b border-gray-300">
        <div className="flex items-center gap-3 text-2xl font-bold text-slate-700">
          <h2>{monthNames[currentMonth]}</h2>
          <h2>{currentYear}</h2>
        </div>

        <div className="flex gap-2">
          <button
            className="h-9 w-9 bg-slate-200 p-1 rounded-full text-slate-600 hover:bg-slate-300 transition duration-200"
            aria-label="Previous Month"
            onClick={onPrevMonth}
          >
            <ChevronLeft className="h-full w-full" />
          </button>
          <button
            className="h-9 w-9 bg-slate-200 p-1 rounded-full text-slate-600 hover:bg-slate-300 transition duration-200"
            aria-label="Next Month"
            onClick={onNextMonth}
          >
            <ChevronRight className="h-full w-full" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 py-4 border-b border-gray-300">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <span
            key={day}
            className="text-center text-base font-semibold uppercase text-slate-500 tracking-wider"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4 py-4">
        {days.map((day, index) => (
          <span
            key={index}
            onClick={() => onDateClick(day)}
            className={`flex justify-center items-center text-base font-medium w-full aspect-square rounded-lg shadow hover:shadow-md transition duration-200 
              ${day ? "cursor-pointer" : "bg-transparent"} 
              ${isDateHighlighted(day) ? "bg-blue-100 text-blue-700" : "bg-white text-slate-700 hover:bg-blue-50"}
              ${isCurrentDate(day) ? "bg-slate-100 text-white" : ""} 
            `}
          >
            {day || ""}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
