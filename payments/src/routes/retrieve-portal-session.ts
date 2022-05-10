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

const router = express();

router.post(
  '/api/payments/retrieve-portal-session',
  async (req: Request, res: Response) => {
    const { customerId } = req.body;

    console.log(customerId);

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'https://olyup.dev',
    });

    // console.log(session);
    // console.log('here2');

    if (!session) {
      throw new NotFoundError();
    }

    //on the return send to .url
    res.status(200).send(session);
  }
);

export { router as retrievePortalSessionRouter };
