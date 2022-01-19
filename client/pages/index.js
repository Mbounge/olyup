import React from 'react';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//const useStyles = makeStyles((theme) => ({}));

const LandingPage = ({ currentUser }) => {
  //const classes = useStyles();
  //const theme = useTheme();

  return currentUser ? (
    <h1>You are Signed in!</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

// This is the function that is going to be called whilst
// the page is first rendered - For data loading purposes for the server -- server side rendering problems
// LandingPage.getInitialProps = async (context, client, currentUser) => {
//   return {};
// };

export default LandingPage;
