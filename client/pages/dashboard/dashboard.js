import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import Router from 'next/router';
import wIP from '../../src/ui/workprogress.png';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 100,
    height: '4.3rem',
    marginBottom: '1rem',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField2: {
    width: '25ch',
  },
  textField: {
    width: '7.5rem',
    height: '3rem',
    marginTop: '0.43rem',
  },
}));

const Dashboard = ({ customerStripe, currentUser }) => {
  const classes = useStyles();

  // this useEffect will be used everywhere for identification for coaches payment status
  // send to subscription page if status on Stripe is not active
  useEffect(() => {
    // if user signed in
    if (currentUser) {
      // if (currentUser.userType === 'Coach') {
      //   // now validate stripe subscription
      //   if (customerStripe !== '') {
      //     if (customerStripe.subscriptions.data[0].status !== 'active') {
      //       Router.push('/payment/subscription');
      //     }
      //   } else {
      //     Router.push('/payment/subscription');
      //   }
      // }
    } else if (!currentUser) {
      Router.push('/auth/signin');
    }
  }, []);

  return (
    <React.Fragment>
      <div style={{ marginTop: '1rem' }}>Hello Dashboard!</div>
      <br />
      <br />
      <br />
      <br />
      <Typography variant="h2" align="center">
        WORK IN PROGRESS
      </Typography>
      <Typography align="center">
        <Image
          alt="work in progress"
          src={wIP}
          width={300}
          height={250}
          quality={100}
        />
      </Typography>
    </React.Fragment>
  );
};

// get initialProps to render components info from pre analytics

Dashboard.getInitialProps = async (ctx, client, currentUser) => {
  // need to change this route handler to accept the email
  var customer;
  if (!currentUser) {
    customer = { data: '' };
  } else {
    if (currentUser.userType === 'Coach') {
      // customer = await client.get(
      //   `/api/payments/retrieve-customers/${currentUser.email}`
      // );
      customer = { data: '' };
    } else {
      customer = { data: '' };
    }
  }

  return { customerStripe: customer.data };
};

export default Dashboard;
