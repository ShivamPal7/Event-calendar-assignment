import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const EventDialog = ({ isOpen, onClose, onSave, selectedEvent }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState(selectedEvent?.date || new Date()); 
  const [startTime, setStartTime] = useState(selectedEvent?.startTime || ""); 
  const [endTime, setEndTime] = useState(selectedEvent?.endTime || ""); 

  useEffect(() => {
    if (isOpen && selectedEvent) {
      setEventName(selectedEvent.eventName);
      setDescription(selectedEvent.description);
      setEventDate(new Date(selectedEvent.date));
      setStartTime(selectedEvent.startTime);
      setEndTime(selectedEvent.endTime);
    }
  }, [isOpen, selectedEvent]);

  const handleSave = () => {
    const eventData = {
      eventName,
      description,
      date: eventDate,
      startTime,
      endTime,
    };
    onSave(eventData); 
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-96">
          <h2 className="text-xl font-bold mb-4">Add Event</h2>
          <div className="space-y-4">
            <Input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Event Name"
              className="border border-gray-300 rounded p-2 w-full"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event Description"
              className="border border-gray-300 rounded p-2 w-full"
            />
            <div>
              <label className="block text-gray-700">Event Date</label>
              <input
                type="date"
                value={eventDate.toISOString().split("T")[0]} 
                onChange={(e) => setEventDate(new Date(e.target.value))}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EventDialog;
