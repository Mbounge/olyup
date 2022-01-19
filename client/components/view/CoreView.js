import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import ResView1 from './ResView1';
import ResView2 from './ResView2';
import WarmView from './WarmView';
import WarmView2 from './WarmView2';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core';

import theme from '../../src/ui/theme';

// const data = [
//   {
//     id: '123',
//     exerciseName: 'back squat',
//     complex: [{ exercise: 'snatch', tally: 1 }],
//     sets: 1,
//     reps: [{ value: 6, tally: 0 }],
//     groupNumber: 1,
//     cellNumber: 1,
//     effort: [{ value: 60, tally: 0 }],
//     notes: ['Pause at Bottom'],
//     results: [],
//     checkmark: false,
//     userId: ['coachId', 'athleteId'],
//     session: 'uuid',
//     date: '2021-10-20T00:19:50.773Z',
//   },
//   {
//     id: '1234',
//     exerciseName: 'front squat',
//     complex: [{ exercise: 'snatch', tally: 1 }],
//     sets: 1,
//     reps: [{ value: 6, tally: 0 }],
//     groupNumber: 1,
//     cellNumber: 1,
//     effort: [{ value: 60, tally: 0 }],
//     notes: ['Pause at Bottom'],
//     results: [],
//     checkmark: false,
//     userId: ['coachId', 'athleteId'],
//     session: 'uuid2',
//     date: '2021-10-20T00:19:50.773Z',
//   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '1rem',
  },
  card: {
    width: '90%',
  },
  warmup: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
}));

const CoreView = ({ data }) => {
  const classes = useStyles();

  // Sort groupNumber and CellNumber - ascending!
  data.sort(function (a, b) {
    if (a.groupNumber === b.groupNumber) {
      return a.cellNumber - b.cellNumber;
    }
    return a.groupNumber - b.groupNumber;
  });

  // Sort CellNumber - ascending!
  // data.sort(function (a, b) {
  //   return a.cellNumber - b.cellNumber;
  // });

  // sort props with tally vars
  data.map((item) => {
    if (item.hasOwnProperty('results')) {
      item.results.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('reps')) {
      item.reps.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('effort')) {
      item.effort.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('distance')) {
      item.distance.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('time')) {
      item.time.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('weight')) {
      item.weight.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('height')) {
      item.height.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
    if (item.hasOwnProperty('complex')) {
      item.complex.sort(function (a, b) {
        return a.tally - b.tally;
      });
    }
  });

  console.log(data);

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="center"
        style={{ marginLeft: '2.3rem', marginBottom: '3rem' }}
      >
        <Grid item xs>
          {/* ------- This is a Group - start mapping data here ------- */}
          {/* ------- Make a condition or sort items, to look for items where cellnum and groupnum are the same ------- */}
          {/* ------- GroupNum and CellNum need to be sorted accordingly ------- */}
          <Card key={uuidv4()} className={classes.card}>
            <CardContent classes={{ root: classes.warmup }}>
              <Typography
                align="center"
                variant="h5"
                style={{ fontFamily: 'quicksand', fontWeight: 700 }}
              >
                Warm Up
              </Typography>
            </CardContent>
            <div>
              {data.map((cell, index) => {
                if (cell.groupNumber === 0) {
                  // need to start checking effort values to show appropriate viewCell

                  // are these values the same
                  const effort = cell.effort.every(
                    (val) => val.value === cell.effort[0].value
                  );
                  const reps = cell.reps.every(
                    (val) => val.value === cell.reps[0].value
                  );

                  if (reps && effort === true) {
                    return (
                      <div
                        key={`${index}${uuidv4()}`}
                        style={{
                          borderLeft: `1px solid ${theme.palette.secondary.main}`,
                          borderRight: `1px solid ${theme.palette.secondary.main}`,
                          borderBottom: `1px solid ${theme.palette.secondary.main}`,
                          borderRadius: '4px',
                        }}
                      >
                        <WarmView key={uuidv4} data={cell} />
                      </div>
                    );
                  } else {
                    var views = [];
                    for (let index = 0; index < cell.sets; index++) {
                      views.push(1);
                    }

                    cell['views'] = views;

                    return (
                      <div
                        key={`${index}${uuidv4()}`}
                        style={{
                          borderLeft: `1px solid ${theme.palette.secondary.main}`,
                          borderRight: `1px solid ${theme.palette.secondary.main}`,
                          borderBottom: `1px solid ${theme.palette.secondary.main}`,
                          borderRadius: '4px',
                        }}
                      >
                        <WarmView2 key={uuidv4()} data={cell} />
                      </div>
                    );
                  }
                }
              })}
            </div>
            <CardContent classes={{ root: classes.warmup }}>
              <Typography
                align="center"
                variant="h5"
                style={{ fontFamily: 'quicksand', fontWeight: 700 }}
              >
                Core Workout
              </Typography>
            </CardContent>
            <div>
              {data.map((cell, index) => {
                if (cell.groupNumber > 0) {
                  const effort = cell.effort.every(
                    (val) => val.value === cell.effort[0].value
                  );
                  const reps = cell.reps.every(
                    (val) => val.value === cell.reps[0].value
                  );

                  if (reps && effort === true) {
                    return (
                      <div
                        key={`${index}${uuidv4()}`}
                        style={{
                          borderLeft: `1px solid ${theme.palette.secondary.main}`,
                          borderRight: `1px solid ${theme.palette.secondary.main}`,
                          borderBottom: `1px solid ${theme.palette.secondary.main}`,
                          borderRadius: '4px',
                        }}
                      >
                        <ResView1 key={uuidv4()} data={cell} />
                      </div>
                    );
                  } else {
                    var views = [];
                    for (let index = 0; index < cell.sets; index++) {
                      views.push(1);
                    }

                    cell['views'] = views;

                    return (
                      <div
                        key={`${index}${uuidv4()}`}
                        style={{
                          borderLeft: `1px solid ${theme.palette.secondary.main}`,
                          borderRight: `1px solid ${theme.palette.secondary.main}`,
                          borderBottom: `1px solid ${theme.palette.secondary.main}`,
                          borderRadius: '4px',
                        }}
                      >
                        <ResView2 key={uuidv4()} data={cell} />
                      </div>
                    );
                  }
                }
              })}
            </div>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CoreView;
