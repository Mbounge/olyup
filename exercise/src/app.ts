import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@olyup/common';

import { indexExerciseRouter } from './routes';
import { createExerciseRouter } from './routes/new';
import { showExerciseRouter } from './routes/show';
import { deleteExerciseRouter } from './routes/delete';
import { UpdateExerciseRouter } from './routes/update';

// This file only configures the express app
const app = express();
app.set('trust proxy', true); // because nginx, making sure that express is aware that it's behind a proxy and trust the traffic coming from the proxy
app.use(json());
app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: process.env.NODE_ENV !== 'test', // https connection required // for test environment solutions
  })
);

app.use(currentUser); // checking to see, if user is auth

// The route handlers
app.use(indexExerciseRouter);
app.use(createExerciseRouter);
app.use(showExerciseRouter);
app.use(deleteExerciseRouter);
app.use(UpdateExerciseRouter);

// Give out an error for any other route not listed above
// express-async-errors solves a lot of problems for us here!
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Error handler (this is the middeleware) section
app.use(errorHandler);

export { app }; // because it's a named export
