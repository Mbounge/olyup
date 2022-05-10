import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {
  TextField,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import theme from '../../src/ui/theme';

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
    width: '7.5rem',
    height: '3rem',
    marginTop: '0.43rem',
  },
}));

const ResultInputMulti = ({
  data,
  resViewCallback,
  id,
  session,
  effortOption,
  coachMeasurement,
}) => {
  const [values, setValues] = useState(data ? data.value : '');
  const [values2, setValues2] = useState(data ? data.metric : '');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedIndex2, setSelectedIndex2] = useState(0);
  const [selectedOption2, setSelectedOption2] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  // 'Percent (%)': '%',
  // 'Weight (lbs/kg)': 'lbs/kg',
  // 'Speed (m/s)': 'm/s',
  // 'Power (watts)': 'watts',
  // 'Heart Rate (bpm)': 'bpm',

  const options = ['kg', 'lbs'];
  const options2 = ['m/s', 'watts', 'bpm'];

  //selecting the right measurement to show to the user
  useEffect(() => {
    if (effortOption) {
      if (effortOption === 'Speed (m/s)') {
        setSelectedIndex2(0);
        setSelectedOption2(options2[0]);
      } else if (effortOption === 'Power (watts)') {
        setSelectedIndex2(1);
        setSelectedOption2(options2[1]);
      } else if (effortOption === 'Heart Rate (bpm)') {
        setSelectedIndex2(2);
        setSelectedOption2(options2[2]);
      }
    }
  }, []);

  const classes = useStyles();

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setSelectedOption(options[index]);
    setAnchorEl(null);

    resViewCallback({
      id: id,
      value: values,
      metric: values2,
      tally: data.tally,
      session: session,
      measurement: options[index],
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChange = (e) => {
    setValues(e.target.value);
  };

  const onChange2 = (e) => {
    setValues2(e.target.value);
  };

  useEffect(() => {
    // callback function to some ResView
    resViewCallback({
      id: id,
      value: values,
      metric: values2,
      tally: data ? data.tally : 0,
      session: session,
      measurement: options[selectedIndex],
    });
  }, [values, values2, selectedOption]);

  return (
    <React.Fragment>
      <OutlinedInput
        id="outlined-adornment-weight2"
        type="number"
        label={options2[selectedIndex2]}
        placeholder={options2[selectedIndex2]}
        value={values2}
        onChange={onChange2}
        inputProps={{
          'aria-label': 'max',
          step: '0.01',
          min: 0,
          max: 1.5,
        }}
        endAdornment={
          <InputAdornment position="end">
            {options2[selectedIndex2]}
          </InputAdornment>
        }
        style={{
          height: '2.2rem',
          marginTop: '0.3rem',
          marginBottom: '0.3rem',
          marginRight: '0.5rem',
        }}
      />

      <OutlinedInput
        id="outlined-adornment-weight"
        type="number"
        value={values}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={handleClickListItem}
              style={{ backgroundColor: theme.palette.secondary.main }}
            >
              {options[selectedIndex]}
            </IconButton>
          </InputAdornment>
        }
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          'aria-label': 'weight',
        }}
        style={{
          height: '2.2rem',
          marginTop: '0.3rem',
          marginBottom: '0.3rem',
          marginRight: '0.5rem',
          width: '7.5rem',
        }}
      />
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
            className={classes.menuItem}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default ResultInputMulti;
