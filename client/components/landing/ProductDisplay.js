import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    borderRadius: '1rem',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  list: {
    padding: 0,
  },
  listTypo: {
    marginLeft: '0.5rem',
    fontWeight: 700,
    fontFamily: 'Quicksand',
    fontSize: 16,
  },
  listText: {
    margin: 0,
  },
  listItem: {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.8,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      opacity: 1,
    },
  },
}));

const ProductDisplay = ({ customerStripe, currentUser }) => {
  const [progress, setProgress] = useState(false);
  const classes = useStyles();

  const handleCheckOut = () => {
    // make sure currentuser is defined before processing this
    setProgress(true);
    axios
      .post('/api/payments/create-checkout-session', {
        lookup_key: 'price_1KTDDAHZOgjHxVL7XLko91Hk',
        email: currentUser.email,
      })
      .then((res) => {
        //console.log(res.data.url);
        setProgress(false);
        window.location.assign(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePortal = () => {
    axios
      .post('/api/payments/retrieve-portal-session', {
        customerId: customerStripe.id,
      })
      .then((res) => {
        //console.log(res.data.url);
        //console.log(res);
        window.location.assign(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(customerStripe);
  console.log(customerStripe.subscriptions.data[0].status); // status // active
  console.log(customerStripe.subscriptions.data[0].plan.product); // product id identification // prod_L9WFrtkSkrTMwH

  return (
    <React.Fragment>
      <Grid container justifyContent="center" style={{ marginTop: '3rem' }}>
        <Grid item>
          <Typography variant="h5" align="center">
            For the Data-Driven Coach
          </Typography>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                align="center"
                variant="h5"
              >
                Coach Subscription
              </Typography>
              <br />
              <Typography
                variant="h4"
                align="center"
                style={{ color: '#D2AF26' }}
              >
                CA $60
                <div style={{ color: '#000000' }}>Per Month</div>
              </Typography>
              <br />
              <br />
              <Typography className={classes.pos} color="textSecondary">
                Key Features
              </Typography>
              <Typography variant="body2" component="p">
                1. Unlimited Athlete/Clients
                <br />
                2. Training Program Data Analytics Platform
              </Typography>
            </CardContent>
            <br />
            <List aria-label="Chart options" classes={{ root: classes.list }}>
              <ListItem
                button
                key={'options'}
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="Chart"
                onClick={handleCheckOut}
                classes={{ button: classes.listItem }}
                disableGutters
              >
                <ListItemText
                  primary={
                    progress ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      'Purchase'
                    )
                  }
                  primaryTypographyProps={{ align: 'center' }}
                />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProductDisplay;
