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
      throw new Error('Athletic not found - athletic Updated Listner!');
    }

    console.log('Here in updated listener');

    const { discipline, type, userId, userName, library } = data;
    athletic.set({ discipline, type, userId, userName, library });

    console.log(athletic);

    await athletic.save();

    msg.ack();
  }
}
