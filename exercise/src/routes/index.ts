import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError } from '@olyup/common';
import { Exercise } from '../models/exercise';

const router = express.Router();

// This handler takes in athleteIds (list), fromDate, toDate from PreAnalytics page for querying
router.get(
  '/api/exercise',
  requireAuth,
  async (req: Request, res: Response) => {
    // const exercise = await Exercise.find({
    //   athleteId: req.currentUser!.id, // make a separate handler for coaches, athletes
    // });

    const { athleteIds, fromDate, toDate } = req.body;

    const exercise = await Exercise.find({
      //@ts-ignore
      athleteId: { $in: athleteIds },
      date: {
        $gte: new Date(fromDate).toISOString(),
        $lt: new Date(toDate).toISOString(),
      },
    }); // need to work on the date

    if (!exercise) {
      throw new NotFoundError();
    }

    res.send(exercise);
  }
);

export { router as indexExerciseRouter };
