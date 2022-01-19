import { AthleticUpdatedListener } from '../athletic-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Athletic } from '../../../models/athletic';
import mongoose from 'mongoose';
import { AthleticUpdatedEvent } from '@olyup/common';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  // create listener
  const listener = new AthleticUpdatedListener(natsWrapper.client);

  const user = new mongoose.Types.ObjectId().toHexString();

  // create and save an athletic
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    discipline: 'Football',
    type: 'Coach',
    userId: user,
  });
  await athletic.save();

  // create a fake data object
  const data: AthleticUpdatedEvent['data'] = {
    id: athletic.id,
    version: athletic.version + 1,
    discipline: 'Soccer',
    type: 'Athlete',
    userId: user,
  };
  // create a fake msg object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all of this stuff
  return { listener, athletic, data, msg };
};

it('finds, updates, and saves an athletic', async () => {
  const { msg, listener, athletic, data } = await setup();

  await listener.onMessage(data, msg);

  const updatedAthletic = await Athletic.findById(athletic.id);

  expect(updatedAthletic!.discipline).toEqual(data.discipline);
  expect(updatedAthletic!.type).toEqual('Athlete');
  expect(updatedAthletic!.version).toEqual(data.version);
});

it('acks the message', async () => {
  const { msg, listener, data } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call the ack if the event has a skipped version number', async () => {
  const { msg, listener, data, athletic } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}

  expect(msg.ack).not.toHaveBeenCalled();
});
