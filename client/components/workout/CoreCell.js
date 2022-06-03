import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Divider,
  IconButton,
  TextField,
  Backdrop,
  Tooltip,
} from '@material-ui/core';
import Image from 'next/image';
import velocityImage from '../../src/ui/velocity_zones.jpg';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import RepCell from './RepCell';
import DistanceCell from './DistanceCell';
import EffortCell from './EffortCell';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import theme from '../../src/ui/theme';

/*
IMPORTANT - Maybe feature in next version of application
TODO: Allow people to delete cells and do a reshuffle in the trainingsession before info goes into DB
or go to the Analytics page
*/

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  root2: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    marginLeft: '0.2rem',
    marginTop: '0.2rem',
  },
  list: {
    padding: 0,
  },
  listTypo: {
    marginLeft: '0.5rem',
    fontWeight: 700,
    fontFamily: 'Quicksand',
    fontSize: 16,
  },
  listText: {
    margin: 0,
  },
  divider: {
    marginLeft: '3rem',
  },
  exerciseField: {
    marginRight: '2em',
  },
  exerciseInput: {
    '&&[class*="MuiOutlinedInput-root"]': {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: '2.5rem',
    },
  },
  listBox: {
    backgroundColor: theme.palette.primary.main,
  },
  setsField: {
    marginRight: '2em',
  },
  textField: {
    width: '5rem',
    marginRight: '1rem',
  },
  card: {
    width: '10%',
  },
  cardContent: {
    paddingTop: '0.5rem',
    paddingBottom: 0,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const CoreCell = ({
  parentCallback,
  groupCallback,
  exercises,
  warmup,
  cellNumber,
  groupNumber,
  letter,
  unmountMe,
}) => {
  const classes = useStyles();
  // The goal would to make this exerciseName like this "exe + exe + exe"
  const [exerciseName, setExerciseName] = useState('');
  const [repCell, setRepCell] = useState([]);
  const [openBack, setOpenBack] = useState(false);
  const [sets, setSets] = useState('');
  const [notes, setNotes] = useState('');
  const [repTotal, setRepTotal] = useState(0);
  const [avgEffort, setAvgEffort] = useState(0);
  const [distTotal, setDistTotal] = useState(0);
  const [durationTotal, setDurationTotal] = useState(0);
  const [heightTotal, setHeightTotal] = useState(0);
  const [timeTotal, setTimeTotal] = useState(0);
  const [weightTotal, setWeightTotal] = useState(0);
  const [velocity, setVelocity] = useState(false);
  const [searchItems, setSearchItems] = useState([]);
  const [exerciseNameCell, setExerciseNameCell] = useState([]);
  const [exerciseName2, setExerciseName2] = useState([]);
  const [exerciseNameFinal, setExerciseNameFinal] = useState([]);
  const [value2, setValue2] = useState('');
  const [keys, setKeys] = useState([]);

  // Data sent back to the parent
  const coreCellData = {
    cell: {
      groupNumber,
      cellNumber,
      exerciseName,
      sets,
    },
  };

  // cell --> resisIso, plyoIso --> Add time cell
  // TODO: -- install firestore exeProps
  const exeNames = [
    { name: 'squat', cell: 'resistance' },
    { name: '100m', cell: 'locomotion' },
    { name: 'box jump', cell: 'plyometric' },
  ];

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

  const handleCloseBack = () => {
    setOpenBack(false);
  };

  const handleToggleBack = () => {
    setOpenBack(!openBack);
  };

  const onNotesChange = (e) => {
    setNotes(e.target.value);

    const trainingSession = getLocalStorage('TrainingSession', 'value');

    // Bring us the girl and wipe away the debt
    if (typeof trainingSession.trainingSession !== undefined) {
      var cellIndex = trainingSession.trainingSession.findIndex(
        (obj) => obj.groupNumber == groupNumber && obj.cellNumber == cellNumber
      );

      if (cellIndex >= 0) {
        trainingSession.trainingSession[cellIndex]['coachNotes'] =
          e.target.value;
      }
    }

    setLocalStorage('TrainingSession', trainingSession);
  };

  const handleRepCellChange = (e) => {
    setRepCell([]);
    for (let i = 0; i < exerciseName2.length; i++) {
      setRepCell((oldCell) => [
        ...oldCell,
        <RepCell
          key={`reps${groupNumber}${cellNumber}${i}`}
          coreCallback={coreCallback}
          sets={sets}
          exe={exerciseName2[i]}
          warmup={warmup}
          exerciseName={exerciseName}
          exerciseName2={exerciseName2}
          exerciseNameFinal={exerciseNameFinal}
          notes={notes}
          cellNumber={cellNumber}
          groupNumber={groupNumber}
          exercises={exercises}
        />,
      ]);
    }
  };

  useEffect(() => {
    handleRepCellChange();
  }, [exerciseName2, sets]);

  const handleExerciseChange2 = (e) => {
    console.log('exerciseName');
    setExerciseName2(e);

    // handle deletion of trainSession -- groupNum and cellNum
    const trainingSession = getLocalStorage('TrainingSession', 'value');

    // Bring us the girl and wipe away the debt
    if (typeof trainingSession.trainingSession !== undefined) {
      var cellIndex = trainingSession.trainingSession.findIndex(
        (obj) => obj.groupNumber == groupNumber && obj.cellNumber == cellNumber
      );
      if (cellIndex >= 0) {
        if (e.length !== 0) {
          var list = [];

          for (const key in e) {
            list.push({ value: e[key], tally: key });
          }
          trainingSession.trainingSession[cellIndex].exerciseName2 = e;
          trainingSession.trainingSession[cellIndex].exerciseNameFinal = list;
          // need to filter out the exercise in reps if its there

          if (
            trainingSession.trainingSession[cellIndex].hasOwnProperty('reps')
          ) {
            // when we add exercises, all reps content is deleted for some reason

            trainingSession.trainingSession[cellIndex].reps = JSON.parse(
              JSON.stringify(
                Object.fromEntries(
                  Object.entries(
                    trainingSession.trainingSession[cellIndex].reps
                  ).filter(([key]) => e.includes(key))
                )
              )
            );
          }
        } else {
          console.log(`cellIndex ${cellIndex}`);
          trainingSession.trainingSession.splice(cellIndex, 1);
          console.log(trainingSession);
        }
      } else if (cellIndex == -1) {
        console.log('Couldnt find it (exercise)');
      }
      console.log(trainingSession);
      setLocalStorage('TrainingSession', trainingSession);
    }
  };

  const dynamicSearch = () => {
    return exercises.filter(
      (exercise) => exercise.ExerciseName.includes(value2) //exerciseName
    );
  };

  const handleDismiss = () => {
    unmountMe({ groupNumber, cellNumber });
    // still need to delete from trainingSession
    // Bring us the girl and wipe away the debt
    // this method of deleting is fine for one item
    const trainingSession = getLocalStorage('TrainingSession', 'value');

    if (typeof trainingSession.trainingSession !== undefined) {
      var cellIndex = trainingSession.trainingSession.findIndex(
        (obj) => obj.groupNumber == groupNumber && obj.cellNumber == cellNumber
      );
      if (cellIndex >= 0) {
        trainingSession.trainingSession.splice(cellIndex, 1);
      } else if (cellIndex == -1) {
        console.log('Couldnt find it (groupNumber)');
      }
      setLocalStorage('TrainingSession', trainingSession);
    }
  };

  const handleSetChange = (e) => {
    setSets(e.target.value);
    // handle deletion of trainSession -- groupNum and cellNum
    // TODO, there is a big problem here with reseting the groupNum
    const trainingSession = getLocalStorage('TrainingSession', 'value');

    // Bring us the girl and wipe away the debt
    if (typeof trainingSession.trainingSession !== undefined) {
      var cellIndex = trainingSession.trainingSession.findIndex(
        (obj) => obj.groupNumber == groupNumber && obj.cellNumber == cellNumber
      );
      if (cellIndex >= 0) {
        trainingSession.trainingSession.splice(cellIndex, 1);
      } else if (cellIndex == -1) {
        console.log('Couldnt find it (sets)');
      }
    }

    console.log(trainingSession.trainingSession);
    setLocalStorage('TrainingSession', trainingSession);
  };

  const dismissExerciseNameCell = (data) => {
    const keys2 = getLocalStorage('exekeys', []);
    // remove value from keys
    keys2.splice(
      keys2.indexOf(
        `exe${data.groupNumber}${data.cellNumber}${data.exerciseCellNumber}`
      ),
      1
    );
    setKeys(keys2);
    setLocalStorage('exekeys', keys2);
  };

  // channels update messages to create workout page
  const coreCallback = (variableCell) => {
    switch (variableCell.type) {
      case 'reps':
        setRepTotal(variableCell.value);
        break;
      case 'effort':
        // reminder that there is an option object in this case -- for measurements
        setAvgEffort(variableCell.value);
        if (variableCell.option === 'Speed (m/s)') {
          setVelocity(true);
        } else {
          setVelocity(false);
        }
        break;
      case 'distance':
        setDistTotal(variableCell.value);
        break;
      case 'duration':
        setDurationTotal(variableCell.value);
        break;
      case 'height':
        setHeightTotal(variableCell.value);
        break;
      case 'time':
        setTimeTotal(variableCell.value);
        break;
      case 'weight':
        setWeightTotal(variableCell.value);
        break;
      case 'exerciseName': // addition of complex exercises
        // might want to make exerciseName in trainingSession a list item

        const trainingSession = getLocalStorage('TrainingSession', 'value');

        if (typeof trainingSession.trainingSession !== undefined) {
          var cellIndex = trainingSession.trainingSession.findIndex(
            (obj) =>
              obj.groupNumber == variableCell.groupNumber &&
              obj.cellNumber == variableCell.cellNumber
          );

          // if we get anything that's not -1, that means the groupNumber exists in the array
          if (cellIndex >= 0) {
            if (
              trainingSession.trainingSession[cellIndex].hasOwnProperty(
                `exerciseName${variableCell.exerciseCellNumber}`
              )
            ) {
              trainingSession.trainingSession[cellIndex][
                `exerciseName${variableCell.exerciseCellNumber}`
              ] = variableCell.value;
            } else if (
              !trainingSession.trainingSession[cellIndex].hasOwnProperty(
                `exerciseName${variableCell.exerciseCellNumber}`
              )
            ) {
              trainingSession.trainingSession[cellIndex][
                `exerciseName${variableCell.exerciseCellNumber}`
              ] = variableCell.value;
            }
          } else if (cellIndex == -1) {
            console.log('CREATING CELLNUM ...');
            trainingSession.trainingSession.push({
              groupNumber: variableCell.groupNumber,
              cellNumber: variableCell.cellNumber,
              [`exerciseName${variableCell.exerciseCellNumber}`]:
                variableCell.value,
            });
          }
          setLocalStorage('TrainingSession', trainingSession);
        }

      default:
        break;
    }
  };

  // Bingo!!!! Got em!!!
  useEffect(() => {
    parentCallback({
      repTotal,
      avgEffort,
      distTotal,
      durationTotal,
      distTotal,
      timeTotal,
      weightTotal,
    });
    // handle repCell for loop stuff
  }, [
    repTotal,
    avgEffort,
    distTotal,
    durationTotal,
    heightTotal,
    weightTotal,
    timeTotal,
  ]);

  useEffect(() => {
    console.log(exerciseName2);
    setExerciseNameFinal([]); // reset
    var list = [];

    for (const key in exerciseName2) {
      //list.push({ value: exerciseName[key], tally: key });
      setExerciseNameFinal((old) => [
        ...old,
        { value: exerciseName2[key], tally: key },
      ]);
    }
    //console.log(list);
  }, [exerciseName2]);

  useEffect(() => {
    console.log(exerciseNameFinal);
  }, [exerciseNameFinal]);

  return (
    <React.Fragment key={'CoreCell'}>
      <List classes={{ root: classes.list }}>
        <ListItem disableGutters classes={{ root: classes.list }}>
          {repTotal ? (
            <ListItemText
              primary={`Reps: ${repTotal}`}
              classes={{ primary: classes.listTypo, root: classes.listText }}
            />
          ) : (
            void 0
          )}
          {avgEffort ? (
            <ListItemText
              primary={`AvgEffort: ${avgEffort}`}
              classes={{ primary: classes.listTypo, root: classes.listText }}
            />
          ) : (
            void 0
          )}
          {distTotal ? (
            <ListItemText
              primary={`Distance: ${distTotal}`}
              classes={{ primary: classes.listTypo, root: classes.listText }}
            />
          ) : (
            void 0
          )}
          {durationTotal ? (
            <ListItemText
              primary={`Duration: ${durationTotal}`}
              classes={{ primary: classes.listTypo, root: classes.listText }}
            />
          ) : (
            void 0
          )}
          {heightTotal ? (
            <ListItemText
              primary={`Height: ${heightTotal}`}
              classes={{ primary: classes.listTypo, root: classes.listText }}
            />
          ) : (
            void 0
          )}
          {timeTotal ? (
            <ListItemText
              primary={`Time: ${timeTotal}`}
              classes={{ primary: classes.listTypo, root: classes.listText }}
            />
          ) : (
            void 0
          )}
          {weightTotal ? (
            <ListItemText
              primary={`Weight: ${weightTotal}`}
              classes={{ primary: classes.listTypo, root: classes.listText }}
            />
          ) : (
            void 0
          )}
        </ListItem>
      </List>
      <Card
        style={{
          marginBottom: '1rem',
          borderRadius: 0,
          borderTop: 'solid',
          borderWidth: '0.1rem',
          borderColor: theme.palette.primary.main,
        }}
      >
        <CardContent classes={{ root: classes.cardContent }}>
          {/* ------- This is where i do my stuff (Size of grid is 1,2,9) ------- */}
          <Grid container>
            <Grid item xs={9}>
              <div>
                {keys
                  ? exerciseNameCell.map((cell) => {
                      return (
                        <div key={cell.key}>
                          {keys.includes(cell.key) ? cell : null}
                        </div>
                      );
                    })
                  : null}
              </div>
              <Autocomplete
                key={`exe${groupNumber}${cellNumber}0`}
                className={classes.exerciseInput}
                multiple
                id="tags-filled"
                options={searchItems.map((option) => option.ExerciseName)}
                freeSolo
                size="small"
                value={exerciseName2}
                onChange={(event, newValue) => {
                  handleExerciseChange2(
                    newValue.map((exercise, index) => exercise)
                  );
                }}
                inputValue={value2}
                onInputChange={(event, newValue) => {
                  // Managed to print out the values in each input change
                  setSearchItems(dynamicSearch());
                  setValue2(newValue);
                }}
                classes={{
                  root: classes.exerciseField,
                  inputRoot: classes.exerciseInput,
                  listbox: classes.listBox,
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="default"
                      label={option}
                      color="primary"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Exercises"
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                key={`sets${groupNumber}${cellNumber}`}
                label="Sets"
                name="sets"
                onChange={(event) => {
                  handleSetChange(event);
                }}
                placeholder="Sets"
                type="number"
                variant="outlined"
                size="small"
                className={classes.setsField}
                value={sets}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" alignItems="center">
            <Grid container direction="column" item xs={1}>
              <Grid item>
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {warmup ? letter : `${letter}${cellNumber}`}
                </Avatar>
                <IconButton
                  size="small"
                  onClick={handleDismiss}
                  style={{ marginLeft: '0.15rem', marginTop: '1rem' }}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>

            {/* ------- Make a list of the diffrent cells types to render MAKE USE OF EXERCISE ------- */}
            <Grid item xs={11}>
              {exercises.map(({ ExerciseName, cell }) => {
                if (exerciseName2) {
                  if (ExerciseName === exerciseName2[0]) {
                    if (cell === 'resistance') {
                      return (
                        <React.Fragment key={'resitance'}>
                          {repCell}
                          {velocity ? (
                            <Tooltip arrow title="Show Velocity Chart">
                              <Button
                                variant="contained"
                                disableElevation
                                color="primary"
                                onClick={handleToggleBack}
                              >
                                Velocity Chart
                              </Button>
                            </Tooltip>
                          ) : (
                            void 0
                          )}
                          <Backdrop
                            className={classes.backdrop}
                            open={openBack}
                            onClick={handleCloseBack}
                          >
                            <Image
                              src={velocityImage}
                              width={800}
                              height={250}
                            />
                          </Backdrop>
                          <EffortCell
                            key={`effort${groupNumber}${cellNumber}`}
                            coreCallback={coreCallback}
                            sets={sets}
                            warmup={warmup}
                            notes={notes}
                            exerciseName={exerciseName}
                            exerciseName2={exerciseName2}
                            exerciseNameFinal={exerciseNameFinal}
                            cellNumber={cellNumber}
                            groupNumber={groupNumber}
                          />
                        </React.Fragment>
                      );
                    } else if (cell === 'locomotion') {
                      return (
                        <React.Fragment key={'locomotion'}>
                          {/* ---------  ORIGINAL IDEA FOR LOCO - DURATIONCELL, DISTANCECELL, EFFORTCELL, ------- */}
                          <DistanceCell
                            key={`distance${groupNumber}${cellNumber}`}
                            coreCallback={coreCallback}
                            sets={sets}
                            warmup={warmup}
                            notes={notes}
                            exerciseName={exerciseName}
                            exerciseName2={exerciseName2}
                            exerciseNameFinal={exerciseNameFinal}
                            cellNumber={cellNumber}
                            groupNumber={groupNumber}
                          />
                          {velocity ? (
                            <Tooltip arrow title="Show Velocity Chart">
                              <Button
                                variant="contained"
                                disableElevation
                                color="primary"
                                onClick={handleToggleBack}
                              >
                                Velocity Chart
                              </Button>
                            </Tooltip>
                          ) : (
                            void 0
                          )}
                          <Backdrop
                            className={classes.backdrop}
                            open={openBack}
                            onClick={handleCloseBack}
                          >
                            <Image
                              src={velocityImage}
                              width={800}
                              height={250}
                            />
                          </Backdrop>
                          <EffortCell
                            key={`effort${groupNumber}${cellNumber}`}
                            coreCallback={coreCallback}
                            sets={sets}
                            notes={notes}
                            warmup={warmup}
                            exerciseName={exerciseName}
                            exerciseName2={exerciseName2}
                            exerciseNameFinal={exerciseNameFinal}
                            cellNumber={cellNumber}
                            groupNumber={groupNumber}
                          />
                        </React.Fragment>
                      );
                    } else if (cell === 'plyometric') {
                      return (
                        <React.Fragment key={'plyometric'}>
                          {/* ---------  ORIGINAL IDEA FOR PLYO - REPCELL, HEIGHTCELL, WEIGHTCELL, TIMECELL ------- */}
                          {repCell}
                        </React.Fragment>
                      );
                    }
                  }
                }
              })}
            </Grid>
            {/* ------ NOTES SECTION ----- */}
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <TextField
            variant="outlined"
            className={classes.exerciseField}
            size="small"
            multiline
            placeholder="Add Notes"
            style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
            value={notes}
            onChange={onNotesChange}
          />
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default CoreCell;

{
  /* <Autocomplete
                  key={`exe${groupNumber}${cellNumber}0`}
                  className={classes.exerciseInput}
                  freeSolo
                  size="small"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  classes={{
                    root: classes.exerciseField,
                    inputRoot: classes.exerciseInput,
                    listbox: classes.listBox,
                  }}
                  style={{ marginBottom: '1rem' }}
                  inputValue={exerciseName}
                  onInputChange={(event, newValue) => {
                    // Managed to print out the values in each input change
                    handleExerciseChange(newValue);
                  }}
                  options={searchItems.map((option) => option.ExerciseName)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Exercise"
                      variant="outlined"
                      multiline
                      placeholder="Exercise"
                      style={{ paddingBottom: 0 }}
                    />
                  )}
                /> */
}
