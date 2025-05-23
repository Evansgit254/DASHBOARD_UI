"use client";

import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar';
import moment from 'moment';
import { calendarEvents } from '@/lib/data';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={[Views.WORK_WEEK, Views.DAY]}  // Use View objects instead of strings
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 3, 0, 8, 0, 0)}
      max={new Date(2025, 3, 0, 21, 0, 0)}
    />
  );
};

export default BigCalendar;