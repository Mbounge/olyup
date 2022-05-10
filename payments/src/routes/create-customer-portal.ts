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
  '/api/payments/create-portal-session',
  async (req: Request, res: Response) => {
    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    const returnUrl = 'https://olyup.dev';

    const portalSession = await stripe.billingPortal.sessions.create({
      //@ts-ignore
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });

    res.send({ url: portalSession.url });
  }
);

export { router as createPortalRouter };
