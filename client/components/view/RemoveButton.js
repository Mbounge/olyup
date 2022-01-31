import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import useRequest from '../../hooks/use-request';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#f67997',
    opacity: 1,
    '&:hover': {
      backgroundColor: '#e9afbd',
    },
  },
}));

const RemoveButton = ({ athleteInfo, removeButtonCallback, coachInfo }) => {
  const [value, setValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const classes = useStyles();

  // const { doRequest, errors } = useRequest({
  //   url: `/api/athletic/ind/:id`, // happening in the browser!
  //   method: 'delete',
  //   body: { athleteId: athleteInfo.id, coachId: coachInfo.id, teamName: athleteInfo.team },
  //   onSuccess: (data) => console.log('We got the date from the server!'), // increment updateDataCounter here!
  // });

  const handleClick = () => {
    //removeButtonCallback();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    // picked no, in dialog
    setOpenDialog(false);
  };

  const handleCreateDialog = () => {
    // picked yes, in dialog - create
    // Reset everything on screen too!
    setOpenDialog(false);
    console.log(athleteInfo);
    removeButtonCallback();
  };

  return (
    <React.Fragment>
      <Button className={classes.button} onClick={handleClick} disableElevation>
        Remove
      </Button>
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
            {`Are you sure you want to remove ${athleteInfo.userName} from ${athleteInfo.team}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            className={classes.button}
            variant="contained"
            disableElevation
          >
            No
          </Button>
          <Button
            onClick={handleCreateDialog}
            color="secondary"
            variant="contained"
            autoFocus
            disableElevation
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default RemoveButton;
