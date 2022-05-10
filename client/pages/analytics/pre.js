import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { data as dataBeta } from './TestData';
import { coach1 } from './MockCoach';
import useRequest from '../../hooks/use-request';

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
  Typography,
  useMediaQuery,
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Body2 from '../../components/workout/Body2';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import theme from '../../src/ui/theme';
import app from '../../src/fire';
import BarChart from '../../components/analytics/BarChart';
import BarChart2 from '../../components/analytics/BarChart2';
import BarChart3 from '../../components/analytics/BarChart3';
import HBarChart from '../../components/analytics/HorizontalBarChart';
import PieChart from '../../components/analytics/PieChart';
import PieChart2 from '../../components/analytics/PieChart2';
import AreaChart from '../../components/analytics/AreaChart';
import AreaChart2 from '../../components/analytics/AreaChart2';
import StackedBarChart from '../../components/analytics/StackedBarChart';
import StackedBarChart3 from '../../components/analytics/StackedBarChart3';
import Router from 'next/router';

// line 2319 - check it out!!!! - value should go!
async function getExercises(db) {
  const exerciseCol = collection(db, '/ExerciseProps');
  const exerciseSnapshot = await getDocs(exerciseCol);
  const exerciseList = exerciseSnapshot.docs.map((doc) => doc.data());

  return exerciseList;
}

