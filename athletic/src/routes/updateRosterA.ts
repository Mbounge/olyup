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

    const athletic = await Athletic.updateOne(
      { id: coachId },
      { $push: { rosterSearch: { $each: [req.params.id] } } }
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

export { router as updateRosterSearchARouter };
