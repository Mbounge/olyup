import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import {
  MenuItem,
  Grid,
  makeStyles,
  withStyles,
  AccordionDetails,
  Switch,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import theme from '../../src/ui/theme';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    marginTop: '1rem',
  },
  align: {
    right: 'auto',
  },
  typography: {
    fontWeight: 700,
    fontFamily: 'Quicksand',
    fontSize: 22,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: '3.5rem',
    height: '4rem',
  },
  listItem: {
    width: '9.25rem',
    height: '100%',
    borderRadius: '6px',
    padding: 0,
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.8,
    '&:hover': {
      opacity: 1,
      backgroundColor: theme.palette.secondary.main,
    },
  },
  menu: {
    backgroundColor: theme.palette.secondary.main,
  },
  menuItem: {
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.8,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      opacity: 1,
    },
  },
  fab: {
    margin: 0,
    zIndex: 1000,
    bottom: 50,
    right: 20,
    left: 'auto',
    position: 'fixed',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  cardHeader2: {
    padding: theme.spacing(1, 2),
  },
  list2: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button2: {
    margin: theme.spacing(0.5, 0),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const MuscleAcc = ({ name, muscleAccCallback, index, edit, editChange }) => {
  const [muscleSwitch, setMuscleSwitch] = useState(false);
  const [target, setTarget] = React.useState(
    edit
      ? editChange.target === ''
        ? 'primary'
        : editChange.target
      : 'primary'
  );

  const classes = useStyles();

  const handleChange = (e) => {
    setMuscleSwitch(e.target.checked);
  };

  const handleChange2 = (event) => {
    setTarget(event.target.value);
  };

  // when editting exercises
  useEffect(() => {
    if (edit) {
      switch (name) {
        case 'Bicep':
          setMuscleSwitch(editChange.bicep);
          break;
        case 'Tricep':
          setMuscleSwitch(editChange.tricep);
          break;
        case 'Shoulder':
          setMuscleSwitch(editChange.shoulder);
          break;
        case 'Upper Back':
          setMuscleSwitch(editChange['upper back']);
          break;
        case 'Lower Back':
          setMuscleSwitch(editChange['lower back']);
          break;
        case 'Chest':
          setMuscleSwitch(editChange.chest);
          break;
        case 'Core':
          setMuscleSwitch(editChange.core);
          break;
        case 'Quadriceps':
          setMuscleSwitch(editChange.quadriceps);
          break;
        case 'Hamstring':
          setMuscleSwitch(editChange.hamstring);
          break;
        case 'Glutes':
          setMuscleSwitch(editChange.glutes);
          break;
        case 'Lower Leg':
          setMuscleSwitch(editChange['lower leg']);
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    muscleAccCallback({ name: name, muscle: muscleSwitch, target: target });
  }, [muscleSwitch, target]);

  return (
    <React.Fragment>
      <AccordionDetails
        style={{
          backgroundColor:
            index % 2 === 0 ? theme.palette.primary.main : void 0,
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Typography>{name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Switch
              checked={muscleSwitch}
              onChange={handleChange}
              name={name}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Grid>
          <Grid item xs={7}>
            <Grid
              container
              alignItems="center"
              style={{ visibility: muscleSwitch ? 'visible' : 'hidden' }}
            >
              <Grid item xs={4}>
                <Typography>Target Muscle</Typography>
              </Grid>
              <Grid item xs={8}>
                <Select
                  value={target}
                  onChange={handleChange2}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={'primary'}>Primary</MenuItem>
                  <MenuItem value={'secondary'}>Secondary</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </React.Fragment>
  );
};

export default MuscleAcc;
