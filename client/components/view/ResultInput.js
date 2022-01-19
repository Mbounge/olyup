import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '5rem',
    height: '3rem',
    marginTop: '0.43rem',
  },
}));

const ResultInput = ({ data, resViewCallback, id, session }) => {
  const [value, setValue] = useState(data ? data.value : '');

  const classes = useStyles();

  const onChange = (e) => {
    setValue(e.target.value);
    // callback function to some ResView
    resViewCallback({
      id: id,
      value: e.target.value,
      tally: data.tally,
      session: session,
    });
  };

  return (
    <TextField
      variant="outlined"
      type="number"
      size="small"
      className={classes.textField}
      onChange={onChange}
      value={value}
    />
  );
};

export default ResultInput;
