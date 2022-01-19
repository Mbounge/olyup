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

const DurationCell = ({
  coreCallback,
  sets,
  exerciseName,
  cellNumber,
  groupNumber,
}) => {
  const [durationCell, setDurationCell] = useState([]);
  const [calculation, setCalculation] = useState(0);
  const name = 'duration';

  const durationCellData = {
    durationCell: {
      groupNumber,
      name,
      cellNumber,
      sets,
    },
  };

  const handleDurationChange = (e) => {
    setDurationCell([]);
    // if sets > some Num set it to lower number // control param -- TODO
    for (let i = 0; i < sets; i++) {
      setDurationCell((oldCell) => [
        ...oldCell,
        <InputCell
          key={i}
          durationCallback={durationCallBack}
          cellNumber={cellNumber}
          groupNumber={groupNumber}
          durationCellData={durationCellData}
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

  const durationCallBack = (inputCell) => {
    console.log(inputCell);

    const trainingSession = getLocalStorage('TrainingSession', 'value');

    if (typeof trainingSession.trainingSession !== undefined) {
      var cellIndex = trainingSession.trainingSession.findIndex(
        (obj) =>
          obj.groupNumber == inputCell.input.groupNumber &&
          obj.cellNumber == inputCell.input.cellNumber
      );

      // if we get anything that's not -1, that means the groupNumber exists in the array
      if (cellIndex >= 0) {
        //console.log(trainingSession.trainingSession[cellIndex]);
        // put exerciseName and sets into trainingSession
        trainingSession.trainingSession[cellIndex]['exerciseName'] =
          exerciseName;
        trainingSession.trainingSession[cellIndex]['sets'] = sets;

        if (
          trainingSession.trainingSession[cellIndex].hasOwnProperty('duration')
        ) {
          console.log('KOOL');
          var tallyIndex = trainingSession.trainingSession[
            cellIndex
          ].duration.data.findIndex(
            (obj) => obj.tally == inputCell.input.data.tally
          );
          if (tallyIndex >= 0) {
            trainingSession.trainingSession[cellIndex].duration.data[
              tallyIndex
            ] = {
              value: inputCell.input.data.value,
              tally: inputCell.input.data.tally,
            };
            // aggregate here
            var data = 0;
            trainingSession.trainingSession[cellIndex].duration.data.forEach(
              (item) => {
                data += parseInt(item.value);
              }
            );
            console.log(`I am about to kill somebody ${data}`);
            setCalculation(data);
            trainingSession.trainingSession[cellIndex].duration['calculation'] =
              data;
          } else if (tallyIndex == -1) {
            trainingSession.trainingSession[cellIndex].duration.data.push({
              value: inputCell.input.data.value,
              tally: inputCell.input.data.tally,
            });
            // aggregate here
            var data = 0;
            trainingSession.trainingSession[cellIndex].duration.data.forEach(
              (item) => {
                data += parseInt(item.value);
              }
            );
            console.log(`I am about to kill somebody ${data}`);
            setCalculation(data);
            trainingSession.trainingSession[cellIndex].duration['calculation'] =
              data;
          }
        } else if (
          !trainingSession.trainingSession[cellIndex].hasOwnProperty('duration')
        ) {
          console.log('IT AINT HERE!!!');
          trainingSession.trainingSession[cellIndex]['duration'] = {
            data: [
              {
                value: inputCell.input.data.value,
                tally: inputCell.input.data.tally,
              },
            ],
          };
          // aggregate here
          var data = 0;
          trainingSession.trainingSession[cellIndex].duration.data.forEach(
            (item) => {
              data += parseInt(item.value);
            }
          );
          console.log(`I am about to kill somebody ${data}`);
          setCalculation(data);
          trainingSession.trainingSession[cellIndex].duration['calculation'] =
            data;
        }
      } else if (cellIndex == -1) {
        console.log('CREATING CELLNUM');
        trainingSession.trainingSession.push({
          groupNumber: inputCell.input.groupNumber,
          cellNumber: inputCell.input.cellNumber,
          exerciseName: exerciseName,
          sets: sets,
          duration: {
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
    handleDurationChange();
    coreCallback({ type: 'duration', value: calculation });
  }, [sets, calculation]);

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Grid container justifyContent="center" alignItems="center">
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
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          {durationCell}
        </Grid>
      </Grid>
    </Card>
  );
};

export default DurationCell;
