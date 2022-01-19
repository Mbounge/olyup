import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import theme from '../../src/ui/theme';

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

const options = {
  'Percent (%)': '%',
  'Weight (lbs/kg)': 'lbs/kg',
  'Speed (m/s)': 'm/s',
  'Power (watts)': 'watts',
  'Heart Rate (bpm)': 'bpm',
};

const WarmView2 = ({ data }) => {
  const classes = useStyles();

  return (
    <CardContent key={uuidv4()}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography>{data.exerciseName}</Typography>
        </Grid>
        <Grid container item xs={6} key={uuidv4()}>
          {data.views.map((item, index) => {
            return (
              <React.Fragment key={`${item}${index}${uuidv4()}`}>
                <Grid
                  item
                  xs={12}
                  style={{
                    borderBottom: `1px solid ${theme.palette.secondary.main}`,
                  }}
                >
                  <Typography>{`${data.reps[index].value} reps @ ${
                    data.effort[index].value
                  }${options[data.effortOption]}`}</Typography>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default WarmView2;
