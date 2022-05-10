import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
} from '@material-ui/core';
import CoreCellEdit from './CoreCellEdit';
import { makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
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
  typo: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const options = {
  'Percent (%)': '%',
  'Weight (lbs/kg)': 'lbs/kg',
  'Speed (m/s)': 'm/s',
  'Power (watts)': 'watts',
  'Heart Rate (bpm)': 'bpm',
};

const WarmView2 = ({
  data,
  exercises,
  dataResetCallback,
  bigData,
  journal,
}) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const classes = useStyles();

  const handleEdit = () => {
    setEdit(!edit);
  };

  const editCallback = (variable) => {
    setEdit(!edit);
    //console.log(variable);
  };

  useEffect(() => {
    setName('');
    var string = '';
    data.exerciseNameFinal.sort(function (a, b) {
      return a.tally - b.tally;
    });
    data.exerciseNameFinal.map(function (element, index) {
      if (index === 0) {
        string += element.value;
      } else {
        string += ` + ${element.value}`;
      }
    });
    setName(string);
  }, []);

  return (
    <CardContent key={uuidv4()}>
      {edit ? (
        <CoreCellEdit
          exercises={exercises}
          data={data}
          editCallback={editCallback}
          cellNumber={data.cellNumber}
          groupNumber={data.groupNumber}
          dataResetCallback={dataResetCallback}
          bigData={bigData}
          journal={journal}
        />
      ) : (
        <Grid container alignItems="center">
          <Grid item xs={1}>
            <IconButton size="small" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <Typography>{name}</Typography>
          </Grid>
          <Grid container item xs={3} key={uuidv4()}>
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
                    {/*'todo: have a view for when effort is not defined'*/}
                    <Typography>{`${data.reps[index].value} reps @ ${
                      data.effort[index].value
                    }${options[data.effortOption]}`}</Typography>
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
          <Grid item xs={5}>
            <Typography align="right">{`${data.coachNotes}`}</Typography>
          </Grid>
        </Grid>
      )}
    </CardContent>
  );
};

export default WarmView2;
