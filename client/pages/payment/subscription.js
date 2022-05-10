import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Typography, Button } from '@material-ui/core';
import ProductDisplay from '../../components/landing/ProductDisplay';
import SuccessPage from '../../components/landing/SuccessPage';
import CancelPage from '../../components/landing/CancelPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Router from 'next/router';

const useStyles = makeStyles((theme) => ({}));

const Subscription = ({ currentUser, customerStripe }) => {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  const classes = useStyles();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to explore and checkout when you're ready."
      );
    }
  }, [sessionId]);

  // need to at least have a currentUser, otherwise purchasing sub, won't work
  useEffect(() => {
    if (!currentUser) {
      Router.push('/');
    }
  }, []);

  if (!success && message === '') {
    return (
      <ProductDisplay
        customerStripe={customerStripe}
        currentUser={currentUser}
      />
    );
  } else if (success && sessionId !== '') {
    return <SuccessPage sessionId={sessionId} />;
  } else {
    return <CancelPage message={message} />;
  }
};

// This is the function that is going to be called whilst
// the page is first rendered - For data loading purposes for the server -- server side rendering problems
Subscription.getInitialProps = async (context, client, currentUser) => {
  var customer;
  if (!currentUser) {
    customer = { data: '' };
  } else {
    if (currentUser.userType === 'Coach') {
      customer = await client.get(
        `/api/payments/retrieve-customers/${currentUser.email}`
      );
    } else {
      customer = { data: '' };
    }
  }

  return { customerStripe: customer.data };
};

export default Subscription;
