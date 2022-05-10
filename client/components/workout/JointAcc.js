import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
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
  withStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Switch,
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import theme from '../../src/ui/theme';
import TransferList from './TransferList';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

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
  margin: {
    margin: theme.spacing(1),
  },
}));

const JointAcc = ({ name, jointAccCallback, index }) => {
  const [jointSwitch, setJointSwitch] = useState(false);
  const [left, setLeft] = useState([]);

  //['Shoulder', 'Elbow', 'Spine', 'Hip', 'Knee', 'Ankle']

  const list = {
    Shoulder: [
      'flexion',
      'extension',
      'abduction',
      'adduction',
      'internal rotation',
      'external rotation',
      'elevation',
      'upward rotation',
      'downward rotation',
      'depression',
      'transverse flexion',
      'transverse abduction',
      'transverse adduction',
      'transverse extension',
    ],
    Elbow: ['flexion', 'extension'],
    Spine: ['flexion', 'extension', 'rotation', 'abduction', 'adduction'],
    Hip: [
      'flexion',
      'extension',
      'abduction',
      'adduction',
      'internal rotation',
      'external rotation',
      'transverse abduction',
      'transverse adduction',
    ],
    Knee: ['flexion', 'extension', 'internal rotation', 'external rotation'],
    Ankle: ['plantar flexion', 'dorsi flexion'],
  };

  const classes = useStyles();

  const handleChange = (e) => {
    setJointSwitch(e.target.checked);
  };

  const transferlistCallback = (item) => {
    setLeft(item.value);
  };

  useEffect(() => {
    jointAccCallback({
      name: name,
      joint: jointSwitch,
      value: left,
    });
  }, [jointSwitch, left]);

  return (
    <React.Fragment>
      <AccordionDetails
        style={{
          backgroundColor:
            index % 2 === 0 ? theme.palette.primary.main : void 0,
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Typography>{name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Switch
              checked={jointSwitch}
              onChange={handleChange}
              name={name}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid
              container
              alignItems="center"
              style={{ visibility: jointSwitch ? 'visible' : 'hidden' }}
            >
              <Grid item xs={12}>
                <TransferList
                  name={name}
                  transferlistCallback={transferlistCallback}
                  list={list[name]}
                  swatch={jointSwitch}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </React.Fragment>
  );
};

export default JointAcc;
