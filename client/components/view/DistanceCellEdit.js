import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Card, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import InputCellEdit from './InputCellEdit';

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

const DistanceCellEdit = ({
  coreCallback,
  sets,
  exerciseName,
  cellNumber,
  groupNumber,
  data,
  counterDistance,
}) => {
  const [distanceCell, setDistanceCell] = useState([]);
  const [calculation, setCalculation] = useState(0);
  const name = 'distance';

  const distanceCellData = {
    distanceCell: {
      groupNumber,
      name,
      cellNumber,
      sets,
    },
  };

  const handleDistanceChange = (e) => {
    setDistanceCell([]);
    // if sets > some Num set it to lower number // control param -- TODO
    for (let i = 0; i < sets; i++) {
      setDistanceCell((oldCell) => [
        ...oldCell,
        <InputCellEdit
          key={i}
          distanceCallback={distanceCallBack}
          cellNumber={cellNumber}
          groupNumber={groupNumber}
          distanceCellData={distanceCellData}
          name={name}
          edit={data.reps[i]}
          tally={i}
          data={data}
          counterDistance={counterDistance}
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

  const distanceCallBack = (inputCell) => {
    console.log(inputCell);

    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');
    var cellIndex = trainingSessionEdit.findIndex(
      (obj) => obj.id == inputCell.input.id
    );

    if (cellIndex >= 0) {
      console.log('cellId is present in trainingSession');
      if (trainingSessionEdit[cellIndex].hasOwnProperty('distance')) {
        console.log('distance object is present');
        // now look for tally index
        var tallyIndex = trainingSessionEdit[cellIndex].distance.findIndex(
          (obj) => obj.tally == inputCell.input.data.tally
        );

        if (tallyIndex >= 0) {
          console.log('tally index exists');
          trainingSessionEdit[cellIndex].distance[tallyIndex].value =
            inputCell.input.data.value;
        } else if (tallyIndex == -1) {
          console.log('distance: tally does not exist');
          trainingSessionEdit[cellIndex].distance.push(inputCell.input.data);
        }
      } else {
        console.log('distance: object not present');
        trainingSessionEdit[cellIndex]['distance'] = [inputCell.input.data];
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
        reps: data.reps,
        distance: [inputCell.input.data],
        effortOption: data.effortOption,
        exerciseName: data.exerciseName,
        sets: data.sets,
      });
    }

    setLocalStorage('TrainingSessionEdit', trainingSessionEdit);

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
          trainingSession.trainingSession[cellIndex].hasOwnProperty('distance')
        ) {
          console.log('KOOL');
          var tallyIndex = trainingSession.trainingSession[
            cellIndex
          ].distance.data.findIndex(
            (obj) => obj.tally == inputCell.input.data.tally
          );
          if (tallyIndex >= 0) {
            trainingSession.trainingSession[cellIndex].distance.data[
              tallyIndex
            ] = {
              value: inputCell.input.data.value,
              tally: inputCell.input.data.tally,
            };
            // aggregate here
            var data = 0;
            trainingSession.trainingSession[cellIndex].distance.data.forEach(
              (item) => {
                data += parseInt(item.value);
              }
            );
            console.log(`I am about to kill somebody ${data}`);
            setCalculation(data);
            trainingSession.trainingSession[cellIndex].distance['calculation'] =
              data;
          } else if (tallyIndex == -1) {
            trainingSession.trainingSession[cellIndex].distance.data.push({
              value: inputCell.input.data.value,
              tally: inputCell.input.data.tally,
            });
            // aggregate here
            var data = 0;
            trainingSession.trainingSession[cellIndex].distance.data.forEach(
              (item) => {
                data += parseInt(item.value);
              }
            );
            console.log(`I am about to kill somebody ${data}`);
            setCalculation(data);
            trainingSession.trainingSession[cellIndex].distance['calculation'] =
              data;
          }
        } else if (
          !trainingSession.trainingSession[cellIndex].hasOwnProperty('distance')
        ) {
          console.log('IT AINT HERE!!!');
          trainingSession.trainingSession[cellIndex]['distance'] = {
            data: [
              {
                value: inputCell.input.data.value,
                tally: inputCell.input.data.tally,
              },
            ],
          };
          // aggregate here
          var data = 0;
          trainingSession.trainingSession[cellIndex].distance.data.forEach(
            (item) => {
              data += parseInt(item.value);
            }
          );
          console.log(`I am about to kill somebody ${data}`);
          setCalculation(data);
          trainingSession.trainingSession[cellIndex].distance['calculation'] =
            data;
        }
      } else if (cellIndex == -1) {
        console.log('CREATING CELLNUM');
        trainingSession.trainingSession.push({
          groupNumber: inputCell.input.groupNumber,
          cellNumber: inputCell.input.cellNumber,
          exerciseName: exerciseName,
          sets: sets,
          distance: {
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
    handleDistanceChange();
    coreCallback({ type: 'distance', value: calculation });
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
          {distanceCell}
        </Grid>
      </Grid>
    </Card>
  );
};

export default DistanceCellEdit;
