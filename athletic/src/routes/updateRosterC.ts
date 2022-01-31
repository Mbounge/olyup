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

// from the coaches POV
router.put(
  '/api/athletic/roster/c/:id',
  async (req: Request, res: Response) => {
    //const athletic = await Athletic.findById(req.params.id);
    const { athleteId } = req.body;
    console.log(req.params.id);
    console.log(athleteId);

    const athletic = await Athletic.updateOne(
      { id: req.params.id },
      { $push: { rosterInd: { $each: [athleteId] } } }
    );

    if (!athletic) {
      throw new NotFoundError();
    }

    //@ts-ignore
    // if (athletic.userId !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    new AthleticUpdatedPublisher(natsWrapper.client).publish({
      //@ts-ignore
      id: athletic.id, //@ts-ignore
      discipline: athletic.discipline, //@ts-ignore
      type: athletic.type, //@ts-ignore
      userId: athletic.userId, //@ts-ignore
      version: athletic.version,
    });

    return res.send(athletic);
  }
);

export { router as updateRosterSearchCRouter };
