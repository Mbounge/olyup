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

router.get(
  '/api/payments/retrieve-customers/:email',
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const customer = await stripe.customers.list({ email: req.params.email });

    const customer2 = await stripe.customers.retrieve(customer.data[0].id, {
      expand: ['subscriptions'],
    });
    //console.log(customer2);

    if (!customer) {
      throw new NotFoundError();
    }

    res.status(200).send(customer2);
  }
);

export { router as retrieveCustomerRouter };
