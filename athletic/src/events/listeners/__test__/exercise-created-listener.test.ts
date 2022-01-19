import request from 'supertest';
import { Athletic } from '../../../models/athletic';
import { ExerciseCreatedListener } from '../exercise-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { ExerciseCreatedEvent, ExerciseStatus } from '@olyup/common';
import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';

const setup = async () => {
  // create a listener
  const listener = new ExerciseCreatedListener(natsWrapper.client);

  const user = mongoose.Types.ObjectId().toHexString();

  // create and save an athletic
  const athletic = Athletic.build({
    discipline: 'Hockey',
  });

  athletic.set({ userId: user });
  await athletic.save();

  const data: ExerciseCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    exerciseName: 'Squat',
    date: new Date(),
    userId: [user],
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, athletic, user };
};

it('checks if the exercise was saved on the athletic', async () => {
  const { listener, data, msg, athletic } = await setup();

  await listener.onMessage(data, msg);

  const updatedAthletic = await Athletic.findById(athletic.id).populate(
    'exercises'
  );

  expect(updatedAthletic!.exercises?.length).toEqual(1);
});

it('calls the ack message', async () => {
  const { listener, data, msg, athletic } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('publishes an athletic updated event', async () => {
  const { listener, data, msg, athletic } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const athleticUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(athletic.id).toEqual(athleticUpdatedData.id);
});
