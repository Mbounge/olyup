import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import { Menu, MenuItem } from '@material-ui/core';
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

const ResultInput = ({
  data,
  resViewCallback,
  id,
  session,
  effortOption,
  coachMeasurement,
}) => {
  const [values, setValues] = useState(data ? data.value : '');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  // 'Percent (%)': '%',
  // 'Weight (lbs/kg)': 'lbs/kg',
  // 'Speed (m/s)': 'm/s',
  // 'Power (watts)': 'watts',
  // 'Heart Rate (bpm)': 'bpm',

  const options = ['kg', 'lbs', 'm/s', 'watts', 'bpm'];

  // selecting the right measurement to show to the user
  useEffect(() => {
    if (effortOption) {
      if (['Percent (%)', 'Weight (lbs/kg)'].includes(effortOption)) {
        // now need to check the loggin
        if (coachMeasurement === 'kg') {
          setSelectedIndex(0);
          setSelectedOption(options[0]);
        } else if (coachMeasurement === 'lbs') {
          setSelectedIndex(1);
          setSelectedOption(options[1]);
        }
      } else if (effortOption === 'Speed (m/s)') {
        setSelectedIndex(2);
        setSelectedOption(options[2]);
      } else if (effortOption === 'Power (watts)') {
        setSelectedIndex(3);
        setSelectedOption(options[3]);
      } else if (effortOption === 'Heart Rate (bpm)') {
        setSelectedIndex(4);
        setSelectedOption(options[4]);
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

  useEffect(() => {
    // callback function to some ResView
    resViewCallback({
      id: id,
      value: values,
      tally: data ? data.tally : 0,
      session: session,
      measurement: options[selectedIndex],
    });
  }, [values, selectedOption]);

  return (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      variant="outlined"
    >
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
          marginRight: '0.5rem',
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
    </FormControl>
  );
};

export default ResultInput;

{
  /* <TextField
      variant="outlined"
      type="number"
      size="small"
      className={classes.textField}
      onChange={onChange}
      value={value}
    /> */
}

{
  /* <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton> */
}
