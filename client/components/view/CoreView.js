import React, { useState, useEffect } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  TextField,
  Input,
} from '@material-ui/core';
import ViewAnalytics from './ViewAnalytics';
import ResView1 from './ResView1';
import ResView2 from './ResView2';
import WarmView from './WarmView';
import WarmView2 from './WarmView2';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles, useMediaQuery } from '@material-ui/core';

import theme from '../../src/ui/theme';

// const data = [
//   {
//     id: '123',
//     exerciseName: 'back squat',
//     complex: [{ exercise: 'snatch', tally: 1 }],
//     sets: 1,
//     reps: [{ value: 6, tally: 0 }],
//     groupNumber: 1,
//     cellNumber: 1,
//     effort: [{ value: 60, tally: 0 }],
//     notes: ['Pause at Bottom'],
//     results: [],
//     checkmark: false,
//     userId: ['coachId', 'athleteId'],
//     session: 'uuid',
//     date: '2021-10-20T00:19:50.773Z',
//   },
//   {
//     id: '1234',
//     exerciseName: 'front squat',
//     complex: [{ exercise: 'snatch', tally: 1 }],
//     sets: 1,
//     reps: [{ value: 6, tally: 0 }],
//     groupNumber: 1,
//     cellNumber: 1,
//     effort: [{ value: 60, tally: 0 }],
//     notes: ['Pause at Bottom'],
//     results: [],
//     checkmark: false,
//     userId: ['coachId', 'athleteId'],
//     session: 'uuid2',
//     date: '2021-10-20T00:19:50.773Z',
//   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '1rem',
  },
  card: {
    width: '90%',
  },
  warmup: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
  typo: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const initialState = { edit: false };
const { useGlobalState } = createGlobalState(initialState);

