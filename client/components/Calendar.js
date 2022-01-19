import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Typography } from '@material-ui/core';

const Calendarr = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Typography variant="h2">React Calendar</Typography>
      <div>
        <Calendar onChange={setDate} value={date} />
      </div>
      <Typography variant="h6">
        Selected Date: {date.toDateString()}{' '}
      </Typography>
    </div>
  );
};

export default Calendarr;
