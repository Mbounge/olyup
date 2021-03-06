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
  Snackbar,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import MuiAlert from '@material-ui/lab/Alert';
import useRequest from '../../hooks/use-request';
import { sports } from '../../components/view/sports';
import axios from 'axios';

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProfileSettings = ({ userInfo, currentUser, customerStripe }) => {
  const [sex, setSex] = useState(userInfo[0].sex);
  const [discipline, setDiscipline] = useState(userInfo[0].discipline);
  const [height, setHeight] = useState(userInfo[0].height);
  const [weight, setWeight] = useState(userInfo[0].weight);
  const [error, setError] = useState(false);
  const [payment, setPayment] = useState(false);
  const [snack, setSnack] = useState(false);
  const [measurement, setMeasurement] = useState(userInfo[0].measurement);
  const [paygress, setPaygress] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date(userInfo[0].DOB));
  const [value, setValue] = useState(userInfo[0].discipline);
  const [progress, setProgress] = useState(false);
  const [userType, setUserType] = useState(
    currentUser ? currentUser.userType : ''
  );

  const { doRequest, errors } = useRequest({
    url: `/api/athletic/${currentUser.id}`, // happening in the browser!
    method: 'put',
    body: {
      DOB: selectedDate,
      sex,
      discipline,
      height,
      weight,
      userName: userInfo[0].userName,
      measurement,
    },
    onSuccess: () => {
      setSnack(true), setProgress(false);
    },
  });

  const classes = useStyles();

  // console.log(currentUser);
  // console.log(userInfo[0]);

  const onSubmit = async (event) => {
    event.preventDefault(); // to make sure the event doesn't submit to itself
    setProgress(true);

    if (sex === 'Male') {
      // axios first
      // on success fire doRequest for athletic
      axios
        .put('/api/users/update', {
          email: currentUser.email,
          userType: userType,
        })
        .then((res) => {
          doRequest(); // athletic // auth will be hnadled with axios
          setProgress(false);
        })
        .catch((err) => {
          setProgress(false);
        });
      setError(false);
    } else if (sex === 'Female') {
      axios
        .put('/api/users/update', {
          email: currentUser.email,
          firstName: firstName,
          lastName: lastName,
          userType: userType,
        })
        .then((res) => {
          doRequest(); // athletic // auth will be hnadled with axios
          setProgress(false);
        })
        .catch((err) => {
          setProgress(false);
        });
      setError(false);
    } else {
      setError(true);
      setProgress(false);
    }
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
    setError(false);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleDisciplineChange = (event) => {
    setDiscipline(event);
  };

  const handleMeasurementChange = (e) => {
    setMeasurement(e.target.value);
  };

  const onHeightChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setHeight(e.target.value);
    }
  };

  const onWeightChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setWeight(e.target.value);
    }
  };

  const isNumber = (e) => {
    e = e || window.event;
    var charCode = e.which ? e.which : e.keyCode;
    return /\d/.test(String.fromCharCode(charCode));
  };

  useEffect(() => {
    if (sex === 'Male') {
    } else if (sex === 'Female') {
    }
  }, [sex]);

  // useEffect(() => {
  //   if (customerStripe !== '') {
  //     setPayment(true);
  //   } else {
  //     setPayment(false);
  //   }
  // }, []);

  const handlePortal = () => {
    setPaygress(true);
    axios
      .post('/api/payments/retrieve-portal-session', {
        customerId: customerStripe.id,
      })
      .then((res) => {
        //console.log(res.data.url);
        //console.log(res);
        setPaygress(false);
        window.location.assign(res.data.url);
      })
      .catch((err) => {
        setPaygress(false);
        console.log(err);
      });
  };

  const handleSnackClose = () => {
    setSnack(false);
  };

  return (
    <Fragment>
      <div style={{ marginTop: '2.5rem' }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Typography variant="h4">Update Profile Information</Typography>
          <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }} />
          <Grid container direction="column">
            <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }} />
            <Grid item container>
              <Grid item xs={2}>
                User Type
              </Grid>
              <Grid item xs={10}>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  <FormControlLabel
                    value="Coach"
                    control={
                      <Radio
                        color="secondary"
                        onChange={handleUserTypeChange}
                        checked={userType === 'Coach'}
                      />
                    }
                    label="Coach"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="Athlete"
                    control={
                      <Radio
                        color="secondary"
                        onChange={handleUserTypeChange}
                        checked={userType === 'Athlete'}
                      />
                    }
                    label="Athlete"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }} />
            <Grid item container>
              <Grid item xs={2} style={{ marginBottom: '1rem' }}>
                Date of Birth
              </Grid>
              <Grid item xs={10}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Select Date"
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
                      <Radio
                        color="secondary"
                        onChange={handleSexChange}
                        checked={sex === 'Male'}
                      />
                    }
                    label="Male"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="Female"
                    control={
                      <Radio
                        color="secondary"
                        onChange={handleSexChange}
                        checked={sex === 'Female'}
                      />
                    }
                    label="Female"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <div style={{ marginBottom: '1.5rem' }} />
            <Grid item container>
              <Grid item xs={2}>
                Measurement of Choice
              </Grid>
              <Grid item xs={10}>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  <FormControlLabel
                    value="kg"
                    control={
                      <Radio
                        color="secondary"
                        onChange={handleMeasurementChange}
                        checked={measurement === 'kg'}
                      />
                    }
                    label="kg"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="lbs"
                    control={
                      <Radio
                        color="secondary"
                        onChange={handleMeasurementChange}
                        checked={measurement === 'lbs'}
                      />
                    }
                    label="lbs"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <div style={{ marginBottom: '1.5rem' }} />
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
                  value={height}
                  onChange={onHeightChange}
                  onKeyPress={(e) => isNumber(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">cm</InputAdornment>
                    ),
                    type: 'number',
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
                  value={weight}
                  onChange={onWeightChange}
                  onKeyPress={(e) => isNumber(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                    type: 'number',
                  }}
                />
              </Grid>
              <div />
              {payment ? (
                <Grid item style={{ marginTop: '0.8rem' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    disableElevation
                    onClick={handlePortal}
                    disabled
                  >
                    {paygress ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      'Manage Billing'
                    )}
                  </Button>
                </Grid>
              ) : (
                void 0
              )}
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
                {progress ? <CircularProgress color="secondary" /> : 'Update'}
              </Button>
            </Grid>
          </Grid>
          <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
        </MuiPickersUtilsProvider>
      </div>
      <Snackbar open={snack} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert severity="info">Profile Updated!</Alert>
      </Snackbar>
    </Fragment>
  );
};

ProfileSettings.getInitialProps = async (ctx, client, currentUser) => {
  var userData;
  // fetch coaches roster
  if (!currentUser) {
    userData = [{ id: '', rosterTeam: [], rosterInd: [], rosterSearch: [] }];
  } else {
    const { data } = await client.get(`/api/athletic/${currentUser.id}`);
    userData = data;
  }

  var customer;
  if (!currentUser) {
    customer = { data: '' };
  } else {
    // customer = await client.get(
    //   `/api/payments/retrieve-customers/${currentUser.email}`
    // );
    customer = { data: '' };
  }

  return { userInfo: userData, customerStripe: customer.data };
};

export default ProfileSettings;
