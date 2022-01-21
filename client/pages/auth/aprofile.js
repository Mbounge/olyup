import { useState, Fragment, useEffect } from 'react';
import Router from 'next/router';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  TextField,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  InputAdornment,
  makeStyles,
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import useRequest from '../../hooks/use-request';
import { sports } from './sports';
import theme from '../../src/ui/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  list: {
    padding: 0,
  },
  listTypo: {
    marginLeft: '0.5rem',
    fontWeight: 700,
    fontFamily: 'Quicksand',
    fontSize: 16,
  },
  listText: {
    margin: 0,
  },
  divider: {
    marginLeft: '3rem',
  },
  exerciseField: {
    marginRight: '2em',
  },
  exerciseInput: {
    '&&[class*="MuiOutlinedInput-root"]': {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: '2.5rem',
      width: '16rem',
    },
  },
  listBox: {
    backgroundColor: theme.palette.primary.main,
  },
  setsField: {
    marginRight: '2em',
  },
  textField: {
    width: '5rem',
    marginRight: '1rem',
  },
  card: {
    width: '10%',
  },
  cardContent: {
    paddingTop: '0.5rem',
    paddingBottom: 0,
  },
}));

// coach or athlete
// type // comes from jwt

// Sporting
// discipline
// position - optional - leave out for now

// Anthros
// height
// weight
// sex

// Personal
// DOB

// userName, userId - will be done from the route hnadler

// list of sports - 'Soccer', 'Olympic Weightlifting', 'Powerlifting', 'Bodybuilding', 'Football', 'VolleyBall', 'Tennis', 'Table Tennis', 'Badminton', 'Lacrosse',
// 'Rugby', 'Field Hockey', 'Ice Hockey', 'Cricket', 'Track & Field', 'Cross Country', 'Basketball', 'Golf', 'Baseball', 'Swimming'
// 'Skiing', 'Gymnastics', 'Strength Coach', 'Therapist', 'Wrestling', 'Taekwondo', 'Karate', 'Boxing', 'Ice Skating', 'Cycling',
// 'Archery', 'Rock Climbing', 'Fencing', 'Judo', 'Kickboxing',

const aprofile = () => {
  const [sex, setSex] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [value, setValue] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/athletic', // happening in the browser!
    method: 'post',
    body: { DOB: selectedDate, sex, discipline, height, weight },
    onSuccess: () => Router.push('/dashboard/dashboard'),
  });

  const classes = useStyles();

  const onSubmit = async (event) => {
    event.preventDefault(); // to make sure the event doesn't submit to itself

    if (sex === 'Male') {
      doRequest();
    } else if (sex === 'Female') {
      doRequest();
    } else {
      setError(true);
    }
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
    setError(false);
  };

  const handleDisciplineChange = (event) => {
    setDiscipline(event);
  };

  useEffect(() => {
    console.log(discipline);
  }, [discipline]);

  return (
    <Fragment>
      <div style={{ marginTop: '2.5rem' }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Typography variant="h4">Profile Set Up</Typography>
          <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }} />
          <Grid container direction="column">
            <Grid item container>
              <Grid item xs={2} style={{ marginBottom: '1rem' }}>
                Date of Birth
              </Grid>
              <Grid item xs={10}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="With keyboard"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  InputAdornmentProps={{ position: 'start' }}
                  onChange={(date) => handleDateChange(date)}
                />
              </Grid>
            </Grid>
            <div style={{ marginBottom: '1.5rem' }} />
            <Grid item container>
              <Grid item xs={2}>
                Sex
              </Grid>
              <Grid item xs={10}>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  <FormControlLabel
                    value="Male"
                    control={
                      <Radio color="secondary" onChange={handleSexChange} />
                    }
                    label="Male"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="Female"
                    control={
                      <Radio color="secondary" onChange={handleSexChange} />
                    }
                    label="Female"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            {error ? <Alert severity="error">Select An Option!</Alert> : ''}
            <div style={{ marginBottom: '1.5rem' }} />
            <Grid item container>
              <Grid item xs={2}>
                Discipline
              </Grid>
              <Grid item xs={10}>
                <Autocomplete
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
                  inputValue={discipline}
                  onInputChange={(event, newValue) => {
                    // Managed to print out the values in each input change
                    handleDisciplineChange(newValue);
                  }}
                  options={sports.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Discipline"
                      variant="outlined"
                      placeholder="Discipline"
                      style={{ paddingBottom: 0 }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <div style={{ marginBottom: '1.5rem' }} />
            <Grid item container>
              <Grid item xs={2}>
                Height
              </Grid>
              <Grid item xs={10}>
                <TextField
                  required
                  variant="outlined"
                  size="small"
                  type="number"
                  onChange={(e) => setHeight(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">cm</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <div style={{ marginBottom: '1.5rem' }} />
            <Grid item container>
              <Grid item xs={2}>
                Weight
              </Grid>
              <Grid item xs={10}>
                <TextField
                  required
                  variant="outlined"
                  size="small"
                  type="number"
                  onChange={(e) => setWeight(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            {errors}
            <Grid item>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                style={{ marginTop: '1rem' }}
                onClick={onSubmit}
              >
                Finish
              </Button>
            </Grid>
          </Grid>
          <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
        </MuiPickersUtilsProvider>
      </div>
    </Fragment>
  );
};

export default aprofile;
