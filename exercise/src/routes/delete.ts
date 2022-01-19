import express, { Request, Response } from 'express';
import { Exercise, ExerciseStatus } from '../models/exercise';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@olyup/common';
import { ExerciseUpdatedPublisher } from '../events/publishers/exercise-updated-publisher';
import { natsWrapper } from '../nats-wrapper';
import mongoose from 'mongoose';

const router = express.Router();

router.delete(
  '/api/exercise/:exerciseId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { exerciseId } = req.params;

    const exercise = await Exercise.findById(exerciseId);

    if (!exercise) {
      throw new NotFoundError();
    }

    console.log(exercise);

    if (exercise.coachId === req.currentUser!.id) {
      exercise.set({ coachId: '' });

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
    } else if (exercise.athleteId === req.currentUser!.id) {
      exercise.set({ athleteId: '' });

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
    } else {
      throw new NotAuthorizedError();
    }

    const updatedExercise = await Exercise.findById(exerciseId);

    if (!updatedExercise) {
      throw new NotFoundError();
    }
    console.log(updatedExercise);

    res.status(204).send(updatedExercise);
  }
);

export { router as deleteExerciseRouter };
