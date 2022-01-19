import {
  Box,
  CardContent,
  Divider,
  makeStyles,
  TextField,
  Chip,
  InputLabel,
  Input,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import Link from '../../src/ui/Link';
import { Fab } from '@material-ui/core';
import FitnessIcon from '@material-ui/icons/FitnessCenter';
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardActions } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import theme from '../../src/ui/theme';
import { Typography } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { MuiPickersUtilsProvider, Calendar } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import GroupCell from '../../components/workout/GroupCell';
import WarmUpCell from '../../components/workout/WarmUp';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../../src/fire';
import PreAnalytics from '../../components/workout/PreAnalytics';
import StackedBarChart from '../../components/analytics/StackedBarChart';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 100,
    height: '4.3rem',
    marginBottom: '1rem',
  },
  cardHeader: {
    height: '1rem',
    paddingBottom: '0.6rem',
  },
  dropDown: {
    transform: 'rotate(0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  dropdownOpen: {
    marginRight: 'auto',
    marginLeft: 'auto',
    transform: 'rotate(180deg)',
  },
  dropdownClosed: {
    transform: 'rotate(0)',
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  warmup: {
    backgroundColor: theme.palette.primary.main,
    height: '3rem',
    borderRadius: '4px',
    paddingTop: '0.5rem',
  },
  textField: {
    paddingTop: 0,
    paddingBottom: 0,
    width: 50,
    height: '10px',
  },
  list: {
    padding: 0,

    '& .MuiListItem-root': {
      borderRadius: '4px',
    },
  },
  listItem: {
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.8,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      opacity: 1,
    },
  },
  grid: {
    marginTop: '1rem',
  },
  groupContainer: {
    marginTop: '1rem',
  },
  day: {
    color: theme.palette.secondary.main,
  },
  fab: {
    margin: 0,
    zIndex: 1000,
    bottom: 50,
    right: 20,
    left: 'auto',
    position: 'fixed',
  },
  statsList: {
    padding: 0,
    right: '0.086rem',
    position: 'fixed',
    zIndex: 1300,
    backgroundColor: theme.palette.primary.main,
  },
  statsListTypo: {
    marginLeft: '0.5rem',
    fontWeight: 700,
    fontFamily: 'Quicksand',
    fontSize: 16,
  },
  statsListText: {
    margin: 0,
  },
  divPadding: {
    marginBottom: '1.5rem',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

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

async function getExercises(db) {
  const exerciseCol = collection(db, '/ExerciseProps');
  const exerciseSnapshot = await getDocs(exerciseCol);
  const exerciseList = exerciseSnapshot.docs.map((doc) => doc.data());

  return exerciseList;
}

const Dashboard = ({ exercises }) => {
  const [group, setGroup] = useState([]);
  const [analytics, setAnalytics] = useState(false);
  const [groupCounter, setGroupCounter] = useState(2);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [aggreReps, setAggreReps] = useState(0);
  const [aggreHeight, setAggreHeight] = useState(0);
  const [aggreWeight, setAggreWeight] = useState(0);
  const [aggreTime, setAggreTime] = useState(0);
  const [aggreEffort, setAggreEffort] = useState(0);
  const [aggreDistance, setAggreDistance] = useState(0);
  const [aggreDuration, setAggreDuration] = useState(0);
  const [aggreSets, setAggreSets] = useState(0);
  const [renderChild, setRenderChild] = useState(true);
  const [keys, setKeys] = useState([]);
  const [personName, setPersonName] = useState([]);
  const [teamName, setTeamName] = useState([]);
  var totalSets = 0;

  const classes = useStyles();

  // exercises.map((exercise) => {
  //   console.log(exercise.ExerciseName);
  // });

  // First initialization of trainingSession

  // comes from coaches account
  const athleteNames = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  const teamNames = [
    'Soccer (M)',
    'Soccer (F)',
    'Hockey (F)',
    'Hockey (M)',
    'FootBall',
    'Rugby (M)',
    'Rugby (F)',
  ];

  function getPersonStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  function getTeamStyles(name, teamName, theme) {
    return {
      fontWeight:
        teamName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const trainingSession = {
    trainingSession: [],
    // this is where we want those aggregate stats
  };

  // {
  //   groupNumber: 1,
  //   cellNumber: 1,
  // },

  const keysInit = [];

  // Brings analytics page to view
  const analyticsCallback = (analytics) => {
    setAnalytics(analytics);
  };

  // Handles static analytics logic on dashboard top
  const callback = (exercise) => {
    var reps = 0;
    var height = 0;
    var weight = 0;
    var time = 0;
    var distance = 0;
    var duration = 0;
    var avgEffort = 0;
    var sets = 0;
    var items = 0;
    totalSets = 0;

    // signal has been sent from the child components
    // to tell the parent to calculate the total aggregate stats
    // of the entire training Program

    const trainingSession2 = getLocalStorage('TrainingSession', 'value');
    console.log(trainingSession2);
    // thinking if putting total avg effort into local storage for body2 to use
    trainingSession2.trainingSession.forEach((item) => {
      //sets = item.sets; // need to think alot more about handling sets and averages
      items += 1;
      if (item.hasOwnProperty('reps')) {
        reps += parseInt(item.reps.calculation);
      }
      if (item.hasOwnProperty('height')) {
        height += parseInt(item.height.calculation);
      }
      if (item.hasOwnProperty('weight')) {
        weight += parseInt(item.weight.calculation);
      }
      if (item.hasOwnProperty('time')) {
        time += parseInt(item.time.calculation);
      }
      if (item.hasOwnProperty('distance')) {
        distance += parseInt(item.distance.calculation);
      }
      if (item.hasOwnProperty('duration')) {
        duration += parseInt(item.duration.calculation);
      }
      if (item.hasOwnProperty('effort')) {
        sets += parseInt(item.sets); // increment sets by one time effort exists in the aggregation, needed to make the avgEffort calc work
        avgEffort += parseInt(item.effort.calculation);
      }
      if (item.hasOwnProperty('sets')) {
        totalSets += parseInt(item.sets);
      }
    });

    trainingSession2['totalReps'] = reps;
    trainingSession2['totalSets'] = totalSets;
    trainingSession2['totalHeight'] = height;
    trainingSession2['totalDuration'] = duration;
    trainingSession2['totalDistance'] = distance;
    trainingSession2['totalTime'] = time;
    trainingSession2['totalWeight'] = weight;

    if (sets > 0) {
      var avg = avgEffort / items;
      setAggreEffort(avg.toFixed(2));
      trainingSession2['averageEffort'] = avg.toFixed(2);
    }

    // append Date - maybe convert to ISO date!
    trainingSession2['date'] = selectedDate.toISOString();

    // Total aggregate session stats
    setAggreReps(reps);
    setAggreSets(totalSets);
    setAggreTime(time);
    setAggreWeight(weight);
    setAggreHeight(height);
    setAggreDistance(distance);
    setAggreDuration(duration);
    // need to think about effort!

    // append aggregate values to trainingSession object
    setLocalStorage('TrainingSession', trainingSession2);
  };

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

  const trainingSessionInitialization = () => {
    console.log('Training Session Object initialized!!!!!');
    setLocalStorage('TrainingSession', trainingSession);
    setLocalStorage('keys2', keysInit); // for the coreCells - for deleting purposes
    setLocalStorage('keys', keysInit); // for the groupCells - for deleting purposes
    setLocalStorage('exekeys', keysInit); // for the ExerciseNameCell keys - for deleting purposes
  };

  const dismiss = (data) => {
    console.log('dismissed!!!');
    console.log(data.groupNumber);

    // delete groupNumber from locale storage
    const keys2 = getLocalStorage('keys', []);
    //keys2.filter((item) => item !== data.groupNumber);
    keys2.splice(keys2.indexOf(data.groupNumber), 1);
    setKeys(keys2);
    setLocalStorage('keys', keys2);

    //setRenderChild(false);
    // no over here you need to remove the key from the state array
  };

  const onClickGroup = () => {
    setGroupCounter(groupCounter + 1);
    //change key var to arr and put in locale storage and manage there
    const keys2 = getLocalStorage('keys', []);
    console.log(keys2);
    if (keys2.length == 0) {
      // making sure if nothing is there to add item in array
      keys2.push(groupCounter);
      setKeys(keys2);
      setLocalStorage('keys', keys2);
    } else {
      // items are already in the array so just push them in
      keys2.push(groupCounter);
      setKeys(keys2);
      setLocalStorage('keys', keys2);
    }

    setGroup((oldGroup) => [
      ...oldGroup,
      <div key={groupCounter} className={classes.groupContainer}>
        <GroupCell
          key={groupCounter}
          exercises={exercises}
          groupNumber={groupCounter}
          createCallback={callback}
          unmountMe={dismiss}
        />
      </div>,
    ]);
    console.log(`group num is ${groupCounter}`);
  };

  const onClickFab = () => {
    console.log('Clicked Fab!');
    const trainingSession = getLocalStorage('TrainingSession', 'value');
    setLocalStorage('TrainingSessionAnalytics', trainingSession);
  };

  const onClickAnalytics = () => {
    // switch for pre analytics page pop up
    setAnalytics(!analytics);
  };

  const handlePersonChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleTeamChange = (event) => {
    setTeamName(event.target.value);
  };

  useEffect(() => {
    // after a new date is changed reset groupCells
    console.log(selectedDate.toISOString());
    // just looking at how to parse the date object
    const isoDate = selectedDate.toISOString();
    const idate = new Date(isoDate);
    const year = idate.getFullYear();
    var month = idate.getMonth() + 1;
    var dt = idate.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    console.log(year + '-' + month + '-' + dt);
    setGroup((oldCell) => []);
    setGroupCounter(1);
    // reset calculations and trainingSession object
    trainingSessionInitialization();
    setAggreReps(0);
    setAggreSets(0);
    setAggreTime(0);
    setAggreWeight(0);
    setAggreHeight(0);
    setAggreDistance(0);
    setAggreDuration(0);
    setAggreEffort(0);
  }, [selectedDate]);

  useEffect(() => {
    // Should only be initialized once
    trainingSessionInitialization();
  }, []);

  useEffect(() => {
    setAggreSets(aggreSets);
  }, [aggreSets]);

  const workoutCreation = (
    <React.Fragment>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <React.Fragment>
            <List classes={{ root: classes.statsList }}>
              <ListItem classes={{ root: classes.statsList }}>
                {/* -------------------------   Static Analytics   --------------------------------- */}
                {aggreSets ? (
                  <ListItemText
                    primary={`Total Sets: ${aggreSets}`}
                    classes={{
                      root: classes.statsListText,
                      primary: classes.statsListTypo,
                    }}
                  />
                ) : (
                  void 0
                )}
                {aggreReps ? (
                  <ListItemText
                    primary={`Volume: ${aggreReps}`}
                    classes={{
                      root: classes.statsListText,
                      primary: classes.statsListTypo,
                    }}
                  />
                ) : (
                  void 0
                )}
                {aggreTime ? (
                  <ListItemText
                    primary={`Total Time: ${aggreTime}`}
                    classes={{
                      root: classes.statsListText,
                      primary: classes.statsListTypo,
                    }}
                  />
                ) : (
                  void 0
                )}
                {aggreDuration ? (
                  <ListItemText
                    primary={`Total Duration: ${aggreDuration}`}
                    classes={{
                      root: classes.statsListText,
                      primary: classes.statsListTypo,
                    }}
                  />
                ) : (
                  void 0
                )}
                {aggreDistance ? (
                  <ListItemText
                    primary={`Total Distance: ${aggreDistance}`}
                    classes={{
                      root: classes.statsListText,
                      primary: classes.statsListTypo,
                    }}
                  />
                ) : (
                  void 0
                )}
                {aggreWeight ? (
                  <ListItemText
                    primary={`Total Weight: ${aggreWeight}`}
                    classes={{
                      root: classes.statsListText,
                      primary: classes.statsListTypo,
                    }}
                  />
                ) : (
                  void 0
                )}
                {aggreHeight ? (
                  <ListItemText
                    primary={`Total Height: ${aggreHeight}`}
                    classes={{
                      root: classes.statsListText,
                      primary: classes.statsListTypo,
                    }}
                  />
                ) : (
                  void 0
                )}
                {aggreEffort ? (
                  <ListItemText
                    primary={`Total Avg Effort: ${aggreEffort}`}
                    classes={{
                      root: classes.statsListText,
                      primary: classes.statsListTypo,
                    }}
                  />
                ) : (
                  void 0
                )}
              </ListItem>
            </List>
            {/* -------------------------   Pre Analytics   --------------------------------- */}
            <div className={classes.divPadding} />
            <Grid container spacing={2}>
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
                  <Grid container justifyContent="center">
                    <Typography
                      textAlign="center"
                      style={{
                        marginTop: '0.5rem',
                        fontFamily: 'quicksand',
                        fontWeight: 700,
                      }}
                    >
                      Athlete Select
                    </Typography>
                    <Grid item xs={10}>
                      <Select
                        labelId="mutiple-chip-label"
                        id="mutiple-chip"
                        multiple
                        value={personName}
                        onChange={handlePersonChange}
                        input={<Input id="select-multiple-chip" fullWidth />}
                        renderValue={(selected) => (
                          <div className={classes.chips}>
                            {selected.map((value) => (
                              <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                                color="secondary"
                              />
                            ))}
                          </div>
                        )}
                        MenuProps={MenuProps}
                      >
                        {athleteNames.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getPersonStyles(name, personName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Typography
                      textAlign="center"
                      style={{
                        marginTop: '0.5rem',
                        fontFamily: 'quicksand',
                        fontWeight: 700,
                      }}
                    >
                      Team Select
                    </Typography>
                    <Grid item xs={10}>
                      <Select
                        labelId="team-chip-label"
                        id="team-mutiple-chip"
                        multiple
                        value={teamName}
                        onChange={handleTeamChange}
                        input={<Input id="multiple-chip" fullWidth />}
                        renderValue={(selected) => (
                          <div className={classes.chips}>
                            {selected.map((value) => (
                              <Chip
                                key={value}
                                label={value}
                                className={classes.chip}
                                color="secondary"
                              />
                            ))}
                          </div>
                        )}
                        MenuProps={MenuProps}
                      >
                        {teamNames.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getTeamStyles(name, teamName, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
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
                <Fab
                  classes={{ root: classes.fab }}
                  color="secondary"
                  onClick={onClickAnalytics}
                >
                  <FitnessIcon />
                </Fab>
                {/* --------------------  Warm Up  ------------------- */}
                <Card
                  style={{
                    marginBottom: '1.5rem',
                  }}
                >
                  <CardContent classes={{ root: classes.warmup }}>
                    <Typography
                      align="center"
                      variant="h5"
                      style={{ fontFamily: 'quicksand', fontWeight: 700 }}
                    >
                      Warm Up
                    </Typography>
                  </CardContent>
                  <WarmUpCell
                    createCallback={callback}
                    exercises={exercises}
                    selectedDate={selectedDate}
                  />
                </Card>
                <CardContent classes={{ root: classes.warmup }}>
                  <Typography
                    align="center"
                    variant="h5"
                    style={{ fontFamily: 'quicksand', fontWeight: 700 }}
                  >
                    Core Workout
                  </Typography>
                </CardContent>
                {keys
                  ? group.map((group) => {
                      // push the keys into a piece of state
                      // in dismiss do a switch case and check the groupNumber coming in
                      // against the keys pushed, if it matches do something (turn a switch or something)
                      const keys2 = getLocalStorage('keys', []);
                      return (
                        // allows me to delete and render the group components -- big win
                        <div key={group.key}>
                          {keys.includes(parseInt(group.key)) ? group : null}
                        </div>
                      );
                    })
                  : null}
                <List className={classes.list} style={{ marginTop: '2rem' }}>
                  <ListItem
                    key={'button3'}
                    button
                    className={classes.listItem}
                    alignItems="center"
                    onClick={onClickGroup}
                  >
                    <Typography
                      style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    >
                      Add Group
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </React.Fragment>
        </MuiPickersUtilsProvider>
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div
        style={{
          visibility: analytics ? 'hidden' : 'visible',
          height: analytics ? 0 : '100%',
          width: analytics ? 0 : '100%',
        }}
      >
        {workoutCreation}
      </div>
      <div>
        {analytics ? (
          <div>
            <PreAnalytics
              analyticsCallback={analyticsCallback}
              value={analytics}
              exercises={exercises}
            />
          </div>
        ) : (
          void 0
        )}
      </div>
    </React.Fragment>
  );
};

// get initialProps to render components info from pre analytics

Dashboard.getInitialProps = async (ctx) => {
  const db = getFirestore(app);

  // fetch exercises from firebase
  const exercises = await getExercises(db).then((doc) => {
    return doc;
  });

  return { exercises: exercises };
};

export default Dashboard;
