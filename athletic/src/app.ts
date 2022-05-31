import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@olyup/common';

import { createAthleticRouter } from './routes/new';
import { showAthleticRouter } from './routes/show';
import { IndexAthleticRouter } from './routes';
import { updateAthleticRouter } from './routes/update';
import { updateRosterSearchARouter } from './routes/updateRosterA';
import { updateRosterSearchCRouter } from './routes/updateRosterC';
import { showAthleticRosterRouter } from './routes/showRoster';
import { showAthleticRosterARouter } from './routes/showRosterA';
import { updateAthleticTeamRouter } from './routes/updateTeam';
import { updateAthleticTeamCreatorRouter } from './routes/updateCreateTeam';
import { deleteAthleticTeamIndRouter } from './routes/deleteInd';
import { deleteAthleticTeamRouter } from './routes/deleteTeam';

// This file only configures the express app
const app = express();
app.set('trust proxy', true); // because nginx, making sure that express is aware that it's behind a proxy and trust the traffic coming from the proxy
app.use(json());
app.use(
  cookieSession({
    signed: true, // disable encryption
    secure: process.env.NODE_ENV !== 'test', // https connection required // for test environment solutions
  })
);

app.use(currentUser); // checking to see, if user is auth

// The route handlers
app.use(createAthleticRouter);
app.use(showAthleticRouter);
app.use(IndexAthleticRouter);
app.use(updateAthleticRouter);
app.use(updateAthleticTeamRouter);
app.use(deleteAthleticTeamIndRouter);
app.use(deleteAthleticTeamRouter);
app.use(updateRosterSearchARouter);
app.use(updateRosterSearchCRouter);
app.use(showAthleticRosterRouter);
app.use(showAthleticRosterARouter);
app.use(updateAthleticTeamCreatorRouter);

// Give out an error for any other route not listed above
// express-async-errors solves a lot of problems for us here!
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Error handler (this is the middeleware) section
app.use(errorHandler);

export { app }; // because it's a named export
