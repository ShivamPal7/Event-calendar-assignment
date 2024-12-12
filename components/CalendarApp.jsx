"use client";

import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import EventDialog from "./EventDialog";
import Events from "./Events";

const CalendarApp = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); 

  
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array.from({ length: firstDayOfMonth }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(new Date(currentYear, currentMonth, day));
      setSelectedEvent(null); 
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedDate(null);
    setSelectedEvent(null); 
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      
      const updatedEvents = events.map((event) =>
        event === selectedEvent ? eventData : event
      );
      setEvents(updatedEvents);
    } else {
      
      const newEvent = { ...eventData, date: selectedDate };
      setEvents([...events, newEvent]);
    }
    handleDialogClose();
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setSelectedDate(new Date(event.date));
    setIsDialogOpen(true); 
  };

  const getHighlightedDates = () => {
    const currentDate = new Date().toDateString();
    const eventDates = events.map((event) => new Date(event.date).toDateString());
    return [...eventDates, currentDate]; 
  };

  return (
    <>
      <Calendar
        currentMonth={currentMonth}
        currentYear={currentYear}
        days={days}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onDateClick={handleDateClick}
        highlightedDates={getHighlightedDates()}
      />
      <EventDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSave={handleSaveEvent}
        selectedEvent={selectedEvent} 
      />
      <Events
        events={events}
        onDelete={handleDeleteEvent}
        onEdit={handleEditEvent}
      />
    </>
  );
};

export default CalendarApp;
