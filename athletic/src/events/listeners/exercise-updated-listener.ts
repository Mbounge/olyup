import { Listener, ExerciseUpdatedEvent, Subjects } from '@olyup/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Athletic } from '../../models/athletic';
import { AthleticUpdatedPublisher } from '../publishers/athletic-updated-publisher';
import { Exercise } from '../../models/exercise';

export class ExerciseUpdatedListener extends Listener<ExerciseUpdatedEvent> {
  subject: Subjects.ExerciseUpdated = Subjects.ExerciseUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ExerciseUpdatedEvent['data'], msg: Message) {
    // if (data.version === undefined) { with no save -- Exercise.findOneAndUpdate thingy } else do things normally

    const exercise = await Exercise.findByEvent(data);

    if (!exercise) {
      throw new Error('Exercise not found!');
    }
    // Update case
    exercise.set({
      exerciseName: data.exerciseName,
      complex: data.complex,
      reps: data.reps,
      sets: data.sets,
      groupNumber: data.groupNumber,
      cellNumber: data.cellNumber,
      checkmark: data.checkmark,
      date: data.date,
      notes: data.notes,
      effort: data.effort,
      effortOption: data.effortOption,
      effortAggragation: data.effortAggregation,
      athleteId: data.athleteId,
      coachId: data.coachId,
      session: data.session,
      userName: data.userName,
      results: data.results,
    });

    await exercise.save();

    msg.ack();
  }
}
