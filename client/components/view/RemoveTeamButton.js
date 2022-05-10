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
import axios from 'axios';

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
  const [error, setError] = useState(null);

  const classes = useStyles();

  const { doRequest, errors } = useRequest({
    url: `/api/athletic/team/${coachInfo.id}`, // happening in the browser!
    method: 'delete',
    body: { teamName: 'Ice Hockey' },
    onSuccess: (data) => console.log('Team deleted!', data), // increment updateDataCounter here!
  });

  const deleteTeam = () => {
    axios
      .delete(`/api/athletic/team/${coachInfo.id}`, {
        data: { teamName: teamInfo },
      })
      .then(() => {
        setError(null);
        console.log('Team Deleted');
      })
      .catch((err) => {
        setError(
          <div className="alert alert-danger">
            <h4>Ooops....</h4>
            <ul className="my-0">
              {err.response.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        );
      });
  };

  const handleClick = () => {
    //removeButtonCallback();
    setOpenDialog(true);
    console.log(coachInfo.id);
    console.log(teamInfo);
  };

  const handleCloseDialog = () => {
    // picked no, in dialog
    setOpenDialog(false);
  };

  const handleDeleteDialog = () => {
    // picked yes, in dialog - create
    // Reset everything on screen too!
    deleteTeam();
    setOpenDialog(false);
    removeButtonCallback();
  };

  return (
    <React.Fragment>
      {errors}
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
          {`Are you sure you want to remove ${teamInfo}`}
        </DialogTitle>

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
            onClick={handleDeleteDialog}
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
