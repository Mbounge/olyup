import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 100,
    height: '4.3rem',
    marginBottom: '1rem',
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div style={{ marginTop: '1rem' }}>Hello Dashboard!</div>
    </React.Fragment>
  );
};

// get initialProps to render components info from pre analytics

// Dashboard.getInitialProps = async (ctx) => {
//   const db = getFirestore(app);

//   // fetch exercises from firebase
//   const exercises = await getExercises(db).then((doc) => {
//     return doc;
//   });

//   return { exercises: exercises };
// };

export default Dashboard;
