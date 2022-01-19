import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@olyup/common';
import { Exercise } from '../models/exercise';

const router = express.Router();

router.get(
  '/api/exercise/:exerciseId',
  requireAuth,
  async (req: Request, res: Response) => {
    const exercise = await Exercise.findById(req.params.exerciseId);

    if (!exercise) {
      throw new NotFoundError();
    }

    // // Need to learn how to map from db side of things userId is a list type
    // if (exercise.userId.includes(req.currentUser!.id)) {
    //   console.log('Found');
    // } else {
    //   throw new NotAuthorizedError();
    // }

    // find coach first , then look for athlete
    if (
      exercise.athleteId === req.currentUser!.id ||
      exercise.coachId === req.currentUser!.id
    ) {
      console.log('Found');
    } else {
      throw new NotAuthorizedError();
    }

    //console.log('Here');
    res.send(exercise);
  }
);

export { router as showExerciseRouter };
