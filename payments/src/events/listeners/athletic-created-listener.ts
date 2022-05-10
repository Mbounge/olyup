import { Listener, AthleticCreatedEvent, Subjects } from '@olyup/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Athletic } from '../../models/athletic';

export class AthleticCreatedListener extends Listener<AthleticCreatedEvent> {
  subject: Subjects.AthleticCreated = Subjects.AthleticCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: AthleticCreatedEvent['data'], msg: Message) {
    const athletic = Athletic.build({
      id: data.id,
      userId: data.userId,
      userName: data.userName,
      version: data.version,
    });

    await athletic.save();
    msg.ack();
  }
}
