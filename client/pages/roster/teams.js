import React, { useState } from 'react';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

const innerTheme = createTheme({
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: '#14fbcb',
        },
        daySelected: {
          color: '#14fbcb',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#14fbcb',
          borderRadius: '10px',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#14fbcb',
          borderRadius: '10px',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#D8F2FF',
    },
  },
});

const Roster = () => {
  const [value, setValue] = React.useState(null);

  return (
    <div style={{ marginLeft: '5rem', marginTop: '10rem' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={value}
          shouldDisableDate={isWeekend}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Roster;
