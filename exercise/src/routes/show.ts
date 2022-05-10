import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@olyup/common';
import { Exercise } from '../models/exercise';

const router = express.Router();

// shows all exercises for specified users
// mainly used for personal records right now

router.post(
  '/api/exercise/show',
  requireAuth,
  async (req: Request, res: Response) => {
    const { athleteIds } = req.body;

    const exercise = await Exercise.find({
      athleteId: { $in: athleteIds },
    }).populate('coachInfo'); // need to work on the date

    if (!exercise || exercise.length === 0) {
      throw new NotFoundError();
    }

    //console.log(exercise);
    res.send(exercise);
  }
);

export { router as showExerciseRouter };
