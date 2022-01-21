import {
  NotFoundError,
  validateRequest,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@olyup/common';
import express, { Response, Request } from 'express';
import { Athletic } from '../models/athletic';
import { body } from 'express-validator';
import { AthleticUpdatedPublisher } from '../events/publishers/athletic-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/athletic/:id',
  requireAuth,
  [body('discipline').not().isEmpty().withMessage('Sport is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    //const athletic = await Athletic.findById(req.params.id);
    const athletic = await Athletic.find({ userId: req.params.id }).populate(
      'exercises'
    );
    if (!athletic) {
      throw new NotFoundError();
    }

    //@ts-ignore
    if (athletic.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    //@ts-ignore
    athletic.set({
      discipline: req.body.discipline,
      position: req.body.position,
      height: req.body.height,
      weight: req.body.weight,
      DOB: req.body.DOB,
      sex: req.body.sex,
      userName: `${req.currentUser!.firstName} ${req.currentUser!.lastName}`,
    });

    //@ts-ignore
    await athletic.save();

    new AthleticUpdatedPublisher(natsWrapper.client).publish({
      //@ts-ignore
      id: athletic.id, //@ts-ignore
      discipline: athletic.discipline, //@ts-ignore
      type: athletic.type, //@ts-ignore
      userId: athletic.userId, //@ts-ignore
      version: athletic.version,
      userName: `${req.currentUser!.firstName} ${req.currentUser!.lastName}`,
    });

    return res.send(athletic);
  }
);

export { router as updateAthleticRouter };
