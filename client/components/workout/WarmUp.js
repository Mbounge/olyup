import React, { useState, useEffect } from 'react';
import { Card } from '@material-ui/core';
import { List, ListItem } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CoreCell from './CoreCell';
import { alphabet } from './Alphabet';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: red[500],
  },
  card: {
    '& .MuiCardContent-root': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  grid: {
    marginTop: '1rem',
  },
  list: {
    padding: 0,

    '& .MuiListItem-root': {
      borderRadius: '4px',
    },
  },
  listItem: {
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.8,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      opacity: 1,
    },
  },
}));

const WarmUpCell = ({ createCallback, selectedDate, exercises }) => {
  const classes = useStyles();
  const [cell, setCell] = useState([]);
  const [update, setUpdate] = useState({});
  const [counter, setCounter] = useState(1);
  const [keys, setKeys] = useState([]);

  const WarmCellData = {
    group: {
      warmup: 'warmup',
    },
  };

  const callback = (data) => {
    setUpdate(data);
  };

  const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  };

  const getLocalStorage = (key, initialValue) => {
    try {
      const value = localStorage.getItem(key);
      console.log(`VALUE ${value}`);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      return initialValue;
    }
  };

  const dismiss = (data) => {
    console.log('dismissed!!!');
    console.log(data.cellNumber);
    const keys2 = getLocalStorage('keys2', []);
    // remove value from keys
    keys2.splice(keys2.indexOf(`core0${data.cellNumber}`), 1);
    setKeys(keys2);
    setLocalStorage('keys2', keys2);
  };

  const onClick = () => {
    const keys2 = getLocalStorage('keys2', []);
    console.log(keys2);
    if (keys2.length == 0) {
      // making sure if nothing is there to add item in array
      keys2.push(`core0${counter}`);
      setKeys(keys2);
      setLocalStorage('keys2', keys2);
    } else {
      // items are already in the array so just push them in
      keys2.push(`core0${counter}`);
      setKeys(keys2);
      setLocalStorage('keys2', keys2);
    }

    setCell((oldCell) => [
      ...oldCell,
      <CoreCell
        key={`core0${counter}`}
        parentCallback={callback}
        cellNumber={counter}
        exercises={exercises}
        groupNumber={0}
        warmup={true}
        letter={alphabet[counter - 1]}
        unmountMe={dismiss}
      />,
    ]);
    setCounter(counter + 1);
  };

  useEffect(() => {
    createCallback(update);
  }, [update]);

  useEffect(() => {
    // reset elements when date changes
    setCell((oldCell) => []);
    setCounter(1);
  }, [selectedDate]);

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <div>
          {keys
            ? cell.map((cell) => {
                console.log(cell.key);
                console.log(keys);
                console.log(keys.includes(cell.key));
                return (
                  <div key={cell.key}>
                    {keys.includes(cell.key) ? cell : null}
                  </div>
                );
              })
            : null}
        </div>
      </Card>
      <List className={classes.list}>
        <ListItem
          key={'button2'}
          button
          className={classes.listItem}
          alignItems="center"
          onClick={onClick}
        >
          <Typography style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Add Exercise
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default WarmUpCell;
