import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {
  Snackbar,
  TextField,
  CardContent,
  Typography,
  Grid,
} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import JoinButton from '../../components/view/JoinButton';
import SubscribeButton from '../../components/view/SubscribeButton';
import MuiAlert from '@material-ui/lab/Alert';
import Router from 'next/router';
import theme from '../../src/ui/theme';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  warmup: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
    height: '3rem',
    paddingTop: '0.5rem',
  },
  warmup2: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
    height: '2rem',
    paddingTop: '0.1rem',
    marginBottom: '0.3rem',
  },
  textField: {
    height: '1rem',
  },
});

var userInfo2 = [];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Search = ({ userInfo, currentUser, customerStripe }) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(userInfo.rosterSearch);
  const [search2, setSearch2] = useState(userInfo);
  const [snack, setSnack] = useState(false);
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const inputRef = React.useRef();

  useEffect(() => {
    if (currentUser.userType === 'Coach') {
      userInfo.rosterInd.map((ind) => {
        setSearch(search.filter((obj) => obj.userId !== ind.userId));
      });
    }
  }, []);

  const searchCallback = (event) => {
    console.log('Search Callback');
    switch (event.type) {
      case 'sub':
        setSearch2(
          search2.filter((obj) => obj.userId !== event.userInfo.userId)
        );
        break;
      case 'join':
        setSearch(search.filter((obj) => obj.userId !== event.userInfo.userId));
        break;
      default:
        break;
    }
    setSnack(true);
  };

  const handleSnackClose = () => {
    setSnack(false);
  };

  // filter at the top
  const onChange = (e) => {
    setValue(e.target.value);

    setSearch(
      search.filter((ele) =>
        ele.userName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  // filter at the top
  const onChange2 = (e) => {
    setValue(e.target.value);

    setSearch2(
      userInfo.filter((ele) =>
        ele.userName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

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

    // to see if customerStripe is defined and has a status of active
    //console.log(customerStripe.subscriptions.data[0].status); // status // active
    //console.log(customerStripe.subscriptions.data[0].plan.product); // product id identification // prod_L9WFrtkSkrTMwH
  }, []);

  const coachView = () => {
    return (
      <div style={{ marginTop: '2rem' }}>
        <CardContent classes={{ root: classes.warmup }}>
          <Grid container>
            <Grid item xs={4}>
              <TextField
                variant="filled"
                size="small"
                value={value}
                onChange={onChange}
                placeholder="Filter"
                inputProps={{
                  style: {
                    height: '2.2rem',
                    padding: '0 14px',
                  },
                }}
                inputRef={inputRef}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography
                align="center"
                variant="h5"
                style={{
                  fontFamily: 'quicksand',
                  fontWeight: 700,
                }}
              >
                Athletes Subscribed
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </CardContent>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>FullName</TableCell>
                <TableCell align="center">Discipline</TableCell>

                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {search.map((row, index) => (
                <TableRow key={`${index}${row.userName}${index}`}>
                  <TableCell component="th" scope="row">
                    {row.userName}
                  </TableCell>
                  <TableCell align="center">{row.discipline}</TableCell>
                  <TableCell align="right">
                    <JoinButton
                      userInfo={row}
                      searchCallback={searchCallback}
                      coachUserId={currentUser.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  const athleteView = () => {
    return (
      <div style={{ marginTop: '2rem' }}>
        <CardContent classes={{ root: classes.warmup }}>
          <Grid container>
            <Grid item xs={4}>
              <TextField
                variant="filled"
                size="small"
                value={value2}
                onChange={onChange2}
                placeholder="Filter"
                inputProps={{
                  style: {
                    height: '2.2rem',
                    padding: '0 14px',
                  },
                }}
                inputRef={inputRef}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography
                align="center"
                variant="h5"
                style={{
                  fontFamily: 'quicksand',
                  fontWeight: 700,
                }}
              >
                Choose Athletes
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </CardContent>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>FullName</TableCell>
                <TableCell align="center">Discipline</TableCell>

                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {search2.map((row, index) => (
                <TableRow key={`${index}${row.userName}${index}`}>
                  <TableCell component="th" scope="row">
                    {row.userName}
                  </TableCell>
                  <TableCell align="center">{row.discipline}</TableCell>
                  <TableCell align="right">
                    <SubscribeButton
                      userInfo={row}
                      searchCallback={searchCallback}
                      athleteId={currentUser.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={snack}
          autoHideDuration={6000}
          onClose={handleSnackClose}
        >
          <Alert severity="info">
            {currentUser.userType === 'Coach'
              ? 'Athlete has joined your roster'
              : 'Subscribed to Coach'}
          </Alert>
        </Snackbar>
      </div>
    );
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      {currentUser.userType === 'Coach' ? coachView() : athleteView()}
    </div>
  );
};

Search.getInitialProps = async (ctx, client, currentUser) => {
  //fetch coaches roster

  var dataAPI;

  if (currentUser) {
    if (currentUser.userType === 'Coach') {
      // coach POV
      const { data } = await client.get(
        `/api/athletic/roster/c/${currentUser.id}`
      );

      dataAPI = data;
    } else if (currentUser.userType === 'Athlete') {
      // athlete POV
      const { data } = await client.get(
        `/api/athletic/roster/a/${currentUser.id}`
      );
      dataAPI = data;
    }
  } else {
    dataAPI = [{ id: '', rosterTeam: [], rosterInd: [], rosterSearch: [] }];
  }

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

  return { userInfo: dataAPI, customerStripe: customer.data };
};

export default Search;
