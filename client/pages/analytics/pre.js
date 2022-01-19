import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { data } from './TestData';

import {
  MuiPickersUtilsProvider,
  Calendar,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  Grid,
  CardContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  ButtonGroup,
  Button,
  Menu,
  MenuItem,
  FormControlLabel,
  Switch,
  Chip,
  Select,
  Input,
  InputLabel,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  topExercisesData,
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
  mobilityData,
  jointsActionData,
  jointsActionKeys,
  muscleColorData,
} from '../../components/analytics/DataSources';
import Body2 from '../../components/workout/Body2';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import theme from '../../src/ui/theme';
import app from '../../src/fire';
import { Typography } from '@mui/material';
import BarChart from '../../components/analytics/BarChart';
import HBarChart from '../../components/analytics/HorizontalBarChart';
import PieChart from '../../components/analytics/PieChart';
import AreaChart from '../../components/analytics/AreaChart';
import StackedBarChart from '../../components/analytics/StackedBarChart';

async function getExercises(db) {
  const exerciseCol = collection(db, '/ExerciseProps');
  const exerciseSnapshot = await getDocs(exerciseCol);
  const exerciseList = exerciseSnapshot.docs.map((doc) => doc.data());

  return exerciseList;
}

const useStyles = makeStyles((theme) => ({
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
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    height: '2rem',
  },
  listItem: {
    height: '100%',
    borderRadius: '6px',
    padding: 0,
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
    '&:hover': {
      backgroundColor: '#0faf8f',
    },
  },
  listItem2: {
    width: '12rem',
    height: '100%',
    borderRadius: '6px',
    padding: 0,
    backgroundColor: theme.palette.secondary.main,
    opacity: 1,
    '&:hover': {
      backgroundColor: '#0faf8f',
    },
  },
  exerciseField: {},
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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

// For multiple Select of athletes
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// DataSource Initializations

const loadData2 = {};
const volumeData2 = {};
const minData2 = {};
const maxData2 = {};
const totalVolumeData2 = [];
const totalLoadData2 = [];

// TODO: -  capture keys first
// -------- I THINK I AM GOING TO AGGREGATE ALL THE VALUES ------------ //

// Need to plug in the required data from database objects

// NOTE: - Change date to first day of that year
//console.log(new Date(new Date().getFullYear(), 0, 1));
const AnalyticsPre = ({ exercises }) => {
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const [value, setValue] = useState(null);
  const [searchItems, setSearchItems] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(0);
  const [selectedIndex3, setSelectedIndex3] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [loadButton, setLoadButton] = useState(false);
  const [volumeButton, setVolumeButton] = useState(false);
  const [minButton, setMinButton] = useState(false);
  const [maxButton, setMaxButton] = useState(true);
  const [aggregateLoadChart, setAggregateLoadChart] = useState(false);
  const [aggregateVolumeChart, setAggregateVolumeChart] = useState(false);
  const [buttonGroup, setButtonGroup] = useState(true);
  const [theSwitch, setTheSwitch] = useState(false);
  const [personName, setPersonName] = useState([]);
  const [teamName, setTeamName] = useState([]);
  const [anchorElArea, setAnchorElArea] = useState(null);
  const [selectedIndexArea, setSelectedIndexArea] = useState(0);
  const [areaMenuSwitch, setAreaMenuSwitch] = useState(true);

  // data source states
  // data source option states - pre
  // Bar Chart states
  const [topExe, setTopExe] = useState(true);
  const [lesExe, setLeastExe] = useState(false);
  const [force, setForce] = useState(false);
  const [exeTags, setExeTags] = useState(false);
  const [bodyStr, setBodyStr] = useState(false);
  const [muscles, setMuscles] = useState(false);
  const [joints, setJoints] = useState(false);
  const [mobility, setMobility] = useState(false);
  const [jAction, setJAction] = useState(false);
  const [equipment, setEquipment] = useState(false);
  // Pie Chart states
  const [bodyReg, setBodyReg] = useState(true);
  const [cat, setCat] = useState(false);
  const [exeTypes, setExeTypes] = useState(false);
  const [res, setRes] = useState(false);
  const [plane, setPlane] = useState(false);
  const [tech, setTech] = useState(false);
  const [side, setSide] = useState(false);
  // Misc Charts states
  const [body1, setbody1] = useState(false);
  const [body2, setbody2] = useState(false);

  // datasources options states - post
  const [resultsPost, setResultsPost] = useState(false);
  const [loadPost, setLoadPost] = useState(false);
  const [volumePost, setVolumePost] = useState(false);

  const classes = useStyles();

  const options = ['By Exercise', 'Total Load', 'Total Volume'];

  const athleteNames = [
    'joe',
    'sam',
    'john',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  const teamNames = [
    'Soccer (M)',
    'Soccer (F)',
    'Hockey (F)',
    'Hockey (M)',
    'FootBall',
    'Rugby (M)',
    'Rugby (F)',
  ];

  const preAnalyticsBarOptions = [
    'Top 5 Exercises',
    'Top 5 Least Exercises',
    'Force Chart',
    'Exercise Tags Chart',
    'Body Str Identifiers Chart',
    'Muscles Chart',
    'Joints Chart',
    'Mobility Chart',
    'Joint Action Chart',
    'Equipment Chart',
    'Body Chart',
  ];

  const preAnalyticsPieOptions = [
    'Body Region Chart',
    'Category Chart',
    'Exercise Types Chart',
    'Resistance Types Chart',
    'Planes Chart',
    'Technical Demands Chart',
    'Sides Chart',
    'Body Chart',
  ];

  function getPersonStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  function getTeamStyles(name, teamName, theme) {
    return {
      fontWeight:
        teamName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handlePersonChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleTeamChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setTheSwitch(event.target.checked);
  };

  const handleClickListItem = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClickListItem2 = (event) => {
    event.preventDefault();
    setAnchorEl2(event.currentTarget);
  };

  const handleClickListItem3 = (event) => {
    event.preventDefault();
    setAnchorEl3(event.currentTarget);
  };

  const handleClickListItemArea = (event) => {
    event.preventDefault();
    setAreaMenuSwitch(false);
    setAnchorElArea(event.currentTarget);
  };

  // Note: ButtonGroup controls whether results, load, volume buttons show
  //       And also determines what charts are going to be shown!!!!
  const handleMenuItemClick = (event, index) => {
    event.preventDefault();
    setSelectedIndex(index);
    setAnchorEl(null);

    switch (index) {
      case 0:
        setButtonGroup(true);
        setAggregateLoadChart(false);
        setAggregateVolumeChart(false);
        break;
      case 1:
        setButtonGroup(false);
        setAggregateLoadChart(true);
        setAggregateVolumeChart(false);
        break;
      case 2:
        setButtonGroup(false);
        setAggregateLoadChart(false);
        setAggregateVolumeChart(true);
        break;
      default:
        break;
    }

    return false;
  };

  // barchart selection stuff
  const handleMenuItemClick2 = (event, index) => {
    event.preventDefault();
    setSelectedIndex2(index);
    setAnchorEl2(null);

    switch (index) {
      case 0:
        setTopExe(true);
        setLeastExe(false);
        setForce(false); // remember to set false to rest of charts
        setExeTags(false);
        setBodyStr(false);
        setMuscles(false);
        setJoints(false);
        setMobility(false);
        setJAction(false);
        setEquipment(false);
        setbody1(false);
        break;
      case 1:
        setTopExe(false);
        setLeastExe(true);
        setExeTags(false);
        setForce(false);
        setBodyStr(false);
        setMuscles(false);
        setJoints(false);
        setMobility(false);
        setJAction(false);
        setEquipment(false);
        setbody1(false);
        break;
      case 2:
        setTopExe(false);
        setLeastExe(false);
        setBodyStr(false);
        setForce(true);
        setExeTags(false);
        setMuscles(false);
        setJoints(false);
        setMobility(false);
        setJAction(false);
        setEquipment(false);
        setbody1(false);
        break;
      case 3:
        setTopExe(false);
        setLeastExe(false);
        setMuscles(false);
        setForce(false);
        setExeTags(true);
        setBodyStr(false);
        setJoints(false);
        setMobility(false);
        setJAction(false);
        setEquipment(false);
        setbody1(false);
        break;
      case 4:
        setTopExe(false);
        setLeastExe(false);
        setJoints(false);
        setForce(false);
        setExeTags(false);
        setBodyStr(true);
        setMuscles(false);
        setMobility(false);
        setJAction(false);
        setEquipment(false);
        setbody1(false);
        break;
      case 5:
        setTopExe(false);
        setLeastExe(false);
        setMobility(false);
        setForce(false);
        setExeTags(false);
        setBodyStr(false);
        setMuscles(true);
        setJoints(false);
        setJAction(false);
        setEquipment(false);
        setbody1(false);
        break;
      case 6:
        setTopExe(false);
        setLeastExe(false);
        setJAction(false);
        setMobility(false);
        setForce(false);
        setExeTags(false);
        setBodyStr(false);
        setMuscles(false);
        setJoints(true);
        setEquipment(false);
        setbody1(false);
        break;
      case 7:
        setTopExe(false);
        setLeastExe(false);
        setEquipment(false);
        setJAction(false);
        setMobility(true);
        setForce(false);
        setExeTags(false);
        setBodyStr(false);
        setMuscles(false);
        setJoints(false);
        setbody1(false);
        break;
      case 8:
        setTopExe(false);
        setLeastExe(false);
        setbody1(false);
        setEquipment(false);
        setJAction(true);
        setMobility(false);
        setForce(false);
        setExeTags(false);
        setBodyStr(false);
        setMuscles(false);
        setJoints(false);
        break;
      case 9:
        setTopExe(false);
        setLeastExe(false);
        setbody1(false);
        setEquipment(true);
        setJAction(false);
        setMobility(false);
        setForce(false);
        setExeTags(false);
        setBodyStr(false);
        setMuscles(false);
        setJoints(false);
        break;
      case 10:
        setTopExe(false);
        setLeastExe(false);
        setbody1(true);
        setEquipment(false);
        setJAction(false);
        setMobility(false);
        setForce(false);
        setExeTags(false);
        setBodyStr(false);
        setMuscles(false);
        setJoints(false);
        break;
      default:
        break;
    }
    return false;
  };

  // pie chart selection stuff
  const handleMenuItemClick3 = (event, index) => {
    event.preventDefault();
    setSelectedIndex3(index);
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
      case 7:
        setbody2(true);
        setSide(false);
        setBodyReg(false);
        setCat(false);
        setExeTypes(false);
        setRes(false);
        setPlane(false);
        setTech(false);
        break;
      default:
        break;
    }

    return false;
  };

  const handleAreaListClick = (event, index) => {
    event.preventDefault();
    setSelectedIndexArea(index);
    setAreaMenuSwitch(true);
    setAnchorElArea(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    return false;
  };

  // Close preAnalyticsBar options menu
  const handleClose2 = () => {
    setAnchorEl2(null);
    return false;
  };

  // Close preAnalyticsPie options menu
  const handleClose3 = () => {
    setAnchorEl3(null);
    return false;
  };

  const handleCloseArea = () => {
    setAnchorElArea(null);
    console.log('Menu Closed');
    setAreaMenuSwitch(true);
    return false;
  };

  const handleExerciseChange = (e) => {
    console.log(e);
    setExerciseName(e.toLowerCase());
    setSearchItems(dynamicSearch());
  };

  const dynamicSearch = () => {
    return exercises.filter((exercise) =>
      exercise.ExerciseName.includes(exerciseName)
    );
  };

  const handleSubmit = () => {
    console.log('Submitted');
  };

  const onMinButton = () => {
    console.log('Min');
    setMinButton(true);
    setMaxButton(false);
    setLoadButton(false);
    setVolumeButton(false);
    // need to update a couple things - useEffect function, bool value
  };

  const onMaxButton = () => {
    console.log('Max');
    setMinButton(false);
    setMaxButton(true);
    setLoadButton(false);
    setVolumeButton(false);
    // need to update a couple things - useEffect function, bool value
  };

  const onLoadButton = () => {
    console.log('Load');
    setMinButton(false);
    setMaxButton(false);
    setLoadButton(true);
    setVolumeButton(false);
    // need to update a couple things - useEffect function, bool value
  };

  const onVolumeButton = () => {
    console.log('Volume');
    setMinButton(false);
    setMaxButton(false);
    setLoadButton(false);
    setVolumeButton(true);
    // need to update a couple things - useEffect function, bool value
  };

  //  ******************* let the games begin ************************ //
  if (data) {
    // RESET VALUES
    topExercisesData.splice(0, topExercisesData.length);
    forceData.splice(0, forceData.length);
    exerciseTagsData.splice(0, exerciseTagsData.length);
    bodyStrengthData.splice(0, bodyStrengthData.length);
    bodyRegionData.splice(0, bodyRegionData.length);
    musclesData.splice(0, musclesData.length);
    jointsData.splice(0, jointsData.length);
    resistanceData.splice(0, resistanceData.length);
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
    totalVolumeData2.splice(0, totalVolumeData2.length);
    totalLoadData2.splice(0, totalLoadData2.length);

    // ******************* PRE ANALYTICS ********************* //
    data.forEach((item) => {
      // i have calculation from the effort cell to use
      if (item.hasOwnProperty('exerciseName')) {
        exercises.map((exercise) => {
          if (item.exerciseName == exercise.ExerciseName) {
            // ------------ Top Exercise Source -------------- //
            var topExeIndex = topExercisesData.findIndex(
              (obj) => obj.name == exercise['ExerciseName']
            );
            if (topExeIndex >= 0) {
              topExercisesData[topExeIndex].value += 1;
            } else if (topExeIndex == -1) {
              topExercisesData.push({
                name: exercise['ExerciseName'],
                value: 1,
              });
            }

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
              var idIndex = bodyStrengthData.findIndex((obj) => obj.name == id);
              if (idIndex >= 0) {
                bodyStrengthData[idIndex].value += 1;
              } else if (idIndex == -1) {
                bodyStrengthData.push({ name: id, value: 1 });
              }
            });

            // ------- Body Region Data Source ------- //
            exercise['Body Region'].map((reg) => {
              var regIndex = bodyRegionData.findIndex((obj) => obj.name == reg);
              if (regIndex >= 0) {
                bodyRegionData[regIndex].value += 1;
              } else if (regIndex == -1) {
                bodyRegionData.push({ name: reg, value: 1 });
              }
            });

            // ------- Resistance Type Data Source ------- //
            exercise['Resistance Type'].map((res) => {
              var resIndex = resistanceData.findIndex((obj) => obj.name == res);
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
              movementData.push({ name: exercise['Movement Type'], value: 1 });
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
              var eqtIndex = equipmentData.findIndex((obj) => obj.name == eqt);
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
              var planeIndex = planeData.findIndex((obj) => obj.name == plane);
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
                switch (item.effortOption) {
                  case 'Percent (%)':
                    if (lBicepIndex >= 0) {
                      muscleColorData[lBicepIndex].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (lBicepIndex == -1) {
                      muscleColorData.push({
                        id: 'lBicep',
                        value: [parseInt(item.effortAggregation)],
                      });
                    }
                    if (rBicepIndex >= 0) {
                      muscleColorData[rBicepIndex].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (rBicepIndex == -1) {
                      muscleColorData.push({
                        id: 'rBicep',
                        value: [parseInt(item.effortAggregation)],
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
              var bicepIndex = musclesData.findIndex(
                (obj) => obj.name == 'bicep'
              );
              if (bicepIndex >= 0) {
                musclesData[bicepIndex].value += 1;
              } else if (bicepIndex == -1) {
                musclesData.push({
                  name: 'bicep',
                  value: 1,
                });
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
                switch (item.effortOption) {
                  case 'Percent (%)':
                    if (lTricepIndex >= 0) {
                      muscleColorData[lTricepIndex].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (lTricepIndex == -1) {
                      muscleColorData.push({
                        id: 'lTricep',
                        value: [parseInt(item.effortAggregation)],
                      });
                    }
                    if (rTricepIndex >= 0) {
                      muscleColorData[rTricepIndex].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (rTricepIndex == -1) {
                      muscleColorData.push({
                        id: 'rTricep',
                        value: [parseInt(item.effortAggregation)],
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

              var tricepIndex = musclesData.findIndex(
                (obj) => obj.name == 'tricep'
              );
              if (tricepIndex >= 0) {
                musclesData[tricepIndex].value += 1;
              } else if (tricepIndex == -1) {
                musclesData.push({
                  name: 'tricep',
                  value: 1,
                });
              }
            }
            if (exercise['Muscles'].Chest.chest) {
              // deal with muscleColorData

              var chestIndex2 = muscleColorData.findIndex(
                (obj) => obj.id == 'chest'
              );

              if (item.hasOwnProperty('effort')) {
                switch (item.effortOption) {
                  case 'Percent (%)':
                    if (chestIndex2 >= 0) {
                      muscleColorData[chestIndex2].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (chestIndex2 == -1) {
                      muscleColorData.push({
                        id: 'chest',
                        value: [parseInt(item.effortAggregation)],
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

              var chestIndex = musclesData.findIndex(
                (obj) => obj.name == 'chest'
              );
              if (chestIndex >= 0) {
                musclesData[chestIndex].value += 1;
              } else if (chestIndex == -1) {
                musclesData.push({
                  name: 'chest',
                  value: 1,
                });
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
                switch (item.effortOption) {
                  case 'Percent (%)':
                    if (lShoulderIndex >= 0) {
                      muscleColorData[lShoulderIndex].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (lShoulderIndex == -1) {
                      muscleColorData.push({
                        id: 'lShoulder',
                        value: [parseInt(item.effortAggregation)],
                      });
                    }
                    if (rShoulderIndex >= 0) {
                      muscleColorData[rShoulderIndex].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (rShoulderIndex == -1) {
                      muscleColorData.push({
                        id: 'rShoulder',
                        value: [parseInt(item.effortAggregation)],
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

              var shoulderIndex = musclesData.findIndex(
                (obj) => obj.name == 'shoulder'
              );
              if (shoulderIndex >= 0) {
                musclesData[shoulderIndex].value += 1;
              } else if (shoulderIndex == -1) {
                musclesData.push({
                  name: 'shoulder',
                  value: 1,
                });
              }
            }
            if (exercise['Muscles'].Core.core) {
              // deal with muscleColorData
              var coreIndex2 = muscleColorData.findIndex(
                (obj) => obj.id == 'lAbs'
              );

              if (item.hasOwnProperty('effort')) {
                switch (item.effortOption) {
                  case 'Percent (%)':
                    if (coreIndex2 >= 0) {
                      muscleColorData[coreIndex2].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (coreIndex2 == -1) {
                      muscleColorData.push({
                        id: 'lAbs',
                        value: [parseInt(item.effortAggregation)],
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

              var coreIndex = musclesData.findIndex(
                (obj) => obj.name == 'core'
              );
              if (coreIndex >= 0) {
                musclesData[coreIndex].value += 1;
              } else if (coreIndex == -1) {
                musclesData.push({
                  name: 'core',
                  value: 1,
                });
              }
            }
            if (exercise['Muscles'].Glutes.glutes) {
              var glutesIndex = musclesData.findIndex(
                (obj) => obj.name == 'glutes'
              );
              if (glutesIndex >= 0) {
                musclesData[glutesIndex].value += 1;
              } else if (glutesIndex == -1) {
                musclesData.push({
                  name: 'glutes',
                  value: 1,
                });
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
                switch (item.effortOption) {
                  case 'Percent (%)':
                    if (lHamIndex >= 0) {
                      muscleColorData[lHamIndex].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (lHamIndex == -1) {
                      muscleColorData.push({
                        id: 'lHam',
                        value: [parseInt(item.effortAggregation)],
                      });
                    }
                    if (rHamIndex >= 0) {
                      muscleColorData[rHamIndex].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (rHamIndex == -1) {
                      muscleColorData.push({
                        id: 'rHam',
                        value: [parseInt(item.effortAggregation)],
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

              var hamstringIndex = musclesData.findIndex(
                (obj) => obj.name == 'hamstrings'
              );
              if (hamstringIndex >= 0) {
                musclesData[hamstringIndex].value += 1;
              } else if (hamstringIndex == -1) {
                musclesData.push({
                  name: 'hamstrings',
                  value: 1,
                });
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
                switch (item.effortOption) {
                  case 'Percent (%)':
                    if (lQuadIndex >= 0) {
                      muscleColorData[lQuadIndex].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (lQuadIndex == -1) {
                      muscleColorData.push({
                        id: 'lQuad',
                        value: [parseInt(item.effortAggregation)],
                      });
                    }
                    if (rQuadIndex >= 0) {
                      muscleColorData[rQuadIndex].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (rQuadIndex == -1) {
                      muscleColorData.push({
                        id: 'rQuad',
                        value: [parseInt(item.effortAggregation)],
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

              var quadsIndex = musclesData.findIndex(
                (obj) => obj.name == 'quadriceps'
              );
              if (quadsIndex >= 0) {
                musclesData[quadsIndex].value += 1;
              } else if (quadsIndex == -1) {
                musclesData.push({
                  name: 'quadriceps',
                  value: 1,
                });
              }
            }
            if (exercise['Muscles']['Lower Back']['lower back']) {
              var lBackIndex = musclesData.findIndex(
                (obj) => obj.name == 'lower back'
              );
              if (lBackIndex >= 0) {
                musclesData[lBackIndex].value += 1;
              } else if (lBackIndex == -1) {
                musclesData.push({
                  name: 'lower back',
                  value: 1,
                });
              }
            }
            if (exercise['Muscles']['Upper Back']['upper back']) {
              var uBackIndex = musclesData.findIndex(
                (obj) => obj.name == 'upper back'
              );
              if (uBackIndex >= 0) {
                musclesData[uBackIndex].value += 1;
              } else if (uBackIndex == -1) {
                musclesData.push({
                  name: 'upper back',
                  value: 1,
                });
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
                switch (item.effortOption) {
                  case 'Percent (%)':
                    if (lCalfIndex >= 0) {
                      muscleColorData[lCalfIndex].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (lCalfIndex == -1) {
                      muscleColorData.push({
                        id: 'lCalf',
                        value: [parseInt(item.effortAggregation)],
                      });
                    }
                    if (rCalfIndex >= 0) {
                      muscleColorData[rCalfIndex].value.push(
                        parseInt(item.effortAggregation)
                      );
                    } else if (rCalfIndex == -1) {
                      muscleColorData.push({
                        id: 'rCalf',
                        value: [parseInt(item.effortAggregation)],
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

              var lLegIndex = musclesData.findIndex(
                (obj) => obj.name == 'lower leg'
              );
              if (lLegIndex >= 0) {
                musclesData[lLegIndex].value += 1;
              } else if (lLegIndex == -1) {
                musclesData.push({
                  name: 'lower leg',
                  value: 1,
                });
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
              var kneeIndex = jointsData.findIndex((obj) => obj.name == 'knee');
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
            if (exercise['Joints']['Wrist']['Wrist Strength']) {
              exercise['Joints']['Wrist'].action.map((action) => {
                var actionWristKeyIndex = jointsActionKeys.findIndex(
                  (obj) => obj == action
                );

                if (actionWristKeyIndex == -1) {
                  jointsActionKeys.push(action);
                }

                var actionWristDataIndex = jointsActionData.findIndex(
                  (obj) => obj.name == 'wrist'
                );
                if (actionWristDataIndex >= 0) {
                  // now wrist name exists
                  var act6Index = jointsActionData.findIndex(
                    (obj) => obj.hasOwnProperty(action) && obj.name == 'wrist'
                  );
                  if (act6Index >= 0) {
                    jointsActionData[act6Index][action] += 1;
                  } else if (act6Index == -1) {
                    jointsActionData[actionWristDataIndex][action] = 1;
                  }
                } else if (actionWristDataIndex == -1) {
                  jointsActionData.push({ name: 'wrist', [action]: 1 });
                }
              });
            }
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
      }
    });
    // AGGREGATION OF MUSCLECOLORDATA
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

    // ******************* POST ANALYTICS ********************* //

    // This goes into useEffect!!!!!!! - to account for changes in data
    data.map((obj) => {
      // remember this is for each document
      // search for these items first before adding or pushing content in the object
      // put exerciseName key first
      // create list
      // then look for keys and insert - year, names

      var aggregateLoad = 0;
      obj.results.forEach((item) => {
        aggregateLoad += item.value;
      });
      var finalAggregateLoad = parseInt(aggregateLoad);

      //console.log(`Load is ${finalAggregateLoad}`);

      var aggregateVolume = 0;
      obj.reps.forEach((item) => {
        aggregateVolume += item.value;
      });
      var finalAggregateVolume = parseInt(aggregateVolume);

      //console.log(`Volume is ${finalAggregateVolume}`);

      // Need to get the min and max values of results for each day and insert!!!
      var minResult = 0;
      var maxResult = 0;

      var listResults = [];
      obj.results.forEach((item) => {
        listResults.push(item.value);
      });
      maxResult = Math.max(...listResults);
      minResult = Math.min(...listResults);

      // TotalAggregateLoad Calculation
      var yearAggLoadIndex = totalLoadData2.findIndex(
        (itm) => itm.year == obj.date
      );

      if (yearAggLoadIndex >= 0) {
        // Year found
        totalLoadData2[yearAggLoadIndex].value += finalAggregateLoad;
      } else if (yearAggLoadIndex == -1) {
        // Year not found
        totalLoadData2.push({ year: obj.date, value: finalAggregateLoad });
      }

      // TotalAggregateVolume Calculation
      var yearAggVolumeIndex = totalVolumeData2.findIndex(
        (itm) => itm.year == obj.date
      );

      if (yearAggVolumeIndex >= 0) {
        // Year found
        totalVolumeData2[yearAggVolumeIndex].value += finalAggregateVolume;
      } else if (yearAggVolumeIndex == -1) {
        // Year not found
        totalVolumeData2.push({ year: obj.date, value: finalAggregateVolume });
      }

      if (minData2.hasOwnProperty(obj.exerciseName)) {
        // Exercise Name found!!!
        // Now need to findIndex of year and athlete name and add aggregate
        var yearMinIndex = minData2[obj.exerciseName].findIndex(
          (itm) => itm.year == obj.date
        );

        if (yearMinIndex >= 0) {
          // found date
          // now need to find athlete name
          var nameMinIndex = minData2[obj.exerciseName][
            yearMinIndex
          ].hasOwnProperty(obj.userName);

          if (nameMinIndex) {
            // found name
            //console.log('Results1');
            minData2[obj.exerciseName][yearMinIndex][obj.userName] = minResult;
          } else {
            // name not found
            //console.log('Results2');
            minData2[obj.exerciseName][yearMinIndex][obj.userName] = minResult;
          }
        } else if (yearMinIndex == -1) {
          // date not found
          //console.log('Results3');
          //console.log(obj.userName);
          minData2[obj.exerciseName].push({
            year: obj.date,
            [obj.userName]: minResult,
          });
        }
      } else {
        // Exercise Name not found!!!
        //console.log('results - Exercise key, not found!!!');
        minData2[obj.exerciseName] = [
          { year: obj.date, [obj.userName]: minResult },
        ];
      }

      if (maxData2.hasOwnProperty(obj.exerciseName)) {
        // Exercise Name found!!!
        // Now need to findIndex of year and athlete name and add aggregate
        var yearMaxIndex = maxData2[obj.exerciseName].findIndex(
          (itm) => itm.year == obj.date
        );

        if (yearMaxIndex >= 0) {
          // found date
          // now need to find athlete name
          var nameMaxIndex = maxData2[obj.exerciseName][
            yearMaxIndex
          ].hasOwnProperty(obj.userName);

          if (nameMaxIndex) {
            // found name
            //console.log('Results1');
            maxData2[obj.exerciseName][yearMaxIndex][obj.userName] = maxResult;
          } else {
            // name not found
            //console.log('Results2');
            maxData2[obj.exerciseName][yearMaxIndex][obj.userName] = maxResult;
          }
        } else if (yearMaxIndex == -1) {
          // date not found
          //console.log('Results3');
          //console.log(obj.userName);
          maxData2[obj.exerciseName].push({
            year: obj.date,
            [obj.userName]: maxResult,
          });
        }
      } else {
        // Exercise Name not found!!!
        //console.log('results - Exercise key, not found!!!');
        maxData2[obj.exerciseName] = [
          { year: obj.date, [obj.userName]: maxResult },
        ];
      }

      if (loadData2.hasOwnProperty(obj.exerciseName)) {
        // Exercise Name found!!!
        // Now need to findIndex of year and athlete name and add aggregate
        var yearLoadIndex = loadData2[obj.exerciseName].findIndex(
          (itm) => itm.year == obj.date
        );

        if (yearLoadIndex >= 0) {
          // found date
          // now need to find athlete name
          var nameLoadIndex = loadData2[obj.exerciseName][
            yearLoadIndex
          ].hasOwnProperty(obj.userName);

          if (nameLoadIndex) {
            // found name
            //console.log('Load1');
            loadData2[obj.exerciseName][yearLoadIndex][obj.userName] =
              finalAggregateLoad;
          } else {
            // name not found
            //console.log('Load2');
            loadData2[obj.exerciseName][yearLoadIndex][obj.userName] =
              finalAggregateLoad;
          }
        } else if (yearLoadIndex == -1) {
          // date not found
          //console.log('Load3');
          //console.log(obj.userName);
          loadData2[obj.exerciseName].push({
            year: obj.date,
            [obj.userName]: finalAggregateLoad,
          });
        }
      } else {
        // Exercise Name not found!!!
        //console.log('Load - Exercise key, not found!!!');
        loadData2[obj.exerciseName] = [
          { year: obj.date, [obj.userName]: finalAggregateLoad },
        ];
      }

      if (volumeData2.hasOwnProperty(obj.exerciseName)) {
        // Exercise Name found!!!
        // Now need to findIndex of year and athlete name and add aggregate
        var yearVolumeIndex = volumeData2[obj.exerciseName].findIndex(
          (itm) => itm.year == obj.date
        );

        if (yearVolumeIndex >= 0) {
          // found date
          // now need to find athlete name
          var nameVolumeIndex = volumeData2[obj.exerciseName][
            yearVolumeIndex
          ].hasOwnProperty(obj.userName);

          if (nameVolumeIndex) {
            // found name
            //console.log('Volume1');
            volumeData2[obj.exerciseName][yearVolumeIndex][obj.userName] =
              finalAggregateVolume;
          } else {
            // name not found
            //console.log('Volume2');
            volumeData2[obj.exerciseName][yearVolumeIndex][obj.userName] =
              finalAggregateVolume;
          }
        } else if (yearVolumeIndex == -1) {
          // date not found
          //console.log('Volume3');
          //console.log(obj.userName);
          volumeData2[obj.exerciseName].push({
            year: obj.date,
            [obj.userName]: finalAggregateVolume,
          });
        }
      } else {
        // Exercise Name not found!!!
        //console.log('Load - Exercise key, not found!!!');
        volumeData2[obj.exerciseName] = [
          { year: obj.date, [obj.userName]: finalAggregateVolume },
        ];
      }
    });

    // ****************  Sorting Logic (ascending) - Graphs data needs to be sorted ****************** //

    const objectLoadKeys = Object.keys(loadData2);
    const objectVolumeKeys = Object.keys(volumeData2);
    const objectMaxKeys = Object.keys(maxData2);
    const objectMinKeys = Object.keys(minData2);

    objectLoadKeys.map((key) => {
      loadData2[key].sort(function (a, b) {
        return a.year < b.year ? -1 : a.year > b.year ? 1 : 0;
      });
    });

    objectVolumeKeys.map((key) => {
      volumeData2[key].sort(function (a, b) {
        return a.year < b.year ? -1 : a.year > b.year ? 1 : 0;
      });
    });

    objectMaxKeys.map((key) => {
      maxData2[key].sort(function (a, b) {
        return a.year < b.year ? -1 : a.year > b.year ? 1 : 0;
      });
    });

    objectMinKeys.map((key) => {
      minData2[key].sort(function (a, b) {
        return a.year < b.year ? -1 : a.year > b.year ? 1 : 0;
      });
    });

    totalLoadData2.sort(function (a, b) {
      return a.year < b.year ? -1 : a.year > b.year ? 1 : 0;
    });

    totalVolumeData2.sort(function (a, b) {
      return a.year < b.year ? -1 : a.year > b.year ? 1 : 0;
    });

    // After sorting, we need to append the missing key names (eg - sam, joe)
    // so that graphs works as expected for dates with missing values
    // only need to do this for load, volume, min and max objects - totalLoad and Volume are okay!

    const athletekeys = ['joe', 'sam', 'john', 'value'];

    objectLoadKeys.map((key) => {
      loadData2[key].map((obj) => {
        // Now need to search for missing values
        athletekeys.map((athKey) => {
          if (obj.hasOwnProperty(athKey) === false) {
            obj[athKey] = 0;
          }
        });
      });
    });

    objectVolumeKeys.map((key) => {
      volumeData2[key].map((obj) => {
        // Now need to search for missing values
        athletekeys.map((athKey) => {
          if (obj.hasOwnProperty(athKey) === false) {
            obj[athKey] = 0;
          }
        });
      });
    });

    objectMinKeys.map((key) => {
      minData2[key].map((obj) => {
        // Now need to search for missing values
        athletekeys.map((athKey) => {
          if (obj.hasOwnProperty(athKey) === false) {
            obj[athKey] = 0;
          }
        });
      });
    });

    objectMaxKeys.map((key) => {
      maxData2[key].map((obj) => {
        // Now need to search for missing values
        athletekeys.map((athKey) => {
          if (obj.hasOwnProperty(athKey) === false) {
            obj[athKey] = 0;
          }
        });
      });
    });

    console.log(loadData2);
    console.log(volumeData2);
    console.log(maxData2);
    console.log(minData2);
    console.log(totalLoadData2);
    console.log(totalVolumeData2);
  }

  // At this point we have access to all the data stored in trainingSession (including the aggregate stuff!)

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
            primary={preAnalyticsBarOptions[selectedIndex2]}
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
        {preAnalyticsBarOptions.map((option, index) => (
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
            primary={preAnalyticsPieOptions[selectedIndex3]}
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
        {preAnalyticsPieOptions.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex3}
            onClick={(event) => handleMenuItemClick3(event, index)}
            className={classes.menuItem}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  useEffect(() => {
    // testing for start of year date
    // console.log(new Date(selectedFromDate.getFullYear(), 0, 1));
    // console.log(new Date(selectedFromDate.getFullYear(), 0, 1).toISOString());
  }, [selectedFromDate]);

  useEffect(() => {
    // To stop buggy behavior with menu selection, when user empties personName
    if (personName.length == 0) {
      setSelectedIndexArea(0);
    }
  }, [personName]);

  return (
    <React.Fragment>
      <div style={{ marginTop: '1rem' }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={2} justifyContent="center">
            {/* -------------------------   Calendar   --------------------------------- */}
            <Grid
              item
              container
              direction="column"
              xs={3}
              style={{
                top: theme.mixins.toolbar,
                position: 'sticky',
                marginTop: '2rem',
              }}
            >
              <Grid item>
                <div style={{ marginBottom: '0.8rem' }}>
                  <CardContent classes={{ root: classes.warmup }}>
                    <Typography
                      align="center"
                      variant="h5"
                      style={{
                        fontFamily: 'quicksand',
                        fontWeight: 700,
                      }}
                    >
                      Date Range
                    </Typography>
                  </CardContent>
                </div>
                <KeyboardDatePicker
                  autoOk
                  views={['year']}
                  style={{ marginLeft: '1rem' }}
                  variant="inline"
                  inputVariant="outlined"
                  format="yyyy"
                  value={selectedFromDate}
                  InputAdornmentProps={{ position: 'start' }}
                  onChange={(date) => setSelectedFromDate(date)}
                />
                <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                  <Typography
                    align="center"
                    variant="h6"
                    style={{
                      fontFamily: 'quicksand',
                      fontWeight: 700,
                    }}
                  >
                    To
                  </Typography>
                </div>
                <KeyboardDatePicker
                  autoOk
                  views={['year']}
                  style={{ marginLeft: '1rem' }}
                  variant="inline"
                  inputVariant="outlined"
                  format="yyyy"
                  value={selectedToDate}
                  InputAdornmentProps={{ position: 'start' }}
                  onChange={(date) => setSelectedToDate(date)}
                />
              </Grid>
              <Grid item style={{ marginTop: '1rem' }}>
                <CardContent classes={{ root: classes.warmup }}>
                  <Typography
                    align="center"
                    variant="h5"
                    style={{
                      fontFamily: 'quicksand',
                      fontWeight: 700,
                    }}
                  >
                    Choose Athletes
                  </Typography>
                </CardContent>
                <Grid container justifyContent="center">
                  <Grid item xs={10} style={{ marginTop: '1rem' }}>
                    <Typography textAlign="center">Athlete Select</Typography>
                    <Select
                      labelId="mutiple-chip-label"
                      id="mutiple-chip"
                      multiple
                      value={personName}
                      onChange={handlePersonChange}
                      input={<Input id="select-multiple-chip" fullWidth />}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              className={classes.chip}
                              color="secondary"
                            />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {athleteNames.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getPersonStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={10} style={{ marginTop: '2rem' }}>
                    <Typography textAlign="center">Team Select</Typography>
                    <Select
                      labelId="team-chip-label"
                      id="team-mutiple-chip"
                      multiple
                      value={teamName}
                      onChange={handleTeamChange}
                      input={<Input id="multiple-chip" fullWidth />}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              className={classes.chip}
                              color="secondary"
                            />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {teamNames.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getTeamStyles(name, teamName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={10} style={{ marginTop: '2rem' }}>
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
                        onClick={handleSubmit}
                        classes={{ button: classes.listItem }}
                        disableGutters
                      >
                        <ListItemText
                          primary={'Submit'}
                          primaryTypographyProps={{ align: 'center' }}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={9}
              style={{
                maxHeight: '100vh',
                overflow: 'auto',
                marginTop: '2rem',
              }}
            >
              <Grid container direction="column" style={{ marginLeft: '1rem' }}>
                <Typography
                  textAlign="center"
                  variant="h5"
                  style={{ marginBottom: '1rem' }}
                >
                  Pre Analytics
                </Typography>
                <Grid item container justifyContent="center">
                  <Grid
                    item
                    xs={9}
                    style={{ height: '100%', marginBottom: '1rem' }}
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
                      <PieChart
                        data={bodyRegionData}
                        addDims={{ width: 50, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {exeTypes && theSwitch ? (
                      <PieChart
                        data={exerciseTypeData}
                        addDims={{ width: 30, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {cat && theSwitch ? (
                      <PieChart
                        data={categoryData}
                        addDims={{ width: 30, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {res && theSwitch ? (
                      <PieChart
                        data={resistanceData}
                        addDims={{ width: 30, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {plane && theSwitch ? (
                      <PieChart
                        data={planeData}
                        addDims={{ width: 30, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {tech && theSwitch ? (
                      <PieChart
                        data={technicalData}
                        addDims={{ width: 30, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {side && theSwitch ? (
                      <PieChart
                        data={sideData}
                        addDims={{ width: 30, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {/* ---------- Bar charts logic second ----------- */}
                    {topExe && theSwitch === false ? (
                      <HBarChart
                        data={topExercisesData
                          .sort(function (a, b) {
                            return b.value - a.value;
                          })
                          .slice(0, 5)}
                        addDims={{ width: 50, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {lesExe && theSwitch === false ? (
                      <HBarChart
                        data={topExercisesData
                          .sort(function (a, b) {
                            return a.value - b.value;
                          })
                          .slice(0, 5)}
                        addDims={{ width: 50, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {force && theSwitch === false ? (
                      <HBarChart
                        data={forceData}
                        addDims={{ width: 50, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {exeTags && theSwitch === false ? (
                      <HBarChart
                        data={exerciseTagsData}
                        addDims={{ width: 30, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {bodyStr && theSwitch === false ? (
                      <HBarChart
                        data={bodyStrengthData}
                        addDims={{ width: 30, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {muscles && theSwitch === false ? (
                      <HBarChart
                        data={musclesData}
                        addDims={{ width: 30, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {joints && theSwitch === false ? (
                      <HBarChart
                        data={jointsData}
                        addDims={{ width: 30, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {mobility && theSwitch === false ? (
                      <HBarChart
                        data={mobilityData}
                        addDims={{ width: 30, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {equipment && theSwitch === false ? (
                      <HBarChart
                        data={equipmentData}
                        addDims={{ width: 30, height: 30 }}
                      />
                    ) : (
                      void 0
                    )}
                    {jAction && theSwitch === false ? (
                      <StackedBarChart
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
                        />
                      </div>
                    ) : (
                      void 0
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    {/* ------- Future update - give app ability to filter by athletes name (Pre Analytics) ---------- */}
                    <CardContent classes={{ root: classes.warmup2 }}>
                      <Typography
                        align="center"
                        variant="h5"
                        style={{
                          fontFamily: 'quicksand',
                          fontWeight: 700,
                        }}
                      >
                        Pre Filter
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
                <Typography
                  textAlign="center"
                  variant="h5"
                  style={{ marginBottom: '1rem' }}
                >
                  Post Analytics
                </Typography>
                <Grid item container>
                  <Grid item xs={9}>
                    <Grid container justifyContent="center">
                      <Grid item xs={12}>
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
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                              className={classes.menuItem}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container style={{ marginTop: '1rem' }}>
                          <Grid item xs={5}>
                            <div
                              style={{
                                visibility: buttonGroup ? 'visible' : 'hidden',
                              }}
                            >
                              <ButtonGroup
                                variant="contained"
                                aria-label="outlined primary button group"
                                disableElevation
                                color="secondary"
                              >
                                <Button onClick={onMaxButton}>Max</Button>
                                <Button onClick={onMinButton}>Min</Button>
                                <Button onClick={onVolumeButton}>Volume</Button>
                                <Button onClick={onLoadButton}>Load</Button>
                              </ButtonGroup>
                            </div>
                          </Grid>
                          <Grid item xs={2}></Grid>
                          <Grid item xs={5}>
                            <Autocomplete
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
                              style={{
                                marginBottom: '1rem',
                                visibility: buttonGroup ? 'visible' : 'hidden',
                              }}
                              inputValue={exerciseName}
                              onInputChange={(event, newValue) => {
                                // Managed to print out the values in each input change
                                handleExerciseChange(newValue);
                              }}
                              options={searchItems.map(
                                (option) => option.ExerciseName
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Type Exercise"
                                  variant="outlined"
                                  multiline
                                  placeholder="Exercise"
                                  style={{ paddingBottom: 0 }}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/*------- Might put another condition for exercise to be inserted (state could take care of this concern)--------*/}
                    {maxButton &&
                    buttonGroup &&
                    exerciseName &&
                    areaMenuSwitch ? (
                      <AreaChart
                        data={maxData2[exerciseName]}
                        button={'max'}
                        exercise={exerciseName}
                        keys={personName}
                        selectedName={personName[selectedIndexArea]}
                      />
                    ) : (
                      void 0
                    )}
                    {minButton &&
                    buttonGroup &&
                    exerciseName &&
                    areaMenuSwitch ? (
                      <AreaChart
                        data={minData2[exerciseName]}
                        button={'min'}
                        exercise={exerciseName}
                        keys={personName}
                        selectedName={personName[selectedIndexArea]}
                      />
                    ) : (
                      void 0
                    )}
                    {loadButton &&
                    buttonGroup &&
                    exerciseName &&
                    areaMenuSwitch ? (
                      <AreaChart
                        data={loadData2[exerciseName]}
                        button={'load'}
                        exercise={exerciseName}
                        keys={personName}
                        selectedName={personName[selectedIndexArea]}
                      />
                    ) : (
                      void 0
                    )}
                    {volumeButton &&
                    buttonGroup &&
                    exerciseName &&
                    areaMenuSwitch ? (
                      <AreaChart
                        data={volumeData2[exerciseName]}
                        button={'volume'}
                        exercise={exerciseName}
                        keys={personName}
                        selectedName={personName[selectedIndexArea]}
                      />
                    ) : (
                      void 0
                    )}
                    {aggregateLoadChart && buttonGroup == false ? (
                      <AreaChart
                        data={totalLoadData2}
                        button={'Total Load'}
                        keys={[]}
                        selectedName={undefined}
                      />
                    ) : (
                      void 0
                    )}
                    {aggregateVolumeChart && buttonGroup == false ? (
                      <AreaChart
                        data={totalVolumeData2}
                        button={'Total Volume'}
                        keys={[]}
                        selectedName={undefined}
                      />
                    ) : (
                      void 0
                    )}
                    {/*------- To make sure areaChart view does not go back to starting position when changing the switchMenufilter --------*/}
                    {areaMenuSwitch ? (
                      void 0
                    ) : (
                      <div style={{ height: '30rem' }}></div>
                    )}
                    {/*------- Put Total Load and Total Volume Charts here --------*/}
                  </Grid>
                  <Grid item xs={3}>
                    <div style={{ marginTop: '10rem' }}>
                      <CardContent classes={{ root: classes.warmup2 }}>
                        <Typography
                          align="center"
                          variant="h5"
                          style={{
                            fontFamily: 'quicksand',
                            fontWeight: 700,
                          }}
                        >
                          Post Filter
                        </Typography>
                      </CardContent>
                      <List
                        aria-label="Chart options"
                        classes={{ root: classes.list }}
                        style={{
                          visibility:
                            personName.length == 0 ? 'hidden' : 'visible',
                        }}
                      >
                        <ListItem
                          button
                          key={'AreaChart Options'}
                          aria-haspopup="true"
                          aria-controls="lock-menu"
                          aria-label="AreaChart Options"
                          onClick={handleClickListItemArea}
                          classes={{ button: classes.listItem }}
                          disableGutters
                        >
                          <ListItemText
                            primary={personName[selectedIndexArea]}
                            primaryTypographyProps={{ align: 'center' }}
                          />
                        </ListItem>
                      </List>
                      <Menu
                        id="lock-menu"
                        anchorEl={anchorElArea}
                        keepMounted
                        open={Boolean(anchorElArea)}
                        onClose={handleCloseArea}
                        classes={{ paper: classes.menu }}
                      >
                        {personName.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedIndexArea}
                            onClick={(event) =>
                              handleAreaListClick(event, index)
                            }
                            className={classes.menuItem}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    </React.Fragment>
  );
};

// {bodyReg && theSwitch ? (
//   <PieChart data={bodyRegionData} />
// ) : (
//   void 0
// )}
// {/* ---------- Bar charts logic second ----------- */}
// {force && theSwitch === false ? (
//   <BarChart data={forceData} />
// ) : (
//   void 0
// )}

AnalyticsPre.getInitialProps = async (ctx) => {
  const db = getFirestore(app);

  // fetch exercises from firebase
  const exercises = await getExercises(db).then((doc) => {
    return doc;
  });

  return { exercises: exercises };
};

export default AnalyticsPre;

// {bodyReg && theSwitch ? (
//   <PieChart data={bodyRegionData} />
// ) : (
//   void 0
// )}

// const resultsData = {
//   'bench press': [
//     { year: '1988-01-01', joe: 10, sam: 20, john: 30 },
//     { year: '1989-01-01', joe: 20, sam: 70, john: 40 },
//     { year: '1990-01-01', joe: 30, sam: 40, john: 50 },
//     { year: '1991-01-01', joe: 40, sam: 50, john: 60 },
//   ],
//   snatch: [
//     { year: '1988-01-01', joe: 10, sam: 20, john: 30 },
//     { year: '1989-01-01', joe: 20, sam: 70, john: 40 },
//     { year: '1990-01-01', joe: 30, sam: 40, john: 50 },
//     { year: '1991-01-01', joe: 40, sam: 50, john: 60 },
//   ],
//   clean: [
//     { year: '1988-01-01', joe: 10, sam: 20, john: 30 },
//     { year: '1989-01-01', joe: 20, sam: 70, john: 40 },
//     { year: '1990-01-01', joe: 30, sam: 40, john: 50 },
//     { year: '1991-01-01', joe: 40, sam: 50, john: 60 },
//   ],
// };

// const loadData = {
//   'bench press': [
//     { year: '1988-01-01', joe: 10, sam: 20, john: 30 },
//     { year: '1989-01-01', joe: 20, sam: 70, john: 40 },
//     { year: '1990-01-01', joe: 30, sam: 40, john: 50 },
//     { year: '1991-01-01', joe: 40, sam: 50, john: 60 },
//   ],
//   snatch: [
//     { year: '1988-01-01', joe: 10, sam: 20, john: 30 },
//     { year: '1989-01-01', joe: 20, sam: 70, john: 40 },
//     { year: '1990-01-01', joe: 30, sam: 40, john: 50 },
//     { year: '1991-01-01', joe: 40, sam: 50, john: 60 },
//   ],
//   clean: [
//     { year: '1988-01-01', joe: 10, sam: 20, john: 30 },
//     { year: '1989-01-01', joe: 20, sam: 70, john: 40 },
//     { year: '1990-01-01', joe: 30, sam: 40, john: 50 },
//     { year: '1991-01-01', joe: 40, sam: 50, john: 60 },
//   ],
// };

// const volumeData = {
//   'bench press': [
//     { year: '1988-01-01', joe: 10, sam: 20, john: 30 },
//     { year: '1989-01-01', joe: 20, sam: 70, john: 40 },
//     { year: '1990-01-01', joe: 30, sam: 40, john: 50 },
//     { year: '1991-01-01', joe: 40, sam: 50, john: 60 },
//   ],
//   snatch: [
//     { year: '1988-01-01', joe: 10, sam: 20, john: 30 },
//     { year: '1989-01-01', joe: 20, sam: 70, john: 40 },
//     { year: '1990-01-01', joe: 30, sam: 40, john: 50 },
//     { year: '1991-01-01', joe: 40, sam: 50, john: 60 },
//   ],
//   clean: [
//     { year: '1988-01-01', joe: 10, sam: 20, john: 30 },
//     { year: '1989-01-01', joe: 20, sam: 70, john: 40 },
//     { year: '1990-01-01', joe: 30, sam: 40, john: 50 },
//     { year: '1991-01-01', joe: 40, sam: 50, john: 60 },
//   ],
// };
