import { NotFoundError } from '@olyup/common';
import express, { Response, Request } from 'express';
import { Athletic } from '../models/athletic';

const router = express.Router();

router.get(
  '/api/athletic/roster/c/:id',
  async (req: Request, res: Response) => {
    //find the coach

    const athletic = await Athletic.findOne({ userId: req.params.id })
      .populate('exercises')
      .populate('rosterInd')
      .populate('rosterSearch')
      .populate({ path: 'rosterTeam', populate: 'athletes' });

    if (!athletic) {
      throw new NotFoundError();
    }

    res.send(athletic);
  }
);

export { router as showAthleticRosterRouter };
