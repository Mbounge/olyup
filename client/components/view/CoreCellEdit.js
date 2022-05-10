import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Image from 'next/image';
import {
  Button,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Backdrop,
} from '@material-ui/core';
import velocityImage from '../../src/ui/velocity_zones.jpg';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EffortCellEdit from './EffortCellEdit';
import DistanceCellEdit from './DistanceCellEdit';
import RepCellEdit from './RepCellEdit';

/*
IMPORTANT - Maybe feature in next version of application
TODO: Allow people to delete cells and do a reshuffle in the trainingsession before info goes into DB
or go to the Analytics page
*/

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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

const CoreCellEdit = ({
  parentCallback,
  groupCallback,
  editCallback,
  exercises,
  warmup,
  cellNumber,
  groupNumber,
  letter,
  unmountMe,
  data,
  bigData,
  dataResetCallback,
  journal,
}) => {
  const classes = useStyles();
  // The goal would to make this exerciseName like this "exe + exe + exe"
  const [exerciseName, setExerciseName] = useState('');

  const [value, setValue] = useState('');
  const [repCell, setRepCell] = useState([]);
  const [sets, setSets] = useState('');
  const [openBack, setOpenBack] = useState(false);
  const [velocity, setVelocity] = useState(false);
  const [notes, setNotes] = useState('');
  const [editCount, setEditCount] = useState(0);
  const [repTotal, setRepTotal] = useState(0);
  const [avgEffort, setAvgEffort] = useState(0);
  const [distTotal, setDistTotal] = useState(0);
  const [durationTotal, setDurationTotal] = useState(0);
  const [heightTotal, setHeightTotal] = useState(0);
  const [timeTotal, setTimeTotal] = useState(0);
  const [weightTotal, setWeightTotal] = useState(0);
  const [searchItems, setSearchItems] = useState([]);
  const [exerciseNameCell, setExerciseNameCell] = useState([]);
  const [exerciseNameCounter, setExerciseNameCounter] = useState(1);
  const [exerciseName2, setExerciseName2] = useState([]);
  const [exerciseNameFinal, setExerciseNameFinal] = useState([]);
  const [value2, setValue2] = useState('');
  const [keys, setKeys] = useState([]);
  const [counterRep, setCounterRep] = useState(0); // for resetting reps, effort cell nums to 0
  const [counterEffort, setCounterEffort] = useState(0); // for resetting reps, effort cell nums to 0
  const [counterDistance, setCounterDistance] = useState(0); // for resetting reps, effort cell nums to 0
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  // console.log(cellNumber);
  // console.log(groupNumber);
  // console.log(data);

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

  useEffect(() => {
    if (data.coachNotes) {
      setNotes(data.coachNotes);
    }
  }, []);

  const handleCloseBack = () => {
    setOpenBack(false);
  };

  const handleToggleBack = () => {
    setOpenBack(!openBack);
  };

  const onNotesChange = (e) => {
    setNotes(e.target.value);

    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');

    var cellIndex = trainingSessionEdit.findIndex((obj) => obj.id == data.id);

    if (cellIndex >= 0) {
      trainingSessionEdit[cellIndex].coachNotes = e.target.value;
    } else if (cellIndex == -1) {
      console.log('Couldnt find notes in (trainingSession Cell)');
    }

    setLocalStorage('TrainingSessionEdit', trainingSessionEdit);
  };

  const handleExerciseChange = (e) => {
    console.log(e);
    setExerciseName(e.toLowerCase());
    //setCounterRep(counterRep + 1);
    //setCounterEffort(counterEffort + 1);
    //setCounterDistance(counterDistance + 1);
    // handle deletion of trainSession -- groupNum and cellNum

    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');

    var cellIndex = trainingSessionEdit.findIndex((obj) => obj.id == data.id);

    if (cellIndex >= 0) {
      trainingSessionEdit[cellIndex].exerciseName = e;
    } else if (cellIndex == -1) {
      console.log('Couldnt find it (trainingSession Cell)');
    }

    setLocalStorage('TrainingSessionEdit', trainingSessionEdit);

    setSearchItems(dynamicSearch());
  };

  const handleRepCellChange = (e) => {
    setRepCell([]);
    for (let i = 0; i < exerciseName2.length; i++) {
      setRepCell((oldCell) => [
        ...oldCell,
        <RepCellEdit
          key={`reps${groupNumber}${cellNumber}${i}`}
          coreCallback={coreCallback}
          sets={sets}
          warmup={warmup}
          exerciseName={exerciseName}
          notes={notes}
          cellNumber={cellNumber}
          groupNumber={groupNumber}
          counterRep={counterRep}
          data={data}
          exe={exerciseName2[i]}
        />,
      ]);
    }
  };

  useEffect(() => {
    handleRepCellChange();
  }, [exerciseName2, sets]);

  const handleExerciseChange2 = (e) => {
    setExerciseName2(e);
    setCounterRep(counterRep + 1);
    setCounterEffort(counterEffort + 1);
    setCounterDistance(counterDistance + 1);

    // handle deletion of trainSession -- groupNum and cellNum
    const trainingSession = getLocalStorage('TrainingSessionEdit', 'value');

    // Bring us the girl and wipe away the debt
    if (typeof trainingSession !== undefined) {
      var cellIndex = trainingSession.findIndex((obj) => obj.id == data.id);
      if (cellIndex >= 0) {
        if (e.length !== 0) {
          var list = [];

          for (const key in e) {
            list.push({ value: e[key], tally: parseInt(key) });
          }
          trainingSession[cellIndex].exerciseName2 = e;
          trainingSession[cellIndex].exerciseNameFinal = list;
          // need to filter out the exercise in reps if its there

          if (trainingSession[cellIndex].hasOwnProperty('reps')) {
            trainingSession[cellIndex].reps = JSON.parse(
              JSON.stringify(
                Object.fromEntries(
                  Object.entries(trainingSession[cellIndex].reps).filter(
                    ([key]) => e.includes(key)
                  )
                )
              )
            );
          }
        } else {
          console.log(`cellIndex ${cellIndex}`);
          // just empty reps
          trainingSession[cellIndex].exerciseName2 = e;
          var list = [];

          for (const key in e) {
            list.push({ value: e[key], tally: parseInt(key) });
          }

          trainingSession[cellIndex].exerciseNameFinal = list;
          trainingSession[cellIndex].reps = JSON.parse(
            JSON.stringify(
              Object.fromEntries(
                Object.entries(trainingSession[cellIndex].reps).filter(
                  ([key]) => e.includes(key)
                )
              )
            )
          );
        }
      } else if (cellIndex == -1) {
        console.log('Couldnt find it (exercise)');
      }
      console.log(trainingSession);
      setLocalStorage('TrainingSessionEdit', trainingSession);
    }
  };

  const dynamicSearch = () => {
    return exercises.filter((exercise) =>
      exercise.ExerciseName.includes(exerciseName)
    );
  };

  const handleEdit = () => {
    editCallback({ edit: true });
    setOpen(false);

    // handle deletion of edits made
    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');
    var cellIndex = trainingSessionEdit.findIndex((obj) => obj.id == data.id);

    if (cellIndex >= 0) {
      trainingSessionEdit[cellIndex] = data;
    } else if (cellIndex == -1) {
      void 0;
    }

    setLocalStorage('TrainingSessionEdit', trainingSessionEdit);
  };

  const handleDelete = () => {
    setOpenDelete(false);

    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');

    var deleteIndex = trainingSessionEdit.findIndex((obj) => obj.id == data.id);

    if (deleteIndex >= 0) {
      trainingSessionEdit.splice(deleteIndex, 1);
    }

    setLocalStorage('TrainingSessionEdit', trainingSessionEdit);

    var cellIndex = bigData.findIndex((obj) => obj.id == data.id);
    console.log(cellIndex);

    if (cellIndex >= 0) {
      bigData.splice(cellIndex, 1);
    }

    dataResetCallback({ data: bigData });
  };

  const handleBackOpen = () => {
    setOpen(true);
  };

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleSetChange = (e) => {
    setSets(e.target.value);

    const trainingSessionEdit = getLocalStorage('TrainingSessionEdit', 'value');
    console.log(trainingSessionEdit);

    var cellIndex = trainingSessionEdit.findIndex((obj) => obj.id == data.id);

    if (cellIndex >= 0) {
      trainingSessionEdit[cellIndex].sets = parseInt(e.target.value);

      var listResults = [];

      for (let i = 0; i < parseInt(e.target.value); i++) {
        listResults.push({ value: 0, tally: i, metric: 0 });
      }

      // Delete tally items greater than set value
      if (trainingSessionEdit[cellIndex].hasOwnProperty('reps')) {
        trainingSessionEdit[cellIndex]['results'] = listResults;
        var objectKeys = Object.keys(trainingSessionEdit[cellIndex].reps);
        objectKeys.map((key) => {
          trainingSessionEdit[cellIndex].reps[key].data = JSON.parse(
            JSON.stringify(
              trainingSessionEdit[cellIndex].reps[key].data.filter(function (
                x
              ) {
                return x.tally <= e.target.value - 1;
              })
            )
          );
        });
        //counter for cell items to reset to default blank values
        setCounterRep(counterRep + 1);
      }
      if (trainingSessionEdit[cellIndex].hasOwnProperty('effort')) {
        trainingSessionEdit[cellIndex]['results'] = listResults;
        trainingSessionEdit[cellIndex].effort = JSON.parse(
          JSON.stringify(
            trainingSessionEdit[cellIndex].effort.filter(function (x) {
              return x.tally <= e.target.value - 1;
            })
          )
        );

        //counter for cell items to reset to default blank values
        setCounterEffort(counterEffort + 1);
      }
      if (trainingSessionEdit[cellIndex].hasOwnProperty('effortRange')) {
        trainingSessionEdit[cellIndex]['results'] = listResults;
        trainingSessionEdit[cellIndex].effortRange = JSON.parse(
          JSON.stringify(
            trainingSessionEdit[cellIndex].effortRange.filter(function (x) {
              return x.tally <= e.target.value - 1;
            })
          )
        );

        //counter for cell items to reset to default blank values
        setCounterEffort(counterEffort + 1);
      }
      if (trainingSessionEdit[cellIndex].hasOwnProperty('distance')) {
        trainingSessionEdit[cellIndex]['results'] = listResults;
        trainingSessionEdit[cellIndex].distance = JSON.parse(
          JSON.stringify(
            trainingSessionEdit[cellIndex].distance.filter(function (x) {
              return x.tally <= e.target.value - 1;
            })
          )
        );

        //counter for cell items to reset to default blank values
        setCounterDistance(counterDistance + 1);
      }
      setLocalStorage('TrainingSessionEdit', trainingSessionEdit);
    } else if (cellIndex == -1) {
      console.log('Couldnt find it (trainingSession Cell)');
    }

    setLocalStorage('TrainingSessionEdit', trainingSessionEdit);
    console.log(trainingSessionEdit);
  };

  const handleAddExerciseNameCell = () => {
    // set up keys over here
    console.log('ExerciseName added');
  };

  useEffect(() => {
    if (data.effortOption === 'Speed (m/s)') {
      setVelocity(true);
    } else {
      setVelocity(false);
    }
  }, []);

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

  // Backwards compatibility
  useEffect(() => {
    setExerciseName2([]);
    if (data) {
      setValue(data.exerciseName);
      setSets(data.sets);

      data.exerciseNameFinal.sort(function (a, b) {
        return a.tally - b.tally;
      });

      data.exerciseNameFinal.map((element) => {
        setExerciseName2((old) => [...old, element.value]);
      });
    }
  }, []);

  // Bingo!!!! Got em!!!
  // useEffect(() => {
  //   parentCallback({
  //     repTotal,
  //     avgEffort,
  //     distTotal,
  //     durationTotal,
  //     distTotal,
  //     timeTotal,
  //     weightTotal,
  //   });
  //   // handle repCell for loop stuff
  // }, [
  //   repTotal,
  //   avgEffort,
  //   distTotal,
  //   durationTotal,
  //   heightTotal,
  //   weightTotal,
  //   timeTotal,
  // ]);

  return (
    <React.Fragment key={'CoreCell'}>
      <CardContent classes={{ root: classes.cardContent }}>
        {/* ------- This is where i do my stuff (Size of grid is 1,2,9) ------- */}

        <Grid container>
          <Grid item xs={9}>
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
              <IconButton
                size="small"
                onClick={handleBackOpen}
                style={{ marginLeft: '0.15rem', marginTop: '1rem' }}
              >
                <ArrowBackIcon />
              </IconButton>
              {/**** Dismiss Button ****/}
              <IconButton
                size="small"
                onClick={handleDeleteOpen}
                style={{ marginLeft: '0.15rem', marginTop: '1rem' }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Done Editing?'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Make sure you save your edits first, otherwise your changes will
                not be taken into effect!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="secondary"
                variant="contained"
                disableElevation
              >
                No
              </Button>
              <Button
                onClick={handleEdit}
                color="secondary"
                autoFocus
                variant="contained"
                disableElevation
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openDelete}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Are you sure you want to delete?'}
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={handleDeleteClose}
                color="secondary"
                variant="contained"
                disableElevation
              >
                No
              </Button>
              <Button
                onClick={handleDelete}
                color="secondary"
                autoFocus
                variant="contained"
                disableElevation
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
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
                          <Image src={velocityImage} width={800} height={250} />
                        </Backdrop>
                        <EffortCellEdit
                          key={`effort${groupNumber}${cellNumber}`}
                          coreCallback={coreCallback}
                          sets={sets}
                          warmup={warmup}
                          notes={notes}
                          exerciseName={exerciseName}
                          cellNumber={cellNumber}
                          groupNumber={groupNumber}
                          counterEffort={counterEffort}
                          data={data}
                        />
                      </React.Fragment>
                    );
                  } else if (cell === 'locomotion') {
                    return (
                      <React.Fragment key={'locomotion'}>
                        {/* ---------  ORIGINAL IDEA FOR LOCO - DURATIONCELL, DISTANCECELL, EFFORTCELL, ------- */}
                        <DistanceCellEdit
                          key={`distance${groupNumber}${cellNumber}`}
                          coreCallback={coreCallback}
                          sets={sets}
                          warmup={warmup}
                          notes={notes}
                          exerciseName={exerciseName}
                          cellNumber={cellNumber}
                          groupNumber={groupNumber}
                          counterDistance={counterDistance}
                          data={data}
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
                          <Image src={velocityImage} width={800} height={250} />
                        </Backdrop>
                        <EffortCellEdit
                          key={`effort${groupNumber}${cellNumber}`}
                          coreCallback={coreCallback}
                          sets={sets}
                          notes={notes}
                          warmup={warmup}
                          exerciseName={exerciseName}
                          cellNumber={cellNumber}
                          groupNumber={groupNumber}
                          counterEffort={counterEffort}
                          data={data}
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
        </Grid>
      </CardContent>
    </React.Fragment>
  );
};

export default CoreCellEdit;
