import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import { Card } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import InputCellEdit from './InputCellEdit';
import InputRangeEdit from './inputRangeEdit';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  textField: {
    height: '4rem',
    marginTop: '0.43rem',
  },
  list: { paddingTop: 0, paddingBottom: 0, height: '4rem' },
  listItem: {
    width: '3.8rem',
    height: '100%',
    borderRadius: '6px',
    padding: 0,
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
    '&:hover': {
      backgroundColor: '#0faf8f',
    },
  },
  grid: {
    backgroundColor: theme.palette.primary.main,
  },
  div: {
    marginLeft: '0.2rem',
  },
  menu: {
    backgroundColor: theme.palette.secondary.main,
  },
  menuItem: {
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
    '&:hover': {
      backgroundColor: '#0faf8f',
    },
  },
}));

const EffortCellEdit = ({
  coreCallback,
  sets,
  exerciseName,
  cellNumber,
  groupNumber,
  data,
  counterEffort,
}) => {
  const [effortCell, setEffortCell] = useState([]);
  const [effortCellRange, setEffortCellRange] = useState([]);
  const [calculation, setCalculation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [count, setCount] = useState(false);
  const name = 'effort';

  const effortCellData = {
    effortCell: {
      groupNumber,
      name,
      cellNumber,
      selectedOption,
      sets,
    },
  };

  var opt;

  /*
  
  Strength type - potential property to put in cell
  Starting Strength: 0.1 - 0.2 [> 1.3m/s]
  Speed/Strength: 0.3 - 0.4 [1.3 - 1 m/s]
  Strength/Speed: 0.5 - 0.6 [1 - 0.75 m/s]
  Accelerative Strength: 0.7 - 0.8 [0.75 - 0.5 m/s]
  Absolute Strength: 0.9 - 1 [< 0.5 m/s]

  */

  //TODO - On signup make the coaches let me know what they use lbs or kgs // doesnt matter
  const options = [
    'Percent (%)',
    'RPE (1-10)',
    'Weight (lbs/kg)',
    'Speed (m/s)',
    'Power (watts)',
    'Heart Rate (bpm)',
  ];

  // for toggling range bool in exercise cell
  const options2 = ['Speed (m/s)', 'Power (watts)', 'Heart Rate (bpm)'];

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setSelectedOption(options[index]);
    setAnchorEl(null);
    setCount(true);

    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');

    var cellIndex = trainingSessionEdit.findIndex((obj) => obj.id == data.id);

    if (cellIndex >= 0) {
      trainingSessionEdit[cellIndex].effortOption = options[index];

      if (options2.includes(options[index])) {
        trainingSessionEdit[cellIndex].range = true;
      } else {
        trainingSessionEdit[cellIndex].range = false;
      }
    } else if (cellIndex == -1) {
    }
    setLocalStorage('TrainingSessionEdit', trainingSessionEdit);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log('speed');
    console.log(data);
    if (data.effortOption === 'Speed (m/s)') {
      console.log('speed2');
      opt = 3;
      setSelectedIndex(3);
    }
  }, []);

  const handleEffortChange = (e) => {
    setEffortCell([]);
    setEffortCellRange([]);
    //console.log(opt);
    // if sets > some Num set it to lower number // control param -- TODO
    for (let i = 0; i < sets; i++) {
      setEffortCell((oldCell) => [
        ...oldCell,
        <InputCellEdit
          key={i}
          effortCallback={effortCallBack}
          cellNumber={cellNumber}
          groupNumber={groupNumber}
          effortCellData={effortCellData}
          name={name}
          edit={data.effort[i]}
          tally={i}
          data={data}
          counterEffort={counterEffort}
        />,
      ]);

      setEffortCellRange((oldCell) => [
        ...oldCell,
        <InputRangeEdit
          key={i}
          effortCallback={effortCallBack}
          cellNumber={cellNumber}
          groupNumber={groupNumber}
          effortCellData={effortCellData}
          name={name}
          tally={i}
          option={count ? options[selectedIndex] : options[opt]} // because usestate prolems
          edit={
            data.effortRange
              ? data.effortRange[i]
              : { min: 0, max: 0, tally: i }
          }
          data={data}
          counterEffort={counterEffort}
        />,
      ]);
    }
  };

  const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  };

  const getLocalStorage = (key, initialValue) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      return initialValue;
    }
  };

  const effortCallBack = (inputCell) => {
    console.log(inputCell);
    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');
    console.log(trainingSessionEdit);
    var cellIndex = trainingSessionEdit.findIndex(
      (obj) => obj.id == inputCell.input.id
    );

    // effortRange part if statement
    if (inputCell.input.option && inputCell.input.option === 'Speed (m/s)') {
      // must set trainingSession range prop to true
      if (cellIndex >= 0) {
        //console.log(trainingSession.trainingSession[cellIndex]);
        // put exerciseName and sets into trainingSession
        if (trainingSessionEdit[cellIndex].hasOwnProperty('effortRange')) {
          console.log('KOOL - effortRangeEdit');
          var tallyIndex = trainingSessionEdit[cellIndex].effortRange.findIndex(
            (obj) => obj.tally == inputCell.input.data.tally
          );
          if (tallyIndex >= 0) {
            trainingSessionEdit[cellIndex]['range'] = true;
            trainingSessionEdit[cellIndex].effortOption =
              options[selectedIndex];
            trainingSessionEdit[cellIndex].effortRange[tallyIndex] = {
              min: parseFloat(inputCell.input.data.min),
              max: parseFloat(inputCell.input.data.max),
              tally: inputCell.input.data.tally,
            };
          } else if (tallyIndex == -1) {
            // tally not there
            trainingSessionEdit[cellIndex]['range'] = true;
            trainingSessionEdit[cellIndex].effortOption =
              options[selectedIndex];
            trainingSessionEdit[cellIndex].effortRange.push({
              min: parseFloat(inputCell.input.data.min),
              max: parseFloat(inputCell.input.data.max),
              tally: inputCell.input.data.tally,
            });
          }
        } else if (
          !trainingSessionEdit[cellIndex].hasOwnProperty('effortRange')
        ) {
          console.log('IT AINT HERE!!!');
          trainingSessionEdit[cellIndex]['range'] = true;
          trainingSessionEdit[cellIndex]['effortOption'] =
            options[selectedIndex];
          trainingSessionEdit[cellIndex]['effortRange'] = [
            {
              min: parseFloat(inputCell.input.data.min),
              max: parseFloat(inputCell.input.data.max),
              tally: inputCell.input.data.tally,
            },
          ];
        }
      } else if (cellIndex == -1) {
        console.log('CREATING CELLNUM - EffortCellRange');
        trainingSession.trainingSession.push({
          groupNumber: inputCell.input.groupNumber,
          cellNumber: inputCell.input.cellNumber,
          range: true,
          effortRange: [
            {
              min: parseFloat(inputCell.input.data.min),
              max: parseFloat(inputCell.input.data.max),
              tally: inputCell.input.data.tally,
            },
          ],
          athleteId: data.athleteId,
          coachId: data.coachId,
          checkmark: data.checkmark,
          coachNotes: data.coachNotes,
          athleteNotes: data.athleteNotes,
          date: data.date,
          reps: data.reps,
          effortOption: options[selectedIndex],
          exerciseName: data.exerciseName,
          exerciseName2: data.exerciseName2,
          exerciseNameFinal: data.exerciseNameFinal,
          sets: data.sets,
        });
      }
    } else {
      if (cellIndex >= 0) {
        console.log('cellId is present in trainingSession');
        if (trainingSessionEdit[cellIndex].hasOwnProperty('effort')) {
          console.log('effort object is present');
          // now look for tally index
          var tallyIndex = trainingSessionEdit[cellIndex].effort.findIndex(
            (obj) => obj.tally == inputCell.input.data.tally
          );

          if (tallyIndex >= 0) {
            console.log('effort: tally index exists');
            trainingSessionEdit[cellIndex].effort[tallyIndex].value =
              inputCell.input.data.value;
            trainingSessionEdit[cellIndex]['effortOption'] =
              options[selectedIndex];
            trainingSessionEdit[cellIndex]['range'] = false;
          } else if (tallyIndex == -1) {
            console.log('effort: tally does not exist');
            trainingSessionEdit[cellIndex].effort.push(inputCell.input.data);
            trainingSessionEdit[cellIndex]['effortOption'] =
              options[selectedIndex];
            trainingSessionEdit[cellIndex]['range'] = false;
          }
        } else {
          console.log('effort object not present');
          trainingSessionEdit[cellIndex]['effort'] = [inputCell.input.data];
          trainingSessionEdit[cellIndex]['effortOption'] =
            options[selectedIndex];
          trainingSessionEdit[cellIndex]['range'] = false;
        }
      } else if (cellIndex == -1) {
        console.log('cellId effort not present in trainingSessionEdit');
        trainingSessionEdit.push({
          id: inputCell.input.id,
          groupNumber: inputCell.input.groupNumber,
          cellNumber: inputCell.input.cellNumber,
          athleteId: data.athleteId,
          coachId: data.coachId,
          checkmark: data.checkmark,
          coachNotes: data.coachNotes,
          athleteNotes: data.athleteNotes,
          date: data.date,
          effort: [inputCell.input.data],
          reps: data.reps,
          effortOption: options[selectedIndex],
          exerciseName: data.exerciseName,
          sets: data.sets,
          range: false,
        });
      }
    }

    setLocalStorage('TrainingSessionEdit', trainingSessionEdit);
  };

  useEffect(() => {
    //TODO: - Might want to adjust for changing option, without changing the input -- update trainingSession
    handleEffortChange();
    coreCallback({
      type: 'effort',
      value: calculation,
      option: options[selectedIndex],
    });
  }, [sets, selectedOption, calculation]);

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={1}>
          <Box alignItems="center">
            <List aria-label="Effort options" classes={{ root: classes.list }}>
              <ListItem
                button
                key={'options'}
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="Effort Cell"
                onClick={handleClickListItem}
                classes={{ button: classes.listItem }}
                disableGutters
              >
                <ListItemText
                  primary={options[selectedIndex]}
                  primaryTypographyProps={{ align: 'center' }}
                />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              classes={{ paper: classes.menu }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                  className={classes.menuItem}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <div className={classes.div}>
            {options[selectedIndex] === 'Speed (m/s)'
              ? effortCellRange
              : effortCell}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EffortCellEdit;
