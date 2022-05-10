import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
} from '@olyup/common';
import { stripe } from '../stripe';
import { Athletic } from '../models/athletic';

const router = express.Router();

router.post(
  '/api/payments/create-checkout-session',
  async (req: Request, res: Response) => {
    const { lookup_key, email } = req.body;
    //console.log(lookup_key);
    // const prices = await stripe.prices.list({
    //   lookup_keys: [lookup_key],
    //   expand: ['data.product'],
    // });

    // const stripeList = await stripe.charges.list({ limit: 50 });
    // console.log(stripeList);

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: lookup_key,
          quantity: 1,
        },
      ],
      customer_email: email,
      mode: 'subscription',
      success_url: `${'https://olyup.dev'}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${'https://olyup.dev'}?canceled=true`,
    });

    //res.json({ url: session.url! });
    res.send({ url: session.url! });
  }
);

export { router as createCheckoutRouter };
