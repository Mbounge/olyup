import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  Chip,
  Input,
  MenuItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import useRequest from '../../hooks/use-request';
import theme from '../../src/ui/theme';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#f67997',
    opacity: 1,
    '&:hover': {
      backgroundColor: '#e9afbd',
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

const AddButton = ({ athleteInfo, addButtonCallback, coachInfo }) => {
  const [personName, setPersonName] = useState([]);
  const [athleteIds, setAthleteIds] = useState([]);
  const [open, setOpen] = React.useState(false);

  // router handler - updateTeam
  const { doRequest, errors } = useRequest({
    url: `/api/athletic/team/${coachInfo.userId}`, // happening in the browser!
    method: 'put',
    body: {
      athleteIds: athleteIds,
      coachId: coachInfo.id,
      teamName: athleteInfo,
    },
    onSuccess: (data) => console.log('Athletes Added to Team!'), // increment updateDataCounter here!
  });

  const classes = useStyles();

  const athleteNames = [];

  // need to filter out the athletes who are already in
  coachInfo.rosterInd.map((names) => {
    athleteNames.push(`${names.userName} - ${names.discipline}`);
  });

  function getPersonStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleClick = () => {
    console.log(athleteInfo);
    setOpen(true);
    addButtonCallback();
  };

  const handleClose = () => {
    setPersonName((oldNames) => []);
    setOpen(false);
  };

  const handleSubmit = () => {
    setPersonName((oldNames) => []);
    setOpen(false);
    doRequest();
  };

  const handlePersonChange = (event) => {
    setPersonName(event.target.value);
  };

  useEffect(() => {
    var bufferIds = [];
    personName.map((name) => {
      coachInfo.rosterInd.forEach((ind) => {
        if (`${ind.userName} - ${ind.discipline}` === name) {
          bufferIds.push(ind.id);
        }
      });
    });
    // Get only the unique values
    setAthleteIds((oldIds) => [...[...new Set(bufferIds)]]);
  }, [personName]);

  return (
    <React.Fragment>
      <Button
        color="secondary"
        disableElevation
        variant="contained"
        onClick={handleClick}
      >
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Athletes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Please add the corresponding athletes to ${athleteInfo}.
            `}
          </DialogContentText>
          <Typography
            align="center"
            style={{
              marginTop: '0.5rem',
              fontFamily: 'quicksand',
              fontWeight: 700,
            }}
          >
            Athlete Select
          </Typography>
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            disableElevation
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
            disableElevation
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddButton;
