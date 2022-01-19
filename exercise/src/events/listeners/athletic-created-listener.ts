import { Message } from 'node-nats-streaming';
import { Subjects, Listener, AthleticCreatedEvent } from '@olyup/common';
import { Athletic } from '../../models/athletic';
import { queueGroupName } from './queue-group-name';

export class AthleticCreatedListener extends Listener<AthleticCreatedEvent> {
  subject: Subjects.AthleticCreated = Subjects.AthleticCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: AthleticCreatedEvent['data'], msg: Message) {
    const { id, discipline, type, userId, userName } = data;

    const athletic = Athletic.build({
      id,
      discipline,
      userId,
      type,
      userName,
    });
    await athletic.save();

    msg.ack();
  }
}
