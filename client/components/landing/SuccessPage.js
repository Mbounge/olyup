import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Typography, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({}));

const SuccessPage = ({ sessionId }) => {
  const handlePortalClick = () => {
    axios
      .post('/api/payments/create-portal-session', {
        sessionId: sessionId,
      })
      .then((res) => {
        //console.log(res.data.url);
        window.location.assign(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section style={{ marginTop: '1rem' }}>
      <div className="product Box-root">
        <div className="description Box-root">
          <h3>Subscription to Coach plan successful!</h3>
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={handlePortalClick}
      >
        Manage your billing information
      </Button>
    </section>
  );
};

export default SuccessPage;
