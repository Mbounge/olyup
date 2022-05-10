import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
} from '@material-ui/core';
import CoreCellEdit from './CoreCellEdit';
import EditIcon from '@material-ui/icons/Edit';
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
const ResView1 = ({ data, exercises, dataResetCallback, bigData, journal }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const classes = useStyles();

  const handleEdit = () => {
    setEdit(!edit);
  };

  const editCallback = (variable) => {
    setEdit(!edit);
    //console.log(variable);
  };

  const resViewCallback = (input) => {
    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');

    var cellIndex = trainingSessionEdit.findIndex((obj) => obj.id == input.id);

    if (cellIndex >= 0) {
      var tallyIndex = trainingSessionEdit[cellIndex].results.findIndex(
        (obj) => obj.tally == input.tally
      );
      if (tallyIndex >= 0) {
        trainingSessionEdit[cellIndex].results[tallyIndex].value = parseInt(
          input.value
        );
        trainingSessionEdit[cellIndex].measurement = input.measurement;
      } else if (tallyIndex == -1) {
        trainingSessionEdit[cellIndex]['results'].push({
          tally: input.tally,
          value: input.value,
        });
        trainingSessionEdit[cellIndex].measurement = input.measurement;
      }
    } else if (cellIndex == -1) {
      void 0;
    }

    setLocalStorage('TrainingSessionEdit', trainingSessionEdit);
  };

  var index = 0;

  useEffect(() => {
    setName('');
    var string = '';
    data.exerciseNameFinal.sort(function (a, b) {
      return a.tally - b.tally;
    });
    data.exerciseNameFinal.map(function (element, index) {
      if (index === 0) {
        string += element.value;
      } else {
        string += ` + ${element.value}`;
      }
    });
    setName(string);
  }, []);

  return (
    <CardContent>
      {edit ? (
        <CoreCellEdit
          exercises={exercises}
          data={data}
          editCallback={editCallback}
          cellNumber={data.cellNumber}
          groupNumber={data.groupNumber}
          dataResetCallback={dataResetCallback}
          bigData={bigData}
          journal={journal}
        />
      ) : (
        <Grid
          container
          alignItems="center"
          style={{ border: theme.palette.secondary.main }}
        >
          <Grid item xs={1}>
            <IconButton size="small" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Typography>{name}</Typography>
          </Grid>
          <Grid container item xs={7} alignItems="center">
            <Grid item xs={9}>
              <Typography>{`${data.sets} sets * ${data.reps[0].value} reps @ ${
                data.effort[0].value
              }${options[data.effortOption]}`}</Typography>
            </Grid>
            <Grid item xs={3}>
              <ResultInput
                data={data.results[index]}
                effortOption={data.effortOption}
                coachMeasurement={data.measurement}
                resViewCallback={resViewCallback}
                id={data.id}
                session={data.session}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </CardContent>
  );
};

export default ResView1;
