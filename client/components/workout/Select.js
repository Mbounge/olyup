import React, { useEffect } from 'react';
import { MenuItem, makeStyles, withStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

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

const SelectProps = ({ list, name, selectCallback, edit, editChange }) => {
  const [target, setTarget] = React.useState(list[0]);

  useEffect(() => {
    edit ? setTarget(editChange) : void 0;
  }, []);

  const handleChange2 = (event) => {
    setTarget(event.target.value);
  };

  useEffect(() => {
    selectCallback({ value: target, name: name });
  }, [target]);

  return (
    <Select value={target} onChange={handleChange2} input={<BootstrapInput />}>
      {list.map((item, index) => {
        return (
          <MenuItem value={item} key={`${item}${index}`}>
            {item}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectProps;
