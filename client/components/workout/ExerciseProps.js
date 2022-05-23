import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem,
  Grid,
  Tooltip,
  makeStyles,
  Accordion,
  AccordionSummary,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Fab,
} from '@material-ui/core';
import FitnessIcon from '@material-ui/icons/FitnessCenter';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import TransferList from './TransferList';
import MuscleAcc from './MuscleAcc';
import JointAcc from './JointAcc';
import SelectProps from './Select';
import Router from 'next/router';

import axios from 'axios';
import theme from '../../src/ui/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    marginTop: '1rem',
  },
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  cardHeader2: {
    padding: theme.spacing(1, 2),
  },
  list2: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button2: {
    margin: theme.spacing(0.5, 0),
  },
  textField: {
    width: '17rem',
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

const bodyStrList = [
  'ankle',
  'knee',
  'hip',
  'spine',
  'elbow',
  'shoulder',
  'lower leg',
  'glutes',
  'quadriceps',
  'hamstrings',
  'core',
  'chest',
  'lower back',
  'upper back',
  'shoulder',
  'tricep',
  'bicep',
];

const ExerciseProps = ({ exercisePropsCallback, value, coachInfo }) => {
  const [exerciseProps, setExerciseProps] = useState(value);
  const [exerciseName, setExerciseName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [link, setLink] = useState('');

  console.log(coachInfo);

  const [bodyStr, setBodyStr] = useState([]);
  const [bodyRegion, setBodyRegion] = useState([]);
  const [resType, setResType] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [plane, setPlane] = useState([]);
  const [exeTags, setExeTags] = useState([]);

  const [exeType, setExeType] = useState('');
  const [cat, setCat] = useState('');
  const [force, setForce] = useState('');
  const [move, setMove] = useState('');
  const [side, setSide] = useState('');
  const [tech, setTech] = useState('');

  const [bicep, setBicep] = useState(false);
  const [targetBicep, setTargetBicep] = useState('');
  const [tricep, setTricep] = useState(false);
  const [targetTricep, setTargetTricep] = useState('');
  const [shoulder, setShoulder] = useState(false);
  const [targetShoulder, setTargetShoulder] = useState('');
  const [uBack, setUBack] = useState(false);
  const [targetUBack, setTargetUBack] = useState('');
  const [lBack, setLBack] = useState(false);
  const [targetLBack, setTargetLBack] = useState('');
  const [chest, setChest] = useState(false);
  const [targetChest, setTargetChest] = useState('');
  const [core, setCore] = useState(false);
  const [targetCore, setTargetCore] = useState('');
  const [quads, setQuads] = useState(false);
  const [targetQuads, setTargetQuads] = useState('');
  const [hams, setHams] = useState(false);
  const [targetHams, setTargetHams] = useState('');
  const [glutes, setGlutes] = useState(false);
  const [targetGlutes, setTargetGlutes] = useState('');
  const [leg, setLeg] = useState(false);
  const [targetLeg, setTargetLeg] = useState('');
  const [shoulderJoint, setShoulderJoint] = useState(false);
  const [shoulderAction, setShoulderAction] = useState([]);
  const [elbowJoint, setElbowJoint] = useState(false);
  const [elbowAction, setElbowAction] = useState([]);
  const [spineJoint, setSpineJoint] = useState(false);
  const [spineAction, setSpineAction] = useState([]);
  const [hipJoint, setHipJoint] = useState(false);
  const [hipAction, setHipAction] = useState([]);
  const [kneeJoint, setKneeJoint] = useState(false);
  const [kneeAction, setKneeAction] = useState([]);
  const [ankleJoint, setAnkleJoint] = useState(false);
  const [ankleAction, setAnkleAction] = useState([]);

  const exercise = {
    ExerciseName: exerciseName.toLowerCase(), // 1
    Muscles: {
      Bicep: {
        // 15 * 10
        'Concentric Strength': 'secondary',
        'Eccentric Strength': 'secondary',
        'Isometric Strength': 'secondary',
        Power: 'not affected',
        'Reactive Strength': 'not affected',
        bicep: bicep,
        target: targetBicep,
      },
      Tricep: {
        'Concentric Strength': 'secondary',
        'Eccentric Strength': 'secondary',
        'Isometric Strength': 'secondary',
        Power: 'not affected',
        'Reactive Strength': 'not affected',
        tricep: tricep,
        target: targetTricep,
      },
      Chest: {
        'Concentric Strength': 'secondary',
        'Eccentric Strength': 'secondary',
        'Isometric Strength': 'secondary',
        Power: 'not affected',
        'Reactive Strength': 'not affected',
        chest: chest,
        target: targetChest,
      },
      'Upper Back': {
        'Concentric Strength': 'secondary',
        'Eccentric Strength': 'secondary',
        'Isometric Strength': 'not affected',
        Power: 'not affected',
        'Reactive Strength': 'not affected',
        'upper back': uBack,
        target: targetUBack,
      },
      'Lower Back': {
        'Concentric Strength': 'not affected',
        'Eccentric Strength': 'not affected',
        'Isometric Strength': 'not affected',
        Power: 'not affected',
        'Reactive Strength': 'not affected',
        'lower back': lBack,
        target: targetLBack,
      },
      Core: {
        'Concentric Strength': 'primary',
        'Eccentric Strength': 'secondary',
        'Isometric Strength': 'primary',
        Power: 'not affected',
        'Reactive Strength': 'not affected',
        core: core,
        target: targetCore,
      },
      Quadriceps: {
        'Concentric Strength': 'primary',
        'Eccentric Strength': 'secondary',
        'Isometric Strength': 'not affected',
        Power: 'not affected',
        'Reactive Strength': 'not affected',
        quadriceps: quads,
        target: targetQuads,
      },
      Hamstring: {
        'Concentric Strength': 'secondary',
        'Eccentric Strength': 'secondary',
        'Isometric Strength': 'not affected',
        Power: 'not affected',
        'Reactive Strength': 'not affected',
        hamstring: hams,
        target: targetHams,
      },
      'Lower Leg': {
        'Concentric Strength': 'secondary',
        'Eccentric Strength': 'secondary',
        'Isometric Strength': 'not affected',
        Power: 'not affected',
        'Reactive Strength': 'not affected',
        'lower leg': leg,
        target: targetLeg,
      },
      Glutes: {
        'Concentric Strength': 'primary',
        'Eccentric Strength': 'secondary',
        'Isometric Strength': 'primary',
        Power: 'not affected',
        'Reactive Strength': 'not affected',
        glutes: glutes,
        target: targetGlutes,
      },
      Shoulder: {
        'Concentric Strength': 'secondary',
        'Eccentric Strength': 'secondary',
        'Isometric Strength': 'not affected',
        Power: 'not affected',
        'Reactive Strength': 'not affected',
        shoulder: shoulder,
        target: targetShoulder,
      },
    },
    Joints: {
      Hip: {
        // 31 * 7
        'Hip Strength': hipJoint,
        'Rotational Strength': false,
        'Reactive Strength': false,
        Power: '', // 4 * 3
        action: hipAction, // + 19 // joint actions
      },
      Wrist: {
        'Wrist Strength': false,
        'Rotational Strength': false,
        'Reactive Strength': false,
        Power: 'not affected',
        action: [''],
      },
      Knee: {
        'Knee Strength': kneeJoint,
        'Rotational Strength': false,
        'Reactive Strength': false,
        Power: '',
        action: kneeAction,
      },
      Ankle: {
        'Ankle Strength': ankleJoint,
        'Rotational Strength': false,
        'Reactive Strength': false,
        Power: 'not affected',
        action: ankleAction,
      },
      Elbow: {
        'Elbow Strength': elbowJoint,
        'Rotational Strength': false,
        'Reactive Strength': false,
        Power: 'not affected',
        action: elbowAction,
      },
      Shoulder: {
        'Shoulder Strength': shoulderJoint,
        'Rotational Strength': false,
        'Reactive Strength': false,
        Power: 'not affected',
        action: shoulderAction,
      },
      Spine: {
        'Spine Strength': spineJoint,
        'Rotational Strength': false,
        'Reactive Strength': false,
        Power: 'not affected',
        action: spineAction, // flexion moment vs movement 'mcgill'
      },
    },
    Mobility: {
      // 7
      'Hip Mobility': false,
      'Wrist Mobility': false,
      'Knee Mobility': false,
      'Ankle Mobility': false,
      'Elbow Mobility': false,
      'Shoulder Mobility': false,
      'Spine Mobility': false,
    },
    'Body Strength Identifiers': bodyStr,
    'Body Region': bodyRegion, // 3
    'Exercise Type': exeType, // 7
    'Resistance Type': resType, // 4
    'Force Type': force, // 2
    'Movement Type': move, // 3
    'Side Type': {
      // 9
      Primary: side,
      Arm: 'unilateral',
      Leg: 'unilateral',
    },
    Category: cat, // 3
    'Balance Strength': false,
    cell: 'resistance',
    'Technical Demands': tech, // 3
    Equipment: equipment,
    'Plane Type': plane, // 3
    'Exercise Tags': exeTags, // 42
    link: link,
  };

  const classes = useStyles();

  const onClickCreate = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    // picked no, in dialog
    setOpenDialog(false);
  };

  const handleCreateDialog = () => {
    console.log(exercise);

    axios
      .put(`/api/athletic/${coachInfo.userId}`, {
        DOB: coachInfo.DOB,
        library: exercise,
        sex: coachInfo.sex,
        userId: coachInfo.userId,
        discipline: coachInfo.discipline,
        height: coachInfo.height,
        weight: coachInfo.weight,
        userName: coachInfo.userName,
        measurement: coachInfo.measurement,
      })
      .then((data) => {
        console.log('We created the program!');
        setOpenDialog(false);
        exercisePropsCallback({
          value: false,
          exercise: exercise,
          status: 'create',
        });
      })
      .catch((err) => {
        console.log(err.response.data.errors);
      });
  };

  const handleBack = () => {
    setExerciseProps(!exerciseProps);
    exercisePropsCallback({ value: false, exercise: exercise, status: 'back' });
  };

  const handleExercise = (e) => {
    setExerciseName(e.target.value);
  };

  const handleLink = (e) => {
    setLink(e.target.value);
  };

  const transferlistCallback = (item) => {
    switch (item.name) {
      case 'Body Region':
        setBodyRegion(item.value);
        break;
      case 'Resistance Type':
        setResType(item.value);
        break;
      case 'Equipment':
        setEquipment(item.value);
        break;
      case 'Plane Type':
        setPlane(item.value);
        break;
      case 'Exercise Tags':
        setExeTags(item.value);
        break;
      default:
        break;
    }
  };

  const muscleAccCallback = (item) => {
    switch (item.name) {
      case 'Biceps':
        setBicep(item.muscle);
        item.muscle ? setTargetBicep(item.target) : setTargetBicep('');
        item.muscle
          ? bodyStr.includes('bicep')
            ? void 0
            : setBodyStr((old) => [...old, 'bicep'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'bicep'));
        break;
      case 'Triceps':
        setTricep(item.muscle);
        item.muscle ? setTargetTricep(item.target) : setTargetTricep('');
        item.muscle
          ? bodyStr.includes('tricep')
            ? void 0
            : setBodyStr((old) => [...old, 'tricep'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'tricep'));
        break;
      case 'Shoulders':
        setShoulder(item.muscle);
        item.muscle ? setTargetShoulder(item.target) : setTargetShoulder('');
        item.muscle
          ? bodyStr.includes('shoulder')
            ? void 0
            : setBodyStr((old) => [...old, 'shoulder'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'shoulder'));
        break;
      case 'Upper Back':
        setUBack(item.muscle);
        item.muscle ? setTargetUBack(item.target) : setTargetUBack('');
        item.muscle
          ? bodyStr.includes('upper back')
            ? void 0
            : setBodyStr((old) => [...old, 'upper back'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'upper back'));
        break;
      case 'Lower Back':
        setLBack(item.muscle);
        item.muscle ? setTargetLBack(item.target) : setTargetLBack('');
        item.muscle
          ? bodyStr.includes('lower back')
            ? void 0
            : setBodyStr((old) => [...old, 'lower back'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'lower back'));
        break;
      case 'Chest':
        setChest(item.muscle);
        item.muscle ? setTargetChest(item.target) : setTargetChest('');
        item.muscle
          ? bodyStr.includes('chest')
            ? void 0
            : setBodyStr((old) => [...old, 'chest'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'chest'));
        break;
      case 'Core':
        setCore(item.muscle);
        item.muscle ? setTargetCore(item.target) : setTargetCore('');
        item.muscle
          ? bodyStr.includes('core')
            ? void 0
            : setBodyStr((old) => [...old, 'core'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'core'));
        break;
      case 'Quadriceps':
        setQuads(item.muscle);
        item.muscle ? setTargetQuads(item.target) : setTargetQuads('');
        item.muscle
          ? bodyStr.includes('quadriceps')
            ? void 0
            : setBodyStr((old) => [...old, 'quadriceps'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'quadriceps'));
        break;
      case 'Hamstrings':
        setHams(item.muscle);
        item.muscle ? setTargetHams(item.target) : setTargetHams('');
        item.muscle
          ? bodyStr.includes('hamstrings')
            ? void 0
            : setBodyStr((old) => [...old, 'hamstrings'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'hamstrings'));
        break;
      case 'Glutes':
        setGlutes(item.muscle);
        item.muscle ? setTargetGlutes(item.target) : setTargetGlutes('');
        item.muscle
          ? bodyStr.includes('glutes')
            ? void 0
            : setBodyStr((old) => [...old, 'glutes'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'glutes'));
        break;
      case 'Lower Legs':
        setLeg(item.muscle);
        item.muscle ? setTargetLeg(item.target) : setTargetLeg('');
        item.muscle
          ? bodyStr.includes('lower leg')
            ? void 0
            : setBodyStr((old) => [...old, 'lower leg'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'lower leg'));
        break;
      default:
        break;
    }
  };

  const jointAccCallback = (item) => {
    switch (item.name) {
      case 'Shoulder':
        setShoulderJoint(item.joint);
        item.joint ? setShoulderAction(item.value) : setShoulderAction([]);
        item.joint
          ? bodyStr.includes('shoulder')
            ? void 0
            : setBodyStr((old) => [...old, 'shoulder'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'shoulder'));
        break;
      case 'Elbow':
        setElbowJoint(item.joint);
        item.joint ? setElbowAction(item.value) : setElbowAction([]);
        item.joint
          ? bodyStr.includes('elbow')
            ? void 0
            : setBodyStr((old) => [...old, 'elbow'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'elbow'));
        break;
      case 'Spine':
        setSpineJoint(item.joint);
        item.joint ? setSpineAction(item.value) : setSpineAction([]);
        item.joint
          ? bodyStr.includes('spine')
            ? void 0
            : setBodyStr((old) => [...old, 'spine'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'spine'));
        break;
      case 'Hip':
        setHipJoint(item.joint);
        item.joint ? setHipAction(item.value) : setHipAction([]);
        item.joint
          ? bodyStr.includes('hip')
            ? void 0
            : setBodyStr((old) => [...old, 'hip'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'hip'));
        break;
      case 'Knee':
        setKneeJoint(item.joint);
        item.joint ? setKneeAction(item.value) : setKneeAction([]);
        item.joint
          ? bodyStr.includes('knee')
            ? void 0
            : setBodyStr((old) => [...old, 'knee'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'knee'));
        break;
      case 'Ankle':
        setAnkleJoint(item.joint);
        item.joint ? setAnkleAction(item.value) : setAnkleAction([]);
        item.joint
          ? bodyStr.includes('ankle')
            ? void 0
            : setBodyStr((old) => [...old, 'ankle'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'ankle'));
        break;
      default:
        break;
    }
  };

  const selectCallback = (item) => {
    switch (item.name) {
      case 'Exercise Type':
        setExeType(item.value);
        break;
      case 'Category':
        setCat(item.value);
        break;
      case 'Force Type':
        setForce(item.value);
        break;
      case 'Movement Type':
        setMove(item.value);
        break;
      case 'Side Type':
        setSide(item.value);
        break;
      case 'Technical Demands':
        setTech(item.value);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Grid container justifyContent="center">
        <Grid item>
          <Typography className={classes.typography}>
            Add Your Own Exercise
          </Typography>
        </Grid>
      </Grid>
      <Button
        onClick={handleBack}
        variant="contained"
        disableElevation
        color="secondary"
      >
        Back
      </Button>
      <Grid container>
        {/* ------------------------ ExerciseName ----------------------- */}

        <Grid container alignItems="center">
          <Grid item xs={4} style={{ marginTop: '1rem' }}>
            <Typography align="center">Exercise Name</Typography>
          </Grid>
          <Grid item xs={8} style={{ marginTop: '1rem' }}>
            <TextField
              value={exerciseName}
              onChange={handleExercise}
              variant="outlined"
              size="small"
              placeholder="ExerciseName"
              className={classes.textField}
            />
          </Grid>
        </Grid>
        {/* ------------------------ Video Link ----------------------- */}
        <Grid container alignItems="center">
          <Grid item xs={4} style={{ marginTop: '1rem' }}>
            <Typography align="center">Link to Video</Typography>
          </Grid>
          <Grid item xs={8} style={{ marginTop: '1rem' }}>
            <TextField
              value={link}
              onChange={handleLink}
              variant="outlined"
              size="small"
              placeholder="Video Link"
              className={classes.textField}
              style={{ marginTop: '1rem' }}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* ------------------------ Muscles ----------------------- */}
      <Grid item xs={12} style={{ marginTop: '1rem' }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ backgroundColor: theme.palette.secondary.main }}
          >
            <Typography className={classes.heading}>Muscles</Typography>
          </AccordionSummary>
          {[
            'Biceps',
            'Triceps',
            'Shoulders',
            'Upper Back',
            'Lower Back',
            'Chest',
            'Core',
            'Quadriceps',
            'Hamstrings',
            'Glutes',
            'Lower Legs',
          ].map((name, index) => {
            return (
              <MuscleAcc
                key={`${name}${index}`}
                name={name}
                muscleAccCallback={muscleAccCallback}
                index={index}
              />
            );
          })}
        </Accordion>
      </Grid>
      {/* ------------------------ Joints ----------------------- */}
      <Grid item xs={12} style={{ marginTop: '1rem' }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ backgroundColor: theme.palette.secondary.main }}
          >
            <Typography className={classes.heading}>Joints</Typography>
          </AccordionSummary>
          {['Shoulder', 'Elbow', 'Spine', 'Hip', 'Knee', 'Ankle'].map(
            (name, index) => {
              return (
                <JointAcc
                  key={`${name}${index}`}
                  name={name}
                  jointAccCallback={jointAccCallback}
                  index={index}
                />
              );
            }
          )}
        </Accordion>
      </Grid>
      {/* ------------------------ Exercise Type ----------------------- */}
      <Grid container alignItems="center">
        <Grid item xs={4} style={{ marginTop: '1rem' }}>
          <Typography align="center">Exercise Type</Typography>
        </Grid>
        <Grid item xs={8} style={{ marginTop: '1rem' }}>
          <SelectProps
            list={[
              'resistance',
              'core strength',
              'stretch',
              'plyometric',
              'locomotion',
              'agility',
              'change of direction',
            ]}
            selectCallback={selectCallback}
            name={'Exercise Type'}
          />
        </Grid>
      </Grid>
      {/* ------------------------ Category ----------------------- */}
      <Grid container alignItems="center">
        <Grid item xs={4} style={{ marginTop: '1rem' }}>
          <Typography align="center">Category</Typography>
        </Grid>
        <Grid item xs={8} style={{ marginTop: '1rem' }}>
          <SelectProps
            list={['core', 'power', 'assistance']}
            selectCallback={selectCallback}
            name={'Category'}
          />
        </Grid>
      </Grid>
      {/* ------------------------ Force Type ----------------------- */}
      <Grid container alignItems="center">
        <Grid item xs={4} style={{ marginTop: '1rem' }}>
          <Typography align="center">Force Type</Typography>
        </Grid>
        <Grid item xs={8} style={{ marginTop: '1rem' }}>
          <SelectProps
            list={['push', 'pull']}
            selectCallback={selectCallback}
            name={'Force Type'}
          />
        </Grid>
      </Grid>
      {/* ------------------------ Movement Type ----------------------- */}
      <Grid container alignItems="center">
        <Grid item xs={4} style={{ marginTop: '1rem' }}>
          <Typography align="center">Movement Type</Typography>
        </Grid>
        <Grid item xs={8} style={{ marginTop: '1rem' }}>
          <SelectProps
            list={['dynamic', 'static']}
            selectCallback={selectCallback}
            name={'Movement Type'}
          />
        </Grid>
      </Grid>
      {/* ------------------------ Side Type ----------------------- */}
      <Grid container alignItems="center">
        <Grid item xs={4} style={{ marginTop: '1rem' }}>
          <Typography align="center">Side Type</Typography>
        </Grid>
        <Grid item xs={8} style={{ marginTop: '1rem' }}>
          <SelectProps
            list={['bilateral', 'unilateral']}
            selectCallback={selectCallback}
            name={'Side Type'}
          />
        </Grid>
      </Grid>
      {/* ------------------------ Technical Demands ----------------------- */}
      <Grid container alignItems="center">
        <Grid item xs={4} style={{ marginTop: '1rem' }}>
          <Typography align="center">Technical Demands</Typography>
        </Grid>
        <Grid item xs={8} style={{ marginTop: '1rem' }}>
          <SelectProps
            list={[
              'low',
              'low-medium',
              'medium',
              'medium-high',
              'high',
              'very high',
            ]}
            selectCallback={selectCallback}
            name={'Technical Demands'}
          />
        </Grid>
      </Grid>
      {/* ------------------------ Body Region ----------------------- */}
      <Grid item xs={4} style={{ marginTop: '1rem' }}></Grid>
      <Grid item xs={4} style={{ marginTop: '1rem' }}>
        <Typography align="center">Body Region</Typography>
      </Grid>
      <Grid item xs={4} style={{ marginTop: '1rem' }}></Grid>
      <TransferList
        list={['lower body', 'mid section', 'upper body']}
        name={'Body Region'}
        transferlistCallback={transferlistCallback}
        swatch={true}
      />

      {/* ------------------------ Resistance Type ----------------------- */}
      <Grid item xs={4} style={{ marginTop: '1rem' }}></Grid>
      <Grid item xs={4} style={{ marginTop: '1rem' }}>
        <Typography align="center">Resistance Type</Typography>
      </Grid>
      <Grid item xs={4} style={{ marginTop: '1rem' }}></Grid>
      <TransferList
        list={['free weights', 'body weight', 'variable', 'machine']}
        name={'Resistance Type'}
        transferlistCallback={transferlistCallback}
        swatch={true}
      />

      {/* ------------------------ Equipment ----------------------- */}
      <Grid item xs={4} style={{ marginTop: '1rem' }}></Grid>
      <Grid item xs={4} style={{ marginTop: '1rem' }}>
        <Typography align="center">Equipment</Typography>
      </Grid>
      <Grid item xs={4} style={{ marginTop: '1rem' }}></Grid>
      <TransferList
        list={[
          'barbell',
          'dumbbell',
          'resistance bands',
          'medball',
          'kettlebar',
          'rings',
          'TRX',
          'swiss ball',
          'bosu ball',
        ]}
        name={'Equipment'}
        transferlistCallback={transferlistCallback}
        swatch={true}
      />
      {/* ------------------------ Plane Type ----------------------- */}
      <Grid item xs={4} style={{ marginTop: '1rem' }}></Grid>
      <Grid item xs={4} style={{ marginTop: '1rem' }}>
        <Typography align="center">Plane Type</Typography>
      </Grid>
      <Grid item xs={4} style={{ marginTop: '1rem' }}></Grid>
      <TransferList
        list={['sagittal', 'frontal', 'transverse']}
        name={'Plane Type'}
        transferlistCallback={transferlistCallback}
        swatch={true}
      />
      {/* ------------------------ Exercise Tags ----------------------- */}
      <Grid item xs={4} style={{ marginTop: '1rem' }}></Grid>
      <Grid item xs={4} style={{ marginTop: '1rem' }}>
        <Typography align="center">Exercise Tag</Typography>
      </Grid>
      <Grid item xs={4} style={{ marginTop: '1rem' }}></Grid>
      <TransferList
        list={[
          'double-leg',
          'single-leg',
          'double-arm',
          'single-arm',
          'strength',
          'power',
          'plyometric',
          'olympic',
          'stretch',
          'stability',
          'static',
          'dynamic',
          'isolation',
          'compound',
          'isolation',
          'hold',
          'body weight',
          'free weights',
          'machine',
          'posterior chain',
          'squat',
          'overhead',
          'press',
          'push',
          'pull',
          'barbell',
          'dumbbells',
          'rings',
          'abs',
          'sagittal',
          'frontal',
          'transverse',
          'incline',
          'decline',
          'rotating',
        ]}
        name={'Exercise Tags'}
        transferlistCallback={transferlistCallback}
        swatch={true}
      />
      <Fab
        classes={{ root: classes.fab }}
        color="secondary"
        onClick={onClickCreate}
        disabled={exerciseName === '' ? true : false}
      >
        <AddIcon />
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

export default ExerciseProps;
