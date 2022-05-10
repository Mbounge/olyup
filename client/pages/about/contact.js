import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Switch,
  useMediaQuery,
} from '@material-ui/core';
import Link from '../../src/ui/Link';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 276,
    maxWidth: 500,
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

const Contact = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div style={{ marginTop: '2rem' }} />
      <Grid container justifyContent="center">
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h2" component="h2" gutterBottom>
              Contact Details
            </Typography>

            <Typography variant="h5" component="p" className={classes.typo2}>
              If you have any questions or problems please do not hesistate to
              send your inquiries to:
              <br />
              <br />
              bo@olyup.ca
            </Typography>
          </CardContent>
          <CardActions>
            <Link href={'/'} style={{ textDecoration: 'none' }}>
              <Button color="primary" disableElevation variant="contained">
                Home
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default Contact;
