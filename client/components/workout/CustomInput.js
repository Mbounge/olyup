import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 70,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const CustomInput = () => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      {/* Might want a delimiter number for the rep */}
      <InputBase
        className={classes.input}
        inputProps={{ 'aria-label': 'search google maps' }}
        type="number"
        inputProps={{ type: 'number' }}
      />
    </Paper>
  );
};

export default CustomInput;
