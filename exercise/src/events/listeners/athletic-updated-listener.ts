import { Message } from 'node-nats-streaming';
import { Subjects, AthleticUpdatedEvent, Listener } from '@olyup/common';
import { Athletic } from '../../models/athletic';
import { queueGroupName } from './queue-group-name';

export class AthleticUpdatedListener extends Listener<AthleticUpdatedEvent> {
  subject: Subjects.AthleticUpdated = Subjects.AthleticUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: AthleticUpdatedEvent['data'], msg: Message) {
    const athletic = await Athletic.findByEvent(data);

    if (!athletic) {
      throw new Error('Athletic not found!');
    }

    const { discipline, type, userId, userName } = data;
    athletic.set({ discipline, type, userId, userName });

    await athletic.save();

    msg.ack();
  }
}
