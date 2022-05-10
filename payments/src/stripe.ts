import Stripe from 'stripe';

// process.env.STRIPE_KEY!
export const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: '2020-08-27',
});
