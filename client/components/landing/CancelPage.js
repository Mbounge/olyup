import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

const CancelPage = ({ message }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div style={{ marginTop: '1rem' }}>
        <Typography variant="h6">{message}</Typography>
      </div>
    </React.Fragment>
  );
};

export default CancelPage;
