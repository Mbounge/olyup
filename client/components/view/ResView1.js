import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ResultInput from './ResultInput';
import theme from '../../src/ui/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1rem',
  },
  textField: {
    width: '5rem',
    height: '3rem',
    marginTop: '0.43rem',
  },
}));

const data = {
  id: '1234',
  exerciseName: 'front squat',
  complex: [{ exercise: 'snatch', tally: 1 }],
  sets: 1,
  reps: [{ value: 6, tally: 0 }],
  groupNumber: 1,
  cellNumber: 1,
  effort: [{ value: 60, tally: 0 }],
  notes: ['Pause at Bottom'],
  results: [],
  checkmark: false,
  userId: ['coachId', 'athleteId'], // changed separately
  session: 'uuid',
  date: '2021-10-20T00:19:50.773Z',
};

const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
};

const getLocalStorage = (key, initialValue) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    return initialValue;
  }
};

const options = {
  'Percent (%)': '%',
  'Weight (lbs/kg)': 'lbs/kg',
  'Speed (m/s)': 'm/s',
  'Power (watts)': 'watts',
  'Heart Rate (bpm)': 'bpm',
};

console.log(options['Weight (lbs/kg)']);

// Resistance View 1 - standard view 3*3
const ResView1 = ({ data }) => {
  const classes = useStyles();

  const resViewCallback = (data) => {
    const trainingResults = getLocalStorage('results', 'value');

    if (typeof trainingResults !== undefined) {
      // start searching for elements
      var cellIndex = trainingResults.findIndex(
        (obj) =>
          obj.id == data.id &&
          obj.tally == data.tally &&
          obj.session == data.session
      );

      if (cellIndex >= 0) {
        console.log(`cellIndex ${cellIndex}`);
        trainingResults[cellIndex].value = data.value;
        console.log(trainingResults);
      } else if (cellIndex == -1) {
        console.log('Need to Create it, just push');
        trainingResults.push(data);
        console.log(trainingResults);
      }
    }

    setLocalStorage('results', trainingResults);
  };

  var index = 0;

  return (
    <CardContent>
      <Grid
        container
        alignItems="center"
        style={{ border: theme.palette.secondary.main }}
      >
        <Grid item xs={3}>
          <Typography>{data.exerciseName}</Typography>
        </Grid>
        <Grid container item xs={9} alignItems="center">
          <Grid item xs={9}>
            <Typography>{`${data.sets} sets * ${data.reps[0].value} reps @ ${
              data.effort[0].value
            }${options[data.effortOption]}`}</Typography>
          </Grid>
          <Grid item xs={3}>
            <ResultInput
              data={data.results[index]}
              resViewCallback={resViewCallback}
              id={data.id}
              session={data.session}
            />
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default ResView1;
