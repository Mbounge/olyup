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
  async (req: Request, res: Response) => {
    const {
      exerciseName, // remember to add data object here
      exerciseName2,
      exerciseNameFinal,
      groupNumber,
      cellNumber,
      userName, // athletes name, for analytics
      sets,
      reps,
      effort,
      effortAggregation,
      effortOption,
      athleteId,
      coachId,
      session,
      date,
      athleteNotes,
      coachNotes,
      measurement,
      range,
      effortRange,
      results,
      coachInfo,
    } = req.body;

    console.log(req.body);

    // Calculate a date for this exercise
    //const date = new Date();

    // Build the exercise (order) and save it to the database
    const exercise = Exercise.build({
      exerciseName,
      exerciseName2,
      exerciseNameFinal,
      groupNumber,
      cellNumber,
      userName,
      measurement,
      sets,
      reps,
      date,
      effort,
      effortOption,
      effortAggregation,
      athleteNotes,
      coachNotes,
      range,
      effortRange,
      coachId,
      athleteId,
      session,
      results,
      coachInfo: coachInfo.id,
    });

    await exercise.save();

    console.log(exercise);

    //Publish an event saying that an exercise (order) was created
    new ExerciseCreatedPublisher(natsWrapper.client).publish({
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
      coachInfo: exercise.coachInfo,
      version: exercise.version,
    });

    res.status(201).send(exercise);
  }
);

export { router as createExerciseRouter };
