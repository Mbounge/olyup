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

const SubscribeButton = ({ userInfo, searchCallback }) => {
  // const { doRequest, errors } = useRequest({
  //   url: `/api/athletic/roster/a/:id`, // happening in the browser!
  //   method: 'put',
  //   body: { coachId: userInfo.id,  },
  //   onSuccess: (data) => console.log('We got the date from the server!'), // increment updateDataCounter here!
  // });

  const handleClick = () => {
    // doRequest()
  };

  return (
    <Button
      variant="contained"
      disableElevation
      color="secondary"
      onClick={handleClick}
    >
      Subscribe
    </Button>
  );
};

export default SubscribeButton;
