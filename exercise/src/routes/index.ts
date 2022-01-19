import express, { Request, Response } from 'express';
import { requireAuth } from '@olyup/common';
import { Exercise } from '../models/exercise';

const router = express.Router();

router.get(
  '/api/exercise',
  requireAuth,
  async (req: Request, res: Response) => {
    const exercise = await Exercise.find({
      coachId: req.currentUser!.id, // make a separate handler for coaches, athletes
    });

    res.send(exercise);
  }
);

export { router as indexExerciseRouter };
