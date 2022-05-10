import React, { useEffect, useState } from 'react';
import { Box, Divider, TextField, Typography } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import InputCell from './InputCell';
import theme from '../../src/ui/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  textField: {
    width: '5rem',
    height: '4rem',
    marginTop: '0.43rem',
  },
  typography: {
    marginLeft: '1rem',
  },
}));

function openInNewTab(url) {
  window.open(url, '_blank').focus();
}

const RepCell = ({
  coreCallback,
  sets,
  exerciseName,
  exerciseName2,
  exerciseNameFinal,
  cellNumber,
  groupNumber,
  warmup,
  notes,
  exe,
  exercises,
}) => {
  const [repCell, setRepCell] = useState([]);
  const [repCellRange, setRepCellRange] = useState([]);
  const [calculation, setCalculation] = useState(0);
  const [link, setLink] = useState('');

  const name = 'reps';

  const repCellData = {
    repCell: {
      groupNumber,
      name,
      cellNumber,
      sets,
    },
  };

  useEffect(() => {
    var linkIndex = exercises.findIndex((obj) => obj.ExerciseName === exe);
    setLink(exercises[linkIndex].link);
  }, []);

  const onClickWatch = () => {
    openInNewTab(link);
  };

  const handleRepCellChange = (e) => {
    setRepCell([]);
    for (let i = 0; i < sets; i++) {
      setRepCell((oldCell) => [
        ...oldCell,
        <InputCell
          key={i}
          repCallback={repCallBack}
          exerciseName={exerciseName}
          exerciseName2={exerciseName2}
          exerciseNameFinal={exerciseNameFinal}
          sets={sets}
          groupNumber={groupNumber}
          cellNumber={cellNumber}
          repCellData={repCellData}
          name={name}
          tally={i}
        />,
      ]);
    }
  };

  const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  };

  const getLocalStorage = (key, initialValue) => {
    try {
      const value = localStorage.getItem(key);
      console.log(`VALUE ${value}`);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      return initialValue;
    }
  };

  const repCallBack = (inputCell) => {
    //just change repCellData here and in useEffect call this everytime the callback is envoked

    //setLocalStorage('repComp', 'squats');
    //console.log(inputCell.input.data.value);
    const trainingSession = getLocalStorage('TrainingSession', 'value');
    console.log(trainingSession);
    console.log(notes);

    if (typeof trainingSession.trainingSession !== undefined) {
      var cellIndex = trainingSession.trainingSession.findIndex(
        (obj) =>
          obj.groupNumber == inputCell.input.groupNumber &&
          obj.cellNumber == inputCell.input.cellNumber
      );

      // changing structure of rep cell to
      // reps : { 'back squat': [{value: 2, tally: 0}], 'front squat': [value: 1: tally: 0]}

      // if we get anything that's not -1, that means the groupNumber exists in the array
      if (cellIndex >= 0) {
        //console.log(trainingSession.trainingSession[cellIndex]);

        trainingSession.trainingSession[cellIndex]['exerciseName'] =
          exerciseName;
        trainingSession.trainingSession[cellIndex]['exerciseName2'] =
          exerciseName2;
        trainingSession.trainingSession[cellIndex]['exerciseNameFinal'] =
          exerciseNameFinal;
        trainingSession.trainingSession[cellIndex]['sets'] = sets;

        if (trainingSession.trainingSession[cellIndex].hasOwnProperty('reps')) {
          // test run

          if (
            trainingSession.trainingSession[cellIndex].reps.hasOwnProperty(exe)
          ) {
            console.log('Koolio');
            var tallyIndex = trainingSession.trainingSession[cellIndex].reps[
              `${exe}`
            ].data.findIndex((obj) => obj.tally == inputCell.input.data.tally);

            if (tallyIndex >= 0) {
              trainingSession.trainingSession[cellIndex].reps[`${exe}`].data[
                tallyIndex
              ] = {
                value: parseInt(inputCell.input.data.value),
                tally: inputCell.input.data.tally,
              };
              // Aggregation stuff here!
              var data = 0;
              trainingSession.trainingSession[cellIndex].reps[
                `${exe}`
              ].data.forEach((item) => {
                data += parseInt(item.value);
              });
              console.log(`I am about to kill somebody ${data}`);
              //setCalculation(data);
              // trainingSession.trainingSession[cellIndex].reps[`${exe}`][
              //   'calculation'
              // ] = data;
            } else if (tallyIndex == -1) {
              trainingSession.trainingSession[cellIndex].reps[
                `${exe}`
              ].data.push({
                value: parseInt(inputCell.input.data.value),
                tally: inputCell.input.data.tally,
              });
              // Aggregation stuff here!
              var data = 0;
              trainingSession.trainingSession[cellIndex].reps[
                `${exe}`
              ].data.forEach((item) => {
                data += parseInt(item.value);
              });
              console.log(`I am about to kill somebody2 ${data}`);
              //setCalculation(data);
              // trainingSession.trainingSession[cellIndex].reps[`${exe}`][
              //   'calculation'
              // ] = data;
            }
          } else if (
            !trainingSession.trainingSession[cellIndex].reps.hasOwnProperty(exe)
          ) {
            //add the object in
            console.log('adding to rep cell in this cellIndex', exe);
            trainingSession.trainingSession[cellIndex].reps[`${exe}`] = {
              data: [
                {
                  value: parseInt(inputCell.input.data.value),
                  tally: inputCell.input.data.tally,
                },
              ],
            };
            //setCalculation(inputCell.input.data.value);
          }

          // EOF true hasOwnProp
        } else if (
          !trainingSession.trainingSession[cellIndex].hasOwnProperty('reps')
        ) {
          console.log('IT AINT HERE!!!');
          trainingSession.trainingSession[cellIndex]['reps'] = {
            [`${exe}`]: {
              data: [
                {
                  value: parseInt(inputCell.input.data.value),
                  tally: inputCell.input.data.tally,
                },
              ],
            },
          };
          //setCalculation(inputCell.input.data.value);
          // EOF - false hasOwnProp
        }
      } else if (cellIndex == -1) {
        console.log('CREATING CELLNUM');
        trainingSession.trainingSession.push({
          groupNumber: inputCell.input.groupNumber,
          cellNumber: inputCell.input.cellNumber,
          exerciseName: exerciseName,
          exerciseName2: exerciseName2,
          exerciseNameFinal: exerciseNameFinal,
          sets: sets,
          reps: {
            [`${exe}`]: {
              data: [
                {
                  value: parseInt(inputCell.input.data.value),
                  tally: inputCell.input.data.tally,
                },
              ],
            },
          },
        });
        //setCalculation(inputCell.input.data.value);
      }
      console.log(trainingSession);
      setLocalStorage('TrainingSession', trainingSession);
      setCalculation(inputCell.input.data.value * Math.random());
    }
  };

  useEffect(() => {
    handleRepCellChange();
    var newCalculation = 0;

    const trainingSession = getLocalStorage('TrainingSession', 'value');

    var cellIndex = trainingSession.trainingSession.findIndex(
      (obj) => obj.groupNumber == groupNumber && obj.cellNumber == cellNumber
    );

    if (cellIndex >= 0) {
      if (trainingSession.trainingSession[cellIndex].hasOwnProperty('reps')) {
        var objectKeys = Object.keys(
          trainingSession.trainingSession[cellIndex].reps
        );
        objectKeys.map((key) => {
          trainingSession.trainingSession[cellIndex].reps[key].data.forEach(
            (item) => {
              newCalculation += parseInt(item.value);
            }
          );
        });
      }
    } else if (cellIndex == -1) {
      newCalculation = 0;
    }

    coreCallback({ type: 'reps', value: newCalculation }); // this struct is the same for all var cells
  }, [sets, calculation]);

  useEffect(() => {
    // Add notes to trainingSession object
    const trainingSession = getLocalStorage('TrainingSession', 'value');
    if (typeof trainingSession.trainingSession !== undefined) {
      var cellIndex = trainingSession.trainingSession.findIndex(
        (obj) => obj.groupNumber == groupNumber && obj.cellNumber == cellNumber
      );

      // if we get anything that's not -1, that means the groupNumber exists in the array
      if (cellIndex >= 0) {
        // put exerciseName and sets into trainingSession
        trainingSession.trainingSession[cellIndex]['exerciseName'] =
          exerciseName;
        trainingSession.trainingSession[cellIndex]['exerciseName2'] =
          exerciseName2;
        trainingSession.trainingSession[cellIndex]['exerciseNameFinal'] =
          exerciseNameFinal;
        trainingSession.trainingSession[cellIndex]['sets'] = sets;
        trainingSession.trainingSession[cellIndex]['notes'] = notes;
      } else if (cellIndex == -1) {
        console.log('CREATING CELLNUM2');
        trainingSession.trainingSession.push({
          groupNumber: groupNumber,
          cellNumber: cellNumber,
          exerciseName: exerciseName,
          exerciseName2: exerciseName2,
          exerciseNameFinal: exerciseNameFinal,
          sets: sets,
          notes: notes,
        });
      }
      setLocalStorage('TrainingSession', trainingSession);
    }
  }, [notes]);

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={2}>
          <Box
            alignItems="center"
            style={{ backgroundColor: theme.palette.primary.main }}
          >
            <Button style={{ textTransform: 'none' }} onClick={onClickWatch}>
              <Typography
                align="center"
                style={{
                  marginLeft: '0.1rem',
                  fontFamily: 'quicksand',
                  fontWeight: 700,
                }}
              >
                {`${exe}-${name}`}
              </Typography>
            </Button>
          </Box>
        </Grid>

        <Grid item xs={10}>
          {repCell}
        </Grid>
      </Grid>
    </Card>
  );
};

export default RepCell;
