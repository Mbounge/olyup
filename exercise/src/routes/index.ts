import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError, NotAuthorizedError } from '@olyup/common';
import { Exercise } from '../models/exercise';

const router = express.Router();

// This handler takes in athleteIds (list), fromDate, toDate from PreAnalytics page for querying
router.post(
  '/api/exercise/index',
  requireAuth,
  async (req: Request, res: Response) => {
    // const exercise = await Exercise.find({
    //   athleteId: req.currentUser!.id, // make a separate handler for coaches, athletes
    // });

    const { athleteIds, fromDate, toDate } = req.body;

    const exercise = await Exercise.find({
      // //@ts-ignore
      // athleteId: { $in: athleteIds },
      // date: {
      //   $gte: new Date(fromDate).toISOString(),
      //   $lt: new Date(toDate).toISOString(),
      // },
    }).populate('coachInfo'); // need to work on the date

    if (!exercise) {
      console.log('here');
      throw new NotFoundError();
    }

    //console.log(exercise);

    // first res is for getting all athletes exercises - personal records e.g
    // second res is limits all the exercises based on the date range
    res.send([
      exercise.filter((ele) => athleteIds.includes(ele.athleteId)),
      exercise.filter(
        (ele) =>
          new Date(ele.date as Date) >= new Date(fromDate) &&
          new Date(ele.date as Date) <= new Date(toDate) &&
          athleteIds.includes(ele.athleteId)
      ),
    ]);
  }
);

export { router as indexExerciseRouter };
