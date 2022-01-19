import express, { Request, Response } from 'express';
import {
  BadRequestError,
  ExerciseStatus,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@olyup/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Athletic } from '../models/athletic';
import { Exercise } from '../models/exercise';
import { ExerciseCreatedPublisher } from '../events/publishers/exercise-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/exercise',
  requireAuth,
  [
    body('exerciseName')
      .not()
      .isEmpty()
      .withMessage('Exercise Name must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      exerciseName, // remember to add data object here
      complex,
      groupNumber,
      cellNumber,
      userName, // athletes name, for analytics
      sets,
      reps,
      effort,
      effortAggregation,
      effortOption,
      athleteId,
      session,
      date,
      notes,
    } = req.body;

    // Calculate a date for this exercise
    //const date = new Date();

    // Build the exercise (order) and save it to the database
    const exercise = Exercise.build({
      exerciseName,
      complex,
      groupNumber,
      cellNumber,
      userName,
      sets,
      reps,
      date,
      effort,
      effortOption,
      effortAggregation,
      notes,
      coachId: req.currentUser!.id,
      athleteId,
      session,
    });

    await exercise.save();

    //Publish an event saying that an exercise (order) was created
    new ExerciseCreatedPublisher(natsWrapper.client).publish({
      id: exercise.id,
      exerciseName: exercise.exerciseName,
      complex: exercise.complex,
      groupNumber: exercise.groupNumber,
      sets: exercise.sets,
      reps: exercise.reps,
      date: exercise.date,
      effort: exercise.effort,
      effortAggregation: exercise.effortAggregation,
      effortOption: exercise.effortOption,
      notes: exercise.notes,
      userName: exercise.userName,
      cellNumber: exercise.cellNumber,
      athleteId: exercise.athleteId,
      coachId: exercise.coachId,
      session: exercise.session,
      results: exercise.results,
      checkmark: exercise.checkmark,
      version: exercise.version,
    });

    res.status(201).send(exercise);
  }
);

export { router as createExerciseRouter };
