import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
  Button,
  Tooltip,
} from '@material-ui/core';
import CoreCellEdit from './CoreCellEdit';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import ResultInput from './ResultInput';
import ResultInputMulti from './ResultInputMulti';
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

function openInNewTab(url) {
  window.open(url, '_blank').focus();
}

const options2 = ['Power (watts)', 'Heart Rate (bpm)'];

var exerciseLink;

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
  'RPE  : (1-10)': 'RPE',
  'Speed (m/s)': 'm/s',
  'Power (watts)': 'watts',
  'Heart Rate (bpm)': 'bpm',
};

// Resistance View 1 - standard view 3*3
const ResView2 = ({ data, exercises, dataResetCallback, bigData, journal }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [repsView, setRepsView] = useState([]);
  const [link, setLink] = useState('');
  const classes = useStyles();

  const onClickWatch = () => {
    openInNewTab(link);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    var exerciseIndex = exercises.findIndex(
      (obj) => obj.ExerciseName === data.exerciseName2[0]
    );
    if (exerciseIndex > 0) {
      console.log(exercises[exerciseIndex].link);
      setLink(exercises[exerciseIndex].link);
    } else {
      setLink('https://youtu.be/q4GP-Kithpo');
    }
  }, []);

  const editCallback = (variable) => {
    setEdit(!edit);
    //console.log(variable);
  };

  const resViewCallback = (input) => {
    //console.log(input);
    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');

    var cellIndex = trainingSessionEdit.findIndex((obj) => obj.id == input.id);

    if (input.metric) {
      //resultInputMulti
      if (cellIndex >= 0) {
        var tallyIndex = trainingSessionEdit[cellIndex].results.findIndex(
          (obj) => obj.tally == input.tally
        );
        if (tallyIndex >= 0) {
          trainingSessionEdit[cellIndex].results[tallyIndex].value = parseInt(
            input.value
          );
          trainingSessionEdit[cellIndex].results[tallyIndex].metric =
            parseFloat(input.metric);
          trainingSessionEdit[cellIndex].measurement = input.measurement;
        } else if (tallyIndex == -1) {
          trainingSessionEdit[cellIndex]['results'].push({
            tally: input.tally,
            value: parseInt(input.value),
            metric: parseFloat(input.metric),
          });
          trainingSessionEdit[cellIndex].measurement = input.measurement;
        }
      } else if (cellIndex == -1) {
        // don't need to worry about this too much - handled in when exercise is created
        void 0;
      }
    } else {
      //resultInput
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
            value: parseInt(input.value),
          });
          trainingSessionEdit[cellIndex].measurement = input.measurement;
        }
      } else if (cellIndex == -1) {
        // don't need to worry about this too much - handled in when exercise is created
        void 0;
      }
    }

    setLocalStorage('TrainingSessionEdit', trainingSessionEdit);
  };

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

    setRepsView([]);
    var repsPlaceholder = []; // represents reps for each set in the exercise, first num in str is 1st exe
    var repsString = '';

    // need to sort data.rep

    if (data.hasOwnProperty('reps')) {
      // each set will stored in a list in succession
      data.exerciseNameFinal.map(function (element, index) {
        data.reps[element.value].data.sort(function (a, b) {
          return a.tally - b.tally;
        });

        for (let i = 0; i < data.reps[element.value].data.length; i++) {
          if (index === 0) {
            // first exercise
            repsPlaceholder.push(
              parseInt(data.reps[element.value].data[i].value) <= 0
                ? 'AMRAP'
                : `${data.reps[element.value].data[i].value}`
            );
          } else {
            // subsequent exercises
            var val =
              parseInt(data.reps[element.value].data[i].value) <= 0
                ? 'AMRAP'
                : `${data.reps[element.value].data[i].value}`;
            repsPlaceholder[i] = `${repsPlaceholder[i]} + ${val}`;
          }
        }
      });

      // brackets encapulation section ()
      if (data.exerciseName2.length >= 2) {
        // put brackets around reps
        for (let i = 0; i < data.sets; i++) {
          repsPlaceholder[i] = `(${repsPlaceholder[i]})`;
        }
      }

      //console.log(repsPlaceholder);
      setRepsView(repsPlaceholder);
    }
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
          <Grid item xs={3}>
            <Tooltip arrow title="Watch Video">
              <Button
                color="primary"
                disableElevation
                variant="contained"
                size="small"
                style={{ marginRight: '0.4rem', textTransform: 'none' }}
                onClick={onClickWatch}
              >
                <Typography>{name}</Typography>
              </Button>
            </Tooltip>
          </Grid>
          {data.range ? (
            <Grid container item xs={8} alignItems="center">
              {data.views.map((item, index) => {
                return (
                  <React.Fragment key={`${item}${index}${uuidv4()}`}>
                    <Grid
                      item
                      xs={5}
                      style={{
                        borderBottom: `1px solid ${theme.palette.secondary.main}`,
                      }}
                    >
                      <Typography>{`${repsView[index]} reps ${
                        options2.includes(data.effortOption)
                          ? data.effort.length === 0
                            ? ''
                            : `@ ${data.effort[index].value}`
                          : data.effortRange.length === 0
                          ? ''
                          : `@ ${data.effortRange[index].min}
                              to ${data.effortRange[index].max}`
                      }
                        ${
                          data.effort.length === 0 &&
                          data.effortRange.length === 0
                            ? ''
                            : options[data.effortOption]
                        }`}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <ResultInputMulti
                        data={data.results[index]}
                        effortOption={data.effortOption}
                        coachMeasurement={data.measurement}
                        resViewCallback={resViewCallback}
                        id={data.id}
                        session={data.session}
                      />
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>
          ) : (
            <Grid container item xs={8} alignItems="center">
              {data.views.map((item, index) => {
                return (
                  <React.Fragment key={`${item}${index}${uuidv4()}`}>
                    <Grid
                      item
                      xs={5}
                      style={{
                        borderBottom: `1px solid ${theme.palette.secondary.main}`,
                      }}
                    >
                      <Typography>{`${repsView[index]} reps ${
                        data.effort.length === 0
                          ? ''
                          : `@ ${data.effort[index].value}`
                      }${
                        data.effort.length === 0
                          ? ''
                          : options[data.effortOption]
                      }`}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <ResultInput
                        data={data.results[index]}
                        effortOption={data.effortOption}
                        coachMeasurement={data.measurement}
                        resViewCallback={resViewCallback}
                        id={data.id}
                        session={data.session}
                      />
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>
          )}
        </Grid>
      )}
      {edit ? void 0 : <Typography>{`${data.coachNotes}`}</Typography>}
    </CardContent>
  );
};

export default ResView2;
