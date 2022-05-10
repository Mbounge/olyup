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

router.delete('/api/athletic/team/:id', async (req: Request, res: Response) => {
  //const athletic = await Athletic.findById(req.params.id);
  const { teamName } = req.body;
  console.log(req.params.id);
  console.log(req.body);

  const athletic = await Athletic.updateOne(
    { _id: req.params.id },
    { $pull: { rosterTeam: { team: teamName } }, $inc: { version: 1 } }
  );

  const athletic2 = await Athletic.findById(req.params.id);

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

  return res.status(204).send(athletic2);
});

export { router as deleteAthleticTeamRouter };
