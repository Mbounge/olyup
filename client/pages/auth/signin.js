import { useState, Fragment, useEffect } from 'react';
import Router from 'next/router';
import { TextField, Grid, Button, Typography } from '@material-ui/core';
import useRequest from '../../hooks/use-request';

const signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault(); // to make sure the event doesn't submit to itself

    doRequest();
  };

  return (
    <Fragment>
      <div style={{ marginTop: '2.5rem' }}>
        <Typography variant="h4">Sign In</Typography>
        <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }} />
        <Grid container direction="column">
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
          {errors}
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{ marginTop: '1rem' }}
              onClick={onSubmit}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
        <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
      </div>
    </Fragment>
  );
};

export default signin;
