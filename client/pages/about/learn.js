import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  useMediaQuery,
} from '@material-ui/core';
import Link from '../../src/ui/Link';

import BarChartLanding from '../../components/analytics/BarChartLanding';
import AreaChartLanding from '../../components/analytics/AreaChartLanding';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 276,
    maxWidth: 500,
  },
  root2: {
    marginLeft: '1rem',
    backgroundColor: 'rgba(51, 170, 51, 0.1)',
  },
  root3: {
    marginLeft: '1rem',
    backgroundColor: 'rgba(51, 40, 170, 0.1)',
  },
  root4: {
    marginLeft: '1rem',
    backgroundColor: 'rgba(51, 170, 51, 0.1)',
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
  bgWrap: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    zIndex: -1,
  },
  bgText: {
    margin: '0',
    fontSize: '2rem',
    lineHeight: '3rem',
    textAlign: 'center',
    paddingTop: '40vh',
    textShadow: '1px 1px 1px #3c5c5e',
  },
}));

const Learn = () => {
  const classes = useStyles();

  const matches = useMediaQuery('(min-width:880px)');

  const learn = (
    <React.Fragment>
      <div style={{ marginTop: '2rem' }} />
      <Grid container justifyContent="center">
        <Grid item xs={12} style={{ marginBottom: '2rem' }}>
          <Link href={'/'} style={{ textDecoration: 'none' }}>
            <Button disableElevation variant="contained" color="primary">
              Landing Page
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: '2rem' }}>
          <Typography align="center" variant={matches ? 'h4' : 'h5'}>
            🌟 Helping you become more Data-Driven 🌟
          </Typography>
        </Grid>

        <Grid
          container
          item
          xs={12}
          style={{ marginBottom: '2rem' }}
          justifyContent={matches ? 'flex-start' : 'center'}
        >
          <Card
            className={classes.root2}
            variant="outlined"
            style={{ width: matches ? '68%' : '100%' }}
          >
            <Typography align="center" variant="h5">
              {'OlyUp was designed for data-driven athletic professionals,'}
              <br />
              {'who like to use data to help inform '}
              <br />
              {'and enhance their decision making capabilities'}
            </Typography>
          </Card>
        </Grid>

        <Grid
          container
          item
          xs={12}
          style={{ marginBottom: '2rem', marginTop: '2rem' }}
          justifyContent={matches ? 'flex-end' : 'center'}
        >
          <Card
            className={classes.root3}
            variant="outlined"
            style={{ width: matches ? '68%' : '100%' }}
          >
            <Typography align="center" variant="h5">
              {'The Software helps strength training professionals assess'}
              <br />
              {'and'}
              <br />
              {'evaluate the effectiveness of their training programs'}
              <br />
              {'by'}
              <br />
              {'dissecting them and revealing more information about them.'}
            </Typography>
          </Card>
        </Grid>

        <Grid
          container
          item
          xs={12}
          style={{ marginBottom: '2rem', marginTop: '2rem' }}
          justifyContent={matches ? 'flex-start' : 'center'}
        >
          <Card
            className={classes.root4}
            variant="outlined"
            style={{ width: matches ? '68%' : '100%' }}
          >
            <Typography align="center" variant="h5">
              {'All Information regarding :'}
              <br />
              {'Biomechanics,'}
              <br />
              {'Exercise Prescription elements,'}
              <br />
              {'physiological effects,'}
              <br />
              {'training goals of any training program, will be presented'}
              <br />
              {'to YOU, to Help YOU'}
              <br />
              {'understand, how YOU program for YOUR ATHLETES 🏋️‍♂️'}
            </Typography>
          </Card>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{ marginBottom: '2rem', marginTop: '2rem' }}
          justifyContent="center"
        >
          <Card
            className={classes.root4}
            variant="outlined"
            style={{ width: matches ? '68%' : '100%' }}
          >
            <Typography align="center" variant="h5">
              {
                'When done adding your exercises, click the analytics buttons in'
              }
              <br />
              {
                'the workout creator and olyup will show you the inner workings of'
              }
              <br />
              {'the program you just entered.'}
            </Typography>
            <br />
            <Typography align="center" variant="h5">
              {'You will be able to assess how many exercises:'}
              <br />
              {'Targeted specific muscle and joint groups'}
              <br />
              {'Distributions between:'}
              <br />
              {'1. Push and Pull'}
              <br />
              {'2. Bilateral and Unilateral movements'}
              <br />
              {
                '3. Exercises types, such as resistance, stretches, plyometrics, core strength and more ...'
              }
              <br />
              <br />
              {'And many other interesting data points.'}
            </Typography>
          </Card>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <div style={{ height: 300, width: matches ? '68%' : '100%' }}>
            <BarChartLanding />
          </div>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{ marginBottom: '2rem', marginTop: '2rem' }}
          justifyContent="center"
        >
          <Card
            className={classes.root4}
            variant="outlined"
            style={{ width: matches ? '68%' : '100%' }}
          >
            <Typography align="center" variant="h5">
              {'Olyup also allows you to analyze overall training performance'}
              <br />
              {
                'results. You can easily keep track of your total volume, load and'
              }
              <br />
              {'personal records for each exercise.'}
            </Typography>
          </Card>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <div style={{ height: 300, width: matches ? '68%' : '100%' }}>
            <AreaChartLanding />
          </div>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{ marginBottom: '2rem', marginTop: '2rem' }}
          justifyContent="center"
        >
          <Card
            className={classes.root3}
            variant="outlined"
            style={{ width: matches ? '80%' : '100%' }}
          >
            <Typography align="center" variant="h5">
              {
                'Contact bo@olyup.ca to schedule a demo or get more information.'
              }
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return <React.Fragment>{learn}</React.Fragment>;
};

export default Learn;
