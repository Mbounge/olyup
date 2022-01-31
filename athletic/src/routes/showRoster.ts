import { NotFoundError } from '@olyup/common';
import express, { Response, Request } from 'express';
import { Athletic } from '../models/athletic';

const router = express.Router();

router.get('/api/athletic/roster', async (req: Request, res: Response) => {
  const { currentUser } = req.body;

  console.log(req.params);

  if (currentUser.type === 'Coach') {
    //find the coach
    const athletic = await Athletic.find({ userId: currentUser.id })
      .populate('exercises')
      .populate('rosterInd')
      .populate('rosterSearch')
      .populate({ path: 'rosterTeam', populate: 'athletes' });

    if (!athletic || athletic.length === 0) {
      throw new NotFoundError();
    }

    res.send(athletic);
  } else {
    //find all coaches
    const athletic = await Athletic.find({ type: 'Coach' })
      .populate('exercises')
      .populate('rosterInd')
      .populate('rosterSearch')
      .populate({ path: 'rosterTeam', populate: 'athletes' });

    if (!athletic || athletic.length === 0) {
      throw new NotFoundError();
    }

    res.send(athletic);
  }
});

export { router as showAthleticRosterRouter };
