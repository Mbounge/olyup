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
import CircularProgress from '@material-ui/core/CircularProgress';
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

const SubscribeButton = ({ userInfo, searchCallback, athleteId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [progress, setProgress] = useState(false);

  const classes = useStyles();

  const { doRequest, errors } = useRequest({
    url: `/api/athletic/roster/a/${athleteId}`, // happening in the browser!
    method: 'put',
    body: { coachId: userInfo.id },
    onSuccess: (data) => {
      console.log('Athlete subscribed!'), setProgress(false);
    }, // increment updateDataCounter here!
  });

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
    setProgress(true);
    setOpenDialog(false);
    searchCallback({ userInfo: userInfo, type: 'sub' });
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
        {progress ? <CircularProgress color="secondary" /> : 'Subscribe'}
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to subscribe to ${userInfo.userName}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`This will allow ${userInfo.userName}'s to search for you and add you to their roster`}
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

export default SubscribeButton;