const useStyles = makeStyles((theme) => ({
  root2: {
    '& label': {
      width: '100%',
      textAlign: 'center',
      transformOrigin: 'center',
      '&.Mui-focused': {
        transformOrigin: 'center',
      },
    },
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
  divPadding: {
    marginBottom: '1.5rem',
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

var objectLoadKeys;
var objectVolumeKeys;
var objectMaxKeys;
var objectMinKeys;

// make from and To date variables into pieces of state!
// var fromDate;
// var toDate;

// TODO: -  capture keys first
// -------- I THINK I AM GOING TO AGGREGATE ALL THE VALUES ------------ //

// Need to plug in the required data from database objects

// NOTE: - Change date to first day of that year
//console.log(new Date(new Date().getFullYear(), 0, 1));
const AnalyticsPre = ({
  exercises,
  coachInfo,
  currentUser,
  customerStripe,
}) => {
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date()); // variable is used in doRequest with correct iso date format - 01/01/****/
  const [toDate, setToDate] = useState(new Date()); // variable is used in doRequest with correct iso date format - 31/12/****/
  const [athleteIds, setAthleteIds] = useState([]);
  const [universalBufferNames, setUniversalBufferNames] = useState([]);
  const [updateDataCounter, setUpdateDataCounter] = useState([]);
  const [postFilterNames, setPostFilterNames] = useState([]);
  const [preFilterNames, setPreFilterNames] = useState([]);
  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
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
  const [progress, setProgress] = useState(false);

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

  const { doRequest, errors } = useRequest({
    url: '/api/exercise/index', // happening in the browser!
    method: 'post',
    body: { athleteIds, fromDate, toDate },
    onSuccess: (data) => {
      console.log(data),
        setProgress(false),
        //setData(data[1]),
        setData(dataBeta),
        setUpdateDataCounter(updateDataCounter + 1),
        setTimeout(() => {
          setTheSwitch(false); // barcharts
          setExeTags(true);
          setTopExe(false);
          setLeastExe(false);
          setForce(false);
          setMuscles(false);
          setJoints(false);
          setMobility(false);
          setJAction(false);
          setEquipment(false);
          setbody1(false);
          setSelectedIndex2(3);
        }, 10);
    },
  });

  const classes = useStyles();
  const matches = useMediaQuery('(min-width:880px)');

  const options = [
    'By Exercise',
    'Total Training Load',
    'Total Training Volume',
  ];

  const athleteSelection = [
    // populate this with rosterInd names - coachInfo
  ];

  coachInfo.rosterInd.map((names) => {
    athleteSelection.push(`${names.userName} - ${names.discipline}`);
  });

  const teamSelection = [
    // populate this with rosterTeam names - coachInfo
  ];

  coachInfo.rosterTeam.map((teams) => {
    teamSelection.push(teams.team);
  });

  const preAnalyticsBarOptions = [
    'Top 5 Exercises',
    'Top 5 Least Exercises',
    'Force Chart',
    'Overall Stats Chart',
    'Body Strength Chart',
    'Target Muscles Chart',
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
    setProgress(true);
    //reset athleteIds state
    setAthleteIds((oldIds) => []);
    //todo fix filters - minor
    // setPreFilterNames((oldNames) => []);
    // setPostFilterNames((oldNames) => []);

    // setData(dataBeta);
    // setUpdateDataCounter(updateDataCounter + 1);

    // console.log(athleteIds);
    // console.log(fromDate);
    // console.log(toDate);

    doRequest();
    // no parsing - delegate all of it to the route handler - return data object to plug into the pipeline
  };

  useEffect(() => {
    var bufferIds = [];
    var bufferNames = [];
    personName.map((name) => {
      coachInfo.rosterInd.forEach((ind) => {
        if (`${ind.userName} - ${ind.discipline}` === name) {
          bufferIds.push(ind.userId);
        }
      });
    });

    // handle Teams
    teamName.map((sport) => {
      coachInfo.rosterTeam.forEach((obj) => {
        if (obj.team === sport) {
          obj.athletes.map((athlete) => {
            bufferIds.push(athlete.userId);
          });
        }
      });
    });
    // Get only the unique values
    setAthleteIds((oldIds) => [...[...new Set(bufferIds)]]);

    [...new Set(bufferIds)].map((id) => {
      coachInfo.rosterInd.forEach((ind) => {
        if (ind.userId === id) {
          bufferNames.push(ind.userName);
        }
      });
    });

    setPreFilterNames((oldNames) => [...bufferNames]);
    setPostFilterNames((oldNames) => [...bufferNames]);
    setUniversalBufferNames((oldNames) => [...bufferNames]);
  }, [personName, teamName]);

  useEffect(() => {
    if (currentUser.userType === 'Athlete') {
      setAthleteIds((old) => [...old, coachInfo.userId]);
      setUniversalBufferNames((old) => [...old, coachInfo.userName]);
      setPostFilterNames((oldNames) => [coachInfo.userName]);
    }
  }, []);

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

  useEffect(() => {
    setProgress(false);
  }, [errors]);

  // this useEffect will be used everywhere for identification for coaches payment status
  // send to subscription page if status on Stripe is not active
  useEffect(() => {
    // if user signed in
    if (currentUser) {
      // if (currentUser.userType === 'Coach') {
      //   // now validate stripe subscription
      //   if (customerStripe !== '') {
      //     if (customerStripe.subscriptions.data[0].status !== 'active') {
      //       Router.push('/payment/subscription');
      //     }
      //   } else {
      //     Router.push('/payment/subscription');
      //   }
      //   // do athlete checks here
      // }
    } else if (!currentUser) {
      Router.push('/auth/signin');
    }
  }, []);

  //  ******************* let the games begin ************************ //
  useEffect(() => {
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
        if (item.hasOwnProperty('exerciseName2')) {
          exercises.map((exercise) => {
            item.exerciseName2.map((exerciseName) => {
              if (exerciseName == exercise.ExerciseName) {
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
                    var data = 0;
                    item.effort.forEach((el) => {
                      data += parseInt(el.value);
                    });
                    data = parseInt(data / item.sets).toFixed(2);

                    switch (item.effortOption) {
                      case 'Percent (%)':
                        if (lBicepIndex >= 0) {
                          muscleColorData[lBicepIndex].value.push(data);
                        } else if (lBicepIndex == -1) {
                          muscleColorData.push({
                            id: 'lBicep',
                            value: [data],
                          });
                        }
                        if (rBicepIndex >= 0) {
                          muscleColorData[rBicepIndex].value.push(data);
                        } else if (rBicepIndex == -1) {
                          muscleColorData.push({
                            id: 'rBicep',
                            value: [data],
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
                    var data = 0;
                    item.effort.forEach((el) => {
                      data += parseInt(el.value);
                    });
                    data = (data / item.sets).toFixed(2);

                    switch (item.effortOption) {
                      case 'Percent (%)':
                        if (lTricepIndex >= 0) {
                          muscleColorData[lTricepIndex].value.push(data);
                        } else if (lTricepIndex == -1) {
                          muscleColorData.push({
                            id: 'lTricep',
                            value: [data],
                          });
                        }
                        if (rTricepIndex >= 0) {
                          muscleColorData[rTricepIndex].value.push(data);
                        } else if (rTricepIndex == -1) {
                          muscleColorData.push({
                            id: 'rTricep',
                            value: [data],
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
                    var data = 0;
                    item.effort.forEach((el) => {
                      data += parseInt(el.value);
                    });
                    data = (data / item.sets).toFixed(2);
                    switch (item.effortOption) {
                      case 'Percent (%)':
                        if (chestIndex2 >= 0) {
                          muscleColorData[chestIndex2].value.push(data);
                        } else if (chestIndex2 == -1) {
                          muscleColorData.push({
                            id: 'chest',
                            value: [data],
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
                    var data = 0;
                    item.effort.forEach((el) => {
                      data += parseInt(el.value);
                    });
                    data = (data / item.sets).toFixed(2);
                    switch (item.effortOption) {
                      case 'Percent (%)':
                        if (lShoulderIndex >= 0) {
                          muscleColorData[lShoulderIndex].value.push(data);
                        } else if (lShoulderIndex == -1) {
                          muscleColorData.push({
                            id: 'lShoulder',
                            value: [data],
                          });
                        }
                        if (rShoulderIndex >= 0) {
                          muscleColorData[rShoulderIndex].value.push(data);
                        } else if (rShoulderIndex == -1) {
                          muscleColorData.push({
                            id: 'rShoulder',
                            value: [data],
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
                    var data = 0;
                    item.effort.forEach((el) => {
                      data += parseInt(el.value);
                    });
                    data = (data / item.sets).toFixed(2);
                    switch (item.effortOption) {
                      case 'Percent (%)':
                        if (coreIndex2 >= 0) {
                          muscleColorData[coreIndex2].value.push(data);
                        } else if (coreIndex2 == -1) {
                          muscleColorData.push({
                            id: 'lAbs',
                            value: [data],
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
                    var data = 0;
                    item.effort.forEach((el) => {
                      data += parseInt(el.value);
                    });
                    data = (data / item.sets).toFixed(2);
                    switch (item.effortOption) {
                      case 'Percent (%)':
                        if (lHamIndex >= 0) {
                          muscleColorData[lHamIndex].value.push(data);
                        } else if (lHamIndex == -1) {
                          muscleColorData.push({
                            id: 'lHam',
                            value: [data],
                          });
                        }
                        if (rHamIndex >= 0) {
                          muscleColorData[rHamIndex].value.push(data);
                        } else if (rHamIndex == -1) {
                          muscleColorData.push({
                            id: 'rHam',
                            value: [data],
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
                    var data = 0;
                    item.effort.forEach((el) => {
                      data += parseInt(el.value);
                    });
                    data = (data / item.sets).toFixed(2);
                    switch (item.effortOption) {
                      case 'Percent (%)':
                        if (lQuadIndex >= 0) {
                          muscleColorData[lQuadIndex].value.push(data);
                        } else if (lQuadIndex == -1) {
                          muscleColorData.push({
                            id: 'lQuad',
                            value: [data],
                          });
                        }
                        if (rQuadIndex >= 0) {
                          muscleColorData[rQuadIndex].value.push(data);
                        } else if (rQuadIndex == -1) {
                          muscleColorData.push({
                            id: 'rQuad',
                            value: [data],
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
                    var data = 0;
                    item.effort.forEach((el) => {
                      data += parseInt(el.value);
                    });
                    data = (data / item.sets).toFixed(2);
                    switch (item.effortOption) {
                      case 'Percent (%)':
                        if (lCalfIndex >= 0) {
                          muscleColorData[lCalfIndex].value.push(data);
                        } else if (lCalfIndex == -1) {
                          muscleColorData.push({
                            id: 'lCalf',
                            value: [data],
                          });
                        }
                        if (rCalfIndex >= 0) {
                          muscleColorData[rCalfIndex].value.push(data);
                        } else if (rCalfIndex == -1) {
                          muscleColorData.push({
                            id: 'rCalf',
                            value: [data],
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
                  var hipIndex = jointsData.findIndex(
                    (obj) => obj.name == 'hip'
                  );
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
                        (obj) =>
                          obj.hasOwnProperty(action) && obj.name == 'ankle'
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
                        (obj) =>
                          obj.hasOwnProperty(action) && obj.name == 'knee'
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
                        (obj) =>
                          obj.hasOwnProperty(action) && obj.name == 'elbow'
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
                //         (obj) =>
                //           obj.hasOwnProperty(action) && obj.name == 'wrist'
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
                        (obj) =>
                          obj.hasOwnProperty(action) && obj.name == 'spine'
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
      // AGGREGATION OF MUSCLECOLORDATA
      console.log(muscleColorData);
      muscleColorData.forEach((item) => {
        var total = 0;
        var num = 0;
        item.value.map((obj) => {
          total += parseInt(obj);
          num += 1;
        });
        if (num > 0) {
          item.total = total / num; // ensures we have the avg in the list
        } else if (num === 0) {
          item.total = 0;
        }
      });

      // ******************* POST ANALYTICS ********************* //
    }
  }, [data.length, updateDataCounter]);
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
    const bufferFromDate = new Date(selectedFromDate);
    const bufferToDate = new Date(selectedToDate);

    const yearFrom = bufferFromDate.getFullYear();
    var monthFrom = bufferFromDate.getMonth();
    var dtFrom = bufferFromDate.getDate();

    if (dtFrom < 10) {
      dtFrom = '0' + dtFrom;
    }
    if (monthFrom < 10) {
      monthFrom = '0' + monthFrom;
    }

    const yearTo = bufferToDate.getFullYear();
    var monthTo = bufferToDate.getMonth() + 1;
    var dtTo = bufferToDate.getDate();

    if (dtTo < 10) {
      dtTo = '0' + dtTo;
    }
    if (monthTo < 10) {
      monthTo = '0' + monthTo;
    }

    setFromDate(new Date(yearFrom, monthFrom).toISOString());
    setToDate(new Date(yearTo, monthTo, 0).toISOString());
  }, [selectedFromDate, selectedToDate]);

  useEffect(() => {
    console.log(fromDate);
    console.log(toDate);
  }, [fromDate, toDate]);

  useEffect(() => {
    // To stop buggy behavior with menu selection, when user empties personName
    // might want to force value out here
    if (personName.length == 0) {
      setSelectedIndexArea(0);
    }
  }, [personName]);

  const preAnalyticsView = (
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
            views={['year', 'month']}
            style={{ marginLeft: '1rem' }}
            className={classes.root2}
            variant="inline"
            inputVariant="outlined"
            value={selectedFromDate}
            InputAdornmentProps={{ position: 'start' }}
            onChange={(date) => setSelectedFromDate(date)}
            label={'beginning of'}
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
            views={['year', 'month']}
            style={{ marginLeft: '1rem' }}
            className={classes.root2}
            variant="inline"
            inputVariant="outlined"
            value={selectedToDate}
            InputAdornmentProps={{ position: 'start' }}
            onChange={(date) => setSelectedToDate(date)}
            label={'end of'}
          />
        </Grid>
        <Grid item style={{ marginTop: '1rem' }}>
          {currentUser.userType === 'Coach' ? (
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
          ) : (
            void 0
          )}
          <Grid container justifyContent="center">
            {currentUser.userType === 'Coach' ? (
              <React.Fragment>
                <Grid item xs={10} style={{ marginTop: '1rem' }}>
                  <Typography align="center">Athlete Select</Typography>
                  <Select
                    labelId="mutiple-chip-label"
                    id="mutiple-chip"
                    multiple
                    value={personName}
                    onChange={handlePersonChange}
                    onOpen={() => setAreaMenuSwitch(false)}
                    onClose={() => setAreaMenuSwitch(true)}
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
                    {athleteSelection.map((name) => (
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
                  <Typography align="center">Team Select</Typography>
                  <Select
                    labelId="team-chip-label"
                    id="team-mutiple-chip"
                    multiple
                    value={teamName}
                    onChange={handleTeamChange}
                    onOpen={() => setAreaMenuSwitch(false)}
                    onClose={() => setAreaMenuSwitch(true)}
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
                    {teamSelection.map((name) => (
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
              </React.Fragment>
            ) : (
              void 0
            )}

            <Grid item xs={10} style={{ marginTop: '2rem' }}>
              {progress ? (
                <CircularProgress color="secondary" />
              ) : (
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
              )}
              {errors}
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
            align="center"
            variant="h5"
            style={{ marginBottom: '1rem' }}
          >
            Program Analytics
          </Typography>
          <Grid item container justifyContent="center">
            <Grid
              item
              xs={10}
              style={{
                height: 600,
                marginBottom: '1rem',
                width: 800,
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
              {topExe && theSwitch === false ? (
                <BarChart2
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
                <BarChart2
                  data={topExercisesData
                    .sort(function (a, b) {
                      return a.value - b.value;
                    })
                    .slice(0, 5)}
                  addDims={{ width: 50, height: 30 }}
                  type={'top'}
                />
              ) : (
                void 0
              )}
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
                <BarChart3
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
              {mobility && theSwitch === false ? (
                <BarChart2
                  data={mobilityData}
                  addDims={{ width: 30, height: 30 }}
                  type={'mobility'}
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
            {/* Pre filter here (below) */}
            <Grid item xs={2}>
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
                  Filter
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const preAnalyticsMobile = (
    <React.Fragment>
      <div className={classes.divPadding} />
      <Grid
        container
        justifyContent="center"
        style={{ top: theme.mixins.toolbar }}
        direction="column"
      >
        <Grid item container justifyContent="center">
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
          <Grid />
          <Grid item container justifyContent="center">
            <KeyboardDatePicker
              autoOk
              views={['year', 'month']}
              className={classes.root2}
              variant="inline"
              inputVariant="outlined"
              value={selectedFromDate}
              InputAdornmentProps={{ position: 'start' }}
              onChange={(date) => setSelectedFromDate(date)}
              label={'beginning of'}
            />
          </Grid>

          <Grid item container justifyContent="center">
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
          </Grid>

          <Grid item container justifyContent="center">
            <KeyboardDatePicker
              autoOk
              views={['year', 'month']}
              className={classes.root2}
              variant="inline"
              inputVariant="outlined"
              value={selectedToDate}
              InputAdornmentProps={{ position: 'start' }}
              onChange={(date) => setSelectedToDate(date)}
              label={'end of'}
            />
          </Grid>
        </Grid>
        {currentUser.userType === 'Coach' ? (
          <Grid
            item
            container
            justifyContent="center"
            style={{ marginTop: '1.5rem' }}
          >
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
          </Grid>
        ) : (
          void 0
        )}
        {currentUser.userType === 'Coach' ? (
          <React.Fragment>
            <Grid
              item
              container
              justifyContent="center"
              style={{ marginTop: '1rem' }}
            >
              <Typography align="center">Athlete Select</Typography>
              <Select
                labelId="mutiple-chip-label"
                id="mutiple-chip"
                multiple
                value={personName}
                onChange={handlePersonChange}
                onOpen={() => setAreaMenuSwitch(false)}
                onClose={() => setAreaMenuSwitch(true)}
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
                {athleteSelection.map((name) => (
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
            <Grid
              item
              container
              justifyContent="center"
              style={{ marginTop: '2rem' }}
            >
              <Typography align="center">Team Select</Typography>
              <Select
                labelId="team-chip-label"
                id="team-mutiple-chip"
                multiple
                value={teamName}
                onChange={handleTeamChange}
                onOpen={() => setAreaMenuSwitch(false)}
                onClose={() => setAreaMenuSwitch(true)}
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
                {teamSelection.map((name) => (
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
            <Grid
              item
              container
              justifyContent="center"
              style={{ marginTop: '2rem' }}
            >
              {progress ? (
                <CircularProgress color="secondary" />
              ) : (
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
                    classes={{ button: classes.listItem2 }}
                    disableGutters
                  >
                    <ListItemText
                      primary={'Submit'}
                      primaryTypographyProps={{ align: 'center' }}
                    />
                  </ListItem>
                </List>
              )}
              {errors}
            </Grid>
          </React.Fragment>
        ) : (
          void 0
        )}

        <Grid
          item
          container
          justifyContent="center"
          style={{ marginTop: '1.5rem' }}
        >
          <Typography variant="h5" style={{ marginBottom: '1rem' }}>
            Program Analytics
          </Typography>
        </Grid>

        <Grid
          item
          container
          justifyContent="center"
          style={{ marginTop: '1rem' }}
        >
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
        <div style={{ height: 700, marginTop: '1rem' }}>
          {/* ---------- Bar charts logic second ----------- */}
          {topExe && theSwitch === false ? (
            <BarChart2
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
            <BarChart2
              data={topExercisesData
                .sort(function (a, b) {
                  return a.value - b.value;
                })
                .slice(0, 5)}
              addDims={{ width: 50, height: 30 }}
              type={'top'}
            />
          ) : (
            void 0
          )}
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
            <BarChart3
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
          {mobility && theSwitch === false ? (
            <BarChart2
              data={mobilityData}
              addDims={{ width: 30, height: 30 }}
              type={'mobility'}
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
        </div>
      </Grid>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div style={{ marginTop: '1rem' }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {matches ? preAnalyticsView : preAnalyticsMobile}
        </MuiPickersUtilsProvider>
      </div>
    </React.Fragment>
  );
};

AnalyticsPre.getInitialProps = async (ctx, client, currentUser) => {
  const db = getFirestore(app);

  // fetch exercises from firebase
  const exercises = await getExercises(db).then((doc) => {
    return doc;
  });

  var coachData;
  // fetch coaches roster
  if (!currentUser) {
    coachData = [{ id: '', rosterTeam: [], rosterInd: [], rosterSearch: [] }];
  } else {
    const { data } = await client.get(`/api/athletic/${currentUser.id}`);
    coachData = data;
  }

  // console.log(data);

  var customer;
  if (!currentUser) {
    customer = { data: '' };
  } else {
    if (currentUser.userType === 'Coach') {
      customer = await client.get(
        `/api/payments/retrieve-customers/${currentUser.email}`
      );
    } else {
      customer = { data: '' };
    }
  }

  //coachInfo: data

  return {
    exercises: exercises,
    coachInfo: coachData[0],
    customerStripe: customer.data,
  };
};

// When the page first loads you need all the athletes and team names from the current signed in account - getInitial Props

export default AnalyticsPre;

// export const coach1 = {
//   id: '1234',
//   userName: 'hello hello',
//   discipline: 'Oly',
//   height: '178',
//   weight: '67',
//   sex: 'Male',
//   type: 'Coach',
//   DOB: '2022-02-01',
//   userId: '123',
//   exercises: [],
//   rosterInd: [
//     { id: '600', userName: 'joe', discipline: 'Hockey', userId: '600' },
//     { id: '700', userName: 'sam', discipline: 'Football', userId: '700' },
//     { id: '456', userName: 'john', discipline: 'Soccer', userId: '456' },
//   ],
//   rosterTeam: [
//     {
//       team: 'Soccer (M)',
//       athletes: [
//         { id: '600', userName: 'joe', discipline: 'Hockey', userId: '600' },
//         { id: '700', userName: 'sam', discipline: 'Football', userId: '700' },
//       ],
//     },
//     {
//       team: 'Football',
//       athletes: [
//         { id: '600', userName: 'joe', discipline: 'Hockey', userId: '600' },
//         { id: '456', userName: 'john', discipline: 'Soccer', userId: '456' },
//       ],
//     },
//     {
//       team: 'Hockey (F)',
//       athletes: [
//         { id: '456', userName: 'john', discipline: 'Soccer', userId: '456' },
//       ],
//     },
//   ],
//   rosterSearch: [
//     { id: '600', userName: 'joe', discipline: 'Hockey', userId: '600' },
//     { id: '700', userName: 'sam', discipline: 'Football', userId: '700' },
//     { id: '456', userName: 'john', discipline: 'Soccer', userId: '456' },
//   ],
// };

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