const CoreView = ({
  data,
  bigData,
  userName,
  currentUser,
  exercises,
  dataResetCallback,
}) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(true); // true means coach is on, so show typo comp for journal
  const [journal, setJournal] = useState(data ? data[0].athleteNotes : '');
  const [edit, setEdit] = useGlobalState('edit');
  const [analytics, setAnalytics] = useState(false);
  const [counter, setCounter] = useState(0);
  const inputRef = React.useRef();

  const classes = useStyles();
  const matches = useMediaQuery('(min-width:880px)');

  useEffect(() => {
    if (data[0].coachInfo.library) {
      data[0].coachInfo.library.map((ele) => {
        exercises.includes(ele) ? void 0 : exercises.push(ele);
      });
    }
  }, []);

  const onJournalChange = (e) => {
    setJournal(e.target.value);

    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');
    var cellIndex = trainingSessionEdit.findIndex((obj) => obj.id == data.id);

    trainingSessionEdit.forEach((obj) => {
      obj.athleteNotes = e.target.value;
    });

    setLocalStorage('TrainingSessionEdit', trainingSessionEdit);
  };

  // Sort groupNumber and CellNumber - ascending!
  data.sort(function (a, b) {
    if (a.groupNumber === b.groupNumber) {
      return a.cellNumber - b.cellNumber;
    }
    return a.groupNumber - b.groupNumber;
  });

  const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  };

  const getLocalStorage = (key, initialValue) => {
    try {
      const value = localStorage.getItem(key);
      //console.log(`VALUE ${value}`);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      return initialValue;
    }
  };

  const viewAnalyticsCallback = () => {
    setAnalytics(!analytics);
  };

  // Sort CellNumber - ascending!
  // data.sort(function (a, b) {
  //   return a.cellNumber - b.cellNumber;
  // });

  // sort props with tally vars
  data.map((item) => {
    if (item.hasOwnProperty('results')) {
      item.results.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('reps')) {
      var objectKeys = Object.keys(item.reps);
      objectKeys.map((key) => {
        item.reps[key].data.sort(function (a, b) {
          return a.tally - b.tally;
        });
      });
    }
    if (item.hasOwnProperty('effort')) {
      item.effort.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('distance')) {
      item.distance.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('time')) {
      item.time.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('weight')) {
      item.weight.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('height')) {
      item.height.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('complex')) {
      item.complex.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
  });

  // journal entry controlling what a coach and athlete can view
  useEffect(() => {
    console.log(data);
    if (currentUser) {
      if (currentUser.userType === 'Coach') {
        setUser(true);
      } else {
        setUser(false);
      }
    }
  }, []);

  const dataResetCallback2 = () => {
    dataResetCallback();
  };

  const handleAnalytics = () => {
    setCounter(counter + 1);
    setAnalytics(!analytics);
  };

  const viewPage = (
    <React.Fragment>
      <Grid
        container
        justifyContent="center"
        style={{
          marginLeft: '2.3rem',
          marginBottom: '3rem',
          marginTop: '1rem',
        }}
      >
        <Grid item xs>
          {/* ------- This is a Group - start mapping data here ------- */}
          {/* ------- Make a condition or sort items, to look for items where cellnum and groupnum are the same ------- */}
          {/* ------- GroupNum and CellNum need to be sorted accordingly ------- */}

          <Card key={uuidv4()} className={classes.card}>
            <Grid container>
              <Grid
                item
                style={{ backgroundColor: theme.palette.primary.main }}
                xs={4}
              >
                <Button
                  onClick={handleAnalytics}
                  color="secondary"
                  variant="contained"
                  disableElevation
                >
                  Analytics
                </Button>
              </Grid>
              <Grid
                item
                style={{ backgroundColor: theme.palette.primary.main }}
                xs={4}
              >
                <Typography
                  variant="h6"
                  align="center"
                  classes={{ root: classes.typo }}
                >
                  {userName}
                </Typography>
              </Grid>
              <Grid
                item
                style={{ backgroundColor: theme.palette.primary.main }}
                xs={4}
              ></Grid>
            </Grid>
            <CardContent classes={{ root: classes.warmup }}>
              <Typography
                align="center"
                variant="h6"
                style={{ fontFamily: 'quicksand', fontWeight: 700 }}
              >
                Warm Up
              </Typography>
              {user ? (
                <Typography>{journal}</Typography>
              ) : (
                <Input
                  key={`${userName} textFieldInput`}
                  placeholder={'Journal Entry'}
                  autoFocus
                  value={journal}
                  onFocus={(e) =>
                    e.currentTarget.setSelectionRange(
                      e.currentTarget.value.length,
                      e.currentTarget.value.length
                    )
                  }
                  onChange={onJournalChange}
                  fullWidth
                  multiline
                  inputRef={inputRef}
                />
              )}
            </CardContent>

            <div>
              {data.map((cell, index) => {
                if (cell.groupNumber === 0) {
                  // need to start checking effort values to show appropriate viewCell

                  // are these values the same
                  const effort = cell.effort.every(
                    (val) => val.value === cell.effort[0].value
                  );

                  var objectKeys = Object.keys(cell.reps);
                  var reps;
                  objectKeys.map((key) => {
                    reps = cell.reps[key].data.every(
                      (val) => val.value === cell.reps[key].data[0].value
                    );
                  });

                  if (reps && effort === true && index === 10) {
                    return (
                      <div
                        key={`${index}${uuidv4()}`}
                        style={{
                          borderLeft: `1px solid ${theme.palette.secondary.main}`,
                          borderRight: `1px solid ${theme.palette.secondary.main}`,
                          borderBottom: `1px solid ${theme.palette.secondary.main}`,
                          borderRadius: '4px',
                        }}
                      >
                        <ResView1
                          key={uuidv4}
                          data={cell}
                          exercises={exercises}
                          dataResetCallback={dataResetCallback}
                          bigData={bigData}
                          journal={journal}
                        />
                      </div>
                    );
                  } else {
                    var views = [];
                    for (let index = 0; index < cell.sets; index++) {
                      views.push(1);
                    }

                    cell['views'] = views;

                    return (
                      <div
                        key={`${index}${uuidv4()}`}
                        style={{
                          borderLeft: `1px solid ${theme.palette.secondary.main}`,
                          borderRight: `1px solid ${theme.palette.secondary.main}`,
                          borderBottom: `1px solid ${theme.palette.secondary.main}`,
                          borderRadius: '4px',
                        }}
                      >
                        <ResView2
                          key={uuidv4()}
                          data={cell}
                          exercises={exercises}
                          dataResetCallback={dataResetCallback}
                          bigData={bigData}
                          journal={journal}
                        />
                      </div>
                    );
                  }
                }
              })}
            </div>
            <CardContent classes={{ root: classes.warmup }}>
              <Typography
                align="center"
                variant="h6"
                style={{ fontFamily: 'quicksand', fontWeight: 700 }}
              >
                Core Workout
              </Typography>
            </CardContent>
            <div>
              {data.map((cell, index) => {
                if (cell.groupNumber > 0) {
                  const effort = cell.effort.every(
                    (val) => val.value === cell.effort[0].value
                  );

                  var objectKeys = Object.keys(cell.reps);
                  var reps;
                  objectKeys.map((key) => {
                    reps = cell.reps[key].data.every(
                      (val) => val.value === cell.reps[key].data[0].value
                    );
                  });

                  if (reps && effort === true && index === 10) {
                    return (
                      <div
                        key={`${index}${uuidv4()}`}
                        style={{
                          borderLeft: `1px solid ${theme.palette.secondary.main}`,
                          borderRight: `1px solid ${theme.palette.secondary.main}`,
                          borderBottom: `1px solid ${theme.palette.secondary.main}`,
                          borderRadius: '4px',
                        }}
                      >
                        <ResView1
                          key={uuidv4()}
                          data={cell}
                          exercises={exercises}
                          dataResetCallback={dataResetCallback}
                          bigData={bigData}
                          journal={journal}
                        />
                      </div>
                    );
                  } else {
                    var views = [];
                    for (let index = 0; index < cell.sets; index++) {
                      views.push(1);
                    }

                    cell['views'] = views;

                    return (
                      <div
                        key={`${index}${uuidv4()}`}
                        style={{
                          borderLeft: `1px solid ${theme.palette.secondary.main}`,
                          borderRight: `1px solid ${theme.palette.secondary.main}`,
                          borderBottom: `1px solid ${theme.palette.secondary.main}`,
                          borderRadius: '4px',
                        }}
                      >
                        <ResView2
                          key={uuidv4()}
                          data={cell}
                          exercises={exercises}
                          dataResetCallback={dataResetCallback}
                          bigData={bigData}
                          journal={journal}
                        />
                      </div>
                    );
                  }
                }
              })}
            </div>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div
        style={{
          visibility: analytics ? 'hidden' : 'visible',
          height: analytics ? 0 : matches ? '100%' : '65%',
          width: analytics ? 0 : '100%',
        }}
      >
        {viewPage}
      </div>
      <div>
        {analytics ? (
          <div>
            <ViewAnalytics
              exercises={exercises}
              data={data}
              viewAnalyticsCallback={viewAnalyticsCallback}
              counter={counter}
            />
          </div>
        ) : (
          void 0
        )}
      </div>
    </React.Fragment>
  );
};

export default CoreView;

{
  /* <TextField
                  multiline
                  value={journal}
                  onChange={onJournalChange}
                  variant="filled"
                  fullWidth
                /> */
}
