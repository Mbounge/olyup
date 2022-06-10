import Router from 'next/router';
import React, { useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import { Typography } from '@material-ui/core';

const signout = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <React.Fragment>
      <div style={{ marginTop: '1rem' }} />
      <br />
      <br />
      <br />
      <br />
      <Typography variant="h3" align="center">
        Signing you out ...
      </Typography>
    </React.Fragment>
  );
};

export default signout;
