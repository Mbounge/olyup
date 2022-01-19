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
  cellNumber,
  groupNumber,
}) => {
  const [effortCell, setEffortCell] = useState([]);
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
    'Weight (lbs/kg)',
    'Speed (m/s)',
    'Power (watts)',
    'Heart Rate (bpm)',
  ];

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setSelectedOption(options[index]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEffortChange = (e) => {
    setEffortCell([]);
    // if sets > some Num set it to lower number // control param -- TODO
    for (let i = 0; i < sets; i++) {
      setEffortCell((oldCell) => [
        ...oldCell,
        <InputCell
          key={i}
          effortCallback={effortCallBack}
          cellNumber={cellNumber}
          groupNumber={groupNumber}
          effortCellData={effortCellData}
          name={name}
          tally={i}
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

      // if we get anything that's not -1, that means the groupNumber exists in the array
      if (cellIndex >= 0) {
        //console.log(trainingSession.trainingSession[cellIndex]);
        // put exerciseName and sets into trainingSession
        trainingSession.trainingSession[cellIndex]['exerciseName'] =
          exerciseName;
        trainingSession.trainingSession[cellIndex]['sets'] = sets;

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
            trainingSession.trainingSession[cellIndex].effort.data[tallyIndex] =
              {
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
        console.log('CREATING CELLNUM');
        trainingSession.trainingSession.push({
          groupNumber: inputCell.input.groupNumber,
          cellNumber: inputCell.input.cellNumber,
          exerciseName: exerciseName,
          sets: sets,
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
          <div className={classes.div}>{effortCell}</div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EffortCell;
