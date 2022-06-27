import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  Calendar,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  Grid,
  CardContent,
  Typography,
  Select,
  Input,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  useMediaQuery,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../../src/fire';
import { Fab } from '@material-ui/core';
import theme from '../../src/ui/theme';
import axios from 'axios';

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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  listItem: {
    height: '100%',
    borderRadius: '6px',
    padding: 0,
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
    '&:hover': {
      backgroundColor: '#0faf8f',
    },
  },
  inputCenter: {
    textAlign: 'center',
    fontFamily: 'quicksand',
    fontWeight: 700,
  },
  divPadding: {
    marginBottom: '1.5rem',
  },
  warmup: {
    backgroundColor: theme.palette.primary.main,
    height: '3rem',
    borderRadius: '4px',
    paddingTop: '0.5rem',
  },
  warmup2: {
    backgroundColor: theme.palette.primary.main,
    height: '3rem',
    minWidth: '24rem',
    borderRadius: '4px',
    paddingTop: '0.5rem',
  },
}));

// For multiple Select of athletes
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

async function getExercises(db) {
  const exerciseCol = collection(db, '/ExerciseProps');
  const exerciseSnapshot = await getDocs(exerciseCol);
  const exerciseList = exerciseSnapshot.docs.map((doc) => doc.data());

  return exerciseList;
}

const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
};

const resultsInitialization = () => {
  console.log('results Object initialized!!!!!');
  setLocalStorage('results', []);
};

var sessions = {};
var coreView;

