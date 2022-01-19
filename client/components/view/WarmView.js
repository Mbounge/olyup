import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1rem',
  },
  textField: {
    width: '5rem',
    height: '3rem',
    marginTop: '0.43rem',
  },
}));

const WarmView = ({ data }) => {
  const classes = useStyles();

  return (
    <CardContent>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography>{data.exerciseName}</Typography>
        </Grid>
        <Grid container item xs={6} alignItems="center">
          <Grid item>
            <Typography>{`${data.sets} sets * ${data.reps[0].value} reps`}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default WarmView;
