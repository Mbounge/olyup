import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
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
          <Typography align="center" variant="h4">
            🌟 Helping you become more Data-Driven 🌟
          </Typography>
        </Grid>

        <Grid
          container
          item
          xs={12}
          style={{ marginBottom: '2rem' }}
          justifyContent="center"
        >
          <Card
            className={classes.root2}
            variant="outlined"
            style={{ width: '60%' }}
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
        <Grid container item xs={12} justifyContent="center">
          <Card style={{ height: 300, width: '60%' }}>
            <div style={{ height: 300 }}>
              <BarChartLanding />
            </div>
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
            className={classes.root3}
            variant="outlined"
            style={{ width: '60%' }}
          >
            <Typography align="center" variant="h5">
              {'The Software helps strength training professionals assess and'}
              <br />
              {'evaluate the effectiveness of their training programs by'}
              <br />
              {'dissecting them and revealing more information about them.'}
            </Typography>
          </Card>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Card style={{ height: 300, width: '60%' }}>
            <div style={{ height: 300 }}>
              <AreaChartLanding />
            </div>
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
            style={{ width: '60%' }}
          >
            <Typography align="center" variant="h5">
              {
                'All Information regarding biomechanics characteristics, exercise'
              }
              <br />
              {
                'prescription elements, physiological effects and training goals of'
              }
              <br />
              {'any training program, will be presented to YOU, to help YOU'}
              <br />
              {'understand, how YOU program for YOUR ATHLETES.'}
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
            className={classes.root3}
            variant="outlined"
            style={{ width: '80%' }}
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
