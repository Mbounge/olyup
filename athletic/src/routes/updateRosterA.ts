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

// from the athletes POV
//subscription button for athletes
router.put(
  '/api/athletic/roster/a/:id',
  async (req: Request, res: Response) => {
    //const athletic = await Athletic.findById(req.params.id);
    const { coachId } = req.body;
    console.log(req.params.id);
    console.log(coachId);

    // const athletic = await Athletic.find({ userId: req.params.id }).populate({
    //   path: 'rosterTeam',
    //   populate: 'athletes',
    // });

    const userInfo = await Athletic.findOne({ userId: req.params.id });

    if (!userInfo) {
      throw new NotFoundError();
    }

    const athletic = await Athletic.updateOne(
      { _id: coachId },
      {
        $addToSet: { rosterSearch: { $each: [userInfo.id] } },
        $inc: { version: 1 },
      }
    );

    const athletic2 = await Athletic.findById(coachId);

    console.log('Update Subscription button!');
    console.log(athletic2);

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

export { router as updateRosterSearchARouter };
