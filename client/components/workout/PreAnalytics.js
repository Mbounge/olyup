import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import {
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Tooltip,
  useMediaQuery,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { Fab } from '@material-ui/core';
import FitnessIcon from '@material-ui/icons/FitnessCenter';
import { makeStyles } from '@material-ui/core';
import Body2 from './Body2';
import BarChart2 from '../analytics/BarChart2';
import PieChart2 from '../analytics/PieChart2';
import StackedBarChart3 from '../analytics/StackedBarChart3';
import StackedBarChart4 from '../analytics/StackedBarChart4';
import theme from '../../src/ui/theme';

// --------- import data sources ---------- //
import {
  forceData,
  exerciseTagsData,
  bodyStrengthData,
  bodyRegionData,
  resistanceData,
  exerciseTypeData,
  movementData,
  categoryData,
  equipmentData,
  technicalData,
  planeData,
  sideData,
  jointsData,
  musclesData,
  jointsActionData,
  jointsActionKeys,
  muscleColorData,
} from '../analytics/DataSources';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  align: {
    right: 'auto',
  },
  typography: {
    fontWeight: 700,
    fontFamily: 'Quicksand',
    fontSize: 22,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: '3.5rem',
    height: '4rem',
  },
  listItem: {
    width: '9.25rem',
    height: '100%',
    borderRadius: '6px',
    padding: 0,
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.8,
    '&:hover': {
      opacity: 1,
      backgroundColor: theme.palette.secondary.main,
    },
  },
  listItem2: {
    width: '10rem',
    height: '80%',
    borderRadius: '6px',
    padding: 0,
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
    '&:hover': {
      backgroundColor: '#0faf8f',
    },
  },
  listBox: {
    backgroundColor: theme.palette.primary.main,
  },
  menu: {
    backgroundColor: theme.palette.secondary.main,
  },
  menuItem: {
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.8,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      opacity: 1,
    },
  },
  fab: {
    margin: 0,
    zIndex: 1000,
    bottom: 50,
    right: 20,
    left: 'auto',
    position: 'fixed',
  },
}));

