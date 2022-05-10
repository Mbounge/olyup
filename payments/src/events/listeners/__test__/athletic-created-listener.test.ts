import mongoose, { mongo } from 'mongoose';
import { AthleticCreatedEvent } from '@olyup/common';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../nats-wrapper';
import { AthleticCreatedListener } from '../athletic-created-listener';
import { Athletic } from '../../../models/athletic';

const setup = async () => {
  const listener = new AthleticCreatedListener(natsWrapper.client);

  const data: AthleticCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    discipline: 'Hockey',
    type: 'Coach',
    userId: mongoose.Types.ObjectId().toHexString(),
    userName: 'Bo Ndlovu',
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('replicates user Info', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const athletic = await Athletic.findById(data.id);

  expect(athletic!.userName).toEqual(data.userName);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
