import React, { useState, useEffect } from 'react';

function useDaysOfWeek() {
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [daysOfWeekText, setDaysOfWeekText] = useState([]);

  function getDayText(day:any) {
    const dayMappings :any= {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };
    return dayMappings[day] || day;
  }

  useEffect(() => {
    const formattedDaysOfWeek:any = daysOfWeek?.map((day) => getDayText(day));
    setDaysOfWeekText(formattedDaysOfWeek);
  }, [daysOfWeek]);

  return [daysOfWeek, setDaysOfWeek, daysOfWeekText];
}