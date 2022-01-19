import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '5rem',
    height: '3.5rem',
    marginTop: '0.43rem',
  },
}));

const InputCell = ({
  exerciseName,
  sets,
  effortCallback,
  repCallback,
  heightCallback,
  weightCallback,
  durationCallback,
  distanceCallback,
  timeCallback,
  repCellData,
  effortCellData,
  heightCellData,
  weightCellData,
  distanceCellData,
  durationCellData,
  timeCellData,
  groupNumber,
  cellNumber,
  name,
  tally,
}) => {
  const [value, setValue] = useState('');
  const classes = useStyles();

  const inputCellData = {
    input: {
      name,
      groupNumber,
      cellNumber,
    },
  };

  const onChange = (e) => {
    setValue(e.target.value);
    switch (name) {
      case 'reps':
        repCellData.repCell['data'] = { value: e.target.value, tally: tally };
        inputCellData.input['data'] = repCellData.repCell.data;
        repCallback(inputCellData);
        break;
      case 'duration':
        durationCellData.durationCell['data'] = {
          value: e.target.value,
          tally: tally,
        };
        inputCellData.input['data'] = durationCellData.durationCell.data;
        durationCallback(inputCellData);
        break;
      case 'distance':
        distanceCellData.distanceCell['data'] = {
          value: e.target.value,
          tally: tally,
        };
        inputCellData.input['data'] = distanceCellData.distanceCell.data;
        distanceCallback(inputCellData);
        break;
      case 'effort':
        effortCellData.effortCell['data'] = {
          value: e.target.value,
          tally: tally,
        };
        inputCellData.input['data'] = effortCellData.effortCell.data;
        effortCallback(inputCellData);
        break;
      case 'height':
        heightCellData.heightCell['data'] = {
          value: e.target.value,
          tally: tally,
        };
        inputCellData.input['data'] = heightCellData.heightCell.data;
        heightCallback(inputCellData);
        break;
      case 'weight':
        weightCellData.weightCell['data'] = {
          value: e.target.value,
          tally: tally,
        };
        inputCellData.input['data'] = weightCellData.weightCell.data;
        weightCallback(inputCellData);
        break;
      case 'time':
        timeCellData.timeCell['data'] = { value: e.target.value, tally: tally };
        inputCellData.input['data'] = timeCellData.timeCell.data;
        timeCallback(inputCellData);
        break;
        defualt: break;
    }
  };

  useEffect(() => {
    // reset text fields
    setValue('');
  }, [exerciseName, sets]);

  return (
    <TextField
      type="number"
      variant="outlined"
      label={tally + 1}
      className={classes.textField}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputCell;
