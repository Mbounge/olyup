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
  [
    body('exerciseName')
      .not()
      .isEmpty()
      .withMessage('Exercise Name must be provided'),
  ],
  validateRequest,
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
      complex,
      groupNumber,
      cellNumber,
      userName,
      sets,
      reps,
      effort,
      effortAggregation,
      effortOption,
      athleteId,
      session,
      checkmark,
      date,
      notes,
      results,
    } = req.body;

    exercise.set({
      exerciseName,
      complex,
      sets,
      reps,
      effort,
      effortAggregation,
      effortOption,
      checkmark,
      groupNumber,
      cellNumber,
      athleteId,
      userName,
      session,
      results,
      date,
      notes,
    });

    await exercise.save();

    new ExerciseUpdatedPublisher(natsWrapper.client).publish({
      id: exercise.id,
      exerciseName: exercise.exerciseName,
      complex: exercise.complex,
      sets: exercise.sets,
      reps: exercise.reps,
      date: exercise.date,
      effort: exercise.effort,
      effortAggregation: exercise.effortAggregation,
      effortOption: exercise.effortOption,
      notes: exercise.notes,
      userName: exercise.userName,
      groupNumber: exercise.groupNumber,
      cellNumber: exercise.cellNumber,
      session: exercise.session,
      results: exercise.results,
      checkmark: exercise.checkmark,
      version: exercise.version,
    });

    res.send(exercise);
  }
);

export { router as UpdateExerciseRouter };
