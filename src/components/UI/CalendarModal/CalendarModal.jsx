// CalendarModal.js
import React from 'react';
import Calendar from 'react-calendar';
import './style.css'
import "../../../../node_modules/react-calendar/dist/Calendar.css";

const CalendarModal = ({ selectedDate, onSelect }) => {
  return (
    <div className="calendar-modal">
      <Calendar value={selectedDate} onChange={onSelect}  className={'react-calendar'} />
      {/* <button onClick={onClose}>Close</button> */}
    </div>
  );
};

export default CalendarModal;
