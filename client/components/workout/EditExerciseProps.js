import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import {
  Grid,
  makeStyles,
  Accordion,
  AccordionSummary,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Fab,
  Snackbar,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import TransferList from './TransferList';
import MuscleAcc from './MuscleAcc';
import JointAcc from './JointAcc';
import SelectProps from './Select';

import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditExerciseProps = ({
  exercisePropsCallback,
  value,
  coachInfo,
  EditCallback,
  content,
}) => {
  const getLocalStorage = (key, initialValue) => {
    try {
      const value = localStorage.getItem(key);
      //console.log(`VALUE ${value}`);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      return initialValue;
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [snack, setSnack] = useState(false);

  // console.log(coachInfo);

  // console.log(content);

  const [exerciseProps, setExerciseProps] = useState(value);
  const [exerciseName, setExerciseName] = useState(content.ExerciseName);
  const [link, setLink] = useState(content.link);
  const [oldExerciseName, setOldExerciseName] = useState(content.ExerciseName);

  const [bodyStr, setBodyStr] = useState(content['Body Strength Identifiers']);
  const [bodyRegion, setBodyRegion] = useState(content['Body Region']);
  const [resType, setResType] = useState(content['Resistance Type']);
  const [equipment, setEquipment] = useState(content['Equipment']);
  const [plane, setPlane] = useState(content['Plane Type']);
  const [exeTags, setExeTags] = useState(content['Exercise Tags']);

  const [exeType, setExeType] = useState(content['Exercise Type']);
  const [cat, setCat] = useState(content['Category']);
  const [force, setForce] = useState(content['Force Type']);
  const [move, setMove] = useState(content['Movement Type']);
  const [side, setSide] = useState(content['Side Type']['Primary']);
  const [tech, setTech] = useState(content['Technical Demands']);

  const [bicep, setBicep] = useState(content['Muscles']['Bicep'].bicep);
  const [targetBicep, setTargetBicep] = useState(
    content['Muscles']['Bicep'].target
  );
  const [tricep, setTricep] = useState(content['Muscles']['Tricep'].tricep);
  const [targetTricep, setTargetTricep] = useState(
    content['Muscles']['Tricep'].target
  );
  const [shoulder, setShoulder] = useState(
    content['Muscles']['Shoulder'].shoulder
  );
  const [targetShoulder, setTargetShoulder] = useState(
    content['Muscles']['Shoulder'].target
  );
  const [uBack, setUBack] = useState(
    content['Muscles']['Upper Back']['upper back']
  );
  const [targetUBack, setTargetUBack] = useState(
    content['Muscles']['Upper Back'].target
  );
  const [lBack, setLBack] = useState(
    content['Muscles']['Lower Back']['lower back']
  );
  const [targetLBack, setTargetLBack] = useState(
    content['Muscles']['Lower Back'].target
  );
  const [chest, setChest] = useState(content['Muscles']['Chest'].chest);
  const [targetChest, setTargetChest] = useState(
    content['Muscles']['Chest'].target
  );
  const [core, setCore] = useState(content['Muscles']['Core'].core);
  const [targetCore, setTargetCore] = useState(
    content['Muscles']['Core'].target
  );
  const [quads, setQuads] = useState(
    content['Muscles']['Quadriceps'].quadriceps
  );
  const [targetQuads, setTargetQuads] = useState(
    content['Muscles']['Quadriceps'].target
  );
  const [hams, setHams] = useState(content['Muscles']['Hamstring'].hamstring);
  const [targetHams, setTargetHams] = useState(
    content['Muscles']['Hamstring'].target
  );
  const [glutes, setGlutes] = useState(content['Muscles']['Glutes'].glutes);
  const [targetGlutes, setTargetGlutes] = useState(
    content['Muscles']['Glutes'].target
  );
  const [leg, setLeg] = useState(content['Muscles']['Lower Leg']['lower leg']);
  const [targetLeg, setTargetLeg] = useState(
    content['Muscles']['Lower Leg'].target
  );
  const [shoulderJoint, setShoulderJoint] = useState(
    content['Joints']['Shoulder']['Shoulder Strength']
  );
  const [shoulderAction, setShoulderAction] = useState(
    content['Joints']['Shoulder'].action
  );
  const [elbowJoint, setElbowJoint] = useState(
    content['Joints']['Elbow']['Elbow Strength']
  );
  const [elbowAction, setElbowAction] = useState(
    content['Joints']['Elbow'].action
  );
  const [spineJoint, setSpineJoint] = useState(
    content['Joints']['Spine']['Spine Strength']
  );
  const [spineAction, setSpineAction] = useState(
    content['Joints']['Spine'].action
  );
  const [hipJoint, setHipJoint] = useState(
    content['Joints']['Hip']['Hip Strength']
  );
  const [hipAction, setHipAction] = useState(content['Joints']['Hip'].action);
  const [kneeJoint, setKneeJoint] = useState(
    content['Joints']['Knee']['Knee Strength']
  );
  const [kneeAction, setKneeAction] = useState(
    content['Joints']['Knee'].action
  );
  const [ankleJoint, setAnkleJoint] = useState(
    content['Joints']['Ankle']['Ankle Strength']
  );
  const [ankleAction, setAnkleAction] = useState(
    content['Joints']['Ankle'].action
  );

  const exercise = {
    ExerciseName: exerciseName.toLowerCase(), // 1
    OldExerciseName: oldExerciseName, // for updating purposes
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

  const handleSnackClose = () => {
    setSnack(false);
  };

  const handleCreateDialog = () => {
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
        console.log('We Updated the Exercise!');
        setOpenDialog(false);
        setSnack(true);
        exercisePropsCallback({
          exercise: data,
          status: 'updated',
        });
      })
      .catch((err) => {
        console.log(err.response.data.errors);
      });
  };

  const handleEditBackClick = () => {
    EditCallback();
  };

  const handleBack = () => {
    setExerciseProps(!exerciseProps);
    //exercisePropsCallback({ value: false, exercise: exercise, status: 'back' });
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
      case 'Bicep':
        setBicep(item.muscle);
        item.muscle ? setTargetBicep(item.target) : setTargetBicep('');
        item.muscle
          ? bodyStr.includes('bicep')
            ? void 0
            : setBodyStr((old) => [...old, 'bicep'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'bicep'));
        break;
      case 'Tricep':
        setTricep(item.muscle);
        item.muscle ? setTargetTricep(item.target) : setTargetTricep('');
        item.muscle
          ? bodyStr.includes('tricep')
            ? void 0
            : setBodyStr((old) => [...old, 'tricep'])
          : setBodyStr(bodyStr.filter((ele) => ele !== 'tricep'));
        break;
      case 'Shoulder':
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
      case 'Hamstring':
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
      case 'Lower Leg':
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
            Edit Your Exercise
          </Typography>
        </Grid>
      </Grid>
      <Button
        onClick={handleEditBackClick}
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
            'Bicep',
            'Tricep',
            'Shoulder',
            'Upper Back',
            'Lower Back',
            'Chest',
            'Core',
            'Quadriceps',
            'Hamstring',
            'Glutes',
            'Lower Leg',
          ].map((name, index) => {
            return (
              <MuscleAcc
                key={`${name}${index}`}
                name={name}
                muscleAccCallback={muscleAccCallback}
                index={index}
                edit={true}
                editChange={content['Muscles'][name]}
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
                  edit={true}
                  editChange={content['Joints'][name]}
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
            edit={true}
            editChange={content['Exercise Type']}
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
            edit={true}
            editChange={content['Category']}
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
            edit={true}
            editChange={content['Force Type']}
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
            edit={true}
            editChange={content['Movement Type']}
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
            edit={true}
            editChange={content['Side Type']['Primary']}
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
            edit={true}
            editChange={content['Technical Demands']}
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
        edit={true}
        editChange={content['Body Region']}
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
        edit={true}
        editChange={content['Resistance Type']}
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
        edit={true}
        editChange={content['Equipment']}
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
        edit={true}
        editChange={content['Plane Type']}
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
        edit={true}
        editChange={content['Exercise Tags']}
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
            Are you sure you want to update this exercise?
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
      <Snackbar open={snack} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert severity="info">Exercise Updated!</Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default EditExerciseProps;
