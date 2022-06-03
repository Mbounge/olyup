import React, { useState, useEffect } from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField2: {
    width: '25ch',
  },
  textField: {
    width: '3rem',
    height: '2.2rem',
    marginTop: '0.43rem',
  },
}));

const InputRange = ({
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
  option,
}) => {
  const [values, setValues] = useState('');
  const [values2, setValues2] = useState('');

  // selecting the right measurement to show to the user

  const classes = useStyles();

  const inputCellData = {
    input: {
      name,
      groupNumber,
      cellNumber,
      data: { min: values, max: values2, tally: tally },
    },
  };

  // min
  const onChange = (e) => {
    setValues(e.target.value);

    switch (name) {
      case 'effort':
        //effortCellData.effortCell['data'].min = e.target.value;

        inputCellData.input.data.min = parseFloat(e.target.value);
        inputCellData.input['option'] = option;
        effortCallback(inputCellData);
        break;
      default:
        break;
    }
  };

  // max
  const onChange2 = (e) => {
    setValues2(e.target.value);
    switch (name) {
      case 'effort':
        //effortCellData.effortCell['data'].min = e.target.value;

        inputCellData.input.data.max = parseFloat(e.target.value);
        inputCellData.input['option'] = option;
        effortCallback(inputCellData);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Tooltip arrow title="enter a range between 0 to 1.5 m/s">
        <OutlinedInput
          id="outlined-adornment-weight"
          type="number"
          label="min"
          placeholder="min"
          value={values}
          onChange={onChange}
          inputProps={{
            'aria-label': 'min',
            step: '0.1',
            min: 0,
            max: 1.5,
          }}
          endAdornment={<InputAdornment position="end">m/s</InputAdornment>}
          style={{
            height: '2.2rem',
            marginTop: '0.3rem',
            marginBottom: '0.3rem',
          }}
        />
      </Tooltip>
      --
      <Tooltip arrow title="enter a range between 0 to 1.5 m/s">
        <OutlinedInput
          id="outlined-adornment-weight2"
          type="number"
          label="max"
          placeholder="max"
          value={values2}
          onChange={onChange2}
          inputProps={{
            'aria-label': 'max',
            step: '0.1',
            min: 0,
            max: 1.5,
          }}
          endAdornment={<InputAdornment position="end">m/s</InputAdornment>}
          style={{
            height: '2.2rem',
            marginTop: '0.3rem',
            marginBottom: '0.3rem',
            marginRight: '0.5rem',
          }}
        />
      </Tooltip>
    </React.Fragment>
  );
};

export default InputRange;
