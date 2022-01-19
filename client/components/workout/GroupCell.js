import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, IconButton } from '@material-ui/core';
import { List, ListItem } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CoreCell from './CoreCell';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { Box } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { alphabet } from './Alphabet';
import theme from '../../src/ui/theme';

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
  fab: {
    paddingLeft: '1rem',
  },
}));

const GroupCell = ({ createCallback, groupNumber, exercises, unmountMe }) => {
  const classes = useStyles();
  const [cell, setCell] = useState([]);
  const [counter, setCounter] = useState(1);
  const [update, setUpdate] = useState(false);
  const [keys, setKeys] = useState([]);

  const GroupCellData = {
    group: {
      groupNumber,
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
      //console.log(`VALUE ${value}`);
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
    keys2.splice(keys2.indexOf(`core${data.groupNumber}${data.cellNumber}`), 1);
    setKeys(keys2);
    setLocalStorage('keys2', keys2);
  };

  // Add core cells
  const onClick = () => {
    // all of this is needed to delete the cells
    const keys2 = getLocalStorage('keys2', []);
    console.log(keys2);
    if (keys2.length == 0) {
      // making sure if nothing is there to add item in array
      keys2.push(`core${groupNumber}${counter}`);
      setKeys(keys2);
      setLocalStorage('keys2', keys2);
    } else {
      // items are already in the array so just push them in
      keys2.push(`core${groupNumber}${counter}`);
      setKeys(keys2);
      setLocalStorage('keys2', keys2);
    }

    setCell((oldCell) => [
      ...oldCell,
      <CoreCell
        key={`core${groupNumber}${counter}`}
        parentCallback={callback}
        exercises={exercises}
        cellNumber={counter}
        groupNumber={groupNumber}
        letter={alphabet[groupNumber - 1]}
        unmountMe={dismiss}
      />,
    ]);
    setCounter(counter + 1);
  };

  const handleDismiss = () => {
    // send group num info to parent
    unmountMe({ groupNumber });

    // need to delete this group from trainingSession
    const trainingSession = getLocalStorage('TrainingSession', 'value');

    // Bring us the girl and wipe away the debt
    // need to loop over and delete all items of that groupNumber
    if (typeof trainingSession.trainingSession !== undefined) {
      for (var i = 0; i < trainingSession.trainingSession.length; i++) {
        if (trainingSession.trainingSession[i].groupNumber === groupNumber) {
          trainingSession.trainingSession.splice(i, 1);
          i--;
        }
      }
      console.log(trainingSession);
      setLocalStorage('TrainingSession', trainingSession);
      //setLocalStorage('keys2', []); // reset keys2 :- this is dangerous - need to look at this again
    }
  };

  // For deletion we just need to
  useEffect(() => {
    createCallback(update);
  }, [update]);

  return (
    <React.Fragment>
      <Card
        className={classes.card}
        style={{
          borderColor: theme.palette.secondary.main,
          borderStyle: 'solid',
          borderWidth: '0.1rem',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="space-between"
          p={2}
        >
          <Avatar aria-label="Group Cell" className={classes.avatar}>
            {alphabet[groupNumber - 1]}
          </Avatar>
          <IconButton size="small" onClick={handleDismiss}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Box>

        <div>
          {keys
            ? cell.map((cell) => {
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
          key={'button'}
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

export default GroupCell;
