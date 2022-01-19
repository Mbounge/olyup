import { AthleticCreatedListener } from '../athletic-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { AthleticCreatedEvent } from '@olyup/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Athletic } from '../../../models/athletic';
import { tsImportEqualsDeclaration } from '@babel/types';

const setup = async () => {
  // create an instance of the listener
  const listener = new AthleticCreatedListener(natsWrapper.client);
  // create a fake data event

  const user = new mongoose.Types.ObjectId().toHexString();

  const data: AthleticCreatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    discipline: 'Hockey',
    type: 'Coach',
    userId: user,
  };
  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return {
    listener,
    data,
    msg,
    user,
  };
};

it('create and saves an athletic', async () => {
  const { listener, data, msg } = await setup();
  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  // write assertions to make sure an athletic was created
  const athletic = await Athletic.findById(data.id);

  expect(athletic).toBeDefined();
  expect(athletic!.discipline).toEqual(data.discipline);
  expect(athletic!.type).toEqual(data.type);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();
  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  // write assertions to make sure ack function was called
  expect(msg.ack).toHaveBeenCalled();
});
