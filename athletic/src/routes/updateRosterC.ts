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
// adding athlete to coaches rosterInd
router.put(
  '/api/athletic/roster/c/:id',
  async (req: Request, res: Response) => {
    //const athletic = await Athletic.findById(req.params.id);
    const { athleteId } = req.body;
    console.log(req.params.id);
    console.log(athleteId);

    const athletic = await Athletic.updateOne(
      { userId: req.params.id },
      { $addToSet: { rosterInd: { $each: [athleteId] } }, $inc: { version: 1 } }
    );

    const athletic2 = await Athletic.findOne({ userId: req.params.id });

    if (!athletic2) {
      throw new NotFoundError();
    }

    new AthleticUpdatedPublisher(natsWrapper.client).publish({
      id: athletic2.id,
      discipline: athletic2.discipline,
      type: athletic2.type,
      userId: athletic2.userId,
      version: athletic2.version,
      userName: athletic2.userName,
      library: athletic2.library,
    });

    return res.send(athletic2);
  }
);

export { router as updateRosterSearchCRouter };
