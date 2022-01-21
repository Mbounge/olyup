import { useState, Fragment, useEffect } from 'react';
import Router from 'next/router';
import {
  TextField,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import useRequest from '../../hooks/use-request';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(false);

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup', // happening in the browser!
    method: 'post',
    body: { firstName, lastName, email, password, userType },
    onSuccess: () => Router.push('/auth/aprofile'),
  });

  const onSubmit = async (event) => {
    event.preventDefault(); // to make sure the event doesn't submit to itself

    if (userType === 'Coach') {
      doRequest();
    } else if (userType === 'Athlete') {
      doRequest();
    } else {
      setError(true);
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setError(false);
  };

  // useEffect(() => {
  //   console.log(userType);
  //   console.log(firstName);
  //   console.log(password);
  // }, [userType, firstName, password]);

  return (
    <Fragment>
      <div style={{ marginTop: '2.5rem' }}>
        <Typography variant="h4">Sign Up</Typography>
        <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }} />
        <Grid container direction="column">
          <Grid item container>
            <Grid item xs={2} style={{ marginBottom: '1rem' }}>
              First Name
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                variant="outlined"
                size="small"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
          </Grid>
          <div style={{ marginBottom: '1.5rem' }} />
          <Grid item container>
            <Grid item xs={2}>
              Last Name
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                variant="outlined"
                size="small"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>
          <div style={{ marginBottom: '1.5rem' }} />
          <Grid item container>
            <Grid item xs={2}>
              Email Address
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                variant="outlined"
                size="small"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <div style={{ marginBottom: '1.5rem' }} />
          <Grid item container>
            <Grid item xs={2}>
              Password
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                variant="outlined"
                size="small"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <div style={{ marginBottom: '1.5rem' }} />
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
                    <Radio color="secondary" onChange={handleUserTypeChange} />
                  }
                  label="Coach"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="Athlete"
                  control={
                    <Radio color="secondary" onChange={handleUserTypeChange} />
                  }
                  label="Athlete"
                  labelPlacement="top"
                />
              </RadioGroup>
              {error ? <Alert severity="error">Select An Option!</Alert> : ''}
              {errors}
            </Grid>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{ marginTop: '1rem' }}
              onClick={onSubmit}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
        <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
      </div>
    </Fragment>
  );
};

export default signup;
