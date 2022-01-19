import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Autocomplete } from '@material-ui/lab';
import { Grid, TextField, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import theme from '../../src/ui/theme';

const useStyles = makeStyles(() => ({
  exerciseInput: {
    '&&[class*="MuiOutlinedInput-root"]': {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: '2.5rem',
    },
  },
  exerciseField: {
    marginRight: '2em',
  },
  listBox: {
    backgroundColor: theme.palette.primary.main,
  },
}));

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

const ExerciseNameCell = ({
  groupNumber,
  cellNumber,
  exercises,
  coreCallback,
  unmountMe,
  exerciseCellNumber,
}) => {
  const [exerciseName, setExerciseName] = useState('');
  const [value, setValue] = useState('');
  const [searchItems, setSearchItems] = useState([]);

  const classes = useStyles();

  const handleExerciseChange = (e) => {
    setExerciseName(e.toLowerCase());
    setSearchItems(dynamicSearch());
  };

  const dynamicSearch = () => {
    return exercises.filter((exercise) =>
      exercise.ExerciseName.includes(exerciseName)
    );
  };

  const handleDismiss = () => {
    unmountMe({ groupNumber, cellNumber, exerciseCellNumber });
    // still need to delete from trainingSession
    // Bring us the girl and wipe away the debt
    // this method of deleting is fine for one item
    const trainingSession = getLocalStorage('TrainingSession', 'value');

    if (typeof trainingSession.trainingSession !== undefined) {
      var cellIndex = trainingSession.trainingSession.findIndex(
        (obj) => obj.groupNumber == groupNumber && obj.cellNumber == cellNumber
      );
      if (cellIndex >= 0) {
        // now need to find the exact exerciseName prop that needs to be deleted
        if (
          trainingSession.trainingSession[cellIndex].hasOwnProperty(
            `exerciseName${exerciseCellNumber}`
          )
        ) {
          delete trainingSession.trainingSession[cellIndex][
            `exerciseName${exerciseCellNumber}`
          ];
        }
      } else if (cellIndex == -1) {
        console.log('Couldnt find it (exerciseNameCell)');
      }
      setLocalStorage('TrainingSession', trainingSession);
    }
  };

  useEffect(() => {
    coreCallback({
      type: 'exerciseName',
      value: exerciseName,
      exerciseCellNumber: exerciseCellNumber,
      groupNumber: groupNumber,
      cellNumber: cellNumber,
    });
  }, [exerciseName]);

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={2}>
          <IconButton size="small" onClick={handleDismiss}>
            <CancelIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <Autocomplete
            key={`exe${groupNumber}${cellNumber}${exerciseCellNumber}`}
            className={classes.exerciseInput}
            freeSolo
            size="small"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            classes={{
              root: classes.exerciseField,
              inputRoot: classes.exerciseInput,
              listbox: classes.listBox,
            }}
            style={{ marginBottom: '1rem' }}
            inputValue={exerciseName}
            onInputChange={(event, newValue) => {
              // Managed to print out the values in each input change
              handleExerciseChange(newValue);
            }}
            options={searchItems.map((option) => option.ExerciseName)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Exercise"
                variant="outlined"
                multiline
                placeholder="Exercise"
                style={{ paddingBottom: 0 }}
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ExerciseNameCell;
