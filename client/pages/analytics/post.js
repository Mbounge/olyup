import React, { useState, useEffect } from 'react';
import { makeStyles, lighten } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { data as dataBeta } from './TestData';
import { coach1 } from './MockCoach';
import useRequest from '../../hooks/use-request';
import axios from 'axios';

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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  InputAdornment,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import theme from '../../src/ui/theme';
import app from '../../src/fire';
import AreaChart from '../../components/analytics/AreaChart';
import AreaChart2 from '../../components/analytics/AreaChart2';
import Router from 'next/router';
import { v4 as uuidv4 } from 'uuid';

async function getExercises(db) {
  const exerciseCol = collection(db, '/ExerciseProps');
  const exerciseSnapshot = await getDocs(exerciseCol);
  const exerciseList = exerciseSnapshot.docs.map((doc) => doc.data());

  return exerciseList;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
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
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
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
    width: '16rem',
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
  exerciseInput2: {
    '&&[class*="MuiOutlinedInput-root"]': {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: '2.5rem',
      width: '19rem',
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
var loadData2kg;
var loadData2lbs;
const volumeData2 = {};
const minData2 = {};
var minData2kg;
var minData2lbs;
const maxData2 = {};
var maxData2kg;
var maxData2lbs;
const prData = {};
const prData2 = {};
var prData3;
const totalVolumeData2 = [];
const totalLoadData2 = [];
var totalLoadData2kg;
var totalLoadData2lbs;

var objectLoadKeys;
var objectVolumeKeys;
var objectMaxKeys;
var objectMinKeys;
var objectPrKeys;

// make from and To date variables into pieces of state!
// var fromDate;
// var toDate;

// TODO: -  capture keys first
// -------- I THINK I AM GOING TO AGGREGATE ALL THE VALUES ------------ //

// Need to plug in the required data from database objects

// NOTE: - Change date to first day of that year
//console.log(new Date(new Date().getFullYear(), 0, 1));
const AnalyticsPost = ({
  exercises,
  coachInfo, // is also athlete data
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
  const [value2, setValue2] = useState(null);
  const [data, setData] = useState([]);
  const [datar, setDatar] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseName2, setExerciseName2] = useState('');
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
  const [measurement, setMeasurement] = useState('kg');
  const [personName, setPersonName] = useState([]);
  const [teamName, setTeamName] = useState([]);
  const [anchorElArea, setAnchorElArea] = useState(null);
  const [selectedIndexArea, setSelectedIndexArea] = useState(0);
  const [areaMenuSwitch, setAreaMenuSwitch] = useState(true);
  const [progress, setProgress] = useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('exercises');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [table, setTable] = useState(false);
  const inputRef = React.useRef();

  const { doRequest, errors } = useRequest({
    url: '/api/exercise/index', // happening in the browser!
    method: 'post',
    body: { athleteIds, fromDate, toDate },
    onSuccess: (data) => {
      //console.log(data),
      setData(data[1]), // date ranged exercises
        setDatar(data[0]), // PR's
        setProgress(false),
        setUpdateDataCounter(updateDataCounter + 1);
    }, // increment updateDataCounter here!
  });

  const classes = useStyles();
  const matches = useMediaQuery('(min-width:880px)');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, Object.keys(prData).length - page * rowsPerPage);

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

  // Close preAnalyticsPie options menu

  const handleTableChange = () => {
    setTable(!table);
  };

  const handleCloseArea = () => {
    setAnchorElArea(null);
    console.log('Menu Closed');
    setAreaMenuSwitch(true);
    return false;
  };

  const handleExerciseChange = (e) => {
    setExerciseName(e.toLowerCase());
    setSearchItems(dynamicSearch());
  };

  const handleExerciseChange2 = (e) => {
    setExerciseName2(e.toLowerCase());

    // Filtering system for personal record data
    prData3 = JSON.parse(
      JSON.stringify(
        Object.fromEntries(
          Object.entries(prData2).filter(([key]) => key.includes(e))
        )
      )
    );

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
    // setDatar(dataBeta);

    // console.log(
    //   dataBeta.filter(
    //     (ele) =>
    //       new Date(ele.date) >= new Date(fromDate) &&
    //       new Date(ele.date) <= new Date(toDate) &&
    //       athleteIds.includes(ele.athleteId)
    //   )
    // );

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

  // if athlete is logged in, fix filter options accordingly
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

  useEffect(() => {
    if (theSwitch) {
      // kg
      setMeasurement('lbs');
    } else {
      // lbs
      setMeasurement('kg');
    }
  }, [theSwitch]);

  //  ******************* let the games begin ************************ //
  // Gathering (All Time) Personal Records Data
  useEffect(() => {
    if (datar) {
      for (var key in prData) {
        if (prData.hasOwnProperty(key)) {
          delete prData[key];
        }
      }

      for (var key in prData2) {
        if (prData2.hasOwnProperty(key)) {
          delete prData2[key];
        }
      }

      datar.map((obj) => {
        exercises.map((exercise) => {
          if (obj.exerciseName2[0] === exercise.ExerciseName) {
            // exercise is there from results so add to prData
            // prData only shows results of exercises done
            if (prData2.hasOwnProperty(exercise.ExerciseName)) {
              // back squat
              //console.log('exercise there');
              if (prData2[exercise.ExerciseName].hasOwnProperty('min')) {
                if (
                  prData2[exercise.ExerciseName]['min'].hasOwnProperty(
                    obj.userName
                  )
                ) {
                  // name is there check if min for this name is min
                  if (obj.results) {
                    try {
                      var prMin = [];
                      var prMin2 = 0;
                      var prMinPlace = []; // value to capture vice versa
                      var prMin2Place = 0; // value to capture vice versa

                      console.log(obj.measurement);

                      if (obj.measurement == 'kg') {
                        // convert to lbs
                        obj.results.map((val) => {
                          prMin.push(
                            Math.round(val.value * 2.205) // lbs values
                          );
                          prMinPlace.push(val.value); // kg values
                        });

                        prMin2 = Math.min(...prMin); // lbs min
                        prMin2Place = Math.min(...prMinPlace); // kg min
                        const date = new Date(obj.date);

                        var month = date.getMonth() + 1;
                        var dt = date.getDate();

                        if (dt < 10) {
                          dt = '0' + dt;
                        }
                        if (month < 10) {
                          month = '0' + month;
                        }

                        if (
                          prData2[exercise.ExerciseName]['min'][
                            obj.userName
                          ].hasOwnProperty('lbs')
                        ) {
                          if (
                            prMin2 <
                            prData2[exercise.ExerciseName]['min'][obj.userName][
                              'lbs'
                            ]
                          ) {
                            prData2[exercise.ExerciseName]['min'][obj.userName][
                              'lbs'
                            ] = prMin2;
                            prData2[exercise.ExerciseName]['min'][obj.userName][
                              'kg'
                            ] = prMin2Place;
                            prData2[exercise.ExerciseName]['minDate'][
                              obj.userName
                            ] = `${date.getFullYear()}-${month}-${dt}`;
                          }
                        } else if (
                          !prData2[exercise.ExerciseName]['min'][
                            obj.userName
                          ].hasOwnProperty('lbs')
                        ) {
                          if (
                            prMin2 <
                            prData2[exercise.ExerciseName]['min'][obj.userName][
                              'lbs'
                            ]
                          ) {
                            prData2[exercise.ExerciseName]['min'][obj.userName][
                              'lbs'
                            ] = prMin2;
                            prData2[exercise.ExerciseName]['min'][obj.userName][
                              'kg'
                            ] = prMin2Place;
                            prData2[exercise.ExerciseName]['minDate'][
                              obj.userName
                            ] = `${date.getFullYear()}-${month}-${dt}`;
                          }
                        }
                      }

                      if (obj.measurement == 'lbs') {
                        // convert to kg
                        obj.results.map((val) => {
                          prMin.push(
                            Math.round(val.value / 0.453592) // kg value
                          );
                          prMinPlace.push(val.value); // lbs value
                        });

                        prMin2 = Math.min(...prMin); // kg min
                        prMin2Place = Math.min(...prMinPlace); // lbs min
                        const date = new Date(obj.date);

                        var month = date.getMonth() + 1;
                        var dt = date.getDate();

                        if (dt < 10) {
                          dt = '0' + dt;
                        }
                        if (month < 10) {
                          month = '0' + month;
                        }

                        if (
                          prData2[exercise.ExerciseName]['min'][
                            obj.userName
                          ].hasOwnProperty('kg')
                        ) {
                          if (
                            prMin2 <
                            prData2[exercise.ExerciseName]['min'][obj.userName][
                              'kg'
                            ]
                          ) {
                            prData2[exercise.ExerciseName]['min'][obj.userName][
                              'kg'
                            ] = prMin2;
                            prData2[exercise.ExerciseName]['min'][obj.userName][
                              'lbs'
                            ] = prMin2Place;
                            prData2[exercise.ExerciseName]['minDate'][
                              obj.userName
                            ] = `${date.getFullYear()}-${month}-${dt}`;
                          }
                        } else if (
                          !prData2[exercise.ExerciseName]['min'][
                            obj.userName
                          ].hasOwnProperty('kg')
                        ) {
                          if (
                            prMin2 <
                            prData2[exercise.ExerciseName]['min'][obj.userName][
                              'kg'
                            ]
                          ) {
                            prData2[exercise.ExerciseName]['min'][obj.userName][
                              'kg'
                            ] = prMin2;
                            prData2[exercise.ExerciseName]['min'][obj.userName][
                              'lbs'
                            ] = prMin2Place;
                            prData2[exercise.ExerciseName]['minDate'][
                              obj.userName
                            ] = `${date.getFullYear()}-${month}-${dt}`;
                          }
                        }
                      }
                    } catch (err) {}
                  }
                } else if (
                  !prData2[exercise.ExerciseName]['min'].hasOwnProperty(
                    obj.userName
                  )
                ) {
                  console.log('YOOO');
                  // name not there
                  if (obj.results) {
                    try {
                      var prMin = [];
                      var prMin2 = 0;
                      var prMinPlace = []; // value to capture vice versa
                      var prMin2Place = 0; // value to capture vice versa

                      if (obj.measurement == 'kg') {
                        // convert to lbs
                        obj.results.map((val) => {
                          prMin.push(
                            Math.round(val.value * 2.205) // lbs values
                          );
                          prMinPlace.push(val.value); // kg values
                        });

                        prMin2 = Math.min(...prMin); // lbs min
                        prMin2Place = Math.min(...prMinPlace); // kg min
                        const date = new Date(obj.date);

                        var month = date.getMonth() + 1;
                        var dt = date.getDate();

                        if (dt < 10) {
                          dt = '0' + dt;
                        }
                        if (month < 10) {
                          month = '0' + month;
                        }

                        //console.log('lost - pre');
                        console.log(obj.userName);
                        console.log(exercise.ExerciseName);

                        prData2[exercise.ExerciseName]['min'][obj.userName] = {
                          lbs: prMin2,
                          kg: prMin2Place,
                        };
                        prData2[exercise.ExerciseName]['minDate'][
                          obj.userName
                        ] = `${date.getFullYear()}-${month}-${dt}`;
                      }

                      if (obj.measurement == 'lbs') {
                        // convert to kg
                        obj.results.map((val) => {
                          prMin.push(
                            Math.round(val.value / 0.453592) // kg value
                          );
                          prMinPlace.push(val.value); // lbs value
                        });

                        prMin2 = Math.min(...prMin); // kg min
                        prMin2Place = Math.min(...prMinPlace); // lbs min
                        const date = new Date(obj.date);

                        prData2[exercise.ExerciseName]['min'][obj.userName] = {
                          lbs: prMin2Place,
                          kg: prMin2,
                        };
                        prData2[exercise.ExerciseName]['minDate'][
                          obj.userName
                        ] = `${date.getFullYear()}-${month}-${dt}`;
                      }
                    } catch (err) {}
                  }
                }
              }

              if (prData2[exercise.ExerciseName].hasOwnProperty('max')) {
                if (
                  prData2[exercise.ExerciseName]['max'].hasOwnProperty(
                    obj.userName
                  )
                ) {
                  // name is there check if min for this name
                  if (obj.results) {
                    try {
                      var prMin = [];
                      var prMin2 = 0;
                      var prMinPlace = []; // value to capture vice versa
                      var prMin2Place = 0; // value to capture vice versa

                      if (obj.measurement == 'kg') {
                        // convert to lbs
                        obj.results.map((val) => {
                          prMin.push(
                            Math.round(val.value * 2.205) // lbs values
                          );
                          prMinPlace.push(val.value); // kg values
                        });

                        prMin2 = Math.max(...prMin); // lbs min
                        prMin2Place = Math.max(...prMinPlace); // kg min
                        const date = new Date(obj.date);

                        var month = date.getMonth() + 1;
                        var dt = date.getDate();

                        if (dt < 10) {
                          dt = '0' + dt;
                        }
                        if (month < 10) {
                          month = '0' + month;
                        }

                        if (
                          prData2[exercise.ExerciseName]['max'][
                            obj.userName
                          ].hasOwnProperty('lbs')
                        ) {
                          if (
                            prMin2 >
                            prData2[exercise.ExerciseName]['max'][obj.userName][
                              'lbs'
                            ]
                          ) {
                            prData2[exercise.ExerciseName]['max'][obj.userName][
                              'lbs'
                            ] = prMin2;
                            prData2[exercise.ExerciseName]['max'][obj.userName][
                              'kg'
                            ] = prMin2Place;
                            prData2[exercise.ExerciseName]['maxDate'][
                              obj.userName
                            ] = `${date.getFullYear()}-${month}-${dt}`;
                          }
                        } else if (
                          !prData2[exercise.ExerciseName]['max'][
                            obj.userName
                          ].hasOwnProperty('lbs')
                        ) {
                          if (
                            prMin2 >
                            prData2[exercise.ExerciseName]['max'][obj.userName][
                              'lbs'
                            ]
                          ) {
                            prData2[exercise.ExerciseName]['max'][obj.userName][
                              'lbs'
                            ] = prMin2;
                            prData2[exercise.ExerciseName]['max'][obj.userName][
                              'kg'
                            ] = prMin2Place;
                            prData2[exercise.ExerciseName]['maxDate'][
                              obj.userName
                            ] = `${date.getFullYear()}-${month}-${dt}`;
                          }
                        }
                      }

                      if (obj.measurement == 'lbs') {
                        // convert to kg
                        obj.results.map((val) => {
                          prMin.push(
                            Math.round(val.value / 0.453592) // kg value
                          );
                          prMinPlace.push(val.value); // lbs value
                        });

                        prMin2 = Math.max(...prMin); // kg min
                        prMin2Place = Math.max(...prMinPlace); // lbs min
                        const date = new Date(obj.date);

                        var month = date.getMonth() + 1;
                        var dt = date.getDate();

                        if (dt < 10) {
                          dt = '0' + dt;
                        }
                        if (month < 10) {
                          month = '0' + month;
                        }

                        if (
                          prData2[exercise.ExerciseName]['max'][
                            obj.userName
                          ].hasOwnProperty('kg')
                        ) {
                          if (
                            prMin2 >
                            prData2[exercise.ExerciseName]['max'][obj.userName][
                              'kg'
                            ]
                          ) {
                            prData2[exercise.ExerciseName]['max'][obj.userName][
                              'kg'
                            ] = prMin2;
                            prData2[exercise.ExerciseName]['max'][obj.userName][
                              'lbs'
                            ] = prMin2Place;
                            prData2[exercise.ExerciseName]['maxDate'][
                              obj.userName
                            ] = `${date.getFullYear()}-${month}-${dt}`;
                          }
                        } else if (
                          !prData2[exercise.ExerciseName]['max'][
                            obj.userName
                          ].hasOwnProperty('kg')
                        ) {
                          if (
                            prMin2 >
                            prData2[exercise.ExerciseName]['max'][obj.userName][
                              'kg'
                            ]
                          ) {
                            prData2[exercise.ExerciseName]['max'][obj.userName][
                              'kg'
                            ] = prMin2;
                            prData2[exercise.ExerciseName]['max'][obj.userName][
                              'lbs'
                            ] = prMin2Place;
                            prData2[exercise.ExerciseName]['maxDate'][
                              obj.userName
                            ] = `${date.getFullYear()}-${month}-${dt}`;
                          }
                        }
                      }
                    } catch (err) {}
                  }
                } else if (
                  !prData2[exercise.ExerciseName]['max'].hasOwnProperty(
                    obj.userName
                  )
                ) {
                  // name not there
                  if (obj.results) {
                    try {
                      var prMin = [];
                      var prMin2 = 0;
                      var prMinPlace = []; // value to capture vice versa
                      var prMin2Place = 0; // value to capture vice versa

                      if (obj.measurement == 'kg') {
                        // convert to lbs
                        obj.results.map((val) => {
                          prMin.push(
                            Math.round(val.value * 2.205) // lbs values
                          );
                          prMinPlace.push(val.value); // kg values
                        });

                        prMin2 = Math.max(...prMin); // lbs min
                        prMin2Place = Math.max(...prMinPlace); // kg min
                        const date = new Date(obj.date);

                        var month = date.getMonth() + 1;
                        var dt = date.getDate();

                        if (dt < 10) {
                          dt = '0' + dt;
                        }
                        if (month < 10) {
                          month = '0' + month;
                        }

                        prData2[exercise.ExerciseName]['max'][obj.userName] = {
                          kg: prMin2Place,
                          lbs: prMin2,
                        };
                        prData2[exercise.ExerciseName]['maxDate'][
                          obj.userName
                        ] = `${date.getFullYear()}-${month}-${dt}`;
                      }

                      if (obj.measurement == 'lbs') {
                        // convert to kg
                        obj.results.map((val) => {
                          prMin.push(
                            Math.round(val.value / 0.453592) // kg value
                          );
                          prMinPlace.push(val.value); // lbs value
                        });

                        prMin2 = Math.max(...prMin); // kg min
                        prMin2Place = Math.max(...prMinPlace); // lbs min
                        const date = new Date(obj.date);

                        var month = date.getMonth() + 1;
                        var dt = date.getDate();

                        if (dt < 10) {
                          dt = '0' + dt;
                        }
                        if (month < 10) {
                          month = '0' + month;
                        }

                        prData2[exercise.ExerciseName]['max'][obj.userName] = {
                          kg: prMin2,
                          lbs: prMin2Place,
                        };
                        prData2[exercise.ExerciseName]['maxDate'][
                          obj.userName
                        ] = `${date.getFullYear()}-${month}-${dt}`;
                      }
                    } catch (err) {}
                  }
                }
              }
            } else if (!prData2.hasOwnProperty(exercise.ExerciseName)) {
              //console.log('exercise not there');
              if (obj.results) {
                try {
                  var prResults = [];
                  var prResultsPlace = [];
                  var prMax2 = 0;
                  var prMin2 = 0;
                  var prMinPlace = 0; // value to capture vice versa
                  var prMaxPlace = 0; // value to capture vice versa

                  if (obj.measurement == 'kg') {
                    // convert to lbs
                    obj.results.map((val) => {
                      prResults.push(
                        Math.round(val.value * 2.205) // lbs values
                      );
                      prResultsPlace.push(val.value); // kg values
                    });

                    const date = new Date(obj.date);

                    var month = date.getMonth() + 1;
                    var dt = date.getDate();

                    if (dt < 10) {
                      dt = '0' + dt;
                    }
                    if (month < 10) {
                      month = '0' + month;
                    }

                    prMin2 = Math.min(...prResults); // lbs
                    prMax2 = Math.max(...prResults); // lbs
                    prMinPlace = Math.min(...prResultsPlace); // kg
                    prMaxPlace = Math.max(...prResultsPlace); // kg

                    prData2[exercise.ExerciseName] = {
                      min: { [obj.userName]: { kg: prMinPlace, lbs: prMin2 } },
                      max: { [obj.userName]: { kg: prMaxPlace, lbs: prMax2 } },
                      minDate: {
                        [obj.userName]: `${date.getFullYear()}-${month}-${dt}`,
                      },
                      maxDate: {
                        [obj.userName]: `${date.getFullYear()}-${month}-${dt}`,
                      },
                    };
                  }

                  if (obj.measurement == 'lbs') {
                    // convert to kg
                    obj.results.map((val) => {
                      prResults.push(
                        Math.round(val.value / 0.453592) // kg values
                      );
                      prResultsPlace.push(val.value); // lb values
                    });

                    const date = new Date(obj.date);

                    var month = date.getMonth() + 1;
                    var dt = date.getDate();

                    if (dt < 10) {
                      dt = '0' + dt;
                    }
                    if (month < 10) {
                      month = '0' + month;
                    }

                    prMin2 = Math.min(...prResults); // kg
                    prMax2 = Math.max(...prResults); // kg
                    prMinPlace = Math.min(...prResultsPlace); // lb
                    prMaxPlace = Math.max(...prResultsPlace); // lb

                    prData2[exercise.ExerciseName] = {
                      min: { [obj.userName]: { kg: prMin2, lbs: prMinPlace } },
                      max: { [obj.userName]: { kg: prMax2, lbs: prMaxPlace } },
                      minDate: {
                        [obj.userName]: {
                          [obj.userName]: `${date.getFullYear()}-${month}-${dt}`,
                        },
                      },
                      maxDate: {
                        [obj.userName]: {
                          [obj.userName]: `${date.getFullYear()}-${month}-${dt}`,
                        },
                      },
                    };
                  }
                } catch (err) {}
              }
            }
          } else {
            // exercises that are not there have a min/max result of 0
            //console.log('not recorded');
          }
        });
      });

      objectPrKeys = Object.keys(prData2);
      objectPrKeys.map((key) => {
        universalBufferNames.map((name) => {
          if (!Object.keys(prData2[key]['min']).includes(name)) {
            prData2[key]['min'][name] = { min: 0, max: 0 };
          }
          if (!Object.keys(prData2[key]['max']).includes(name)) {
            prData2[key]['max'][name] = { min: 0, max: 0 };
          }
          if (!Object.keys(prData2[key]['minDate']).includes(name)) {
            prData2[key]['minDate'][name] = 'no data';
          }
          if (!Object.keys(prData2[key]['maxDate']).includes(name)) {
            prData2[key]['maxDate'][name] = 'no data';
          }
        });
      });

      prData3 = JSON.parse(JSON.stringify(prData2));
    }

    //////////////////// AREA GRAPH DATA LOGIC //////////////////////////

    if (data) {
      // RESET VALUES

      totalLoadData2.splice(0, totalLoadData2.length);
      totalVolumeData2.splice(0, totalVolumeData2.length);

      for (var key in loadData2) {
        if (loadData2.hasOwnProperty(key)) {
          delete loadData2[key];
        }
      }

      for (var key in volumeData2) {
        if (volumeData2.hasOwnProperty(key)) {
          delete volumeData2[key];
        }
      }

      for (var key in minData2) {
        if (minData2.hasOwnProperty(key)) {
          delete minData2[key];
        }
      }

      for (var key in maxData2) {
        if (maxData2.hasOwnProperty(key)) {
          delete maxData2[key];
        }
      }

      // ******************* POST ANALYTICS ********************* //
      //console.log(data);

      // const mockData = {
      //   'back squat': {
      //     kgMax: { john: { kg: 30, lbs: 66 }, sam: 10, joe: 0 },
      //     kgMin: { john: 10, sam: 5, joe: 0 },
      //     date: { john: '2022-01-01', sam: '2012-01-01', joe: 0 },
      //   },

      //   'front squat': {
      //     max: { john: 50, sam: 90, joe: 0 },
      //     min: { john: 20, sam: 39, joe: 0 },
      //     date: { john: '2022-01-01', sam: '2012-01-01', joe: 0 },

      //   }, }

      // This goes into useEffect!!!!!!! - to account for changes in data

      data.map((obj) => {
        // remember this is for each document
        // search for these items first before adding or pushing content in the object
        // put exerciseName key first
        // create list
        // then look for keys and insert - year, names

        // AREA CHARTS - POPULATION (Kg/LBS)
        var aggregateLoad = 0;
        var aggregateLoadPlace = 0;

        if (obj.measurement == 'lbs') {
          // convert to lbs

          if (obj.results) {
            try {
              obj.results.forEach((item) => {
                aggregateLoad += Math.round(item.value / 0.453592); // kg
                aggregateLoadPlace += item.value; // lbs

                var finalAggregateLoad = parseInt(aggregateLoad); // kg
                var finalAggregateLoadPlace = parseInt(aggregateLoadPlace); // lbs

                var minResult = 0;
                var maxResult = 0;
                var minResultPlace = 0;
                var maxResultPlace = 0;

                var listResults = [];
                var listResultsPlace = [];

                obj.results.forEach((item) => {
                  listResults.push(Math.round(item.value / 0.453592)); // kg
                  listResultsPlace.push(item.value); // lbs
                });
                maxResult = Math.max(...listResults); // kg
                minResult = Math.min(...listResults); // kg
                maxResultPlace = Math.max(...listResultsPlace); // lbs
                minResultPlace = Math.min(...listResultsPlace); // lbs

                // TotalAggregateLoad Calculation
                var yearAggLoadIndex = totalLoadData2.findIndex(
                  (itm) => itm.year == obj.date
                );

                if (yearAggLoadIndex >= 0) {
                  // Year found
                  totalLoadData2[yearAggLoadIndex].value['kg'] +=
                    finalAggregateLoad;
                  totalLoadData2[yearAggLoadIndex].value['lbs'] +=
                    finalAggregateLoadPlace;
                } else if (yearAggLoadIndex == -1) {
                  // Year not found
                  totalLoadData2.push({
                    year: obj.date,
                    value: {
                      kg: finalAggregateLoad,
                      lbs: finalAggregateLoadPlace,
                    },
                  });
                }

                // loadData 2 Calculation
                if (loadData2.hasOwnProperty(obj.exerciseName2)) {
                  // Exercise Name found!!!
                  // Now need to findIndex of year and athlete name and add aggregate
                  var yearLoadIndex = loadData2[obj.exerciseName2[0]].findIndex(
                    (itm) => itm.year == obj.date
                  );

                  if (yearLoadIndex >= 0) {
                    // found date
                    // now need to find athlete name
                    var nameLoadIndex = loadData2[obj.exerciseName2[0]][
                      yearLoadIndex
                    ].hasOwnProperty(obj.userName);

                    if (nameLoadIndex) {
                      // found name
                      //console.log('Load1');
                      loadData2[obj.exerciseName2[0]][yearLoadIndex][
                        obj.userName
                      ] = {
                        kg: finalAggregateLoad,
                        lbs: finalAggregateLoadPlace,
                      };
                    } else {
                      // name not found
                      //console.log('Load2');
                      loadData2[obj.exerciseName2[0]][yearLoadIndex][
                        obj.userName
                      ] = {
                        kg: finalAggregateLoad,
                        lbs: finalAggregateLoadPlace,
                      };
                    }
                  } else if (yearLoadIndex == -1) {
                    // date not found
                    //console.log('Load3');
                    //console.log(obj.userName);
                    loadData2[obj.exerciseName2[0]].push({
                      year: obj.date,
                      [obj.userName]: {
                        kg: finalAggregateLoad,
                        lbs: finalAggregateLoadPlace,
                      },
                    });
                  }
                } else {
                  // Exercise Name not found!!!
                  //console.log('Load - Exercise key, not found!!!');
                  loadData2[obj.exerciseName2[0]] = [
                    {
                      year: obj.date,
                      [obj.userName]: {
                        kg: finalAggregateLoad,
                        lbs: finalAggregateLoadPlace,
                      },
                    },
                  ];
                }

                // minData Calculation
                if (minData2.hasOwnProperty(obj.exerciseName2)) {
                  // Exercise Name found!!!
                  // Now need to findIndex of year and athlete name and add aggregate
                  var yearMinIndex = minData2[obj.exerciseName2[0]].findIndex(
                    (itm) => itm.year == obj.date
                  );

                  if (yearMinIndex >= 0) {
                    // found date
                    // now need to find athlete name
                    var nameMinIndex = minData2[obj.exerciseName2][
                      yearMinIndex
                    ].hasOwnProperty(obj.userName);

                    if (nameMinIndex) {
                      // found name
                      //console.log('Results1');
                      minData2[obj.exerciseName2[0]][yearMinIndex][
                        obj.userName
                      ]['kg'] = minResult;
                      minData2[obj.exerciseName2[0]][yearMinIndex][
                        obj.userName
                      ]['lbs'] = minResultPlace;
                    } else {
                      // name not found
                      //console.log('Results2');
                      minData2[obj.exerciseName2[0]][yearMinIndex][
                        obj.userName
                      ] = { kg: minResult, lbs: minResultPlace };
                    }
                  } else if (yearMinIndex == -1) {
                    // date not found
                    //console.log('Results3');
                    //console.log(obj.userName);
                    minData2[obj.exerciseName2[0]].push({
                      year: obj.date,
                      [obj.userName]: { kg: minResult, lbs: minResultPlace },
                    });
                  }
                } else {
                  // Exercise Name not found!!!
                  //console.log('results - Exercise key, not found!!!');
                  minData2[obj.exerciseName2[0]] = [
                    {
                      year: obj.date,
                      [obj.userName]: { kg: minResult, lbs: minResultPlace },
                    },
                  ];
                }

                // maxData Calculation
                if (maxData2.hasOwnProperty(obj.exerciseName2)) {
                  // Exercise Name found!!!
                  // Now need to findIndex of year and athlete name and add aggregate
                  var yearMaxIndex = maxData2[obj.exerciseName2[0]].findIndex(
                    (itm) => itm.year == obj.date
                  );

                  if (yearMaxIndex >= 0) {
                    // found date
                    // now need to find athlete name
                    var nameMaxIndex = maxData2[obj.exerciseName2[0]][
                      yearMaxIndex
                    ].hasOwnProperty(obj.userName);

                    if (nameMaxIndex) {
                      // found name
                      //console.log('Results1');
                      maxData2[obj.exerciseName2[0]][yearMaxIndex][
                        obj.userName
                      ]['kg'] = maxResult;
                      maxData2[obj.exerciseName2[0]][yearMaxIndex][
                        obj.userName
                      ]['lbs'] = maxResultPlace;
                    } else {
                      // name not found
                      //console.log('Results2');
                      maxData2[obj.exerciseName2[0]][yearMaxIndex][
                        obj.userName
                      ] = { kg: maxResult, lbs: maxResultPlace };
                    }
                  } else if (yearMaxIndex == -1) {
                    // date not found
                    //console.log('Results3');
                    //console.log(obj.userName);
                    maxData2[obj.exerciseName2[0]].push({
                      year: obj.date,
                      [obj.userName]: { kg: maxResult, lbs: maxResultPlace },
                    });
                  }
                } else {
                  // Exercise Name not found!!!
                  //console.log('results - Exercise key, not found!!!');
                  maxData2[obj.exerciseName2[0]] = [
                    {
                      year: obj.date,
                      [obj.userName]: { kg: maxResult, lbs: maxResultPlace },
                    },
                  ];
                }
              });
            } catch (err) {}
          }
        }

        if (obj.measurement == 'kg') {
          // convert to lbs

          if (obj.results) {
            try {
              obj.results.forEach((item) => {
                aggregateLoad += Math.round(item.value * 2.205); // lbs
                aggregateLoadPlace += item.value; // kg

                var finalAggregateLoad = parseInt(aggregateLoad);
                var finalAggregateLoadPlace = parseInt(aggregateLoadPlace);

                var minResult = 0;
                var maxResult = 0;
                var minResultPlace = 0;
                var maxResultPlace = 0;

                var listResults = [];
                var listResultsPlace = [];

                obj.results.forEach((item) => {
                  listResults.push(Math.round(item.value * 2.205)); // lbs
                  listResultsPlace.push(item.value); // kg
                });
                maxResult = Math.max(...listResults); // lbs
                minResult = Math.min(...listResults); // lbs
                maxResultPlace = Math.max(...listResultsPlace); // kg
                minResultPlace = Math.min(...listResultsPlace); // kg

                // TotalAggregateLoad Calculation
                var yearAggLoadIndex = totalLoadData2.findIndex(
                  (itm) => itm.year == obj.date
                );

                if (yearAggLoadIndex >= 0) {
                  // Year found
                  totalLoadData2[yearAggLoadIndex].value['kg'] +=
                    finalAggregateLoadPlace;
                  totalLoadData2[yearAggLoadIndex].value['lbs'] +=
                    finalAggregateLoad;
                } else if (yearAggLoadIndex == -1) {
                  // Year not found
                  totalLoadData2.push({
                    year: obj.date,
                    value: {
                      kg: finalAggregateLoadPlace,
                      lbs: finalAggregateLoad,
                    },
                  });
                }

                // loadData 2 Calculation
                if (loadData2.hasOwnProperty(obj.exerciseName2)) {
                  // Exercise Name found!!!
                  // Now need to findIndex of year and athlete name and add aggregate
                  var yearLoadIndex = loadData2[obj.exerciseName2[0]].findIndex(
                    (itm) => itm.year == obj.date
                  );

                  if (yearLoadIndex >= 0) {
                    // found date
                    // now need to find athlete name
                    var nameLoadIndex = loadData2[obj.exerciseName2[0]][
                      yearLoadIndex
                    ].hasOwnProperty(obj.userName);

                    if (nameLoadIndex) {
                      // found name
                      //console.log('Load1');
                      loadData2[obj.exerciseName2[0]][yearLoadIndex][
                        obj.userName
                      ] = {
                        kg: finalAggregateLoadPlace,
                        lbs: finalAggregateLoad,
                      };
                    } else {
                      // name not found
                      //console.log('Load2');
                      loadData2[obj.exerciseName2[0]][yearLoadIndex][
                        obj.userName
                      ] = {
                        kg: finalAggregateLoadPlace,
                        lbs: finalAggregateLoad,
                      };
                    }
                  } else if (yearLoadIndex == -1) {
                    // date not found
                    //console.log('Load3');
                    //console.log(obj.userName);
                    loadData2[obj.exerciseName2[0]].push({
                      year: obj.date,
                      [obj.userName]: {
                        kg: finalAggregateLoadPlace,
                        lbs: finalAggregateLoad,
                      },
                    });
                  }
                } else {
                  // Exercise Name not found!!!
                  //console.log('Load - Exercise key, not found!!!');
                  loadData2[obj.exerciseName2[0]] = [
                    {
                      year: obj.date,
                      [obj.userName]: {
                        kg: finalAggregateLoadPlace,
                        lbs: finalAggregateLoad,
                      },
                    },
                  ];
                }

                // minData Calculation
                if (minData2.hasOwnProperty(obj.exerciseName2)) {
                  // Exercise Name found!!!
                  // Now need to findIndex of year and athlete name and add aggregate
                  var yearMinIndex = minData2[obj.exerciseName2[0]].findIndex(
                    (itm) => itm.year == obj.date
                  );

                  if (yearMinIndex >= 0) {
                    // found date
                    // now need to find athlete name
                    var nameMinIndex = minData2[obj.exerciseName2][
                      yearMinIndex
                    ].hasOwnProperty(obj.userName);

                    if (nameMinIndex) {
                      // found name
                      //console.log('Results1');
                      minData2[obj.exerciseName2[0]][yearMinIndex][
                        obj.userName
                      ]['kg'] = minResultPlace;
                      minData2[obj.exerciseName2[0]][yearMinIndex][
                        obj.userName
                      ]['lbs'] = minResult;
                    } else {
                      // name not found
                      //console.log('Results2');
                      minData2[obj.exerciseName2[0]][yearMinIndex][
                        obj.userName
                      ] = { kg: minResultPlace, lbs: minResult };
                    }
                  } else if (yearMinIndex == -1) {
                    // date not found
                    //console.log('Results3');
                    //console.log(obj.userName);
                    minData2[obj.exerciseName2[0]].push({
                      year: obj.date,
                      [obj.userName]: { kg: minResultPlace, lbs: minResult },
                    });
                  }
                } else {
                  // Exercise Name not found!!!
                  //console.log('results - Exercise key, not found!!!');
                  minData2[obj.exerciseName2[0]] = [
                    {
                      year: obj.date,
                      [obj.userName]: { kg: minResultPlace, lbs: minResult },
                    },
                  ];
                }

                // maxData Calculation
                if (maxData2.hasOwnProperty(obj.exerciseName2)) {
                  // Exercise Name found!!!
                  // Now need to findIndex of year and athlete name and add aggregate
                  var yearMaxIndex = maxData2[obj.exerciseName2[0]].findIndex(
                    (itm) => itm.year == obj.date
                  );

                  if (yearMaxIndex >= 0) {
                    // found date
                    // now need to find athlete name
                    var nameMaxIndex = maxData2[obj.exerciseName2[0]][
                      yearMaxIndex
                    ].hasOwnProperty(obj.userName);

                    if (nameMaxIndex) {
                      // found name
                      //console.log('Results1');
                      maxData2[obj.exerciseName2[0]][yearMaxIndex][
                        obj.userName
                      ]['kg'] = maxResultPlace;
                      maxData2[obj.exerciseName2[0]][yearMaxIndex][
                        obj.userName
                      ]['lbs'] = maxResult;
                    } else {
                      // name not found
                      //console.log('Results2');
                      maxData2[obj.exerciseName2[0]][yearMaxIndex][
                        obj.userName
                      ] = { kg: maxResultPlace, lbs: maxResult };
                    }
                  } else if (yearMaxIndex == -1) {
                    // date not found
                    //console.log('Results3');
                    //console.log(obj.userName);
                    maxData2[obj.exerciseName2[0]].push({
                      year: obj.date,
                      [obj.userName]: { kg: maxResultPlace, lbs: maxResult },
                    });
                  }
                } else {
                  // Exercise Name not found!!!
                  //console.log('results - Exercise key, not found!!!');
                  maxData2[obj.exerciseName2[0]] = [
                    {
                      year: obj.date,
                      [obj.userName]: { kg: maxResultPlace, lbs: maxResult },
                    },
                  ];
                }
              });
            } catch (err) {}
          }
        }

        // volume calculation revamp

        if (obj.hasOwnProperty('reps')) {
          // do volume calculation
          var vol = 0;
          var objectKeys = Object.keys(obj.reps);
          objectKeys.map((key) => {
            if (obj.reps.hasOwnProperty(key)) {
              obj.reps[key].data.map((ele) => {
                vol += ele.value;
              });

              // totalvolAggr calculation
              // TotalAggregateVolume Calculation
              var yearAggVolumeIndex = totalVolumeData2.findIndex(
                (itm) => itm.year == obj.date
              );

              if (yearAggVolumeIndex >= 0) {
                // Year found
                totalVolumeData2[yearAggVolumeIndex].value += parseInt(vol);
              } else if (yearAggVolumeIndex == -1) {
                // Year not found
                totalVolumeData2.push({
                  year: obj.date,
                  value: parseInt(vol),
                });
              }

              if (volumeData2.hasOwnProperty(key)) {
                // Exercise Name found!!!
                // Now need to findIndex of year and athlete name and add aggregate
                var yearVolumeIndex = volumeData2[key].findIndex(
                  (itm) => itm.year == obj.date
                );

                if (yearVolumeIndex >= 0) {
                  // found date
                  // now need to find athlete name
                  var nameVolumeIndex = volumeData2[key][
                    yearVolumeIndex
                  ].hasOwnProperty(obj.userName);

                  if (nameVolumeIndex) {
                    // found name
                    //console.log('Volume1');
                    volumeData2[key][yearVolumeIndex][obj.userName] =
                      parseInt(vol);
                  } else {
                    // name not found
                    //console.log('Volume2');
                    volumeData2[key][yearVolumeIndex][obj.userName] =
                      parseInt(vol);
                  }
                } else if (yearVolumeIndex == -1) {
                  // date not found
                  //console.log('Volume3');
                  //console.log(obj.userName);
                  volumeData2[key].push({
                    year: obj.date,
                    [obj.userName]: parseInt(vol),
                  });
                }
              } else {
                // Exercise Name not found!!!
                //console.log('Load - Exercise key, not found!!!');
                volumeData2[key] = [
                  { year: obj.date, [obj.userName]: parseInt(vol) },
                ];
              }
            }
          });
        }
      });

      // just adding names and dates which were not added during population step
      // objectPrKeys = Object.keys(prData);
      // objectPrKeys.map((key) => {
      //   universalBufferNames.map((name) => {
      //     if (!Object.keys(prData[key]['min']).includes(name)) {
      //       prData[key]['min'][name] = 0;
      //     }
      //     if (!Object.keys(prData[key]['max']).includes(name)) {
      //       prData[key]['max'][name] = 0;
      //     }
      //     if (!Object.keys(prData[key]['minDate']).includes(name)) {
      //       prData[key]['minDate'][name] = 'no data';
      //     }
      //     if (!Object.keys(prData[key]['maxDate']).includes(name)) {
      //       prData[key]['maxDate'][name] = 'no data';
      //     }
      //   });
      // });

      // ****************  Sorting Logic (ascending) - Graphs data needs to be sorted ****************** //

      objectLoadKeys = Object.keys(loadData2);
      objectVolumeKeys = Object.keys(volumeData2);

      objectMaxKeys = Object.keys(maxData2);
      objectMinKeys = Object.keys(minData2);

      objectLoadKeys.map((key) => {
        loadData2[key].sort(function (a, b) {
          return a.year < b.year ? -1 : a.year > b.year ? 1 : 0;
        });
      });

      //console.log(loadData2);

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

      //const athletekeys = ['joe', 'sam', 'john', 'value'];
      //const athletekeys = universalBufferNames;

      objectLoadKeys.map((key) => {
        loadData2[key].map((obj) => {
          // Now need to search for missing values
          universalBufferNames.map((athKey) => {
            if (obj.hasOwnProperty(athKey) === false) {
              //console.log(athKey);
              obj[athKey] = { kg: 0, lbs: 0 };
            }
          });
        });
      });

      objectVolumeKeys.map((key) => {
        volumeData2[key].map((obj) => {
          // Now need to search for missing values
          universalBufferNames.map((athKey) => {
            if (obj.hasOwnProperty(athKey) === false) {
              obj[athKey] = 0;
            }
          });
        });
      });

      objectMinKeys.map((key) => {
        minData2[key].map((obj) => {
          // Now need to search for missing values
          universalBufferNames.map((athKey) => {
            if (obj.hasOwnProperty(athKey) === false) {
              obj[athKey] = { kg: 0, lbs: 0 };
            }
          });
        });
      });

      objectMaxKeys.map((key) => {
        maxData2[key].map((obj) => {
          // Now need to search for missing values
          universalBufferNames.map((athKey) => {
            if (obj.hasOwnProperty(athKey) === false) {
              obj[athKey] = { kg: 0, lbs: 0 };
            }
          });
        });
      });
      // console.log(loadData2);
      // console.log(totalLoadData2);
      // console.log(minData2);
      // console.log(maxData2);
      // console.log(volumeData2);
      // console.log(placeVolume);
      console.log(totalVolumeData2);

      // separate kg and lbs data and put into respective graphs
      loadData2kg = JSON.parse(JSON.stringify(loadData2));
      loadData2lbs = JSON.parse(JSON.stringify(loadData2));
      minData2kg = JSON.parse(JSON.stringify(minData2));
      minData2lbs = JSON.parse(JSON.stringify(minData2));
      maxData2kg = JSON.parse(JSON.stringify(maxData2));
      maxData2lbs = JSON.parse(JSON.stringify(maxData2));
      totalLoadData2kg = JSON.parse(JSON.stringify(totalLoadData2));
      totalLoadData2lbs = JSON.parse(JSON.stringify(totalLoadData2));

      try {
        objectLoadKeys.map((key) => {
          universalBufferNames.forEach((name) => {
            var value = 0;
            loadData2kg[key].map((obj) => {
              value = obj[name]['kg'];
              obj[name] = value;
            });
          });
        });
      } catch (err) {}

      try {
        objectLoadKeys.map((key) => {
          universalBufferNames.forEach((name) => {
            var value = 0;
            loadData2lbs[key].map((obj) => {
              value = obj[name]['lbs'];
              obj[name] = value;
            });
          });
        });
      } catch (err) {}

      try {
        objectMinKeys.map((key) => {
          universalBufferNames.forEach((name) => {
            var value = 0;
            minData2kg[key].map((obj) => {
              value = obj[name]['kg'];
              obj[name] = value;
            });
          });
        });
      } catch (err) {}

      try {
        objectMinKeys.map((key) => {
          universalBufferNames.forEach((name) => {
            var value = 0;
            minData2lbs[key].map((obj) => {
              value = obj[name]['lbs'];
              obj[name] = value;
            });
          });
        });
      } catch (err) {}

      try {
        objectMaxKeys.map((key) => {
          universalBufferNames.forEach((name) => {
            var value = 0;
            maxData2kg[key].map((obj) => {
              value = obj[name]['kg'];
              obj[name] = value;
            });
          });
        });
      } catch (err) {}

      try {
        objectMaxKeys.map((key) => {
          universalBufferNames.forEach((name) => {
            var value = 0;
            maxData2lbs[key].map((obj) => {
              value = obj[name]['lbs'];
              obj[name] = value;
            });
          });
        });
      } catch (err) {}

      try {
        var value = 0;
        totalLoadData2kg.map((obj) => {
          value = obj.value['kg'];
          obj.value = value;
        });
      } catch (err) {}

      try {
        var value = 0;
        totalLoadData2lbs.map((obj) => {
          value = obj.value['lbs'];
          obj.value = value;
        });
      } catch (err) {}

      console.log(maxData2kg['front squat']);
      console.log(totalLoadData2kg);

      // if (measurement == 'kg') {
      //   console.log('kellogs');
      //   console.log(loadData3);
      //   try {
      //     objectLoadKeys.map((key) => {
      //       universalBufferNames.forEach((name) => {
      //         var value = 0;
      //         loadData3[key].map((obj) => {
      //           value = obj[name][measurement];
      //           obj[name] = value;
      //         });
      //       });
      //     });
      //     console.log(loadData3);
      //   } catch (err) {
      //     //console.log(err);
      //   }
      // } else if (measurement == 'lbs') {
      //   console.log('vectors');
      //   try {
      //     objectLoadKeys.map((key) => {
      //       universalBufferNames.forEach((name) => {
      //         var value = 0;
      //         loadData3[key].map((obj) => {
      //           value = obj[name][measurement];
      //           obj[name] = value;
      //         });
      //       });
      //     });
      //     console.log(loadData3);
      //   } catch (err) {
      //     //console.log(err);
      //   }
      // }
    }
  }, [data.length, updateDataCounter]);
  // At this point we have access to all the data stored in trainingSession (including the aggregate stuff!)

  // to make sure universalBufferNames is updated with other aths results
  useEffect(() => {
    objectPrKeys.map((key) => {
      universalBufferNames.map((name) => {
        if (!Object.keys(prData2[key]['min']).includes(name)) {
          prData2[key]['min'][name] = { min: 0, max: 0 };
        }
        if (!Object.keys(prData2[key]['max']).includes(name)) {
          prData2[key]['max'][name] = { min: 0, max: 0 };
        }
        if (!Object.keys(prData2[key]['minDate']).includes(name)) {
          prData2[key]['minDate'][name] = 'no data';
        }
        if (!Object.keys(prData2[key]['maxDate']).includes(name)) {
          prData2[key]['maxDate'][name] = 'no data';
        }
      });
    });

    prData3 = JSON.parse(JSON.stringify(prData2));
    //console.log(loadData2);
    objectLoadKeys.map((key) => {
      loadData2[key].map((obj) => {
        // Now need to search for missing values
        universalBufferNames.map((athKey) => {
          if (obj.hasOwnProperty(athKey) === false) {
            obj[athKey] = 0;
          }
        });
      });
    });

    //console.log(loadData2);

    objectVolumeKeys.map((key) => {
      volumeData2[key].map((obj) => {
        // Now need to search for missing values
        universalBufferNames.map((athKey) => {
          if (obj.hasOwnProperty(athKey) === false) {
            obj[athKey] = 0;
          }
        });
      });
    });

    objectMinKeys.map((key) => {
      minData2[key].map((obj) => {
        // Now need to search for missing values
        universalBufferNames.map((athKey) => {
          if (obj.hasOwnProperty(athKey) === false) {
            obj[athKey] = 0;
          }
        });
      });
    });

    objectMaxKeys.map((key) => {
      maxData2[key].map((obj) => {
        // Now need to search for missing values
        universalBufferNames.map((athKey) => {
          if (obj.hasOwnProperty(athKey) === false) {
            obj[athKey] = 0;
          }
        });
      });
    });
  }, [universalBufferNames]);

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
      <React.Fragment>
        <Typography
          variant="h6"
          align="center"
          style={{ backgroundColor: theme.palette.primary.main }}
        >
          {`${universalBufferNames[selectedIndexArea]}'s`}
        </Typography>
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
          style={{ backgroundColor: theme.palette.primary.main }}
        >
          <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div"
                align="center"
              >
                Personal Records
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Toolbar>
      </React.Fragment>
    );
  };

  function descendingComparator(a, b, orderBy) {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: 'exercises',
      numeric: false,
      disablePadding: true,
      label: 'Exercise Name',
    },
    { id: 'min', numeric: true, disablePadding: false, label: 'Min' },
    { id: 'max', numeric: true, disablePadding: false, label: 'Max' },
  ];

  function EnhancedTableHead(props) {
    const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead style={{ backgroundColor: theme.palette.primary.main }}>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

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

    // console.log(new Date(yearFrom, monthFrom));
    // console.log(new Date(yearTo, monthTo, 0));

    setFromDate(new Date(yearFrom, monthFrom).toISOString());
    setToDate(new Date(yearTo, monthTo, 0).toISOString());
  }, [selectedFromDate, selectedToDate]);

  useEffect(() => {
    // To stop buggy behavior with menu selection, when user empties personName
    // might want to force value out here
    if (personName.length == 0) {
      setSelectedIndexArea(0);
    }
  }, [personName]);

  useEffect(() => {
    console.log(universalBufferNames);
  }, [universalBufferNames]);

  const postAnalyticsView = (
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
                  views={['year', 'month']}
                  style={{ marginLeft: '1rem' }}
                  className={classes.root2}
                  variant="inline"
                  inputVariant="outlined"
                  value={selectedFromDate}
                  InputAdornmentProps={{ position: 'start' }}
                  onChange={(date) => setSelectedFromDate(date)}
                  label="beginning of"
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
                  label="end of"
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
                          disabled={
                            universalBufferNames.length == 0 ? true : false
                          }
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
              {table ? (
                <React.Fragment>
                  <Grid container>
                    <Grid item xs={5}>
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
                            postFilterNames.length == 0 ? 'hidden' : 'visible',
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
                            primary={postFilterNames[selectedIndexArea]}
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
                        {postFilterNames.map((option, index) => (
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
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={5}>
                      <CardContent classes={{ root: classes.warmup2 }}>
                        <Typography
                          align="center"
                          variant="h5"
                          style={{
                            fontFamily: 'quicksand',
                            fontWeight: 700,
                          }}
                        >
                          Analytics
                        </Typography>
                      </CardContent>
                      <List
                        aria-label="Chart options"
                        classes={{ root: classes.list }}
                        style={{
                          visibility:
                            postFilterNames.length == 0 ? 'hidden' : 'visible',
                        }}
                      >
                        <ListItem
                          button
                          key={'AreaChart Options'}
                          aria-haspopup="true"
                          aria-controls="lock-menu"
                          aria-label="AreaChart Options"
                          classes={{ button: classes.listItem }}
                          onClick={handleTableChange}
                          disableGutters
                        >
                          <ListItemText
                            primary={'Back'}
                            primaryTypographyProps={{ align: 'center' }}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginTop: '1rem' }}>
                    <div className={classes.root}>
                      <Paper className={classes.paper}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                        <TableContainer>
                          <Autocomplete
                            id="autocomplete2"
                            className={classes.exerciseInput}
                            freeSolo
                            size="small"
                            value={value2}
                            onChange={(event, newValue) => {
                              setValue2(newValue);
                            }}
                            classes={{
                              root: classes.exerciseField,
                              inputRoot: classes.exerciseInput,
                              listbox: classes.listBox,
                            }}
                            style={{
                              marginBottom: '1rem',
                            }}
                            onOpen={() => setAreaMenuSwitch(false)}
                            onClose={() => setAreaMenuSwitch(true)}
                            inputValue={exerciseName2}
                            onInputChange={(event, newValue) => {
                              // Managed to print out the values in each input change

                              handleExerciseChange2(newValue);
                            }}
                            options={searchItems.map(
                              (option) => option.ExerciseName
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                autoFocus
                                onFocus={(e) =>
                                  e.currentTarget.setSelectionRange(
                                    e.currentTarget.value.length,
                                    e.currentTarget.value.length
                                  )
                                }
                                style={{
                                  backgroundColor: theme.palette.primary.main,
                                  paddingBottom: 0,
                                }}
                                multiline
                                variant="filled"
                                placeholder="Filter Exercises"
                                inputRef={inputRef}
                              />
                            )}
                          />
                          <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                          >
                            <EnhancedTableHead
                              classes={classes}
                              numSelected={selected.length}
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              rowCount={Object.keys(prData3).length}
                            />

                            <TableBody>
                              {stableSort(
                                Object.keys(prData3),
                                getComparator(order, orderBy)
                              )
                                .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                  const isItemSelected = isSelected(row);
                                  const labelId = `enhanced-table-checkbox-${index}`;

                                  return (
                                    <TableRow key={uuidv4()}>
                                      <TableCell
                                        padding="checkbox"
                                        key={uuidv4()}
                                      ></TableCell>
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                        key={uuidv4()}
                                      >
                                        {row}
                                      </TableCell>
                                      <TableCell align="right" key={uuidv4()}>
                                        {prData3[row].max[
                                          universalBufferNames[
                                            selectedIndexArea
                                          ]
                                        ][measurement] === undefined
                                          ? 0
                                          : `${
                                              prData3[row].min[
                                                universalBufferNames[
                                                  selectedIndexArea
                                                ]
                                              ][measurement]
                                            } ${measurement} - (${
                                              prData3[row].minDate[
                                                universalBufferNames[
                                                  selectedIndexArea
                                                ]
                                              ]
                                            })`}
                                      </TableCell>
                                      <TableCell align="right" key={uuidv4()}>
                                        {prData3[row].max[
                                          universalBufferNames[
                                            selectedIndexArea
                                          ]
                                        ][measurement] === undefined
                                          ? 0
                                          : `${
                                              prData3[row].max[
                                                universalBufferNames[
                                                  selectedIndexArea
                                                ]
                                              ][measurement]
                                            } ${measurement} - (${
                                              prData3[row].maxDate[
                                                universalBufferNames[
                                                  selectedIndexArea
                                                ]
                                              ]
                                            })`}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              {emptyRows > 0 && (
                                <TableRow
                                  style={{
                                    height: (dense ? 10 : 10) * emptyRows,
                                  }}
                                >
                                  <TableCell colSpan={6} />
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={Object.keys(prData3).length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </Paper>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={dense}
                            onChange={handleChangeDense}
                          />
                        }
                        label="Dense padding"
                      />
                    </div>
                  </Grid>
                </React.Fragment>
              ) : (
                <div>
                  <Grid
                    container
                    direction="column"
                    style={{ marginLeft: '1rem' }}
                  >
                    <Typography
                      align="center"
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
                                    visibility: buttonGroup
                                      ? 'visible'
                                      : 'hidden',
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
                                    <Button onClick={onVolumeButton}>
                                      Volume
                                    </Button>
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
                                    visibility: buttonGroup
                                      ? 'visible'
                                      : 'hidden',
                                  }}
                                  onOpen={() => setAreaMenuSwitch(false)}
                                  onClose={() => setAreaMenuSwitch(true)}
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
                        areaMenuSwitch &&
                        measurement === 'kg' ? (
                          <div style={{ height: 400 }}>
                            <AreaChart2
                              data={maxData2kg[exerciseName]}
                              button={'Daily Max'}
                              exercise={exerciseName}
                              keys={universalBufferNames}
                              selectedName={
                                universalBufferNames[selectedIndexArea]
                              }
                              measurement={measurement}
                              type={'one'}
                            />
                          </div>
                        ) : (
                          void 0
                        )}
                        {maxButton &&
                        buttonGroup &&
                        exerciseName &&
                        areaMenuSwitch &&
                        measurement === 'lbs' ? (
                          <div style={{ height: 400 }}>
                            <AreaChart2
                              data={maxData2lbs[exerciseName]}
                              button={'Daily Max'}
                              exercise={exerciseName}
                              keys={universalBufferNames}
                              selectedName={
                                universalBufferNames[selectedIndexArea]
                              }
                              measurement={measurement}
                              type={'one'}
                            />
                          </div>
                        ) : (
                          void 0
                        )}
                        {minButton &&
                        buttonGroup &&
                        exerciseName &&
                        areaMenuSwitch &&
                        measurement === 'kg' ? (
                          <div style={{ height: 400 }}>
                            <AreaChart2
                              data={minData2kg[exerciseName]}
                              button={'Daily Min'}
                              exercise={exerciseName}
                              keys={universalBufferNames}
                              selectedName={
                                universalBufferNames[selectedIndexArea]
                              }
                              measurement={measurement}
                              type={'one'}
                            />
                          </div>
                        ) : (
                          void 0
                        )}
                        {minButton &&
                        buttonGroup &&
                        exerciseName &&
                        areaMenuSwitch &&
                        measurement === 'lbs' ? (
                          <div style={{ height: 400 }}>
                            <AreaChart2
                              data={minData2kg[exerciseName]}
                              button={'Daily Min'}
                              exercise={exerciseName}
                              keys={universalBufferNames}
                              selectedName={
                                universalBufferNames[selectedIndexArea]
                              }
                              measurement={measurement}
                              type={'one'}
                            />
                          </div>
                        ) : (
                          void 0
                        )}
                        {loadButton &&
                        buttonGroup &&
                        exerciseName &&
                        areaMenuSwitch &&
                        measurement === 'kg' ? (
                          <div style={{ height: 400 }}>
                            <AreaChart2
                              data={loadData2kg[exerciseName]}
                              button={'Daily Load'}
                              exercise={exerciseName}
                              keys={universalBufferNames}
                              selectedName={
                                universalBufferNames[selectedIndexArea]
                              }
                              measurement={measurement}
                              type={'one'}
                            />
                          </div>
                        ) : (
                          void 0
                        )}
                        {loadButton &&
                        buttonGroup &&
                        exerciseName &&
                        areaMenuSwitch &&
                        measurement === 'lbs' ? (
                          <div style={{ height: 400 }}>
                            <AreaChart2
                              data={loadData2lbs[exerciseName]}
                              button={'Daily Load'}
                              exercise={exerciseName}
                              keys={universalBufferNames}
                              selectedName={
                                universalBufferNames[selectedIndexArea]
                              }
                              measurement={measurement}
                              type={'one'}
                            />
                          </div>
                        ) : (
                          void 0
                        )}
                        {volumeButton &&
                        buttonGroup &&
                        exerciseName &&
                        areaMenuSwitch ? (
                          <div style={{ height: 400 }}>
                            <AreaChart2
                              data={volumeData2[exerciseName]}
                              button={'Daily Volume'}
                              exercise={exerciseName}
                              keys={universalBufferNames}
                              selectedName={
                                universalBufferNames[selectedIndexArea]
                              }
                              measurement={measurement}
                              type={'one'}
                            />
                          </div>
                        ) : (
                          void 0
                        )}
                        {aggregateLoadChart &&
                        buttonGroup === false &&
                        measurement === 'kg' ? (
                          <div style={{ height: 400 }}>
                            <AreaChart2
                              data={totalLoadData2kg}
                              button={'Total Load'}
                              keys={['value']}
                              selectedName={'placeHolderName'}
                              measurement={measurement}
                              type={'multi'}
                            />
                          </div>
                        ) : (
                          void 0
                        )}
                        {aggregateLoadChart &&
                        buttonGroup === false &&
                        measurement === 'lbs' ? (
                          <div style={{ height: 400 }}>
                            <AreaChart2
                              data={totalLoadData2lbs}
                              button={'Total Load'}
                              keys={['value']}
                              selectedName={'placeHolderName'}
                              measurement={measurement}
                              type={'multi'}
                            />
                          </div>
                        ) : (
                          void 0
                        )}
                        {aggregateVolumeChart && buttonGroup === false ? (
                          <div style={{ height: 400 }}>
                            <AreaChart2
                              data={totalVolumeData2}
                              button={'Total Volume'}
                              keys={['value']}
                              selectedName={'placeHolderName'}
                              measurement={'reps'}
                              type={'multi'}
                            />
                          </div>
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
                          <Typography
                            component="div"
                            style={{ marginBottom: '1rem' }}
                          >
                            <Grid
                              component="label"
                              container
                              alignItems="center"
                            >
                              <Grid
                                item
                                xs={5}
                                style={{ paddingLeft: '1.5rem' }}
                              >
                                <Typography variant="h6">kg</Typography>
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
                              <Grid
                                item
                                xs={5}
                                style={{ paddingLeft: '1.5rem' }}
                              >
                                <Typography variant="h6">lbs</Typography>
                              </Grid>
                            </Grid>
                          </Typography>
                          <CardContent classes={{ root: classes.warmup2 }}>
                            <Typography
                              align="center"
                              variant="h5"
                              style={{
                                fontFamily: 'quicksand',
                                fontWeight: 700,
                              }}
                            >
                              Records
                            </Typography>
                          </CardContent>
                          <List
                            aria-label="Chart options"
                            classes={{ root: classes.list }}
                            style={{
                              visibility:
                                postFilterNames.length == 0
                                  ? 'hidden'
                                  : 'visible',
                            }}
                          >
                            <ListItem
                              button
                              key={'AreaChart Options'}
                              aria-haspopup="true"
                              aria-controls="lock-menu"
                              aria-label="AreaChart Options"
                              classes={{ button: classes.listItem }}
                              onClick={handleTableChange}
                              disableGutters
                            >
                              <ListItemText
                                primary={'View'}
                                primaryTypographyProps={{ align: 'center' }}
                              />
                            </ListItem>
                          </List>
                          <div
                            style={{ marginTop: '1rem', marginBottom: '1rem' }}
                          />
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
                          <List
                            aria-label="Chart options"
                            classes={{ root: classes.list }}
                            style={{
                              visibility:
                                postFilterNames.length == 0
                                  ? 'hidden'
                                  : 'visible',
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
                                primary={postFilterNames[selectedIndexArea]}
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
                            {postFilterNames.map((option, index) => (
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
                </div>
              )}
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    </React.Fragment>
  );

  const postAnalyticsMobile = (
    <React.Fragment>
      {table ? (
        <React.Fragment>
          <Grid container style={{ marginTop: '2rem' }}>
            <Grid item xs={5}>
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
                    postFilterNames.length == 0 ? 'hidden' : 'visible',
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
                    primary={postFilterNames[selectedIndexArea]}
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
                {postFilterNames.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndexArea}
                    onClick={(event) => handleAreaListClick(event, index)}
                    className={classes.menuItem}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={5}>
              <CardContent classes={{ root: classes.warmup2 }}>
                <Typography
                  align="center"
                  variant="h5"
                  style={{
                    fontFamily: 'quicksand',
                    fontWeight: 700,
                  }}
                >
                  Analytics
                </Typography>
              </CardContent>
              <List
                aria-label="Chart options"
                classes={{ root: classes.list }}
                style={{
                  visibility:
                    postFilterNames.length == 0 ? 'hidden' : 'visible',
                }}
              >
                <ListItem
                  button
                  key={'AreaChart Options'}
                  aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="AreaChart Options"
                  classes={{ button: classes.listItem }}
                  onClick={handleTableChange}
                  disableGutters
                >
                  <ListItemText
                    primary={'Back'}
                    primaryTypographyProps={{ align: 'center' }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: '1rem' }}>
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                  <Autocomplete
                    id="autocomplete2"
                    className={classes.exerciseInput}
                    freeSolo
                    size="small"
                    value={value2}
                    onChange={(event, newValue) => {
                      setValue2(newValue);
                    }}
                    classes={{
                      root: classes.exerciseField,
                      inputRoot: classes.exerciseInput,
                      listbox: classes.listBox,
                    }}
                    style={{
                      marginBottom: '1rem',
                    }}
                    onOpen={() => setAreaMenuSwitch(false)}
                    onClose={() => setAreaMenuSwitch(true)}
                    inputValue={exerciseName2}
                    onInputChange={(event, newValue) => {
                      // Managed to print out the values in each input change

                      handleExerciseChange2(newValue);
                    }}
                    options={searchItems.map((option) => option.ExerciseName)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        autoFocus
                        onFocus={(e) =>
                          e.currentTarget.setSelectionRange(
                            e.currentTarget.value.length,
                            e.currentTarget.value.length
                          )
                        }
                        style={{
                          backgroundColor: theme.palette.primary.main,
                          paddingBottom: 0,
                        }}
                        multiline
                        variant="filled"
                        placeholder="Filter Exercises"
                        inputRef={inputRef}
                      />
                    )}
                  />
                  <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                    aria-label="enhanced table"
                  >
                    <EnhancedTableHead
                      classes={classes}
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={Object.keys(prData3).length}
                    />

                    <TableBody>
                      {stableSort(
                        Object.keys(prData3),
                        getComparator(order, orderBy)
                      )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = isSelected(row);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow key={uuidv4()}>
                              <TableCell
                                padding="checkbox"
                                key={uuidv4()}
                              ></TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                key={uuidv4()}
                              >
                                {row}
                              </TableCell>
                              <TableCell align="right" key={uuidv4()}>
                                {prData3[row].max[
                                  universalBufferNames[selectedIndexArea]
                                ][measurement] === undefined
                                  ? 0
                                  : `${
                                      prData3[row].min[
                                        universalBufferNames[selectedIndexArea]
                                      ][measurement]
                                    } ${measurement} - (${
                                      prData3[row].minDate[
                                        universalBufferNames[selectedIndexArea]
                                      ]
                                    })`}
                              </TableCell>
                              <TableCell align="right" key={uuidv4()}>
                                {prData3[row].max[
                                  universalBufferNames[selectedIndexArea]
                                ][measurement] === undefined
                                  ? 0
                                  : `${
                                      prData3[row].max[
                                        universalBufferNames[selectedIndexArea]
                                      ][measurement]
                                    } ${measurement} - (${
                                      prData3[row].maxDate[
                                        universalBufferNames[selectedIndexArea]
                                      ]
                                    })`}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (dense ? 10 : 10) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={Object.keys(prData3).length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
              <FormControlLabel
                control={
                  <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
              />
            </div>
          </Grid>
        </React.Fragment>
      ) : (
        <div style={{ marginTop: '1rem' }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                  style={{ marginTop: '2rem' }}
                >
                  <Typography variant="h5" style={{ marginBottom: '1rem' }}>
                    Post Analytics
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid container justifyContent="center" item xs={12}>
                    <Typography
                      component="div"
                      style={{ marginBottom: '1rem' }}
                    >
                      <Grid component="label" container alignItems="center">
                        <Grid item xs={5} style={{ paddingLeft: '1.5rem' }}>
                          <Typography variant="h6">kg</Typography>
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
                          <Typography variant="h6">lbs</Typography>
                        </Grid>
                      </Grid>
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
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
                    <List
                      aria-label="Chart options"
                      classes={{ root: classes.list }}
                      style={{
                        visibility:
                          postFilterNames.length == 0 ? 'hidden' : 'visible',
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
                          primary={postFilterNames[selectedIndexArea]}
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
                      {postFilterNames.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndexArea}
                          onClick={(event) => handleAreaListClick(event, index)}
                          className={classes.menuItem}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={5}>
                    <CardContent classes={{ root: classes.warmup2 }}>
                      <Typography
                        align="center"
                        variant="h5"
                        style={{
                          fontFamily: 'quicksand',
                          fontWeight: 700,
                        }}
                      >
                        Records
                      </Typography>
                    </CardContent>
                    <List
                      aria-label="Chart options"
                      classes={{ root: classes.list }}
                      style={{
                        visibility:
                          postFilterNames.length == 0 ? 'hidden' : 'visible',
                      }}
                    >
                      <ListItem
                        button
                        key={'AreaChart Options'}
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="AreaChart Options"
                        classes={{ button: classes.listItem }}
                        onClick={handleTableChange}
                        disableGutters
                      >
                        <ListItemText
                          primary={'View'}
                          primaryTypographyProps={{ align: 'center' }}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  justifyContent="center"
                  style={{ marginTop: '1rem' }}
                >
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
                          onClick={(event) => handleMenuItemClick(event, index)}
                          className={classes.menuItem}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  justifyContent="center"
                  style={{ visibility: buttonGroup ? 'visible' : 'collapse' }}
                >
                  <div
                    style={{
                      visibility: buttonGroup ? 'visible' : 'collapse',
                      marginTop: '1rem',
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

                <Grid
                  container
                  item
                  justifyContent="center"
                  style={{ visibility: buttonGroup ? 'visible' : 'collapse' }}
                >
                  <Autocomplete
                    className={classes.exerciseInput2}
                    freeSolo
                    size="small"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    classes={{
                      root: classes.exerciseField,
                      inputRoot: classes.exerciseInput2,
                      listbox: classes.listBox,
                    }}
                    style={{
                      marginTop: '1rem',
                      marginBottom: '1rem',
                      visibility: buttonGroup ? 'visible' : 'collapse',
                    }}
                    onOpen={() => setAreaMenuSwitch(false)}
                    onClose={() => setAreaMenuSwitch(true)}
                    inputValue={exerciseName}
                    onInputChange={(event, newValue) => {
                      // Managed to print out the values in each input change
                      handleExerciseChange(newValue);
                    }}
                    options={searchItems.map((option) => option.ExerciseName)}
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
                <React.Fragment>
                  {maxButton &&
                  buttonGroup &&
                  exerciseName &&
                  areaMenuSwitch &&
                  measurement === 'kg' ? (
                    <div style={{ height: 400, width: '100%' }}>
                      <AreaChart2
                        data={maxData2kg[exerciseName]}
                        button={'Daily Max'}
                        exercise={exerciseName}
                        keys={universalBufferNames}
                        selectedName={universalBufferNames[selectedIndexArea]}
                        measurement={measurement}
                        type={'one'}
                      />
                    </div>
                  ) : (
                    void 0
                  )}
                  {maxButton &&
                  buttonGroup &&
                  exerciseName &&
                  areaMenuSwitch &&
                  measurement === 'lbs' ? (
                    <div style={{ height: 400, width: '100%' }}>
                      <AreaChart2
                        data={maxData2lbs[exerciseName]}
                        button={'Daily Max'}
                        exercise={exerciseName}
                        keys={universalBufferNames}
                        selectedName={universalBufferNames[selectedIndexArea]}
                        measurement={measurement}
                        type={'one'}
                      />
                    </div>
                  ) : (
                    void 0
                  )}
                  {minButton &&
                  buttonGroup &&
                  exerciseName &&
                  areaMenuSwitch &&
                  measurement === 'kg' ? (
                    <div style={{ height: 400, width: '100%' }}>
                      <AreaChart2
                        data={minData2kg[exerciseName]}
                        button={'Daily Min'}
                        exercise={exerciseName}
                        keys={universalBufferNames}
                        selectedName={universalBufferNames[selectedIndexArea]}
                        measurement={measurement}
                        type={'one'}
                      />
                    </div>
                  ) : (
                    void 0
                  )}
                  {minButton &&
                  buttonGroup &&
                  exerciseName &&
                  areaMenuSwitch &&
                  measurement === 'lbs' ? (
                    <div style={{ height: 400, width: '100%' }}>
                      <AreaChart2
                        data={minData2kg[exerciseName]}
                        button={'Daily Min'}
                        exercise={exerciseName}
                        keys={universalBufferNames}
                        selectedName={universalBufferNames[selectedIndexArea]}
                        measurement={measurement}
                        type={'one'}
                      />
                    </div>
                  ) : (
                    void 0
                  )}
                  {loadButton &&
                  buttonGroup &&
                  exerciseName &&
                  areaMenuSwitch &&
                  measurement === 'kg' ? (
                    <div style={{ height: 400, width: '100%' }}>
                      <AreaChart2
                        data={loadData2kg[exerciseName]}
                        button={'Daily Load'}
                        exercise={exerciseName}
                        keys={universalBufferNames}
                        selectedName={universalBufferNames[selectedIndexArea]}
                        measurement={measurement}
                        type={'one'}
                      />
                    </div>
                  ) : (
                    void 0
                  )}
                  {loadButton &&
                  buttonGroup &&
                  exerciseName &&
                  areaMenuSwitch &&
                  measurement === 'lbs' ? (
                    <div style={{ height: 400, width: '100%' }}>
                      <AreaChart2
                        data={loadData2lbs[exerciseName]}
                        button={'Daily Load'}
                        exercise={exerciseName}
                        keys={universalBufferNames}
                        selectedName={universalBufferNames[selectedIndexArea]}
                        measurement={measurement}
                        type={'one'}
                      />
                    </div>
                  ) : (
                    void 0
                  )}
                  {volumeButton &&
                  buttonGroup &&
                  exerciseName &&
                  areaMenuSwitch ? (
                    <div style={{ height: 400, width: '100%' }}>
                      <AreaChart2
                        data={volumeData2[exerciseName]}
                        button={'Daily Volume'}
                        exercise={exerciseName}
                        keys={universalBufferNames}
                        selectedName={universalBufferNames[selectedIndexArea]}
                        measurement={measurement}
                        type={'one'}
                      />
                    </div>
                  ) : (
                    void 0
                  )}
                  {aggregateLoadChart &&
                  buttonGroup === false &&
                  measurement === 'kg' ? (
                    <div
                      style={{
                        height: 400,
                        width: '100%',
                      }}
                    >
                      <AreaChart2
                        data={totalLoadData2kg}
                        button={'Total Load'}
                        keys={['value']}
                        selectedName={'placeHolderName'}
                        measurement={measurement}
                        type={'multi'}
                      />
                    </div>
                  ) : (
                    void 0
                  )}
                  {aggregateLoadChart &&
                  buttonGroup === false &&
                  measurement === 'lbs' ? (
                    <div style={{ height: 400, width: '100%' }}>
                      <AreaChart2
                        data={totalLoadData2lbs}
                        button={'Total Load'}
                        keys={['value']}
                        selectedName={'placeHolderName'}
                        measurement={measurement}
                        type={'multi'}
                      />
                    </div>
                  ) : (
                    void 0
                  )}
                  {aggregateVolumeChart && buttonGroup === false ? (
                    <div style={{ height: 400, width: '100%' }}>
                      <AreaChart2
                        data={totalVolumeData2}
                        button={'Total Volume'}
                        keys={['value']}
                        selectedName={'placeHolderName'}
                        measurement={'reps'}
                        type={'multi'}
                      />
                    </div>
                  ) : (
                    void 0
                  )}
                  {/*------- To make sure areaChart view does not go back to starting position when changing the switchMenufilter --------*/}
                  {areaMenuSwitch ? (
                    void 0
                  ) : (
                    <div style={{ height: '30rem' }}></div>
                  )}
                </React.Fragment>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
      )}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {matches ? postAnalyticsView : postAnalyticsMobile}
    </React.Fragment>
  );
};

AnalyticsPost.getInitialProps = async (ctx, client, currentUser) => {
  const db = getFirestore(app);

  // fetch exercises from firebase
  const exercises = await getExercises(db).then((doc) => {
    return doc;
  });

  var coachData;
  // fetch coaches/atheltes data
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
      // customer = await client.get(
      //   `/api/payments/retrieve-customers/${currentUser.email}`
      // );
      customer = { data: '' };
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

export default AnalyticsPost;

// this is where a conversion system would be nice
//  exercises.map((exercise) => {
//   if (obj.exerciseName2[0] === exercise.ExerciseName) {
//     // exercise is there from results so add to prData
//     // prData only shows results of exercises done
//     if (prData.hasOwnProperty(exercise.ExerciseName)) {
//       // back squat
//       //console.log('exercise there');
//       if (prData[exercise.ExerciseName].hasOwnProperty('min')) {
//         if (
//           prData[exercise.ExerciseName]['min'].hasOwnProperty(
//             obj.userName
//           )
//         ) {
//           // name is there check if min for this name is min
//           if (obj.results) {
//             try {
//               var prMin = [];
//               var prMin2 = 0;

//               obj.results.map((val) => {
//                 prMin.push(val.value);
//               });
//               prMin2 = Math.min(...prMin);

//               if (
//                 prMin2 <
//                 prData[exercise.ExerciseName]['min'][obj.userName]
//               ) {
//                 prData[exercise.ExerciseName]['min'][obj.userName] =
//                   prMin2;
//                 prData[exercise.ExerciseName]['minDate'][obj.userName] =
//                   obj.date;
//               }
//             } catch (err) {}
//           }
//         } else if (
//           !prData[exercise.ExerciseName]['min'].hasOwnProperty(
//             obj.userName
//           )
//         ) {
//           // name not there
//           if (obj.results) {
//             try {
//               var prMin = [];
//               var prMin2 = 0;

//               obj.results.map((val) => {
//                 prMin.push(val.value);
//               });
//               prMin2 = Math.min(...prMin);
//               prData[exercise.ExerciseName]['min'][obj.userName] =
//                 prMin2;
//               prData[exercise.ExerciseName]['minDate'][obj.userName] =
//                 obj.date;
//             } catch (err) {}
//           }
//         }
//       }

//       if (prData[exercise.ExerciseName].hasOwnProperty('max')) {
//         if (
//           prData[exercise.ExerciseName]['max'].hasOwnProperty(
//             obj.userName
//           )
//         ) {
//           // name is there check if min for this name
//           if (obj.results) {
//             try {
//               var prMax = [];
//               var prMax2 = 0;

//               obj.results.map((val) => {
//                 prMax.push(val.value);
//               });
//               prMax2 = Math.max(...prMax);

//               if (
//                 prMax2 >
//                 prData[exercise.ExerciseName]['max'][obj.userName]
//               ) {
//                 prData[exercise.ExerciseName]['max'][obj.userName] =
//                   prMax2;
//                 prData[exercise.ExerciseName]['maxDate'][obj.userName] =
//                   obj.date;
//               }
//             } catch (err) {}
//           }
//         } else if (
//           !prData[exercise.ExerciseName]['max'].hasOwnProperty(
//             obj.userName
//           )
//         ) {
//           // name not there
//           if (obj.results) {
//             try {
//               var prMax = [];
//               var prMax2 = 0;

//               obj.results.map((val) => {
//                 prMax.push(val.value);
//               });
//               prMax2 = Math.max(...prMax);
//               prData[exercise.ExerciseName]['max'][obj.userName] =
//                 prMax2;
//               prData[exercise.ExerciseName]['maxDate'][obj.userName] =
//                 obj.date;
//             } catch (err) {}
//           }
//         }
//       }
//     } else if (!prData.hasOwnProperty(exercise.ExerciseName)) {
//       //console.log('exercise not there');

//       if (obj.results) {
//         try {
//           var prResults = [];
//           var prMax2 = 0;
//           var prMin2 = 0;

//           obj.results.map((val) => {
//             prResults.push(val.value);
//           });

//           prMin2 = Math.min(...prResults);
//           prMax2 = Math.max(...prResults);

//           prData[exercise.ExerciseName] = {
//             min: { [obj.userName]: prMin2 },
//             max: { [obj.userName]: prMax2 },
//             minDate: { [obj.userName]: obj.date },
//             maxDate: { [obj.userName]: obj.date },
//           };
//         } catch (err) {}
//       }
//     }
//   } else {
//     // exercises that are not there have a min/max result of 0
//     //console.log('not recorded');
//   }
// });
