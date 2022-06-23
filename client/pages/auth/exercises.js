import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {
  Snackbar,
  TextField,
  CardContent,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditExerciseProps from '../../components/workout/EditExerciseProps';
import MuiAlert from '@material-ui/lab/Alert';
import Router from 'next/router';
import theme from '../../src/ui/theme';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  warmup: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
    height: '3rem',
    paddingTop: '0.5rem',
  },
  warmup2: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
    height: '2rem',
    paddingTop: '0.1rem',
    marginBottom: '0.3rem',
  },
  textField: {
    height: '1rem',
  },
});

const ManageExercises = ({ coachInfo }) => {
  const [edit, setEdit] = useState(false);
  const [exerciseProps, setExerciseProps] = useState([]);
  const [library, setLibrary] = useState(coachInfo.library);

  //console.log(coachInfo);

  const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  };

  const handleEditClick = (e, row) => {
    //console.log(row);
    setEdit(true);
    setLocalStorage('content', row);
    setExerciseProps((oldCell) => [
      <EditExerciseProps
        key={row.ExerciseName}
        value={edit}
        coachInfo={coachInfo}
        EditCallback={EditCallback}
        content={row}
        exercisePropsCallback={exercisePropsCallback}
      />,
    ]);
  };

  const exercisePropsCallback = (props) => {
    setLibrary(props.exercise.data[0].library);
  };

  const EditCallback = () => {
    setEdit(false);
  };

  const classes = useStyles();

  const ManageExerciseView = (
    <React.Fragment>
      <div style={{ marginTop: '2.2rem' }} />
      <Typography variant="h5" align="center">
        Custom Exercises
      </Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Exercise</TableCell>

              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {library.map((row, index) => (
              <TableRow key={`${index}${row.ExerciseName}${index}`}>
                <TableCell component="th" scope="row">
                  <Typography variant="h6">{row.ExerciseName}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={(e) => handleEditClick(e, row)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div
        style={{
          visibility: edit ? 'hidden' : 'visible',
          height: edit ? 0 : '100%',
          weight: edit ? 0 : '100%',
        }}
      >
        {ManageExerciseView}
      </div>
      <div style={{ visibility: edit ? 'visible' : 'hidden' }}>
        {exerciseProps}
      </div>
    </React.Fragment>
  );
};

ManageExercises.getInitialProps = async (ctx, client, currentUser) => {
  // fetch coaches roster
  var coachData;
  // fetch coaches roster
  if (!currentUser) {
    coachData = [{ id: '', rosterTeam: [], rosterInd: [], rosterSearch: [] }];
  } else {
    const { data } = await client.get(`/api/athletic/${currentUser.id}`);
    coachData = data;
  }

  var customer;
  if (!currentUser) {
    customer = { data: '' };
  } else {
    if (currentUser.userType === 'Coach') {
      // customer = await client.get(
      //   `/api/payments/retrieve-customers/${currentUser.email}`
      // );
      customer = { data: '' };
    } else {
      customer = { data: '' };
    }
  }

  return { coachInfo: coachData[0], customerStripe: customer.data };
};

export default ManageExercises;
