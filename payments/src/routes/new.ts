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
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('athleteId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, athleteId, price } = req.body;

    const athletic = await Athletic.findById(athleteId);

    if (!athletic) {
      throw new NotFoundError();
    }

    if (athletic.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    // Clearly need to handle subscription stuff here
    // token scap goat -> 'tok_visa'
    // price_id_stripe -> price_1KTDDAHZOgjHxVL7XLko91Hk
    await stripe.charges.create({
      currency: 'usd',
      amount: price * 100,
      source: token, // where is the money coming from?
    });

    res.status(201).send({ success: true });
  }
);

export { router as createChargeRouter };
