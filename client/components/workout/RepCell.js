import React, { useEffect, useState } from 'react';
import { Box, Divider, TextField, Typography } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import InputCell from './InputCell';

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

const RepCell = ({
  coreCallback,
  sets,
  exerciseName,
  cellNumber,
  groupNumber,
  warmup,
  notes,
}) => {
  const [repCell, setRepCell] = useState([]);
  const [calculation, setCalculation] = useState(0);

  const name = 'reps';

  const repCellData = {
    repCell: {
      groupNumber,
      name,
      cellNumber,
      sets,
    },
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

      // if we get anything that's not -1, that means the groupNumber exists in the array
      if (cellIndex >= 0) {
        //console.log(trainingSession.trainingSession[cellIndex]);

        trainingSession.trainingSession[cellIndex]['exerciseName'] =
          exerciseName;
        trainingSession.trainingSession[cellIndex]['sets'] = sets;

        if (trainingSession.trainingSession[cellIndex].hasOwnProperty('reps')) {
          console.log('KOOL');
          var tallyIndex = trainingSession.trainingSession[
            cellIndex
          ].reps.data.findIndex(
            (obj) => obj.tally == inputCell.input.data.tally
          );
          if (tallyIndex >= 0) {
            trainingSession.trainingSession[cellIndex].reps.data[tallyIndex] = {
              value: inputCell.input.data.value,
              tally: inputCell.input.data.tally,
            };
            // Aggregation stuff here!
            var data = 0;
            trainingSession.trainingSession[cellIndex].reps.data.forEach(
              (item) => {
                data += parseInt(item.value);
              }
            );
            console.log(`I am about to kill somebody ${data}`);
            setCalculation(data);
            trainingSession.trainingSession[cellIndex].reps['calculation'] =
              data;
          } else if (tallyIndex == -1) {
            trainingSession.trainingSession[cellIndex].reps.data.push({
              value: inputCell.input.data.value,
              tally: inputCell.input.data.tally,
            });
            // Aggregation stuff here!
            var data = 0;
            trainingSession.trainingSession[cellIndex].reps.data.forEach(
              (item) => {
                data += parseInt(item.value);
              }
            );
            console.log(`I am about to kill somebody2 ${data}`);
            setCalculation(data);
            trainingSession.trainingSession[cellIndex].reps['calculation'] =
              data;
          }
        } else if (
          !trainingSession.trainingSession[cellIndex].hasOwnProperty('reps')
        ) {
          console.log('IT AINT HERE!!!');
          trainingSession.trainingSession[cellIndex]['reps'] = {
            data: [
              {
                value: inputCell.input.data.value,
                tally: inputCell.input.data.tally,
              },
            ],
          };
          // Aggregation stuff here!
          var data = 0;
          trainingSession.trainingSession[cellIndex].reps.data.forEach(
            (item) => {
              data += parseInt(item.value);
            }
          );
          console.log(`I am about to kill somebody3 ${data}`);
          setCalculation(data);
          trainingSession.trainingSession[cellIndex].reps['calculation'] = data;
        }
      } else if (cellIndex == -1) {
        console.log('CREATING CELLNUM');
        trainingSession.trainingSession.push({
          groupNumber: inputCell.input.groupNumber,
          cellNumber: inputCell.input.cellNumber,
          exerciseName: exerciseName,
          sets: sets,
          reps: {
            data: [
              {
                value: inputCell.input.data.value,
                tally: inputCell.input.data.tally,
              },
            ],
            calculation: inputCell.input.data.value,
          },
        });
        setCalculation(inputCell.input.data.value);
      }
      setLocalStorage('TrainingSession', trainingSession);
    }
  };

  useEffect(() => {
    handleRepCellChange();
    coreCallback({ type: 'reps', value: calculation }); // this struct is the same for all var cells
  }, [sets, calculation]);

  useEffect(() => {});

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
        trainingSession.trainingSession[cellIndex]['sets'] = sets;
        trainingSession.trainingSession[cellIndex]['notes'] = notes;
      } else if (cellIndex == -1) {
        console.log('CREATING CELLNUM2');
        trainingSession.trainingSession.push({
          groupNumber: groupNumber,
          cellNumber: cellNumber,
          exerciseName: exerciseName,
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
        <Grid item xs={1}>
          <Box alignItems="center">
            <Typography
              align="center"
              style={{
                marginLeft: '0.1rem',
                fontFamily: 'quicksand',
                fontWeight: 700,
              }}
            >
              {name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={10}>
          {repCell}
        </Grid>
      </Grid>
    </Card>
  );
};

export default RepCell;
