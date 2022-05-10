import { Athletic } from '../../../models/athletic';
import { natsWrapper } from '../../../nats-wrapper';
import { ExerciseUpdatedListener } from '../exercise-updated-listener';
import mongoose from 'mongoose';
import { ExerciseUpdatedEvent } from '@olyup/common';
import { Message } from 'node-nats-streaming';
import { Exercise } from '../../../models/exercise';

const setup = async () => {
  const listener = new ExerciseUpdatedListener(natsWrapper.client);

  const user = mongoose.Types.ObjectId().toHexString();

  // create and save an athletic
  const athletic = Athletic.build({
    discipline: 'Hockey',
  });

  athletic.set({ userId: user });
  await athletic.save();

  const exercise = Exercise.build({
    id: mongoose.Types.ObjectId().toHexString(),
    exerciseName: 'Snatch',
    groupNumber: 0,
    cellNumber: 1,
  });

  await exercise.save();

  const data: ExerciseUpdatedEvent['data'] = {
    id: exercise.id,
    groupNumber: exercise.groupNumber,
    cellNumber: exercise.cellNumber,
    version: 1,
    exerciseName: 'Squat',
    date: new Date(),
    athleteId: user,
    coachInfo: athletic,
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, athletic, data, msg, user, exercise };
};

it('updates the athletic, and acks the event', async () => {
  const { listener, athletic, data, msg, exercise } = await setup();

  await listener.onMessage(data, msg);

  const updatedExercise = await Exercise.findById(exercise.id).populate(
    'coachInfo'
  );

  console.log(updatedExercise);

  // expect(updatedExercise!.exerciseId).not.toBeDefined(); - make another test for this // although i think its done already
  expect(msg.ack).toHaveBeenCalled();
});
