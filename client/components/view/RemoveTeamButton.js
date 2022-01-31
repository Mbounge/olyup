import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
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

const RemoveTeamButton = ({ teamInfo, removeButtonCallback, coachInfo }) => {
  const [value, setValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const classes = useStyles();

  // const { doRequest, errors } = useRequest({
  //   url: `/api/athletic/team/:id`, // happening in the browser!
  //   method: 'delete',
  //   body: { coachId: coachInfo.id, teamName: teamInfo },
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
    removeButtonCallback();
  };

  return (
    <React.Fragment>
      <IconButton
        size="small"
        onClick={handleClick}
        style={{ marginLeft: '0.15rem', marginTop: '1rem' }}
      >
        <DeleteIcon fontSize="large" />
      </IconButton>
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
            {`Are you sure you want to remove ${teamInfo}`}
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

export default RemoveTeamButton;
