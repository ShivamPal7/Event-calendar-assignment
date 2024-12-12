import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import { Input } from './ui/input'; 
import { Button } from './ui/button'; 

const DateTimePicker = ({ selectedDate, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="font-medium">Select Date & Time</label>
      <div className="flex gap-4">
        {/* Date Picker */}
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          showTimeSelect
          dateFormat="Pp"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
