import { NotFoundError } from '@olyup/common';
import express, { Response, Request } from 'express';
import { Athletic } from '../models/athletic';

const router = express.Router();

// find all coaches for athletes
router.get(
  '/api/athletic/roster/a/:id',
  async (req: Request, res: Response) => {
    //find the coaches
    const athletic = await Athletic.find({ type: 'Coach' })
      .populate('exercises')
      .populate('rosterInd')
      .populate('rosterSearch')
      .populate({ path: 'rosterTeam', populate: 'athletes' });

    if (!athletic || athletic.length === 0) {
      throw new NotFoundError();
    }

    console.log(athletic);

    res.send(athletic);
  }
);

export { router as showAthleticRosterARouter };
