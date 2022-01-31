import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Select,
  Input,
  Chip,
  MenuItem,
  TextField,
} from '@material-ui/core';
import AddButton from '../../components/view/AddButton';
import RemoveButton from '../../components/view/RemoveButton';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { coach1 } from '../analytics/MockCoach';
import theme from '../../src/ui/theme';
import useRequest from '../../hooks/use-request';
import { v4 as uuidv4 } from 'uuid';
import RemoveTeamButton from '../../components/view/RemoveTeamButton';

const useStyles = makeStyles((theme) => ({
  textField: {
    paddingTop: 0,
    paddingBottom: 0,
    width: 50,
    height: '10px',
  },
  list: {
    padding: 0,

    '& .MuiListItem-root': {
      borderRadius: '4px',
    },
  },
  listItem: {
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.8,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      opacity: 1,
    },
  },
  table: {
    backgroundColor: '#ebfefd',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  button: {
    backgroundColor: '#f67997',
    opacity: 1,
    '&:hover': {
      backgroundColor: '#e9afbd',
    },
  },
}));

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

console.log(coach1);

const removeButtonCallback = () => {
  console.log('Remove Callback!!!');
};

const addButtonCallback = () => {
  console.log('Add Callback!!!');
};

// To add a team, please enter the name of the team and select the
//             corresponding athletes.
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="h6">{row.team}</Typography>
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          <RemoveTeamButton
            teamInfo={row.team}
            coachInfo={coach1}
            removeButtonCallback={removeButtonCallback}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Athletes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Full Name</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <AddButton
                        athleteInfo={row.team}
                        addButtonCallback={addButtonCallback}
                        coachInfo={coach1}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.athletes.map((athletesRow, index) => (
                    <TableRow key={`${index}${row.team}${index}`}>
                      <TableCell component="th" scope="row">
                        <Typography variant="h6">
                          {athletesRow.userName}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <RemoveButton
                          athleteInfo={{
                            userName: athletesRow.userName,
                            id: athletesRow.id,
                            team: row.team,
                          }}
                          removeButtonCallback={removeButtonCallback}
                          coachInfo={coach1}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

Row.propTypes = {
  row: PropTypes.shape({
    team: PropTypes.string.isRequired,
    athletes: PropTypes.arrayOf(
      PropTypes.shape({
        userName: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

const Roster = ({ coachInfo }) => {
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [personName, setPersonName] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [athleteIds, setAthleteIds] = useState([]);

  // const { doRequest, errors } = useRequest({
  //   url: `/api/athletic/teams/:id`, // happening in the browser!
  //   method: 'put',
  //   body: { athleteIds: athleteIds, coachId: coachInfo.id, teamName: teamName },
  //   onSuccess: (data) => console.log('We got the date from the server!'), // increment updateDataCounter here!
  // });

  const classes = useStyles();

  const athleteNames = [];

  coach1.rosterInd.map((names) => {
    athleteNames.push(`${names.userName} - ${names.discipline}`);
  });

  function getPersonStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setPersonName((oldNames) => []);
    setTeamName('');
    console.log('team - close');
  };

  const handleCreateDialog = () => {
    setOpen(false);
    setPersonName((oldNames) => []);
    setTeamName('');
    console.log('team - create');
  };

  const handlePersonChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleTeamName = (e) => {
    setTeamName(e.target.value);
  };

  useEffect(() => {
    var bufferIds = [];
    personName.map((name) => {
      coach1.rosterInd.forEach((ind) => {
        if (ind.userName === name) {
          bufferIds.push(ind.id);
        }
      });
    });
    // Get only the unique values
    setAthleteIds((oldIds) => [...[...new Set(bufferIds)]]);
  }, [personName]);

  return (
    <div style={{ marginTop: '3rem' }}>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        disableElevation
        onClick={handleClick}
      >
        Add Team
      </Button>
      <TableContainer component={Paper} classes={{ root: classes.table }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography variant="h6">Athletic Teams</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coach1.rosterTeam.map((team) => (
              <Row key={team.team} row={team} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Add Team'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`To add a team, please enter the name of the team and select the corresponding athletes.`}
          </DialogContentText>
          <Typography
            align="center"
            style={{
              marginTop: '0.5rem',
              fontFamily: 'quicksand',
              fontWeight: 700,
            }}
          >
            Team Name
          </Typography>
          <TextField
            autoFocus
            id="name"
            color="secondary"
            fullWidth
            value={teamName}
            onChange={handleTeamName}
          />
          <Typography
            align="center"
            style={{
              marginTop: '0.5rem',
              fontFamily: 'quicksand',
              fontWeight: 700,
            }}
          >
            Athlete Select
          </Typography>
          <Select
            labelId="mutiple-chip-label"
            id="mutiple-chip"
            multiple
            value={personName}
            onChange={handlePersonChange}
            input={<Input id="select-multiple-chip" fullWidth />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    className={classes.chip}
                    color="secondary"
                  />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {athleteNames.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getPersonStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
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
            onClick={handleCreateDialog}
            color="secondary"
            autoFocus
            variant="contained"
            disableElevation
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// To add a team, please enter the name of the team and select the
//             corresponding athletes.
// Roster.getInitialProps = async (ctx, client, currentUser) => {
//   // fetch coaches roster
//   // const { data } = await client.get(`/api/athletic/${currentUser.id}`);
//   // console.log(data);
// };

export default Roster;
