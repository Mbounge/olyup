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

    console.log(exercise);

    const coachUpdate = await Athletic.updateOne(
      { userId: data.coachId },
      {
        $addToSet: {
          exercises: exercise,
        },
      }
    );

    console.log(coachUpdate);

    // const coach = await Athletic.findOne({ userId: data.coachId });

    // if (!coach) {
    //   throw new Error('CoachId not found');
    // }

    // await new AthleticUpdatedPublisher(this.client).publish({
    //   id: coach.id,
    //   discipline: coach.discipline,
    //   userId: coach.userId,
    //   type: coach.type,
    //   version: coach.version,
    //   userName: coach.userName,
    // });

    const athleteUpdate = await Athletic.updateOne(
      { userId: data.athleteId },
      {
        $addToSet: {
          exercises: exercise,
        },
      }
    );

    console.log(athleteUpdate);

    // const athletic = await Athletic.findOne({
    //   userId: data.athleteId,
    // });

    // if (!athletic) {
    //   throw new Error('Athlete Id not found!');
    // }

    // // for version stuff
    // await new AthleticUpdatedPublisher(this.client).publish({
    //   id: athletic.id,
    //   discipline: athletic.discipline,
    //   userId: athletic.userId,
    //   type: athletic.type,
    //   version: athletic.version,
    //   userName: athletic.userName,
    // });

    msg.ack();
  }
}
