import React, { useEffect, useState } from 'react';
import { Card, makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, Calendar } from '@material-ui/pickers';
import {
  Grid,
  ListItemIcon,
  CardContent,
  Typography,
  Select,
  Chip,
  Input,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Fab } from '@material-ui/core';
import { coach1 } from '../analytics/MockCoach';
import useRequest from '../../hooks/use-request';
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

var sessions = {};
var coreView;

const ViewWorkout = ({ userInfo, currentUser }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [personName, setPersonName] = useState('');
  const [data, setData] = useState([]);
  const [updateView, setUpdateView] = useState(0);
  const [viewUpdater, setViewUpdater] = useState(false);

  // const { doRequest, errors } = useRequest({
  //   url: '/api/exercise', // happening in the browser!
  //   method: 'get',
  //   body: { athleteIds: [personName], fromDate: selectedDate, toDate: selectedDate },
  //   onSuccess: (data) => console.log('We got the date from the server!'), // increment updateDataCounter here!
  // });

  const athleteSelection = [
    // populate this with rosterInd names - coachInfo
  ];

  coach1.rosterInd.map((names) => {
    athleteSelection.push(`${names.userName} - ${names.discipline}`);
  });

  const handlePersonChange = (event) => {
    setPersonName(event.target.value);
  };

  const dataBeta = [
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

  useEffect(() => {
    console.log([personName]);
  }, [personName]);

  useEffect(() => {
    // Should only be initialized once
    resultsInitialization();
  }, []);

  const classes = useStyles();

  // splits data objects into arrays with the same session id for that day

  useEffect(() => {
    sessions = {};
    data.forEach(
      (e, i) => (
        (i = e.session), sessions[i] ? sessions[i].push(e) : (sessions[i] = [e])
      )
    );
    console.log(sessions);
  }, [data]);

  const handleFabClick = () => {
    console.log('clicked');
  };

  const handleSubmit = () => {
    console.log('Submitted');
    setData(dataBeta);
    //doRequest();

    // this goes on the onSuccess portion of doRequest
    setTimeout(() => {
      setUpdateView(updateView + 1);
      setViewUpdater(!viewUpdater);
    }, 100);
  };

  useEffect(() => {
    coreView = Object.keys(sessions).map(function (key, index) {
      return <CoreView key={key} data={sessions[key]} />;
    });
  }, [updateView]);

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
              <Grid item style={{ marginTop: '2rem' }}>
                <List
                  aria-label="Chart options"
                  classes={{ root: classes.list }}
                >
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
              {viewUpdater ? coreView : coreView}
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    </React.Fragment>
  );
};

// ViewWorkout.getInitialProps = async (ctx, client, currentUser) => {

//   // fetch coaches roster
//   // const { data } = await client.get(`/api/athletic/${currentUser.id}`);
//   // console.log(data);

//   return { userInfo: data, currentUser }
//}

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
