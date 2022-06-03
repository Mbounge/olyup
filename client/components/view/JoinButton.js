import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import useRequest from '../../hooks/use-request';
import CircularProgress from '@material-ui/core/CircularProgress';

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

// button that adds athlete to coaches roster
const JoinButton = ({ userInfo, searchCallback, coachUserId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [progress, setProgress] = useState(false);

  const { doRequest, errors } = useRequest({
    url: `/api/athletic/roster/c/${coachUserId}`, // happening in the browser!
    method: 'put',
    body: { athleteId: userInfo.id },
    onSuccess: (data) => {
      console.log('Athlete joined'), setProgress(false);
    }, // increment updateDataCounter here!
  });

  const classes = useStyles();

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
    setProgress(false);
    setOpenDialog(false);
    searchCallback({ userInfo: userInfo, type: 'join' });
    doRequest();
  };

  useEffect(() => {
    setProgress(false);
  }, [errors]);

  return (
    <React.Fragment>
      <Button
        variant="contained"
        disableElevation
        color="secondary"
        onClick={handleClick}
      >
        {progress ? <CircularProgress color="secondary" /> : 'Join'}
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to add ${userInfo.userName} to your roster`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`This will allow you to prepare workouts and see ${userInfo.userName}'s stats`}
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

export default JoinButton;
