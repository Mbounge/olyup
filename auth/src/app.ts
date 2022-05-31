import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler, NotFoundError } from '@olyup/common';

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

// The route handlers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Give out an error for any other not listed above
// express-async-errors solves a lot of problems for us here!
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Error handler (this is the middeleware) section
app.use(errorHandler);

export { app }; // because it's a named export
