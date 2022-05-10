import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Switch,
  useMediaQuery,
} from '@material-ui/core';
import ProductDisplay from '../components/landing/ProductDisplay';
import SuccessPage from '../components/landing/SuccessPage';
import CancelPage from '../components/landing/CancelPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRequest } from '../hooks/use-request';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import StackedBarLanding from '../components/analytics/StackedBarLanding';
import PieChartLanding from '../components/analytics/PieChartLanding';
import Link from '../src/ui/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 425,
    marginLeft: '1rem',
  },
  card: {
    height: '1rem',
    minWidth: 275,
    maxWidth: 425,
    marginLeft: '1rem',
    marginBottom: '0.5rem',
  },
  card2: {
    height: '1rem',
    minWidth: 275,
    maxWidth: 425,
    marginLeft: '1rem',
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
  },
  typo: {
    marginBottom: '1.25rem',
    fontWeight: 700,
    fontFamily: 'Quicksand',
    fontSize: 16,
  },
  typo2: {
    fontWeight: 700,
    fontFamily: 'Quicksand',
    fontSize: 19,
  },
  typo3: {
    fontWeight: 700,
    fontFamily: 'Quicksand',
    marginBottom: '2rem',
  },
}));

const LandingPage = ({ currentUser, customerStripe }) => {
  const [theSwitch, setSwitch] = useState(false);

  const matches = useMediaQuery('(min-width:880px)');

  const handleSwitch = () => {
    setSwitch(!theSwitch);
  };

  const handleSignUp = () => {};

  const classes = useStyles();
  console.log(customerStripe);

  return (
    <React.Fragment>
      <div>
        <div style={{ marginTop: '1rem' }}>
          {currentUser ? (
            <Typography align="center" className={classes.typo3}>
              You are Signed in!
            </Typography>
          ) : (
            <Typography align="center" className={classes.typo3}>
              You are not signed in
            </Typography>
          )}
        </div>

        <Grid
          container
          direction={matches ? 'row' : 'column'}
          justifyContent="center"
        >
          {matches ? (
            <React.Fragment>
              <Grid item xs={6}>
                <div style={{ marginBottom: '3rem' }} />
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#D0312D' }}
                />
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#4421af' }}
                />
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#FDE64B' }}
                />
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#50e991' }}
                />
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography variant="h2" component="h2" gutterBottom>
                      OlyUp
                    </Typography>

                    <Typography
                      variant="h5"
                      component="p"
                      className={classes.typo2}
                    >
                      A Data-Driven tool which helps you assess
                      <br />
                      and evaluate the quality of your training programs.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      href={'/auth/signup'}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        color="primary"
                        disableElevation
                        variant="contained"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
                <Card
                  className={classes.card2}
                  style={{ backgroundColor: '#50e991' }}
                />
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#FDE64B' }}
                />
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#4421af' }}
                />
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#D0312D' }}
                />
              </Grid>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Grid container justifyContent="center">
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#D0312D' }}
                />
              </Grid>
              <Grid container justifyContent="center">
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#4421af' }}
                />
              </Grid>
              <Grid container justifyContent="center">
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#FDE64B' }}
                />
              </Grid>
              <Grid container justifyContent="center">
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#50e991' }}
                />
              </Grid>
              <Grid container justifyContent="center">
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography variant="h2" component="h2" gutterBottom>
                      OlyUp
                    </Typography>

                    <Typography
                      variant="h5"
                      component="p"
                      className={classes.typo2}
                    >
                      A Data-Driven tool which helps you assess
                      <br />
                      and evaluate the quality of your training programs.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      href={'/auth/signup'}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        color="primary"
                        disableElevation
                        variant="contained"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
              <Grid container justifyContent="center">
                <Card
                  className={classes.card2}
                  style={{ backgroundColor: '#50e991' }}
                />
              </Grid>
              <Grid container justifyContent="center">
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#FDE64B' }}
                />
              </Grid>
              <Grid container justifyContent="center">
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#4421af' }}
                />
              </Grid>
              <Grid container justifyContent="center">
                <Card
                  className={classes.card}
                  style={{ backgroundColor: '#D0312D' }}
                />
              </Grid>
            </React.Fragment>
          )}

          {matches ? (
            <React.Fragment>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.typo}
                >
                  Demo Section
                </Typography>
                <Switch onClick={handleSwitch} />
                <Typography align="center" className={classes.typo}>
                  Hover Over Me.
                </Typography>
                <Card>
                  <div style={{ height: 400 }}>
                    {theSwitch ? (
                      <React.Fragment>
                        <Typography align="center" className={classes.typo}>
                          Exercise Types
                        </Typography>
                        <PieChartLanding />
                      </React.Fragment>
                    ) : (
                      <StackedBarLanding />
                    )}
                  </div>
                </Card>
              </Grid>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Grid container justifyContent="center">
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.typo}
                  style={{ marginBottom: '0.1rem', marginTop: '1rem' }}
                >
                  Demo Section
                </Typography>
              </Grid>
              <Grid container justifyContent="center">
                <Switch onClick={handleSwitch} />
              </Grid>
              <Grid container justifyContent="center">
                <div style={{ height: 400, width: 400 }}>
                  {theSwitch ? (
                    <React.Fragment>
                      <Typography align="center" className={classes.typo}>
                        Exercise Types
                      </Typography>
                      <PieChartLanding />
                    </React.Fragment>
                  ) : (
                    <StackedBarLanding />
                  )}
                </div>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </div>
    </React.Fragment>
  );
};

// '#00b7c7'
// This is the function that is going to be called whilst
// the page is first rendered - For data loading purposes for the server -- server side rendering problems
LandingPage.getInitialProps = async (context, client, currentUser) => {
  var customer;
  if (!currentUser) {
    customer = { data: '' };
  } else {
    if (currentUser.userType === 'Coach') {
      customer = await client.get(
        `/api/payments/retrieve-customers/${currentUser.email}`
      );
    } else {
      customer = { data: '' };
    }
  }

  return { customerStripe: customer.data };
};

export default LandingPage;
