import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@olyup/common';
import { createChargeRouter } from './routes/new';
import { createCheckoutRouter } from './routes/create-checkout-session';
import { createPortalRouter } from './routes/create-customer-portal';
import { retrieveCustomerRouter } from './routes/retrieve-customer';
import { retrievePortalSessionRouter } from './routes/retrieve-portal-session';
import { stripeWebhookRouter } from './routes/webhook-endpoint';
import { stripe } from './stripe';

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

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Expose-Headers: Content-Length, X-JSON');
  res.header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers: Content-Type, Authorization, Accept, Accept-Language, X-Authorization'
  );
  res.header('Access-Control-Max-Age: 86400');
  next();
});

app.use(currentUser); // checking to see, if user is auth

// The route handlers
app.use(createChargeRouter);
app.use(createCheckoutRouter);
app.use(createPortalRouter);
app.use(retrieveCustomerRouter);
app.use(retrievePortalSessionRouter);
app.use(stripeWebhookRouter);

// Give out an error for any other route not listed above
// express-async-errors solves a lot of problems for us here!
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Error handler (this is the middeleware) section
app.use(errorHandler);

export { app }; // because it's a named export
