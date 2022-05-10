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
        version: exercise.version,
      });
    } else if (exercise.athleteId === req.currentUser!.id) {
      exercise.set({ athleteId: '' });

      await exercise.save();

      new ExerciseUpdatedPublisher(natsWrapper.client).publish({
        id: exercise.id,
        exerciseName: exercise.exerciseName,
        exerciseName2: exercise.exerciseName2,
        exerciseNameFinal: exercise.exerciseNameFinal,
        groupNumber: exercise.groupNumber,
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
        cellNumber: exercise.cellNumber,
        athleteId: exercise.athleteId,
        coachId: exercise.coachId,
        session: exercise.session,
        results: exercise.results,
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
