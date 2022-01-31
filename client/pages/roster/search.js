import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { Button } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { coach1 } from '../analytics/MockCoach';
import JoinButton from '../../components/view/JoinButton';
import SubscribeButton from '../../components/view/SubscribeButton';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Search = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const searchCallback = () => {
    console.log('Search Callback');
  };

  return (
    <div style={{ marginTop: '2rem' }}>
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
            {coach1.rosterSearch.map((row, index) => (
              <TableRow key={`${index}${row.userName}${index}`}>
                <TableCell component="th" scope="row">
                  {row.userName}
                </TableCell>
                <TableCell align="center">{row.discipline}</TableCell>
                <TableCell align="right">
                  {coach1.type === 'Coach' ? (
                    <JoinButton
                      userInfo={row}
                      searchCallback={searchCallback}
                    />
                  ) : (
                    <SubscribeButton
                      userInfo={row}
                      searchCallback={searchCallback}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Search.getInitialProps = async (ctx, client, currentUser) => {

// fetch coaches roster
// const { data } = await client.get(`/api/athletic/roster`, { params: { currentUser }});
// console.log(data);

// }

export default Search;
