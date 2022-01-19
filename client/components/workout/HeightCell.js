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

const HeightCell = ({
  coreCallback,
  sets,
  exerciseName,
  cellNumber,
  groupNumber,
}) => {
  const [heightCell, setHeightCell] = useState([]);
  const [calculation, setCalculation] = useState(0);
  const name = 'height';

  const heightCellData = {
    heightCell: {
      groupNumber,
      name,
      cellNumber,
      sets,
    },
  };

  const handleHeightChange = (e) => {
    setHeightCell([]);
    // if sets > some Num set it to lower number // control param -- TODO
    for (let i = 0; i < sets; i++) {
      setHeightCell((oldCell) => [
        ...oldCell,
        <InputCell
          key={i}
          heightCallback={heightCallBack}
          cellNumber={cellNumber}
          groupNumber={groupNumber}
          heightCellData={heightCellData}
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

  const heightCallBack = (inputCell) => {
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
          trainingSession.trainingSession[cellIndex].hasOwnProperty('height')
        ) {
          console.log('KOOL');
          var tallyIndex = trainingSession.trainingSession[
            cellIndex
          ].height.data.findIndex(
            (obj) => obj.tally == inputCell.input.data.tally
          );
          if (tallyIndex >= 0) {
            trainingSession.trainingSession[cellIndex].height.data[tallyIndex] =
              {
                value: inputCell.input.data.value,
                tally: inputCell.input.data.tally,
              };
            // aggregate here
            var data = 0;
            trainingSession.trainingSession[cellIndex].height.data.forEach(
              (item) => {
                data += parseInt(item.value);
              }
            );
            console.log(`I am about to kill somebody ${data}`);
            setCalculation(data);
            trainingSession.trainingSession[cellIndex].height['calculation'] =
              data;
          } else if (tallyIndex == -1) {
            trainingSession.trainingSession[cellIndex].height.data.push({
              value: inputCell.input.data.value,
              tally: inputCell.input.data.tally,
            });
            // aggregate here
            var data = 0;
            trainingSession.trainingSession[cellIndex].height.data.forEach(
              (item) => {
                data += parseInt(item.value);
              }
            );
            console.log(`I am about to kill somebody ${data}`);
            setCalculation(data);
            trainingSession.trainingSession[cellIndex].height['calculation'] =
              data;
          }
        } else if (
          !trainingSession.trainingSession[cellIndex].hasOwnProperty('height')
        ) {
          console.log('IT AINT HERE!!!');
          trainingSession.trainingSession[cellIndex]['height'] = {
            data: [
              {
                value: inputCell.input.data.value,
                tally: inputCell.input.data.tally,
              },
            ],
          };
          // aggregate here
          var data = 0;
          trainingSession.trainingSession[cellIndex].height.data.forEach(
            (item) => {
              data += parseInt(item.value);
            }
          );
          console.log(`I am about to kill somebody ${data}`);
          setCalculation(data);
          trainingSession.trainingSession[cellIndex].height['calculation'] =
            data;
        }
      } else if (cellIndex == -1) {
        console.log('CREATING CELLNUM');
        trainingSession.trainingSession.push({
          groupNumber: inputCell.input.groupNumber,
          cellNumber: inputCell.input.cellNumber,
          exerciseName: exerciseName,
          sets: sets,
          height: {
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
    handleHeightChange();
    coreCallback({ type: 'height', value: calculation });
  }, [sets, calculation]);

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Grid container justifyContent="center" alignItems="center" xs>
        <Grid item direction="column" xs={1}>
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
          {heightCell}
        </Grid>
      </Grid>
    </Card>
  );
};

export default HeightCell;
