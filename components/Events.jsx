"use client";

import React, { useState } from "react";
import { Trash, Edit } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const Events = ({ events = [], onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditedEvent({ ...events[index] });
  };

  const handleSaveEdit = (updatedEvent) => {
    onEdit(updatedEvent, isEditing); 
    setIsEditing(null); 
  };

  if (events.length === 0) {
    return <p className="text-center text-gray-500">No events added yet.</p>;
  }

  return (
    <div className="space-y-4 w-full sm:p-0 pt-10">
      {events.map((event, index) => {
        const eventDate = new Date(event.date);

        return (
          <div
            key={index}
            className="bg-gray-100 shadow-md rounded-lg p-4 sm:p-4 lg:p-6"
          >
            <div className="flex justify-between items-start sm:flex-row sm:gap-4">
              <div>
                <div className="text-gray-700 text-sm sm:text-base">{eventDate.toDateString()}</div>
                <div className="text-gray-500 text-xs sm:text-sm">{`${event.startTime} - ${event.endTime}`}</div>
              </div>

              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handleEditClick(index)}
                  className="p-2 bg-blue-100 text-blue-500 rounded-full hover:bg-blue-200 transition-all"
                >
                  <Edit className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-all"
                >
                  <Trash className="w-6 h-6 sm:w-7 sm:h-7" />
                </button>
              </div>
            </div>

            {isEditing === index ? (
              <div className="mt-4 space-y-2">
                <Input
                  value={editedEvent.eventName}
                  onChange={(e) => setEditedEvent({ ...editedEvent, eventName: e.target.value })}
                  placeholder="Edit event name"
                  className="w-full sm:w-80"
                />
                <Textarea
                  value={editedEvent.description}
                  onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
                  placeholder="Edit description"
                  className="w-full sm:w-80"
                />
                <div className="flex gap-4 mt-4">
                  <Button variant="secondary" onClick={() => setIsEditing(null)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => handleSaveEdit(editedEvent)}>
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="sm:mt-2 mt-0">
                <h3 className="text-lg font-semibold">{event.eventName}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{event.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Events;
