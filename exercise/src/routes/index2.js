import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError, NotAuthorizedError } from '@olyup/common';
import { Exercise } from '../models/exercise';

const router = express.Router();

router.get('/api/exercise/index', requireAuth, async (req, res) => {
  const { athleteIds, fromDate, toDate } = req.body;

  const exercise = await Exercise.find({
    athleteId: { $in: athleteIds },
    date: {
      $gte: new Date(fromDate).toISOString(),
      $lt: new Date(toDate).toISOString(),
    },
  });

  if (!exercise) {
    console.log('here');
    throw new NotFoundError();
  }

  res.send(exercise);
});

export { router as index2ExerciseRouter };
