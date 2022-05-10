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
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import InputCell from './InputCell';
import InputRange from '../view/inputRange';
import theme from '../../src/ui/theme';

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

const EffortCell = ({
  coreCallback,
  sets,
  exerciseName,
  exerciseName2,
  exerciseNameFinal,
  cellNumber,
  groupNumber,
}) => {
  const [effortCell, setEffortCell] = useState([]);
  const [effortCellRange, setEffortCellRange] = useState([]);
  const [calculation, setCalculation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
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
    `RPE  : (1-10)`,
    'Weight (lbs/kg)',
    'Speed (m/s)',
    'Power (watts)',
    'Heart Rate (bpm)',
  ];

  const options2 = ['Speed (m/s)', 'Power (watts)', 'Heart Rate (bpm)'];

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setSelectedOption(options[index]);
    setAnchorEl(null);

    const trainingSession = getLocalStorage('TrainingSession', 'value');

    if (typeof trainingSession.trainingSession !== undefined) {
      var cellIndex = trainingSession.trainingSession.findIndex(
        (obj) => obj.groupNumber == groupNumber && obj.cellNumber == cellNumber
      );

      if (cellIndex >= 0) {
        trainingSession.trainingSession[cellIndex].effortOption =
          options[index];

        if (options2.includes(options[index])) {
          trainingSession.trainingSession[cellIndex].range = true;
        } else {
          trainingSession.trainingSession[cellIndex].range = false;
        }
      } else if (cellIndex == -1) {
      }
      setLocalStorage('TrainingSession', trainingSession);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEffortChange = (e) => {
    setEffortCell([]);
    setEffortCellRange([]);
    // if sets > some Num set it to lower number // control param -- TODO
    for (let i = 0; i < sets; i++) {
      setEffortCell((oldCell) => [
        ...oldCell,
        <InputCell
          key={i}
          effortCallback={effortCallBack}
          exerciseName={exerciseName}
          exerciseName2={exerciseName2}
          exerciseNameFinal={exerciseNameFinal}
          cellNumber={cellNumber}
          groupNumber={groupNumber}
          effortCellData={effortCellData}
          name={name}
          tally={i}
          option={options[selectedIndex]}
        />,
      ]);

      setEffortCellRange((oldCell) => [
        ...oldCell,
        <InputRange
          key={i}
          effortCallback={effortCallBack}
          exerciseName={exerciseName}
          exerciseName2={exerciseName2}
          exerciseNameFinal={exerciseNameFinal}
          cellNumber={cellNumber}
          groupNumber={groupNumber}
          effortCellData={effortCellData}
          name={name}
          tally={i}
          option={options[selectedIndex]}
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
      console.log(`VALUE ${value}`);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      return initialValue;
    }
  };

  const effortCallBack = (inputCell) => {
    console.log(inputCell);

    const trainingSession = getLocalStorage('TrainingSession', 'value');

    if (typeof trainingSession.trainingSession !== undefined) {
      var cellIndex = trainingSession.trainingSession.findIndex(
        (obj) =>
          obj.groupNumber == inputCell.input.groupNumber &&
          obj.cellNumber == inputCell.input.cellNumber
      );

      if (inputCell.input.option && inputCell.input.option === 'Speed (m/s)') {
        console.log('EffortCellRange');
        // must set trainingSession range prop to true
        if (cellIndex >= 0) {
          //console.log(trainingSession.trainingSession[cellIndex]);
          // put exerciseName and sets into trainingSession
          trainingSession.trainingSession[cellIndex]['exerciseName'] =
            exerciseName;
          trainingSession.trainingSession[cellIndex]['exerciseName2'] =
            exerciseName2;
          trainingSession.trainingSession[cellIndex]['exerciseNameFinal'] =
            exerciseNameFinal;
          trainingSession.trainingSession[cellIndex]['sets'] = sets;
          trainingSession.trainingSession[cellIndex]['range'] = true;

          if (
            trainingSession.trainingSession[cellIndex].hasOwnProperty(
              'effortRange'
            )
          ) {
            console.log('KOOL - effortRange');
            var tallyIndex = trainingSession.trainingSession[
              cellIndex
            ].effortRange.data.findIndex(
              (obj) => obj.tally == inputCell.input.data.tally
            );
            if (tallyIndex >= 0) {
              trainingSession.trainingSession[cellIndex].effortRange['option'] =
                options[selectedIndex];
              trainingSession.trainingSession[cellIndex].effortRange.data[
                tallyIndex
              ] = {
                min: inputCell.input.data.min,
                max: inputCell.input.data.max,
                tally: inputCell.input.data.tally,
              };
              // start of avg calculation
              // var data = 0;
              // trainingSession.trainingSession[cellIndex].effort.data.forEach(
              //   (item) => {
              //     data += parseInt(item.value);
              //   }
              // );
              // data = (data / sets).toFixed(2); // avg
              // setCalculation(data);
              // trainingSession.trainingSession[cellIndex].effortRange['calculation'] =
              //   data;
            } else if (tallyIndex == -1) {
              // tally not there
              trainingSession.trainingSession[cellIndex].effortRange['option'] =
                options[selectedIndex];
              trainingSession.trainingSession[cellIndex].effortRange.data.push({
                min: inputCell.input.data.min,
                max: inputCell.input.data.max,
                tally: inputCell.input.data.tally,
              });
              // start of avg calculation
              // var data = 0;
              // trainingSession.trainingSession[cellIndex].effort.data.forEach(
              //   (item) => {
              //     data += parseInt(item.value);
              //   }
              // );
              // data = (data / sets).toFixed(2); // avg
              // setCalculation(data);
              // trainingSession.trainingSession[cellIndex].effort['calculation'] =
              //   data;
            }
          } else if (
            !trainingSession.trainingSession[cellIndex].hasOwnProperty('effort')
          ) {
            console.log('IT AINT HERE!!!');
            trainingSession.trainingSession[cellIndex]['effortRange'] = {
              option: options[selectedIndex],
              data: [
                {
                  min: inputCell.input.data.min,
                  max: inputCell.input.data.max,
                  tally: inputCell.input.data.tally,
                },
              ],
            };
            // var data = 0;
            // trainingSession.trainingSession[cellIndex].effort.data.forEach(
            //   (item) => {
            //     data += parseInt(item.value);
            //   }
            // );
            // data = (data / sets).toFixed(2); // avg
            // setCalculation(data);
            // trainingSession.trainingSession[cellIndex].effort['calculation'] =
            //   data;
          }
        } else if (cellIndex == -1) {
          console.log('CREATING CELLNUM - EffortCellRange');
          trainingSession.trainingSession.push({
            groupNumber: inputCell.input.groupNumber,
            cellNumber: inputCell.input.cellNumber,
            exerciseName: exerciseName,
            exerciseName2: exerciseName2,
            exerciseNameFinal: exerciseNameFinal,
            sets: sets,
            range: true,
            effortRange: {
              option: options[selectedIndex],
              data: [
                {
                  min: inputCell.input.data.min,
                  max: inputCell.input.data.max,
                  tally: inputCell.input.data.tally,
                },
              ],
            },
          });
        }
      } else {
        console.log('EffortCell');
        // must set trainingSession range prop to true
        // if we get anything that's not -1, that means the groupNumber exists in the array
        if (cellIndex >= 0) {
          //console.log(trainingSession.trainingSession[cellIndex]);
          // put exerciseName and sets into trainingSession
          trainingSession.trainingSession[cellIndex]['exerciseName'] =
            exerciseName;
          trainingSession.trainingSession[cellIndex]['exerciseName2'] =
            exerciseName2;
          trainingSession.trainingSession[cellIndex]['exerciseNameFinal'] =
            exerciseNameFinal;
          trainingSession.trainingSession[cellIndex]['sets'] = sets;
          trainingSession.trainingSession[cellIndex]['range'] = false;

          if (
            trainingSession.trainingSession[cellIndex].hasOwnProperty('effort')
          ) {
            console.log('KOOL');
            var tallyIndex = trainingSession.trainingSession[
              cellIndex
            ].effort.data.findIndex(
              (obj) => obj.tally == inputCell.input.data.tally
            );
            if (tallyIndex >= 0) {
              trainingSession.trainingSession[cellIndex].effort['option'] =
                options[selectedIndex];
              trainingSession.trainingSession[cellIndex].effort.data[
                tallyIndex
              ] = {
                value: inputCell.input.data.value,
                tally: inputCell.input.data.tally,
              };
              // start of avg calculation
              var data = 0;
              trainingSession.trainingSession[cellIndex].effort.data.forEach(
                (item) => {
                  data += parseInt(item.value);
                }
              );
              data = (data / sets).toFixed(2); // avg
              setCalculation(data);
              trainingSession.trainingSession[cellIndex].effort['calculation'] =
                data;
            } else if (tallyIndex == -1) {
              trainingSession.trainingSession[cellIndex].effort['option'] =
                options[selectedIndex];
              trainingSession.trainingSession[cellIndex].effort.data.push({
                value: inputCell.input.data.value,
                tally: inputCell.input.data.tally,
              });
              // start of avg calculation
              var data = 0;
              trainingSession.trainingSession[cellIndex].effort.data.forEach(
                (item) => {
                  data += parseInt(item.value);
                }
              );
              data = (data / sets).toFixed(2); // avg
              setCalculation(data);
              trainingSession.trainingSession[cellIndex].effort['calculation'] =
                data;
            }
          } else if (
            !trainingSession.trainingSession[cellIndex].hasOwnProperty('effort')
          ) {
            console.log('IT AINT HERE!!!');
            trainingSession.trainingSession[cellIndex]['effort'] = {
              option: options[selectedIndex],
              data: [
                {
                  value: inputCell.input.data.value,
                  tally: inputCell.input.data.tally,
                },
              ],
            };
            var data = 0;
            trainingSession.trainingSession[cellIndex].effort.data.forEach(
              (item) => {
                data += parseInt(item.value);
              }
            );
            data = (data / sets).toFixed(2); // avg
            setCalculation(data);
            trainingSession.trainingSession[cellIndex].effort['calculation'] =
              data;
          }
        } else if (cellIndex == -1) {
          console.log('CREATING CELLNUM - EffortCell');
          trainingSession.trainingSession.push({
            groupNumber: inputCell.input.groupNumber,
            cellNumber: inputCell.input.cellNumber,
            exerciseName: exerciseName,
            exerciseName2: exerciseName2,
            exerciseNameFinal: exerciseNameFinal,
            sets: sets,
            range: false,
            effort: {
              option: options[selectedIndex],
              data: [
                {
                  value: inputCell.input.data.value,
                  tally: inputCell.input.data.tally,
                },
              ],
              calculation: inputCell.input.data.value,
            },
          });
          setCalculation(inputCell.input.data.value);
        }
      }

      // effortRange part
      setLocalStorage('TrainingSession', trainingSession);
    }
  };

  useEffect(() => {
    //TODO: - Might want to adjust for changing option, without changing the input -- update trainingSession
    handleEffortChange();
    coreCallback({
      type: 'effort',
      value: calculation,
      option: options[selectedIndex],
    });
    console.log(selectedOption);
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

export default EffortCell;