const ViewWorkout = ({ userInfo, currentUser, exercises }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [personName, setPersonName] = useState('');
  const [athleteIds, setAthleteIds] = useState([]);
  const [data, setData] = useState([]);
  const [snack, setSnack] = useState(false);
  const [updateView, setUpdateView] = useState(0);
  const [viewUpdater, setViewUpdater] = useState(false);

  const matches = useMediaQuery('(min-width:880px)');

  console.log(userInfo);

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

  const athleteSelection = [`${userInfo.userName} - ${userInfo.discipline}`];

  userInfo.rosterInd.map((names) => {
    athleteSelection.push(`${names.userName} - ${names.discipline}`);
  });

  const handlePersonChange = (event) => {
    setPersonName(event.target.value);
  };

  const dataBeta = [
    {
      id: '123',
      exerciseName: 'back squat',
      exerciseName2: ['back squat'],
      exerciseNameFinal: [{ value: 'back squat', tally: 0 }],
      sets: 2,
      groupNumber: 0,
      cellNumber: 3,
      effort: [
        { value: 60, tally: 0 },
        { value: 60, tally: 1 },
      ],
      effortOption: 'Percent (%)',
      coachNotes: 'Pause at Bottom',
      athleteNotes: 'Was feeling like shit',
      results: [
        { value: 0, tally: 0 },
        { value: 0, tally: 1 },
      ],
      checkmark: false,
      athleteId: '567',
      coachId: '789',
      userName: 'John Doe',
      measurement: 'kg',
      session: 'uuid',
      date: '2021-10-20T00:19:50.773Z',
      range: false,
      reps: {
        'back squat': {
          data: [
            { value: 6, tally: 0 },
            { value: 6, tally: 1 },
          ],
        },
      },
      coachInfo: { discipline: 'Soccer', id: '123dhsj' },
    },
    {
      id: '1234',
      exerciseName: 'back squat',
      exerciseName2: ['front squat', 'back squat'],
      exerciseNameFinal: [
        { value: 'back squat', tally: 1 },
        { value: 'front squat', tally: 0 },
      ],
      sets: 2,
      groupNumber: 0,
      cellNumber: 2,
      effort: [
        { value: 60, tally: 0 },
        { value: 61, tally: 1 },
      ],
      effortOption: 'Percent (%)',
      coachNotes: 'Pause at Bottom',
      athleteNotes: 'Was feeling like shit',
      results: [
        { value: 0, tally: 0 },
        { value: 0, tally: 1 },
      ],
      checkmark: false,
      athleteId: '567',
      coachId: '789',
      userName: 'John Doe',
      measurement: 'kg',
      session: 'uuid',
      date: '2021-10-20T00:19:50.773Z',
      range: false,
      reps: {
        'front squat': {
          data: [
            { value: 8, tally: 0 },
            { value: 6, tally: 1 },
          ],
        },
        'back squat': {
          data: [
            { value: 7, tally: 0 },
            { value: 6, tally: 1 },
          ],
        },
      },
      coachInfo: { discipline: 'Soccer', id: '123djksj' },
    },
    {
      id: '12345',
      exerciseName: 'front squat',
      exerciseName2: ['front squat', 'back squat'],
      exerciseNameFinal: [
        { value: 'front squat', tally: 0 },
        { value: 'back squat', tally: 1 },
      ],
      sets: 2,
      groupNumber: 1,
      cellNumber: 1,
      effort: [
        { value: 60, tally: 0 },
        { value: 60, tally: 1 },
      ],
      effortRange: [
        { min: 0.3, max: 0.5, tally: 0 },
        { min: 0.5, max: 0.8, tally: 1 },
      ],
      effortOption: 'Speed (m/s)',
      coachNotes: 'Pause at Bottom',
      athleteNotes: 'Was feeling like shit',
      results: [
        // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
        { value: 100, tally: 0, metric: 0.46 },
        { value: 120, tally: 1, metric: 0.55 },
      ],
      checkmark: false,
      athleteId: '567',
      coachId: '789',
      userName: 'John Doe',
      measurement: 'kg',
      session: 'uuid2',
      date: '2021-10-20T00:19:50.773Z',
      range: true,
      reps: {
        'front squat': {
          data: [
            { value: 6, tally: 0 },
            { value: 7, tally: 1 },
          ],
        },
        'back squat': {
          data: [
            { value: 4, tally: 0 },
            { value: 5, tally: 1 },
          ],
        },
      },
      coachInfo: { discipline: 'Soccer', id: '123dhhh' },
    },
  ];

  useEffect(() => {
    var bufferIds = [];

    if (
      `${userInfo.userName} - ${userInfo.discipline}` === personName &&
      currentUser.userType === 'Coach'
    ) {
      bufferIds.push(userInfo.userId);
    } else {
      userInfo.rosterInd.forEach((ind) => {
        if (`${ind.userName} - ${ind.discipline}` === personName) {
          bufferIds.push(ind.userId);
        }
      });
    }

    setAthleteIds((oldIds) => [...[...new Set(bufferIds)]]);
    console.log([personName]);
  }, [personName]);

  useEffect(() => {
    console.log(athleteIds);
  }, [athleteIds]);

  useEffect(() => {
    // Should only be initialized once
    resultsInitialization();
  }, []);

  // Add exercises from coaches library
  useEffect(() => {
    if (userInfo.library) {
      userInfo.library.map((ele) => {
        exercises.push(ele);
      });
    }
  }, []);

  useEffect(() => {
    //intialize trainingSessionEdit
    console.log('trainingSessionEdit initialized');
    setLocalStorage('TrainingSessionEdit', []);
  }, []);

  const classes = useStyles();

  const dataResetCallback = (theData) => {
    console.log('data reset');
    console.log(theData);
    setSnack(true);
    setData([]);

    setTimeout(() => {
      setData(theData.data);
      setUpdateView(updateView + 1);
      setViewUpdater(!viewUpdater);
    }, 1);
  };

  // splits data objects into arrays with the same session id for that day

  useEffect(() => {
    sessions = {};
    data.forEach(
      (e, i) => (
        (i = e.session), sessions[i] ? sessions[i].push(e) : (sessions[i] = [e])
      )
    );
    console.log('sessions');
    setUpdateView(updateView + 1);
  }, [data.length, data]);

  useEffect(() => {
    if (currentUser.userType === 'Athlete') {
      setAthleteIds((old) => [...old, userInfo.userId]);
    }
  }, []);

  const handleFabClick = () => {
    console.log('clicked');

    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');
    console.log(trainingSessionEdit);
    //console.log(dataBeta);

    // update ui
    setTimeout(() => {
      setData(trainingSessionEdit);
      setUpdateView(updateView + 1);
      setViewUpdater(!viewUpdater);
    }, 1);

    trainingSessionEdit.forEach((exercise) => {
      axios
        .put(`/api/exercise/${exercise.id}`, {
          exerciseName: exercise.exerciseName,
          exerciseName2: exercise.exerciseName2,
          exerciseNameFinal: exercise.exerciseNameFinal,
          groupNumber: exercise.groupNumber,
          cellNumber: exercise.cellNumber,
          userName: exercise.userName,
          sets: exercise.sets,
          reps: exercise.reps,
          effort: exercise.effort,
          effortRange: exercise.effortRange,
          range: exercise.range,
          effortOption: exercise.effortOption,
          athleteId: exercise.athleteId,
          session: exercise.session,
          date: exercise.date,
          athleteNotes: exercise.athleteNotes,
          coachNotes: exercise.coachNotes,
          measurement: exercise.measurement,
          results: exercise.results,
          coachInfo: exercise.coachInfo,
        })
        .then((res) => {
          //console.log(res.data.url);
          //console.log(res);
          console.log('success');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleSubmit = () => {
    console.log('Submitted');
    //setData(dataBeta);
    //doRequest();

    axios
      .post(`/api/exercise/index`, {
        athleteIds: athleteIds,
        fromDate: new Date(selectedDate.setHours(0, 0, 0, 0)),
        toDate: new Date(selectedDate.setHours(23, 59, 59, 999)),
      })
      .then((res) => {
        //console.log(res.data.url);
        console.log(res);
        setData(res.data[1]);
        //setData(dataBeta);
        //setLocalStorage('TrainingSessionEdit', dataBeta);
        setLocalStorage('TrainingSessionEdit', res.data[1]);
        console.log(res);
        // this goes on the onSuccess portion of doRequest
        setTimeout(() => {
          setUpdateView(updateView + 1);
          setViewUpdater(!viewUpdater);
        }, 100);
      })
      .catch((err) => {
        console.log(err);
      });
    //setLocalStorage('TrainingSessionEdit', dataBeta); // goes in onSuccess from server
  };

  const handleSnackClose = () => {
    setSnack(false);
  };

  useEffect(() => {
    console.log('update');
    console.log(sessions);
    coreView = Object.keys(sessions).map(function (key, index) {
      return (
        <CoreView
          key={key}
          data={sessions[key]}
          bigData={data}
          userName={sessions[key][0].userName}
          currentUser={currentUser}
          exercises={exercises}
          dataResetCallback={dataResetCallback}
        />
      );
    });
  }, [updateView]);

  // this useEffect will be used everywhere for identification for coaches payment status
  // send to subscription page if status on Stripe is not active
  useEffect(() => {
    // if user signed in
    if (currentUser) {
      // if (currentUser.userType === 'Coach') {
      //   // now validate stripe subscription
      //   if (customerStripe !== '') {
      //     if (customerStripe.subscriptions.data[0].status !== 'active') {
      //       Router.push('/payment/subscription');
      //     }
      //   } else {
      //     Router.push('/payment/subscription');
      //   }
      // }
    } else if (!currentUser) {
      Router.push('/auth/signin');
    }
  }, []);

  const normalView = (
    <React.Fragment>
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
            <Calendar
              date={selectedDate}
              onChange={setSelectedDate}
              allowKeyboardControl={false}
            />
          </Grid>
          <Grid item>
            {currentUser.userType === 'Coach' ? (
              <Grid>
                <Grid item>
                  <CardContent classes={{ root: classes.warmup }}>
                    <Typography
                      align="center"
                      variant="h5"
                      style={{
                        fontFamily: 'quicksand',
                        fontWeight: 700,
                      }}
                    >
                      Choose Athletes
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item>
                  <Typography align="center" variant="h6">
                    {' '}
                    Athlete Select
                  </Typography>
                  <Select
                    value={personName}
                    onChange={handlePersonChange}
                    input={
                      <Input
                        id="select"
                        fullWidth
                        classes={{ input: classes.inputCenter }}
                      />
                    }
                    MenuProps={MenuProps}
                  >
                    {athleteSelection.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item style={{ marginTop: '2rem' }}></Grid>
              </Grid>
            ) : (
              void 0
            )}
          </Grid>
          <List aria-label="Chart options" classes={{ root: classes.list }}>
            <ListItem
              button
              key={'options'}
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label="Chart"
              onClick={handleSubmit}
              classes={{ button: classes.listItem }}
              disableGutters
            >
              <ListItemText
                primary={'Submit'}
                primaryTypographyProps={{ align: 'center' }}
              />
            </ListItem>
          </List>
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
          {viewUpdater ? coreView : coreView}
        </Grid>
      </Grid>
    </React.Fragment>
  );

  const mobileView = (
    <React.Fragment>
      <div className={classes.divPadding} />
      <Grid
        container
        justifyContent="center"
        style={{ top: theme.mixins.toolbar }}
        direction="column"
      >
        <Grid container item justifyContent="center">
          <div style={{ marginTop: '2rem' }}>
            <KeyboardDatePicker
              autoOk
              className={classes.root2}
              variant="inline"
              format="dd/MM/yyyy"
              views={['year', 'month', 'date']}
              inputVariant="outlined"
              value={selectedDate}
              InputAdornmentProps={{ position: 'start' }}
              onChange={(date) => setSelectedDate(date)}
              label={'Select Date'}
            />
          </div>{' '}
        </Grid>
        {currentUser.userType === 'Coach' ? (
          <Grid container item justifyContent="center">
            <div style={{ marginTop: '2rem' }}>
              <Grid>
                <Grid item>
                  <CardContent classes={{ root: classes.warmup }}>
                    <Typography
                      align="center"
                      variant="h5"
                      style={{
                        fontFamily: 'quicksand',
                        fontWeight: 700,
                      }}
                    >
                      Choose Athletes
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item>
                  <Typography align="center" variant="h6">
                    {' '}
                    Athlete Select
                  </Typography>
                  <Select
                    value={personName}
                    onChange={handlePersonChange}
                    input={
                      <Input
                        id="select"
                        fullWidth
                        classes={{ input: classes.inputCenter }}
                      />
                    }
                    MenuProps={MenuProps}
                  >
                    {athleteSelection.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </div>
          </Grid>
        ) : (
          void 0
        )}
        <Grid container item justifyContent="center">
          <div style={{ marginTop: '2rem', width: '14rem' }}>
            <List aria-label="Chart options" classes={{ root: classes.list }}>
              <ListItem
                button
                key={'options'}
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="Chart"
                onClick={handleSubmit}
                classes={{ button: classes.listItem }}
                disableGutters
              >
                <ListItemText
                  primary={'Submit'}
                  primaryTypographyProps={{ align: 'center' }}
                />
              </ListItem>
            </List>
          </div>
        </Grid>
        <Grid container item justifyContent="center">
          <div>{viewUpdater ? coreView : coreView}</div>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div style={{ marginTop: '1rem' }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {matches ? normalView : mobileView}
          <Fab
            classes={{ root: classes.fab }}
            color="secondary"
            onClick={handleFabClick}
          >
            <Typography variant="h6">Save</Typography>
          </Fab>
          <Snackbar
            open={snack}
            autoHideDuration={6000}
            onClose={handleSnackClose}
          >
            <Alert severity="info">
              Remember to click the save button, to save your changes!
            </Alert>
          </Snackbar>
        </MuiPickersUtilsProvider>
      </div>
    </React.Fragment>
  );
};

ViewWorkout.getInitialProps = async (ctx, client, currentUser) => {
  const db = getFirestore(app);

  // fetch exercises from firebase
  const exercises = await getExercises(db).then((doc) => {
    return doc;
  });
  // fetch user roster

  var userData;
  // fetch coaches roster
  if (!currentUser) {
    userData = [{ id: '', rosterTeam: [], rosterInd: [], rosterSearch: [] }];
  } else {
    const { data } = await client.get(`/api/athletic/${currentUser.id}`);
    userData = data;
  }

  return { userInfo: userData[0], currentUser, exercises: exercises };
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
