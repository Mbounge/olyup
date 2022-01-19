import { Listener, Subjects } from '@olyup/common';
import { ExerciseCreatedEvent } from '@olyup/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Athletic } from '../../models/athletic';
import { AthleticUpdatedPublisher } from '../publishers/athletic-updated-publisher';
import { ExerciseDoc } from '../../models/exercise';
import { Exercise } from '../../models/exercise';

export class ExerciseCreatedListener extends Listener<ExerciseCreatedEvent> {
  subject: Subjects.ExerciseCreated = Subjects.ExerciseCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ExerciseCreatedEvent['data'], msg: Message) {
    // Save the exercise in the Exercise DB first, then proceed
    const exercise = Exercise.build(data);
    // So that it shows in the AP, since this is a reference
    await exercise.save();

    // Save the exercise to each userId's in the AP
    const coach = await Athletic.findOne({ userId: data.coachId });

    if (!coach) {
      throw new Error('Coach Id, Not Found!');
    }

    // search for the exercise, if its already there don't do anything!
    if (coach.exercises!.includes(exercise)) {
      console.log('Exercise already exists for coach');
    } else {
      coach.exercises!.push(exercise);
    }

    await coach.save();

    const athletic = await Athletic.findOne({ userId: data.athleteId });

    if (!athletic) {
      throw new Error('Athlete Id not found!');
    }

    athletic.exercises!.push(exercise);

    await athletic.save();

    // for version stuff
    await new AthleticUpdatedPublisher(this.client).publish({
      id: athletic.id,
      discipline: athletic.discipline,
      userId: athletic.userId,
      type: athletic.type,
      version: athletic.version,
      userName: athletic.userName,
    });

    msg.ack();
  }
}
