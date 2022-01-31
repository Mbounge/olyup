import { NotFoundError } from '@olyup/common';
import express, { Response, Request } from 'express';
import { Athletic } from '../models/athletic';

const router = express.Router();

// primarily for getting coach/athlete info
router.get('/api/athletic/:id', async (req: Request, res: Response) => {
  const athletic = await Athletic.find({ userId: req.params.id })
    .populate('exercises')
    .populate('rosterInd')
    .populate({ path: 'rosterTeam', populate: 'athletes' });

  if (!athletic || athletic.length === 0) {
    throw new NotFoundError();
  }

  res.send(athletic);
});

export { router as showAthleticRouter };
