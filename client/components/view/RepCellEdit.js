import React, { useEffect, useState } from 'react';
import { Box, Divider, TextField, Typography } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import InputCellEdit from './InputCellEdit';
import InputRangeEdit from './inputRangeEdit';
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

const RepCellEdit = ({
  coreCallback,
  sets,
  exerciseName,
  cellNumber,
  groupNumber,
  warmup,
  notes,
  counterRep,
  data,
  exe,
}) => {
  const [repCell, setRepCell] = useState([]);
  const [repCellRange, setRepCellRange] = useState([]);
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
    try {
      data.rep[exe].data.sort(function (a, b) {
        return a.tally - b.tally;
      });
    } catch (e) {}

    for (let i = 0; i < sets; i++) {
      setRepCell((oldCell) => [
        ...oldCell,
        <InputCellEdit
          key={i}
          repCallback={repCallBack}
          exerciseName={exerciseName}
          sets={sets}
          groupNumber={groupNumber}
          cellNumber={cellNumber}
          repCellData={repCellData}
          name={name}
          edit2={
            data.reps[exe] ? data.reps[exe].data[i] : { value: '', tally: i }
          }
          tally={i}
          data={data}
          counterRep={counterRep}
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
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      return initialValue;
    }
  };

  const repCallBack = (inputCell) => {
    //just change repCellData here and in useEffect call this everytime the callback is envoked

    console.log(inputCell);
    //inputCell.input.id
    //inputCell.input.data.tally

    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');
    var cellIndex = trainingSessionEdit.findIndex(
      (obj) => obj.id == inputCell.input.id
    );

    // changes start here

    if (cellIndex >= 0) {
      // checking to see if changes are taking place
      if (trainingSessionEdit[cellIndex].hasOwnProperty('reps')) {
        console.log('reps is here');
        console.log(exe);
        if (trainingSessionEdit[cellIndex].reps.hasOwnProperty(exe)) {
          console.log('Koolio');
          var tallyIndex = trainingSessionEdit[cellIndex].reps[
            `${exe}`
          ].data.findIndex((obj) => obj.tally == inputCell.input.data.tally);

          if (tallyIndex >= 0) {
            console.log('Koolio 2');
            trainingSessionEdit[cellIndex].reps[`${exe}`].data[tallyIndex] = {
              value: parseInt(inputCell.input.data.value),
              tally: inputCell.input.data.tally,
            };
          } else if (tallyIndex == -1) {
            console.log('Koolio 3');
            trainingSessionEdit[cellIndex].reps[`${exe}`].data.push({
              value: parseInt(inputCell.input.data.value),
              tally: inputCell.input.data.tally,
            });
          }
        } else if (!trainingSessionEdit[cellIndex].reps.hasOwnProperty(exe)) {
          //add the object in
          console.log('adding to reps cell in this cellIndex', exe);
          trainingSessionEdit[cellIndex].reps[`${exe}`] = {
            data: [
              {
                value: parseInt(inputCell.input.data.value),
                tally: inputCell.input.data.tally,
              },
            ],
          };
          //setCalculation(inputCell.input.data.value);
        }
      } else if (!trainingSessionEdit[cellIndex].hasOwnProperty('reps')) {
        trainingSessionEdit[cellIndex]['reps'] = {
          [`${exe}`]: {
            data: [
              {
                value: parseInt(inputCell.input.data.value),
                tally: inputCell.input.data.tally,
              },
            ],
          },
        };
      }
    } else if (cellIndex == -1) {
      console.log('cellId not present in trainingSessionEdit');
      trainingSessionEdit.push({
        id: inputCell.input.id,
        groupNumber: inputCell.input.groupNumber,
        cellNumber: inputCell.input.cellNumber,
        athleteId: data.athleteId,
        coachId: data.coachId,
        checkmark: data.checkmark,
        coachNotes: data.coachNotes,
        athleteNotes: data.athleteNotes,
        date: data.date,
        effort: data.effort,
        effortOption: data.effortOption,
        exerciseName: data.exerciseName,
        exerciseName2: data.exerciseName2,
        exerciseNameFinal: data.exerciseNameFinal,
        sets: data.sets,
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
    }

    setLocalStorage('TrainingSessionEdit', trainingSessionEdit);

    console.log(trainingSessionEdit);
  };

  useEffect(() => {
    handleRepCellChange();
    coreCallback({ type: 'reps', value: calculation }); // this struct is the same for all var cells
  }, [sets, calculation]);

  useEffect(() => {});

  useEffect(() => {
    // Add notes to trainingSession object
    const trainingSession = getLocalStorage('TrainingSessionEdit', 'value');
    if (typeof trainingSession !== undefined) {
      var cellIndex = trainingSession.findIndex((obj) => obj.id == data.id);

      // if we get anything that's not -1, that means the groupNumber exists in the array
      if (cellIndex >= 0) {
        // put exerciseName and sets into trainingSession
        trainingSession[cellIndex]['sets'] = sets;
        trainingSession[cellIndex]['notes'] = notes;
      } else if (cellIndex == -1) {
        console.log('CREATING CELLNUM2');
        trainingSession.push({
          groupNumber: groupNumber,
          cellNumber: cellNumber,
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
              {`${exe}-${name}`}
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

export default RepCellEdit;
