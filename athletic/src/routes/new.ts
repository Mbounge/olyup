import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@olyup/common';
import { Athletic } from '../models/athletic';
import { AthleticCreatedPublisher } from '../events/publishers/athletic-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/athletic',
  requireAuth,
  [body('discipline').not().isEmpty().withMessage('Discipline is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { discipline, position, height, weight, DOB, sex } = req.body;

    const athletic = Athletic.build({
      discipline,
      position,
      height,
      weight,
      DOB,
      sex,
    });

    // Set other attributes from the jwt object
    athletic.set({
      type: req.currentUser!.userType,
      userId: req.currentUser!.id,
      userName: `${req.currentUser!.firstName} ${req.currentUser!.lastName}`,
    });

    await athletic.save();

    // Make sure to update typescripts
    new AthleticCreatedPublisher(natsWrapper.client).publish({
      id: athletic.id,
      discipline: athletic.discipline,
      type: athletic.type,
      userId: athletic.userId,
      version: athletic.version,
      userName: `${req.currentUser!.firstName} ${req.currentUser!.lastName}`,
    });

    res.status(201).send(athletic);
  }
);

export { router as createAthleticRouter };
