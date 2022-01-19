import React, { useEffect, useState } from 'react';
import { Card, makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, Calendar } from '@material-ui/pickers';
import { Grid, List, ListItemIcon } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdateAlt';
import theme from '../../src/ui/theme';

import CoreView from '../../components/view/CoreView';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1rem',
  },
  fab: {
    margin: 0,
    zIndex: 1000,
    bottom: 50,
    right: 20,
    left: 'auto',
    position: 'fixed',
  },
}));

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

const resultsInitialization = () => {
  console.log('results Object initialized!!!!!');
  setLocalStorage('results', []);
};

const ViewWorkout = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState([]);

  const data = [
    {
      id: '123',
      exerciseName: 'back squat',
      complex: [{ exercise: 'snatch', tally: 1 }],
      sets: 2,
      reps: [
        { value: 6, tally: 0 },
        { value: 6, tally: 1 },
      ],
      groupNumber: 0,
      cellNumber: 3,
      effort: [
        { value: 60, tally: 0 },
        { value: 60, tally: 1 },
      ],
      effortOption: 'Percent (%)',
      notes: ['Pause at Bottom'],
      results: [
        { value: 0, tally: 0 },
        { value: 0, tally: 1 },
      ],
      checkmark: false,
      userId: ['coachId', 'athleteId'],
      session: 'uuid',
      date: '2021-10-20T00:19:50.773Z',
    },
    {
      id: '123',
      exerciseName: 'back squat',
      complex: [{ exercise: 'snatch', tally: 1 }],
      sets: 2,
      reps: [
        { value: 6, tally: 0 },
        { value: 8, tally: 1 },
      ],
      groupNumber: 0,
      cellNumber: 2,
      effort: [
        { value: 60, tally: 0 },
        { value: 61, tally: 1 },
      ],
      effortOption: 'Percent (%)',
      notes: ['Pause at Bottom'],
      results: [
        { value: 0, tally: 0 },
        { value: 0, tally: 1 },
      ],
      checkmark: false,
      userId: ['coachId', 'athleteId'],
      session: 'uuid',
      date: '2021-10-20T00:19:50.773Z',
    },
    {
      id: '1234',
      exerciseName: 'front squat',
      complex: [{ exercise: 'snatch', tally: 1 }],
      sets: 2,
      reps: [
        { value: 6, tally: 0 },
        { value: 7, tally: 1 },
      ],
      groupNumber: 1,
      cellNumber: 1,
      effort: [
        { value: 60, tally: 0 },
        { value: 60, tally: 1 },
      ],
      effortOption: 'Percent (%)',
      notes: ['Pause at Bottom'],
      results: [
        // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
        { value: 100, tally: 0 },
        { value: 120, tally: 1 },
      ],
      checkmark: false,
      userId: ['coachId', 'athleteId'],
      session: 'uuid',
      date: '2021-10-20T00:19:50.773Z',
    },
  ];

  useEffect(() => {}, [selectedDate]);

  useEffect(() => {
    // Should only be initialized once
    resultsInitialization();
  }, []);

  const classes = useStyles();

  // splits data objects into arrays with the same session id for that day
  var sessions = {};
  data.forEach(
    (e, i) => (
      (i = e.session), sessions[i] ? sessions[i].push(e) : (sessions[i] = [e])
    )
  );
  console.log(sessions);

  const handleFabClick = () => {
    console.log('clicked');
  };

  return (
    <React.Fragment>
      <div style={{ marginTop: '1rem' }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={2} justifyContent="center">
            {/* -------------------------   Calendar   --------------------------------- */}
            <Grid
              item
              container
              direction="column"
              xs={4}
              style={{
                top: theme.mixins.toolbar,
                position: 'sticky',
                marginTop: '2rem',
              }}
            >
              <Grid item>
                <Calendar date={selectedDate} onChange={setSelectedDate} />
              </Grid>
              <Grid item>Choose Your Athlete View</Grid>
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                maxHeight: '100vh',
                overflow: 'auto',
                marginTop: '2rem',
              }}
            >
              {/* ------- do mapping of uuid stuff here before giving the info off to coreview ------- */}
              <Fab
                classes={{ root: classes.fab }}
                color="secondary"
                onClick={handleFabClick}
              >
                <SystemUpdateIcon fontSize="large" />
              </Fab>
              {Object.keys(sessions).map(function (key, index) {
                return <CoreView key={key} data={sessions[key]} />;
              })}
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    </React.Fragment>
  );
};

export default ViewWorkout;

// {sessions['uuid'].map((item) => {
//   console.log(item.exerciseName);
//   return <CoreView />;
// })}

// Object.keys(sessions).map((item) => {
//   console.log(item);
// })

// setView((oldCell) => [
//   ...oldCell,
//   <CoreView key={item} data={sessions[item]} />,
// ]);

// setExerciseNameCell((oldCell) => [
//   ...oldCell,
//   <ExerciseNameCell
//     key={`exe${groupNumber}${cellNumber}${exerciseNameCounter}`}
//     unmountMe={dismissExerciseNameCell}
//     groupNumber={groupNumber}
//     cellNumber={cellNumber}
//     exercises={exercises}
//     coreCallback={coreCallback}
//     exerciseCellNumber={exerciseNameCounter}
//   />,
// ]);