const PreAnalytics = ({
  value,
  analyticsCallback,
  exercises,
  universalBufferObjects,
  date,
  coachInfo,
  resetCallback,
}) => {
  const [analytics, setAnalytics] = useState(value);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [theSwitch, setTheSwitch] = useState(false);

  // data source states
  // 1st set of data source option states
  const [force, setForce] = useState(true);
  const [exeTags, setExeTags] = useState(false);
  const [bodyStr, setBodyStr] = useState(false);
  const [muscles, setMuscles] = useState(false);
  const [joints, setJoints] = useState(false);
  const [jAction, setJAction] = useState(false);
  const [equipment, setEquipment] = useState(false);

  // 2nd set of data source option states
  const [bodyReg, setBodyReg] = useState(true);
  const [cat, setCat] = useState(false);
  const [exeTypes, setExeTypes] = useState(false);
  const [res, setRes] = useState(false);
  const [plane, setPlane] = useState(false);
  const [tech, setTech] = useState(false);
  const [side, setSide] = useState(false);

  const [body1, setbody1] = useState(false);
  const [body2, setbody2] = useState(false);

  const matches = useMediaQuery('(min-width:880px)');
  const classes = useStyles();

  const createWorkout = () => {
    universalBufferObjects.map((athlete) => {
      // each athlete program gets a unique session object identifier
      // athlete contained userName and userId
      const session = uuidv4();
      trainingSession.trainingSession.map((exerciseCell) => {
        console.log(session);
        console.log(athlete);
        console.log(exerciseCell);
        // need to add coach option measurement pref
        var listResults = [];

        for (let i = 0; i < parseInt(exerciseCell.sets); i++) {
          listResults.push({
            value: 0,
            tally: i,
            metric: 0,
          });
        }

        if (exerciseCell.range === false) {
          axios
            .post('/api/exercise', {
              exerciseName: 'placeHolder',
              exerciseName2: exerciseCell.exerciseName2,
              exerciseNameFinal: exerciseCell.exerciseNameFinal,
              groupNumber: exerciseCell.groupNumber,
              cellNumber: exerciseCell.cellNumber,
              userName: athlete.userName,
              measurement: coachInfo.measurement,
              sets: parseInt(exerciseCell.sets),
              reps: exerciseCell.reps,
              effort: exerciseCell.effort ? exerciseCell.effort.data : [],
              effortOption: exerciseCell.effort
                ? exerciseCell.effort.option
                : 'Percent (%)',
              effortRange: [],
              coachId: coachInfo.userId,
              athleteId: athlete.id,
              results: listResults,
              session: session,
              date: trainingSession.date,
              coachNotes: exerciseCell.coachNotes || '',
              athleteNotes: '',
              range: exerciseCell.range,
              coachInfo: coachInfo,
            })
            .then((data) => {
              console.log('We created the program!');
            })
            .catch((err) => {
              console.log(err.response.data.errors);
            });
        } else {
          axios
            .post('/api/exercise', {
              exerciseName: 'placeHolder',
              exerciseName2: exerciseCell.exerciseName2,
              exerciseNameFinal: exerciseCell.exerciseNameFinal,
              groupNumber: exerciseCell.groupNumber,
              cellNumber: exerciseCell.cellNumber,
              userName: athlete.userName,
              measurement: coachInfo.measurement,
              sets: parseInt(exerciseCell.sets),
              reps: exerciseCell.reps,
              effort: [],
              effortRange: exerciseCell.effortRange
                ? exerciseCell.effortRange.data
                : [],
              effortOption: exerciseCell.effortRange
                ? exerciseCell.effortRange.option
                : 'Percent (%)',
              coachId: coachInfo.userId,
              athleteId: athlete.id,
              results: listResults,
              session: session,
              date: trainingSession.date,
              coachNotes: exerciseCell.coachNotes || '',
              athleteNotes: '',
              range: exerciseCell.range,
              coachInfo: coachInfo,
            })
            .then((data) => {
              console.log('We created the program!');
            })
            .catch((err) => {
              console.log(err.response.data.errors);
            });
        }
      });
    });
    resetCallback();
  };

  // chart names
  const options = [
    'Force Chart',
    'Overall Stats Chart',
    'Body Str Identifiers Chart',
    'Target Muscles Chart',
    'Joints Chart',
    'Joint Action Chart',
    'Equipment Chart',
  ]; // high data volume here

  const optionsMobile = [
    'Force Chart',
    'Overall Stats Chart',
    'Body Str Identifiers Chart',
    'Target Muscles Chart',
    'Joints Chart',
    'Joint Action Chart',
    'Equipment Chart',
    'Body Chart',
  ]; // high data volume here

  const optionsToolTips = [
    'Chart showing distributions between Push and Pull',
    'Chart showing overall statistics in the program',
    'Chart showing distribution of Major Muscle Groups and Joints',
    'Chart showing distributions of the Primary and Secondary Muscles, targeted in the Body',
    'Chart showing distributions of the Joints',
    'Chart showing distributions of Mobility (Not Working)',
    'Chart showing the distributions of the actions in the joints',
    'Chart showing distributions of equipement used',
  ];

  const options2 = [
    // lower data volumes here
    'Body Region Chart',
    'Category Chart',
    'Exercise Types Chart',
    'Resistance Types Chart',
    'Planes Chart',
    'Technical Demands Chart',
    'Sides Chart',
  ];

  const options2Mobile = [
    // lower data volumes here
    'Body Region Chart',
    'Category Chart',
    'Exercise Types Chart',
    'Resistance Types Chart',
    'Planes Chart',
    'Technical Demands Chart',
    'Sides Chart',
    'Body Chart',
  ];

  const options2ToolTips = [
    'Chart showing distributions between the lower, mid and upper sections of the body',
    'Chart showing distributions between Core, Power and Assistance exercises',
    'Chart showing distributions between Resistance, Plyometric and Locomotion exercises',
    'Chart showing distributions between the 4 resistance types : variable, machines, free weights and body weight',
    'Chart showing distributions between the different planes : transverse, sagittal, frontal',
    'Chart showing distributions of difficulty',
    'Chart showing distributions between Unilateral and Bilateral exercises',
  ];

  const getLocalStorage = (key, initialValue) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      return initialValue;
    }
  };

  const handleCloseDialog = () => {
    // picked no, in dialog
    setOpenDialog(false);
  };

  const handleCreateDialog = () => {
    // picked yes, in dialog - create
    // Reset everything on screen too!
    createWorkout();
    setOpenDialog(false);
    setAnalytics(false);
  };

  const handleClickListItem = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);

    return false;
  };
  const handleClickListItem2 = (event) => {
    event.preventDefault();
    setAnchorEl2(event.currentTarget);

    return false;
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
    return false;
  };

  const handleClickListItem3 = (event) => {
    event.preventDefault();
    setAnchorEl3(event.currentTarget);
  };

  const handleSwitchChange = (event) => {
    setTheSwitch(event.target.checked);
  };

  // data source picker1
  const handleMenuItemClick = (event, index) => {
    event.preventDefault();
    setSelectedIndex(index);
    setAnchorEl(null);
    setAnchorEl2(null);

    switch (index) {
      case 0:
        setForce(true); // remember to set false to rest of charts
        setExeTags(false);
        setBodyStr(false);
        setMuscles(false);
        setJoints(false);
        setJAction(false);
        setEquipment(false);
        setbody1(false);
        break;
      case 1:
        setExeTags(true);
        setForce(false);
        setBodyStr(false);
        setMuscles(false);
        setJoints(false);
        setJAction(false);
        setEquipment(false);
        setbody1(false);
        break;
      case 2:
        setBodyStr(true);
        setForce(false);
        setExeTags(false);
        setMuscles(false);
        setJoints(false);
        setJAction(false);
        setEquipment(false);
        setbody1(false);
        break;
      case 3:
        setMuscles(true);
        setForce(false);
        setExeTags(false);
        setBodyStr(false);
        setJoints(false);
        setJAction(false);
        setEquipment(false);
        setbody1(false);
        break;
      case 4:
        setJoints(true);
        setForce(false);
        setExeTags(false);
        setBodyStr(false);
        setMuscles(false);
        setJAction(false);
        setEquipment(false);
        setbody1(false);
        break;
      case 5:
        setJAction(true);
        setForce(false);
        setExeTags(false);
        setBodyStr(false);
        setMuscles(false);
        setJoints(false);
        setEquipment(false);
        setbody1(false);
        break;
      case 6:
        setEquipment(true);
        setJAction(false);
        setForce(false);
        setExeTags(false);
        setBodyStr(false);
        setMuscles(false);
        setJoints(false);
        setbody1(false);
        break;
      case 7:
        setEquipment(false);
        setJAction(false);
        setForce(false);
        setExeTags(false);
        setBodyStr(false);
        setMuscles(false);
        setJoints(false);
        setbody1(true);
        break;
      default:
        break;
    }
    return false;
  };

  // data source picker2
  const handleMenuItemClick2 = (event, index) => {
    event.preventDefault();
    setSelectedIndex2(index);
    setAnchorEl2(null);
    setAnchorEl3(null);

    switch (index) {
      case 0:
        setBodyReg(true);
        setCat(false);
        setExeTypes(false);
        setRes(false);
        setPlane(false);
        setTech(false);
        setSide(false);
        setbody2(false);
        break;
      case 1:
        setCat(true);
        setBodyReg(false);
        setExeTypes(false);
        setRes(false);
        setPlane(false);
        setTech(false);
        setSide(false);
        setbody2(false);
        break;
      case 2:
        setExeTypes(true);
        setBodyReg(false);
        setCat(false);
        setRes(false);
        setPlane(false);
        setTech(false);
        setSide(false);
        setbody2(false);
        break;
      case 3:
        setRes(true);
        setBodyReg(false);
        setCat(false);
        setExeTypes(false);
        setPlane(false);
        setTech(false);
        setSide(false);
        setbody2(false);
        break;
      case 4:
        setPlane(true);
        setBodyReg(false);
        setCat(false);
        setExeTypes(false);
        setRes(false);
        setTech(false);
        setSide(false);
        setbody2(false);
        break;
      case 5:
        setTech(true);
        setBodyReg(false);
        setCat(false);
        setExeTypes(false);
        setRes(false);
        setPlane(false);
        setSide(false);
        setbody2(false);
        break;
      case 6:
        setSide(true);
        setBodyReg(false);
        setCat(false);
        setExeTypes(false);
        setRes(false);
        setPlane(false);
        setTech(false);
        setbody2(false);
        break;
      case 6:
        setSide(false);
        setBodyReg(false);
        setCat(false);
        setExeTypes(false);
        setRes(false);
        setPlane(false);
        setTech(false);
        setbody2(true);
        break;
      default:
        break;
    }
    return false;
  };

  const handleClose = () => {
    setAnchorEl(null);
    return false;
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
    return false;
  };

  useEffect(() => {
    analyticsCallback(analytics);
  }, [analytics]);

  const onClick = () => {
    setAnalytics(!analytics);
  };

  const onClickCreate = () => {
    // switch for pre analytics page pop up
    //console.log(coach1);
    console.log(universalBufferObjects);
    setOpenDialog(true);
  };

  // --------------------------- Data Sources Creation -------------------------------- //

  // Mobility  false                                // Movement Type false
  // Body Strength Identifiers false                // Side Type false
  // Body Region  false                             // Category Type false
  // Exercise Tags false                            // Balance Strength false
  // Exercise Types false                           // Technical Demands false
  // Resistance Types false                         // Equipment false
  // Force Type false                               // Plane false
  // Joints false                                   // Muscles false

  // -------------------------- LET THERE BE CARNAGE!!! ------------------------------ //

  // 2 things i need to handle
  // does the data source already contain the name
  // does the data source not have the name in it

  const trainingSession = getLocalStorage('TrainingSession', 'value');

  // forceData,
  // exerciseTagsData, --> high
  // bodyStrengthData, --> high
  // bodyRegionData,
  // resistanceData,
  // exerciseTypeData,
  // movementData,
  // categoryData,
  // equipmentData,
  // technicalData,
  // planeData,
  // sideData,

  if (trainingSession) {
    // --------------- reset values ------------------ //
    forceData.splice(0, forceData.length);
    exerciseTagsData.splice(0, exerciseTagsData.length);
    bodyStrengthData.splice(0, bodyStrengthData.length);
    bodyRegionData.splice(0, bodyRegionData.length);
    resistanceData.splice(0, resistanceData.length);
    musclesData.splice(0, musclesData.length);
    jointsData.splice(0, jointsData.length);
    exerciseTypeData.splice(0, exerciseTypeData.length);
    movementData.splice(0, movementData.length);
    categoryData.splice(0, categoryData.length);
    equipmentData.splice(0, equipmentData.length);
    technicalData.splice(0, technicalData.length);
    planeData.splice(0, planeData.length);
    sideData.splice(0, sideData.length);
    jointsActionData.splice(0, jointsActionData.length);
    jointsActionKeys.splice(0, jointsActionKeys.length);
    muscleColorData.splice(0, muscleColorData.length);

    // ------------- Loop and populate data sources ---------------- //
    trainingSession.trainingSession.forEach((item) => {
      // i have calculation from the effort cell to use
      if (item.hasOwnProperty('exerciseName2')) {
        exercises.map((exercise) => {
          item.exerciseName2.map((exerciseName) => {
            if (exerciseName == exercise.ExerciseName) {
              //  ------------ Force Data Source --------------- //
              var forceIndex = forceData.findIndex(
                (obj) => obj.name == exercise['Force Type']
              );
              if (forceIndex >= 0) {
                forceData[forceIndex].value += 1;
              } else if (forceIndex == -1) {
                forceData.push({
                  name: exercise['Force Type'],
                  value: 1,
                });
              }

              // ------- Exercise Tags Data Source ------- //
              exercise['Exercise Tags'].map((tag) => {
                var tagIndex = exerciseTagsData.findIndex(
                  (obj) => obj.name == tag
                );
                if (tagIndex >= 0) {
                  exerciseTagsData[tagIndex].value += 1;
                } else if (tagIndex == -1) {
                  exerciseTagsData.push({ name: tag, value: 1 });
                }
              });

              // ------- Body Strength Id's Data Source ------- //
              exercise['Body Strength Identifiers'].map((id) => {
                var idIndex = bodyStrengthData.findIndex(
                  (obj) => obj.name == id
                );
                if (idIndex >= 0) {
                  bodyStrengthData[idIndex].value += 1;
                } else if (idIndex == -1) {
                  bodyStrengthData.push({ name: id, value: 1 });
                }
              });

              // ------- Body Region Data Source ------- //
              exercise['Body Region'].map((reg) => {
                var regIndex = bodyRegionData.findIndex(
                  (obj) => obj.name == reg
                );
                if (regIndex >= 0) {
                  bodyRegionData[regIndex].value += 1;
                } else if (regIndex == -1) {
                  bodyRegionData.push({ name: reg, value: 1 });
                }
              });

              // ------- Resistance Type Data Source ------- //
              exercise['Resistance Type'].map((res) => {
                var resIndex = resistanceData.findIndex(
                  (obj) => obj.name == res
                );
                if (resIndex >= 0) {
                  resistanceData[resIndex].value += 1;
                } else if (resIndex == -1) {
                  resistanceData.push({ name: res, value: 1 });
                }
              });

              // ------- Exercise Type Data Source ------- // - string
              var exeIndex = exerciseTypeData.findIndex(
                (obj) => obj.name == exercise['Exercise Type']
              );
              if (exeIndex >= 0) {
                exerciseTypeData[exeIndex].value += 1;
              } else if (exeIndex == -1) {
                exerciseTypeData.push({
                  name: exercise['Exercise Type'],
                  value: 1,
                });
              }

              // ------- Movement Type Data Source ------- // - string
              var movIndex = movementData.findIndex(
                (obj) => obj.name == exercise['Movement Type']
              );
              if (movIndex >= 0) {
                movementData[movIndex].value += 1;
              } else if (movIndex == -1) {
                movementData.push({
                  name: exercise['Movement Type'],
                  value: 1,
                });
              }

              // ------- Category Data Source ------- // - string
              var catIndex = categoryData.findIndex(
                (obj) => obj.name == exercise['Category']
              );
              if (catIndex >= 0) {
                categoryData[catIndex].value += 1;
              } else if (catIndex == -1) {
                categoryData.push({ name: exercise['Category'], value: 1 });
              }

              // ------- Equipment Data Source ------- //
              exercise['Equipment'].map((eqt) => {
                var eqtIndex = equipmentData.findIndex(
                  (obj) => obj.name == eqt
                );
                if (eqtIndex >= 0) {
                  equipmentData[eqtIndex].value += 1;
                } else if (eqtIndex == -1) {
                  equipmentData.push({ name: eqt, value: 1 });
                }
              });

              // ------- Technical Demands Data Source ------- // - string
              var techIndex = technicalData.findIndex(
                (obj) => obj.name == exercise['Technical Demands']
              );
              if (techIndex >= 0) {
                technicalData[techIndex].value += 1;
              } else if (techIndex == -1) {
                technicalData.push({
                  name: exercise['Technical Demands'],
                  value: 1,
                });
              }

              // ------- Plane Data Source ------- //
              exercise['Plane Type'].map((plane) => {
                var planeIndex = planeData.findIndex(
                  (obj) => obj.name == plane
                );
                if (planeIndex >= 0) {
                  planeData[planeIndex].value += 1;
                } else if (planeIndex == -1) {
                  planeData.push({ name: plane, value: 1 });
                }
              });

              // ------- Side Type Data Source ------- // - string
              var sideIndex = sideData.findIndex(
                (obj) => obj.name == exercise['Side Type']['Primary']
              );
              if (sideIndex >= 0) {
                sideData[sideIndex].value += 1;
              } else if (sideIndex == -1) {
                sideData.push({
                  name: exercise['Side Type']['Primary'],
                  value: 1,
                });
              }

              // ------- Muscle Type Data Source ------- //
              if (exercise['Muscles'].Bicep.bicep) {
                // deal with muscleColorData
                //const options = ['Percent %', 'Weight lbs/kg', 'Bar Speed', 'Peak Power'];
                var lBicepIndex = muscleColorData.findIndex(
                  (obj) => obj.id == 'lBicep'
                );
                var rBicepIndex = muscleColorData.findIndex(
                  (obj) => obj.id == 'rBicep'
                );

                if (item.hasOwnProperty('effort')) {
                  switch (item.effort.option) {
                    case 'Percent (%)':
                      if (lBicepIndex >= 0) {
                        muscleColorData[lBicepIndex].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (lBicepIndex == -1) {
                        muscleColorData.push({
                          id: 'lBicep',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      if (rBicepIndex >= 0) {
                        muscleColorData[rBicepIndex].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (rBicepIndex == -1) {
                        muscleColorData.push({
                          id: 'rBicep',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      break;
                    case 'Weight (lbs/kg)':
                      if (lBicepIndex >= 0) {
                        void 0;
                      } else if (lBicepIndex == -1) {
                        void 0;
                      }
                      if (rBicepIndex >= 0) {
                        void 0;
                      } else if (rBicepIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Speed (m/s)':
                      // Need to do the conversions for the speed
                      if (lBicepIndex >= 0) {
                        void 0;
                      } else if (lBicepIndex == -1) {
                        void 0;
                      }
                      if (rBicepIndex >= 0) {
                        void 0;
                      } else if (rBicepIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Power (watts)':
                      if (lBicepIndex >= 0) {
                        void 0;
                      } else if (lBicepIndex == -1) {
                        void 0;
                      }
                      if (rBicepIndex >= 0) {
                        void 0;
                      } else if (rBicepIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Heart Rate (bpm)':
                      if (lBicepIndex >= 0) {
                        void 0;
                      } else if (lBicepIndex == -1) {
                        void 0;
                      }
                      if (rBicepIndex >= 0) {
                        void 0;
                      } else if (rBicepIndex == -1) {
                        void 0;
                      }
                      break;
                    default:
                      break;
                  }
                }

                // muscleData - bicep
                if (exercise['Muscles'].Bicep.target) {
                  var tarMuscleIndexBicep = musclesData.findIndex(
                    (obj) => obj.name == 'bicep'
                  );
                  if (tarMuscleIndexBicep >= 0) {
                    if (
                      musclesData[tarMuscleIndexBicep].hasOwnProperty(
                        exercise['Muscles'].Bicep.target
                      )
                    ) {
                      musclesData[tarMuscleIndexBicep][
                        exercise['Muscles'].Bicep.target
                      ] += 1;
                    } else {
                      musclesData[tarMuscleIndexBicep][
                        exercise['Muscles'].Bicep.target
                      ] = 1;
                    }
                  } else if (tarMuscleIndexBicep == -1) {
                    musclesData.push({
                      name: 'bicep',
                      [exercise['Muscles'].Bicep.target]: 1,
                    });
                  }
                }
              }

              if (exercise['Muscles'].Tricep.tricep) {
                // deal with muscleColorData
                var lTricepIndex = muscleColorData.findIndex(
                  (obj) => obj.id == 'lTricep'
                );
                var rTricepIndex = muscleColorData.findIndex(
                  (obj) => obj.id == 'rTricep'
                );

                if (item.hasOwnProperty('effort')) {
                  switch (item.effort.option) {
                    case 'Percent (%)':
                      if (lTricepIndex >= 0) {
                        muscleColorData[lTricepIndex].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (lTricepIndex == -1) {
                        muscleColorData.push({
                          id: 'lTricep',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      if (rTricepIndex >= 0) {
                        muscleColorData[rTricepIndex].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (rTricepIndex == -1) {
                        muscleColorData.push({
                          id: 'rTricep',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      break;
                    case 'Weight (lbs/kg)':
                      if (lTricepIndex >= 0) {
                        void 0;
                      } else if (lTricepIndex == -1) {
                        void 0;
                      }
                      if (rTricepIndex >= 0) {
                        void 0;
                      } else if (rTricepIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Speed (m/s)':
                      // Need to do the conversions for the speed
                      if (lTricepIndex >= 0) {
                        void 0;
                      } else if (lTricepIndex == -1) {
                        void 0;
                      }
                      if (rTricepIndex >= 0) {
                        void 0;
                      } else if (rTricepIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Power (watts)':
                      if (lTricepIndex >= 0) {
                        void 0;
                      } else if (lTricepIndex == -1) {
                        void 0;
                      }
                      if (rTricepIndex >= 0) {
                        void 0;
                      } else if (rTricepIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Heart Rate (bpm)':
                      if (lTricepIndex >= 0) {
                        void 0;
                      } else if (lTricepIndex == -1) {
                        void 0;
                      }
                      if (rTricepIndex >= 0) {
                        void 0;
                      } else if (rTricepIndex == -1) {
                        void 0;
                      }
                      break;
                    default:
                      break;
                  }
                }

                if (exercise['Muscles'].Tricep.target) {
                  var tarMuscleIndexTricep = musclesData.findIndex(
                    (obj) => obj.name == 'tricep'
                  );
                  if (tarMuscleIndexTricep >= 0) {
                    if (
                      musclesData[tarMuscleIndexTricep].hasOwnProperty(
                        exercise['Muscles'].Tricep.target
                      )
                    ) {
                      musclesData[tarMuscleIndexTricep][
                        exercise['Muscles'].Tricep.target
                      ] += 1;
                    } else {
                      musclesData[tarMuscleIndexTricep][
                        exercise['Muscles'].Tricep.target
                      ] = 1;
                    }
                  } else if (tarMuscleIndexTricep == -1) {
                    musclesData.push({
                      name: 'tricep',
                      [exercise['Muscles'].Tricep.target]: 1,
                    });
                  }
                }
              }

              if (exercise['Muscles'].Chest.chest) {
                // deal with muscleColorData

                var chestIndex2 = muscleColorData.findIndex(
                  (obj) => obj.id == 'chest'
                );

                if (item.hasOwnProperty('effort')) {
                  switch (item.effort.option) {
                    case 'Percent (%)':
                      if (chestIndex2 >= 0) {
                        muscleColorData[chestIndex2].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (chestIndex2 == -1) {
                        muscleColorData.push({
                          id: 'chest',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      break;
                    case 'Weight (lbs/kg)':
                      if (chestIndex2 >= 0) {
                        void 0;
                      } else if (chestIndex2 == -1) {
                        void 0;
                      }
                      break;
                    case 'Speed (m/s)':
                      // Need to do the conversions for the speed
                      if (chestIndex2 >= 0) {
                        void 0;
                      } else if (chestIndex2 == -1) {
                        void 0;
                      }
                      break;
                    case 'Power (watts)':
                      if (chestIndex2 >= 0) {
                        void 0;
                      } else if (chestIndex2 == -1) {
                        void 0;
                      }
                      break;
                    case 'Heart Rate (bpm)':
                      if (chestIndex2 >= 0) {
                        void 0;
                      } else if (chestIndex2 == -1) {
                        void 0;
                      }
                      break;
                    default:
                      break;
                  }
                }

                if (exercise['Muscles'].Chest.target) {
                  var tarMuscleIndexChest = musclesData.findIndex(
                    (obj) => obj.name == 'chest'
                  );
                  if (tarMuscleIndexChest >= 0) {
                    if (
                      musclesData[tarMuscleIndexChest].hasOwnProperty(
                        exercise['Muscles'].Chest.target
                      )
                    ) {
                      musclesData[tarMuscleIndexChest][
                        exercise['Muscles'].Chest.target
                      ] += 1;
                    } else {
                      musclesData[tarMuscleIndexChest][
                        exercise['Muscles'].Chest.target
                      ] = 1;
                    }
                  } else if (tarMuscleIndexChest == -1) {
                    musclesData.push({
                      name: 'chest',
                      [exercise['Muscles'].Chest.target]: 1,
                    });
                  }
                }
              }

              if (exercise['Muscles'].Shoulder.shoulder) {
                // deal with muscleColorData
                var lShoulderIndex = muscleColorData.findIndex(
                  (obj) => obj.id == 'lShoulder'
                );
                var rShoulderIndex = muscleColorData.findIndex(
                  (obj) => obj.id == 'rShoulder'
                );

                if (item.hasOwnProperty('effort')) {
                  switch (item.effort.option) {
                    case 'Percent (%)':
                      if (lShoulderIndex >= 0) {
                        muscleColorData[lShoulderIndex].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (lShoulderIndex == -1) {
                        muscleColorData.push({
                          id: 'lShoulder',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      if (rShoulderIndex >= 0) {
                        muscleColorData[rShoulderIndex].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (rShoulderIndex == -1) {
                        muscleColorData.push({
                          id: 'rShoulder',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      break;
                    case 'Weight (lbs/kg)':
                      if (lShoulderIndex >= 0) {
                        void 0;
                      } else if (lShoulderIndex == -1) {
                        void 0;
                      }
                      if (rShoulderIndex >= 0) {
                        void 0;
                      } else if (rShoulderIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Speed (m/s)':
                      // Need to do the conversions for the speed
                      if (lShoulderIndex >= 0) {
                        void 0;
                      } else if (lShoulderIndex == -1) {
                        void 0;
                      }
                      if (rShoulderIndex >= 0) {
                        void 0;
                      } else if (rShoulderIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Power (watts)':
                      if (lShoulderIndex >= 0) {
                        void 0;
                      } else if (lShoulderIndex == -1) {
                        void 0;
                      }
                      if (rShoulderIndex >= 0) {
                        void 0;
                      } else if (rShoulderIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Heart Rate (bpm)':
                      if (lShoulderIndex >= 0) {
                        void 0;
                      } else if (lShoulderIndex == -1) {
                        void 0;
                      }
                      if (rShoulderIndex >= 0) {
                        void 0;
                      } else if (rShoulderIndex == -1) {
                        void 0;
                      }
                      break;
                    default:
                      break;
                  }
                }

                if (exercise['Muscles'].Shoulder.target) {
                  var tarMuscleIndexShoulder = musclesData.findIndex(
                    (obj) => obj.name == 'shoulder'
                  );
                  if (tarMuscleIndexShoulder >= 0) {
                    if (
                      musclesData[tarMuscleIndexShoulder].hasOwnProperty(
                        exercise['Muscles'].Shoulder.target
                      )
                    ) {
                      musclesData[tarMuscleIndexShoulder][
                        exercise['Muscles'].Shoulder.target
                      ] += 1;
                    } else {
                      musclesData[tarMuscleIndexShoulder][
                        exercise['Muscles'].Shoulder.target
                      ] = 1;
                    }
                  } else if (tarMuscleIndexShoulder == -1) {
                    musclesData.push({
                      name: 'shoulder',
                      [exercise['Muscles'].Shoulder.target]: 1,
                    });
                  }
                }
              }

              if (exercise['Muscles'].Core.core) {
                // deal with muscleColorData
                var coreIndex2 = muscleColorData.findIndex(
                  (obj) => obj.id == 'lAbs'
                );

                if (item.hasOwnProperty('effort')) {
                  switch (item.effort.option) {
                    case 'Percent (%)':
                      if (coreIndex2 >= 0) {
                        muscleColorData[coreIndex2].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (coreIndex2 == -1) {
                        muscleColorData.push({
                          id: 'lAbs',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      break;
                    case 'Weight (lbs/kg)':
                      if (coreIndex2 >= 0) {
                        void 0;
                      } else if (chestIndex2 == -1) {
                        void 0;
                      }
                      break;
                    case 'Speed (m/s)':
                      // Need to do the conversions for the speed
                      if (coreIndex2 >= 0) {
                        void 0;
                      } else if (coreIndex2 == -1) {
                        void 0;
                      }
                      break;
                    case 'Power (watts)':
                      if (coreIndex2 >= 0) {
                        void 0;
                      } else if (coreIndex2 == -1) {
                        void 0;
                      }
                      break;
                    case 'Heart Rate (bpm)':
                      if (coreIndex2 >= 0) {
                        void 0;
                      } else if (coreIndex2 == -1) {
                        void 0;
                      }
                      break;
                    default:
                      break;
                  }
                }

                if (exercise['Muscles'].Core.target) {
                  var tarMuscleIndexCore = musclesData.findIndex(
                    (obj) => obj.name == 'core'
                  );
                  if (tarMuscleIndexCore >= 0) {
                    if (
                      musclesData[tarMuscleIndexCore].hasOwnProperty(
                        exercise['Muscles'].Core.target
                      )
                    ) {
                      musclesData[tarMuscleIndexCore][
                        exercise['Muscles'].Core.target
                      ] += 1;
                    } else {
                      musclesData[tarMuscleIndexCore][
                        exercise['Muscles'].Core.target
                      ] = 1;
                    }
                  } else if (tarMuscleIndexCore == -1) {
                    musclesData.push({
                      name: 'core',
                      [exercise['Muscles'].Core.target]: 1,
                    });
                  }
                }
              }

              if (exercise['Muscles'].Glutes.glutes) {
                if (exercise['Muscles'].Glutes.target) {
                  var tarMuscleIndexGlutes = musclesData.findIndex(
                    (obj) => obj.name == 'glutes'
                  );
                  if (tarMuscleIndexGlutes >= 0) {
                    if (
                      musclesData[tarMuscleIndexGlutes].hasOwnProperty(
                        exercise['Muscles'].Glutes.target
                      )
                    ) {
                      musclesData[tarMuscleIndexGlutes][
                        exercise['Muscles'].Glutes.target
                      ] += 1;
                    } else {
                      musclesData[tarMuscleIndexGlutes][
                        exercise['Muscles'].Glutes.target
                      ] = 1;
                    }
                  } else if (tarMuscleIndexGlutes == -1) {
                    musclesData.push({
                      name: 'glutes',
                      [exercise['Muscles'].Glutes.target]: 1,
                    });
                  }
                }
              }

              if (exercise['Muscles'].Hamstring.hamstring) {
                // deal with muscleColorData
                var lHamIndex = muscleColorData.findIndex(
                  (obj) => obj.id == 'lHam'
                );
                var rHamIndex = muscleColorData.findIndex(
                  (obj) => obj.id == 'rHam'
                );

                if (item.hasOwnProperty('effort')) {
                  switch (item.effort.option) {
                    case 'Percent (%)':
                      if (lHamIndex >= 0) {
                        muscleColorData[lHamIndex].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (lHamIndex == -1) {
                        muscleColorData.push({
                          id: 'lHam',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      if (rHamIndex >= 0) {
                        muscleColorData[rHamIndex].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (rHamIndex == -1) {
                        muscleColorData.push({
                          id: 'rHam',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      break;
                    case 'Weight (lbs/kg)':
                      if (lHamIndex >= 0) {
                        void 0;
                      } else if (lHamIndex == -1) {
                        void 0;
                      }
                      if (rHamIndex >= 0) {
                        void 0;
                      } else if (rHamIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Speed (m/s)':
                      // Need to do the conversions for the speed
                      if (lHamIndex >= 0) {
                        void 0;
                      } else if (lHamIndex == -1) {
                        void 0;
                      }
                      if (rHamIndex >= 0) {
                        void 0;
                      } else if (rHamIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Power (watts)':
                      if (lHamIndex >= 0) {
                        void 0;
                      } else if (lHamIndex == -1) {
                        void 0;
                      }
                      if (rHamIndex >= 0) {
                        void 0;
                      } else if (rHamIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Heart Rate (bpm)':
                      if (lHamIndex >= 0) {
                        void 0;
                      } else if (lHamIndex == -1) {
                        void 0;
                      }
                      if (rHamIndex >= 0) {
                        void 0;
                      } else if (rHamIndex == -1) {
                        void 0;
                      }
                      break;
                    default:
                      break;
                  }
                }

                if (exercise['Muscles'].Hamstring.target) {
                  var tarMuscleIndexHam = musclesData.findIndex(
                    (obj) => obj.name == 'hamstrings'
                  );
                  if (tarMuscleIndexHam >= 0) {
                    if (
                      musclesData[tarMuscleIndexHam].hasOwnProperty(
                        exercise['Muscles'].Hamstring.target
                      )
                    ) {
                      musclesData[tarMuscleIndexHam][
                        exercise['Muscles'].Hamstring.target
                      ] += 1;
                    } else {
                      musclesData[tarMuscleIndexHam][
                        exercise['Muscles'].Hamstring.target
                      ] = 1;
                    }
                  } else if (tarMuscleIndexHam == -1) {
                    musclesData.push({
                      name: 'hamstrings',
                      [exercise['Muscles'].Hamstring.target]: 1,
                    });
                  }
                }
              }

              if (exercise['Muscles'].Quadriceps.quadriceps) {
                // deal with muscleColorData
                var lQuadIndex = muscleColorData.findIndex(
                  (obj) => obj.id == 'lQuad'
                );
                var rQuadIndex = muscleColorData.findIndex(
                  (obj) => obj.id == 'rQuad'
                );

                if (item.hasOwnProperty('effort')) {
                  switch (item.effort.option) {
                    case 'Percent (%)':
                      if (lQuadIndex >= 0) {
                        muscleColorData[lQuadIndex].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (lQuadIndex == -1) {
                        muscleColorData.push({
                          id: 'lQuad',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      if (rQuadIndex >= 0) {
                        muscleColorData[rQuadIndex].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (rQuadIndex == -1) {
                        muscleColorData.push({
                          id: 'rQuad',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      break;
                    case 'Weight (lbs/kg)':
                      if (lQuadIndex >= 0) {
                        void 0;
                      } else if (lQuadIndex == -1) {
                        void 0;
                      }
                      if (rQuadIndex >= 0) {
                        void 0;
                      } else if (rQuadIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Speed (m/s)':
                      // Need to do the conversions for the speed
                      if (lQuadIndex >= 0) {
                        void 0;
                      } else if (lQuadIndex == -1) {
                        void 0;
                      }
                      if (rQuadIndex >= 0) {
                        void 0;
                      } else if (rQuadIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Power (watts)':
                      if (lQuadIndex >= 0) {
                        void 0;
                      } else if (lQuadIndex == -1) {
                        void 0;
                      }
                      if (rQuadIndex >= 0) {
                        void 0;
                      } else if (rQuadIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Heart Rate (bpm)':
                      if (lQuadIndex >= 0) {
                        void 0;
                      } else if (lQuadIndex == -1) {
                        void 0;
                      }
                      if (rQuadIndex >= 0) {
                        void 0;
                      } else if (rQuadIndex == -1) {
                        void 0;
                      }
                      break;
                    default:
                      break;
                  }
                }

                if (exercise['Muscles'].Quadriceps.target) {
                  var tarMuscleIndexQuads = musclesData.findIndex(
                    (obj) => obj.name == 'quadriceps'
                  );
                  if (tarMuscleIndexQuads >= 0) {
                    if (
                      musclesData[tarMuscleIndexQuads].hasOwnProperty(
                        exercise['Muscles'].Quadriceps.target
                      )
                    ) {
                      musclesData[tarMuscleIndexQuads][
                        exercise['Muscles'].Quadriceps.target
                      ] += 1;
                    } else {
                      musclesData[tarMuscleIndexQuads][
                        exercise['Muscles'].Quadriceps.target
                      ] = 1;
                    }
                  } else if (tarMuscleIndexQuads == -1) {
                    musclesData.push({
                      name: 'quadriceps',
                      [exercise['Muscles'].Quadriceps.target]: 1,
                    });
                  }
                }
              }
              if (exercise['Muscles']['Lower Back']['lower back']) {
                if (exercise['Muscles']['Lower Back'].target) {
                  var tarMuscleIndexLBack = musclesData.findIndex(
                    (obj) => obj.name == 'lower back'
                  );
                  if (tarMuscleIndexLBack >= 0) {
                    if (
                      musclesData[tarMuscleIndexLBack].hasOwnProperty(
                        exercise['Muscles']['Lower Back'].target
                      )
                    ) {
                      musclesData[tarMuscleIndexLBack][
                        exercise['Muscles']['Lower Back'].target
                      ] += 1;
                    } else {
                      musclesData[tarMuscleIndexLBack][
                        exercise['Muscles']['Lower Back'].target
                      ] = 1;
                    }
                  } else if (tarMuscleIndexLBack == -1) {
                    musclesData.push({
                      name: 'lower back',
                      [exercise['Muscles']['Lower Back'].target]: 1,
                    });
                  }
                }
              }

              if (exercise['Muscles']['Upper Back']['upper back']) {
                if (exercise['Muscles']['Upper Back'].target) {
                  var tarMuscleIndexUBack = musclesData.findIndex(
                    (obj) => obj.name == 'upper back'
                  );
                  if (tarMuscleIndexUBack >= 0) {
                    if (
                      musclesData[tarMuscleIndexUBack].hasOwnProperty(
                        exercise['Muscles']['Upper Back'].target
                      )
                    ) {
                      musclesData[tarMuscleIndexUBack][
                        exercise['Muscles']['Upper Back'].target
                      ] += 1;
                    } else {
                      musclesData[tarMuscleIndexUBack][
                        exercise['Muscles']['Upper Back'].target
                      ] = 1;
                    }
                  } else if (tarMuscleIndexUBack == -1) {
                    musclesData.push({
                      name: 'upper back',
                      [exercise['Muscles']['Upper Back'].target]: 1,
                    });
                  }
                }
              }
              if (exercise['Muscles']['Lower Leg']['lower leg']) {
                // deal with muscleColorData
                var lCalfIndex = muscleColorData.findIndex(
                  (obj) => obj.id == 'lCalf'
                );
                var rCalfIndex = muscleColorData.findIndex(
                  (obj) => obj.id == 'rCalf'
                );

                if (item.hasOwnProperty('effort')) {
                  switch (item.effort.option) {
                    case 'Percent (%)':
                      if (lCalfIndex >= 0) {
                        muscleColorData[lCalfIndex].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (lCalfIndex == -1) {
                        muscleColorData.push({
                          id: 'lCalf',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      if (rCalfIndex >= 0) {
                        muscleColorData[rCalfIndex].value.push(
                          parseInt(item.effort.calculation)
                        );
                      } else if (rCalfIndex == -1) {
                        muscleColorData.push({
                          id: 'rCalf',
                          value: [parseInt(item.effort.calculation)],
                        });
                      }
                      break;
                    case 'Weight (lbs/kg)':
                      if (lCalfIndex >= 0) {
                        void 0;
                      } else if (lCalfIndex == -1) {
                        void 0;
                      }
                      if (rCalfIndex >= 0) {
                        void 0;
                      } else if (rCalfIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Speed (m/s)':
                      // Need to do the conversions for the speed
                      if (lCalfIndex >= 0) {
                        void 0;
                      } else if (lCalfIndex == -1) {
                        void 0;
                      }
                      if (rCalfIndex >= 0) {
                        void 0;
                      } else if (rCalfIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Power (watts)':
                      if (lCalfIndex >= 0) {
                        void 0;
                      } else if (lCalfIndex == -1) {
                        void 0;
                      }
                      if (rCalfIndex >= 0) {
                        void 0;
                      } else if (rCalfIndex == -1) {
                        void 0;
                      }
                      break;
                    case 'Heart Rate (bpm)':
                      if (lCalfIndex >= 0) {
                        void 0;
                      } else if (lCalfIndex == -1) {
                        void 0;
                      }
                      if (rCalfIndex >= 0) {
                        void 0;
                      } else if (rCalfIndex == -1) {
                        void 0;
                      }
                      break;
                    default:
                      break;
                  }
                }

                if (exercise['Muscles']['Lower Leg'].target) {
                  var tarMuscleIndexLLeg = musclesData.findIndex(
                    (obj) => obj.name == 'lower leg'
                  );
                  if (tarMuscleIndexLLeg >= 0) {
                    if (
                      musclesData[tarMuscleIndexLLeg].hasOwnProperty(
                        exercise['Muscles']['Lower Leg'].target
                      )
                    ) {
                      musclesData[tarMuscleIndexLLeg][
                        exercise['Muscles']['Lower Leg'].target
                      ] += 1;
                    } else {
                      musclesData[tarMuscleIndexLLeg][
                        exercise['Muscles']['Lower Leg'].target
                      ] = 1;
                    }
                  } else if (tarMuscleIndexLLeg == -1) {
                    musclesData.push({
                      name: 'lower leg',
                      [exercise['Muscles']['Lower Leg'].target]: 1,
                    });
                  }
                }
              }

              // ------- Joint Type Data Source ------- //
              if (exercise['Joints']['Ankle']['Ankle Strength']) {
                var ankleIndex = jointsData.findIndex(
                  (obj) => obj.name == 'ankle'
                );
                if (ankleIndex >= 0) {
                  jointsData[ankleIndex].value += 1;
                } else if (ankleIndex == -1) {
                  jointsData.push({
                    name: 'ankle',
                    value: 1,
                  });
                }
              }
              if (exercise['Joints']['Elbow']['Elbow Strength']) {
                var elbowIndex = jointsData.findIndex(
                  (obj) => obj.name == 'elbow'
                );
                if (elbowIndex >= 0) {
                  jointsData[elbowIndex].value += 1;
                } else if (elbowIndex == -1) {
                  jointsData.push({
                    name: 'elbow',
                    value: 1,
                  });
                }
              }
              if (exercise['Joints']['Knee']['Knee Strength']) {
                var kneeIndex = jointsData.findIndex(
                  (obj) => obj.name == 'knee'
                );
                if (kneeIndex >= 0) {
                  jointsData[kneeIndex].value += 1;
                } else if (kneeIndex == -1) {
                  jointsData.push({
                    name: 'knee',
                    value: 1,
                  });
                }
              }
              if (exercise['Joints']['Hip']['Hip Strength']) {
                var hipIndex = jointsData.findIndex((obj) => obj.name == 'hip');
                if (hipIndex >= 0) {
                  jointsData[hipIndex].value += 1;
                } else if (hipIndex == -1) {
                  jointsData.push({
                    name: 'hip',
                    value: 1,
                  });
                }
              }
              if (exercise['Joints']['Shoulder']['Shoulder Strength']) {
                var shoulderIndex = jointsData.findIndex(
                  (obj) => obj.name == 'shoulder'
                );
                if (shoulderIndex >= 0) {
                  jointsData[shoulderIndex].value += 1;
                } else if (shoulderIndex == -1) {
                  jointsData.push({
                    name: 'shoulder',
                    value: 1,
                  });
                }
              }
              if (exercise['Joints']['Spine']['Spine Strength']) {
                var spineIndex = jointsData.findIndex(
                  (obj) => obj.name == 'spine'
                );
                if (spineIndex >= 0) {
                  jointsData[spineIndex].value += 1;
                } else if (spineIndex == -1) {
                  jointsData.push({
                    name: 'spine',
                    value: 1,
                  });
                }
              }
              if (exercise['Joints']['Wrist']['Wrist Strength']) {
                var wristIndex = jointsData.findIndex(
                  (obj) => obj.name == 'wrist'
                );
                if (wristIndex >= 0) {
                  jointsData[wristIndex].value += 1;
                } else if (wristIndex == -1) {
                  jointsData.push({
                    name: 'wrist',
                    value: 1,
                  });
                }
              }

              // ------- Joint Action Data Source ------- // - need to populate datasource and keys

              if (exercise['Joints']['Ankle']['Ankle Strength']) {
                exercise['Joints']['Ankle'].action.map((action) => {
                  var actionAnkleKeyIndex = jointsActionKeys.findIndex(
                    (obj) => obj == action
                  );

                  if (actionAnkleKeyIndex == -1) {
                    jointsActionKeys.push(action);
                  }

                  var actionAnkleDataIndex = jointsActionData.findIndex(
                    (obj) => obj.name == 'ankle'
                  );
                  if (actionAnkleDataIndex >= 0) {
                    // now ankle name exists
                    var actIndex = jointsActionData.findIndex(
                      (obj) => obj.hasOwnProperty(action) && obj.name == 'ankle'
                    );
                    if (actIndex >= 0) {
                      jointsActionData[actIndex][action] += 1;
                    } else if (actIndex == -1) {
                      jointsActionData[actionAnkleDataIndex][action] = 1;
                    }
                  } else if (actionAnkleDataIndex == -1) {
                    jointsActionData.push({ name: 'ankle', [action]: 1 });
                  }
                });
              }
              // ------- Knee  ------- //
              if (exercise['Joints']['Knee']['Knee Strength']) {
                exercise['Joints']['Knee'].action.map((action) => {
                  var actionKneeKeyIndex = jointsActionKeys.findIndex(
                    (obj) => obj == action
                  );

                  if (actionKneeKeyIndex == -1) {
                    jointsActionKeys.push(action);
                  }

                  var actionKneeDataIndex = jointsActionData.findIndex(
                    (obj) => obj.name == 'knee'
                  );
                  if (actionKneeDataIndex >= 0) {
                    // now knee name exists
                    var act2Index = jointsActionData.findIndex(
                      (obj) => obj.hasOwnProperty(action) && obj.name == 'knee'
                    );
                    if (act2Index >= 0) {
                      jointsActionData[act2Index][action] += 1;
                    } else if (act2Index == -1) {
                      jointsActionData[actionKneeDataIndex][action] = 1;
                    }
                  } else if (actionKneeDataIndex == -1) {
                    jointsActionData.push({ name: 'knee', [action]: 1 });
                  }
                });
              }
              // ------- Elbow  ------- //
              if (exercise['Joints']['Elbow']['Elbow Strength']) {
                exercise['Joints']['Elbow'].action.map((action) => {
                  var actionElbowKeyIndex = jointsActionKeys.findIndex(
                    (obj) => obj == action
                  );

                  if (actionElbowKeyIndex == -1) {
                    jointsActionKeys.push(action);
                  }

                  var actionElbowDataIndex = jointsActionData.findIndex(
                    (obj) => obj.name == 'elbow'
                  );
                  if (actionElbowDataIndex >= 0) {
                    // now elbow name exists
                    var act3Index = jointsActionData.findIndex(
                      (obj) => obj.hasOwnProperty(action) && obj.name == 'elbow'
                    );
                    if (act3Index >= 0) {
                      jointsActionData[act3Index][action] += 1;
                    } else if (act3Index == -1) {
                      jointsActionData[actionElbowDataIndex][action] = 1;
                    }
                  } else if (actionElbowDataIndex == -1) {
                    jointsActionData.push({ name: 'elbow', [action]: 1 });
                  }
                });
              }
              // ------- Shoulder ------- //
              if (exercise['Joints']['Shoulder']['Shoulder Strength']) {
                exercise['Joints']['Shoulder'].action.map((action) => {
                  var actionShoulderKeyIndex = jointsActionKeys.findIndex(
                    (obj) => obj == action
                  );

                  if (actionShoulderKeyIndex == -1) {
                    jointsActionKeys.push(action);
                  }

                  var actionShoulderDataIndex = jointsActionData.findIndex(
                    (obj) => obj.name == 'shoulder'
                  );
                  if (actionShoulderDataIndex >= 0) {
                    // now shoulder name exists
                    var act4Index = jointsActionData.findIndex(
                      (obj) =>
                        obj.hasOwnProperty(action) && obj.name == 'shoulder'
                    );
                    if (act4Index >= 0) {
                      jointsActionData[act4Index][action] += 1;
                    } else if (act4Index == -1) {
                      jointsActionData[actionShoulderDataIndex][action] = 1;
                    }
                  } else if (actionShoulderDataIndex == -1) {
                    jointsActionData.push({ name: 'shoulder', [action]: 1 });
                  }
                });
              }
              // ------- Hip  ------- //
              if (exercise['Joints']['Hip']['Hip Strength']) {
                exercise['Joints']['Hip'].action.map((action) => {
                  var actionHipKeyIndex = jointsActionKeys.findIndex(
                    (obj) => obj == action
                  );

                  if (actionHipKeyIndex == -1) {
                    jointsActionKeys.push(action);
                  }
                  var actionHipDataIndex = jointsActionData.findIndex(
                    (obj) => obj.name == 'hip'
                  );
                  if (actionHipDataIndex >= 0) {
                    // now hip name exists
                    var act5Index = jointsActionData.findIndex(
                      (obj) => obj.hasOwnProperty(action) && obj.name == 'hip'
                    );
                    if (act5Index >= 0) {
                      jointsActionData[act5Index][action] += 1;
                    } else if (act5Index == -1) {
                      jointsActionData[actionHipDataIndex][action] = 1;
                    }
                  } else if (actionHipDataIndex == -1) {
                    jointsActionData.push({ name: 'hip', [action]: 1 });
                  }
                });
              }
              // ------- Wrist  ------- //
              // if (exercise['Joints']['Wrist']['Wrist Strength']) {
              //   exercise['Joints']['Wrist'].action.map((action) => {
              //     var actionWristKeyIndex = jointsActionKeys.findIndex(
              //       (obj) => obj == action
              //     );

              //     if (actionWristKeyIndex == -1) {
              //       jointsActionKeys.push(action);
              //     }

              //     var actionWristDataIndex = jointsActionData.findIndex(
              //       (obj) => obj.name == 'wrist'
              //     );
              //     if (actionWristDataIndex >= 0) {
              //       // now wrist name exists
              //       var act6Index = jointsActionData.findIndex(
              //         (obj) => obj.hasOwnProperty(action) && obj.name == 'wrist'
              //       );
              //       if (act6Index >= 0) {
              //         jointsActionData[act6Index][action] += 1;
              //       } else if (act6Index == -1) {
              //         jointsActionData[actionWristDataIndex][action] = 1;
              //       }
              //     } else if (actionWristDataIndex == -1) {
              //       jointsActionData.push({ name: 'wrist', [action]: 1 });
              //     }
              //   });
              // }
              // ------- Spine  ------- //
              if (exercise['Joints']['Spine']['Spine Strength']) {
                exercise['Joints']['Spine'].action.map((action) => {
                  var actionSpineKeyIndex = jointsActionKeys.findIndex(
                    (obj) => obj == action
                  );

                  if (actionSpineKeyIndex == -1) {
                    jointsActionKeys.push(action);
                  }

                  var actionSpineDataIndex = jointsActionData.findIndex(
                    (obj) => obj.name == 'spine'
                  );
                  if (actionSpineDataIndex >= 0) {
                    // now spine name exists
                    var act7Index = jointsActionData.findIndex(
                      (obj) => obj.hasOwnProperty(action) && obj.name == 'spine'
                    );
                    if (act7Index >= 0) {
                      jointsActionData[act7Index][action] += 1;
                    } else if (act7Index == -1) {
                      jointsActionData[actionSpineDataIndex][action] = 1;
                    }
                  } else if (actionSpineDataIndex == -1) {
                    jointsActionData.push({ name: 'spine', [action]: 1 });
                  }
                });
              }
            }
          });
        });
      }
    });
    // AVG AGGREGATION FOR EACH BODY PART IN MUSCLECOLORDATA
    muscleColorData.forEach((item) => {
      var total = 0;
      var num = 0;
      item.value.map((obj) => {
        total += obj;
        num += 1;
      });
      if (num > 0) {
        item.total = total / num; // ensures we have the avg in the list
      } else if (num === 0) {
        item.total = 0;
      }
    });
  }

  const preAnalytics = (
    <React.Fragment>
      <Grid container>
        <Grid
          item
          xs={6}
          style={{
            borderRight: `1px solid ${theme.palette.secondary.main}`,
            height: 500,
            width: 700,
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            style={{ paddingTop: '1rem' }}
          >
            <Grid item>
              <Tooltip arrow title={optionsToolTips[selectedIndex]}>
                <List
                  aria-label="Chart options"
                  classes={{ root: classes.list }}
                >
                  <ListItem
                    button
                    key={'options'}
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="Chart"
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
              </Tooltip>
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
            </Grid>
          </Grid>
          {/* ------------------ Charts ---------------- */}
          {force ? <BarChart2 data={forceData} /> : void 0}
          {exeTags ? (
            <BarChart2 data={exerciseTagsData} type={'exeTags'} />
          ) : (
            void 0
          )}
          {bodyStr ? (
            <BarChart2 data={bodyStrengthData} type={'bodyStr'} />
          ) : (
            void 0
          )}
          {muscles ? (
            <StackedBarChart4
              data={musclesData}
              addDims={{ width: 30, height: 30 }}
              type={'muscles'}
            />
          ) : (
            void 0
          )}
          {joints ? <BarChart2 data={jointsData} type={'joints'} /> : void 0}

          {jAction ? (
            <StackedBarChart3 data={jointsActionData} keys={jointsActionKeys} />
          ) : (
            void 0
          )}
          {equipment ? (
            <BarChart2 data={equipmentData} type={'equipment'} />
          ) : (
            void 0
          )}
        </Grid>
        <Grid item container direction="column" xs={6}>
          <Grid
            item
            xs={12}
            style={{
              borderBottom: `1px solid ${theme.palette.secondary.main}`,
              height: 500,
              width: 500,
            }}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              style={{ paddingTop: '1rem' }}
            >
              <Grid item>
                <Tooltip arrow title={options2ToolTips[selectedIndex2]}>
                  <List
                    aria-label="Chart options"
                    classes={{ root: classes.list }}
                  >
                    <ListItem
                      button
                      key={'options'}
                      aria-haspopup="true"
                      aria-controls="lock-menu"
                      aria-label="Effort Cell"
                      onClick={handleClickListItem2}
                      classes={{ button: classes.listItem }}
                      disableGutters
                    >
                      <ListItemText
                        primary={options2[selectedIndex2]}
                        primaryTypographyProps={{ align: 'center' }}
                      />
                    </ListItem>
                  </List>
                </Tooltip>
                <Menu
                  id="lock-menu2"
                  anchorEl={anchorEl2}
                  keepMounted
                  open={Boolean(anchorEl2)}
                  onClose={handleClose2}
                  classes={{ paper: classes.menu }}
                >
                  {options2.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex2}
                      onClick={(event) => handleMenuItemClick2(event, index)}
                      className={classes.menuItem}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
            </Grid>
            {/* ------------------ Charts ---------------- */}
            {bodyReg ? (
              <PieChart2 data={bodyRegionData} type={'bodyReg'} />
            ) : (
              void 0
            )}
            {exeTypes ? (
              <PieChart2 data={exerciseTypeData} type={'exeTypes'} />
            ) : (
              void 0
            )}
            {cat ? <PieChart2 data={categoryData} type={'cat'} /> : void 0}
            {res ? <PieChart2 data={resistanceData} type={'res'} /> : void 0}
            {plane ? <PieChart2 data={planeData} type={'plane'} /> : void 0}
            {tech ? <PieChart2 data={technicalData} type={'tech'} /> : void 0}
            {side ? <PieChart2 data={sideData} type={'side'} /> : void 0}
          </Grid>
          <Grid item xs={12}>
            <Grid item container justifyContent="center">
              <Typography className={classes.typography}>
                Average Intensity by Body Part
              </Typography>
            </Grid>

            <Body2 muscleColorData={muscleColorData} />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  const BarChartDivs = (
    <React.Fragment>
      <List aria-label="Chart options" classes={{ root: classes.list }}>
        <ListItem
          button
          key={'options'}
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="Chart"
          onClick={handleClickListItem2}
          classes={{ button: classes.listItem2 }}
          disableGutters
        >
          <ListItemText
            primary={optionsMobile[selectedIndex]}
            primaryTypographyProps={{ align: 'center' }}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        classes={{ paper: classes.menu }}
      >
        {optionsMobile.map((option, index) => (
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
    </React.Fragment>
  );

  const PieChartDivs = (
    <React.Fragment>
      <List aria-label="Chart options" classes={{ root: classes.list }}>
        <ListItem
          button
          key={'options'}
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="Chart"
          onClick={handleClickListItem3}
          classes={{ button: classes.listItem2 }}
          disableGutters
        >
          <ListItemText
            primary={options2Mobile[selectedIndex2]}
            primaryTypographyProps={{ align: 'center' }}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl3}
        keepMounted
        open={Boolean(anchorEl3)}
        onClose={handleClose3}
        classes={{ paper: classes.menu }}
      >
        {options2Mobile.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex2}
            onClick={(event) => handleMenuItemClick2(event, index)}
            className={classes.menuItem}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const preAnalyticsMobile = (
    <React.Fragment>
      <div style={{ marginTop: '1.5rem' }} />

      <Grid
        container
        justifyContent="center"
        style={{
          marginBottom: '1rem',
          height: 500,
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            {theSwitch ? PieChartDivs : BarChartDivs}
          </Grid>
          <Grid item xs={6}>
            <Typography component="div">
              <Grid component="label" container alignItems="center">
                <Grid item xs={5}>
                  <Typography variant="h6">BarCharts</Typography>
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={theSwitch}
                        onChange={handleSwitchChange}
                        color="default"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={5} style={{ paddingLeft: '1.5rem' }}>
                  <Typography variant="h6">PieCharts</Typography>
                </Grid>
              </Grid>
            </Typography>
          </Grid>
        </Grid>
        {/* ------------------- Place Pre Charts Here ------------- */}
        {/* ---------- Pie charts logic first --------- */}
        {bodyReg && theSwitch ? (
          <PieChart2
            data={bodyRegionData}
            addDims={{ width: 50, height: 30 }}
            type={'bodyReg'}
          />
        ) : (
          void 0
        )}
        {exeTypes && theSwitch ? (
          <PieChart2
            data={exerciseTypeData}
            addDims={{ width: 30, height: 30 }}
            type={'exeTypes'}
          />
        ) : (
          void 0
        )}
        {cat && theSwitch ? (
          <PieChart2
            data={categoryData}
            addDims={{ width: 30, height: 30 }}
            type={'cat'}
          />
        ) : (
          void 0
        )}
        {res && theSwitch ? (
          <PieChart2
            data={resistanceData}
            addDims={{ width: 30, height: 30 }}
            type={'res'}
          />
        ) : (
          void 0
        )}
        {plane && theSwitch ? (
          <PieChart2
            data={planeData}
            addDims={{ width: 30, height: 30 }}
            type={'plane'}
          />
        ) : (
          void 0
        )}
        {tech && theSwitch ? (
          <PieChart2
            data={technicalData}
            addDims={{ width: 30, height: 30 }}
            type={'tech'}
          />
        ) : (
          void 0
        )}
        {side && theSwitch ? (
          <PieChart2
            data={sideData}
            addDims={{ width: 30, height: 30 }}
            type={'side'}
          />
        ) : (
          void 0
        )}
        {/* ---------- Bar charts logic second ----------- */}
        {force && theSwitch === false ? (
          <BarChart2
            data={forceData}
            addDims={{ width: 50, height: 30 }}
            type={'force'}
          />
        ) : (
          void 0
        )}
        {exeTags && theSwitch === false ? (
          <BarChart2
            data={exerciseTagsData}
            addDims={{ width: 30, height: 30 }}
            type={'exeTags'}
          />
        ) : (
          void 0
        )}
        {bodyStr && theSwitch === false ? (
          <BarChart2
            data={bodyStrengthData}
            addDims={{ width: 30, height: 30 }}
            type={'bodyStr'}
          />
        ) : (
          void 0
        )}
        {muscles && theSwitch === false ? (
          <StackedBarChart4
            data={musclesData}
            addDims={{ width: 30, height: 30 }}
            type={'muscles'}
          />
        ) : (
          void 0
        )}
        {joints && theSwitch === false ? (
          <BarChart2
            data={jointsData}
            addDims={{ width: 30, height: 30 }}
            type={'joints'}
          />
        ) : (
          void 0
        )}
        {equipment && theSwitch === false ? (
          <BarChart2
            data={equipmentData}
            addDims={{ width: 30, height: 30 }}
            type={'equipment'}
          />
        ) : (
          void 0
        )}
        {jAction && theSwitch === false ? (
          <StackedBarChart3
            data={jointsActionData}
            keys={jointsActionKeys}
            addDims={{ width: 30, height: 30 }}
          />
        ) : (
          void 0
        )}
        {body1 && theSwitch === false ? (
          <div style={{ marginLeft: '7rem' }}>
            <Body2
              muscleColorData={muscleColorData}
              addDims={{ width: 30, height: 30 }}
              mobile={true}
            />
          </div>
        ) : (
          void 0
        )}
        {body2 && theSwitch ? (
          <div style={{ marginLeft: '7rem' }}>
            <Body2
              muscleColorData={muscleColorData}
              addDims={{ width: 30, height: 30 }}
              mobile={true}
            />
          </div>
        ) : (
          void 0
        )}
      </Grid>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Grid container justifyContent="center">
        <Grid item>
          <Typography className={classes.typography}>
            Training Program Analytics
          </Typography>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        onClick={onClick}
        color="secondary"
        disableElevation
      >
        Back
      </Button>
      {matches ? preAnalytics : preAnalyticsMobile}
      <Fab
        classes={{ root: classes.fab }}
        color="secondary"
        disabled={
          universalBufferObjects.length === 0 ||
          trainingSession.trainingSession.length === 0
            ? true
            : false
        }
        onClick={onClickCreate}
      >
        <FitnessIcon />
      </Fab>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to create this workout?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All information on the screen will be reset, when the workout is
            created!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            No
          </Button>
          <Button onClick={handleCreateDialog} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PreAnalytics;
