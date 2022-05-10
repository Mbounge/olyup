// Need a specific route handler that specifically pushes athletes userId
// into the exercise from the coaches roster
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@olyup/common';
import { Exercise } from '../models/exercise';
import { ExerciseUpdatedPublisher } from '../events/publishers/exercise-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/exercise/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      throw new NotFoundError();
    }

    if (
      exercise.athleteId === req.currentUser!.id ||
      exercise.coachId === req.currentUser!.id
    ) {
      console.log('Found');
    } else {
      throw new NotAuthorizedError();
    }

    const {
      exerciseName, // remember to add data object here
      exerciseName2,
      exerciseNameFinal,
      groupNumber,
      cellNumber,
      userName,
      sets,
      reps,
      effort,
      effortRange,
      range,
      effortAggregation,
      effortOption,
      athleteId,
      session,
      date,
      coachNotes,
      athleteNotes,
      results,
      measurement,
      coachInfo,
    } = req.body;

    exercise.set({
      exerciseName,
      exerciseName2,
      exerciseNameFinal,
      sets,
      reps,
      effort,
      effortRange,
      range,
      effortAggregation,
      effortOption,
      groupNumber,
      cellNumber,
      athleteId,
      userName,
      measurement,
      session,
      results,
      date,
      coachNotes,
      athleteNotes,
      coachInfo: coachInfo.id,
    });

    await exercise.save();

    new ExerciseUpdatedPublisher(natsWrapper.client).publish({
      id: exercise.id,
      exerciseName: exercise.exerciseName,
      exerciseName2: exercise.exerciseName2,
      exerciseNameFinal: exercise.exerciseNameFinal,
      sets: exercise.sets,
      reps: exercise.reps,
      date: exercise.date,
      effort: exercise.effort,
      effortRange: exercise.effortRange,
      range: exercise.range,
      effortAggregation: exercise.effortAggregation,
      effortOption: exercise.effortOption,
      athleteNotes: exercise.athleteNotes,
      coachNotes: exercise.coachNotes,
      userName: exercise.userName,
      measurement: exercise.measurement,
      groupNumber: exercise.groupNumber,
      cellNumber: exercise.cellNumber,
      session: exercise.session,
      results: exercise.results,
      coachInfo: exercise.coachInfo,
      version: exercise.version,
    });

    res.send(exercise);
  }
);

export { router as UpdateExerciseRouter };
