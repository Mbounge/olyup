import { Publisher, Subjects, AthleticCreatedEvent } from '@olyup/common';

export class AthleticCreatedPublisher extends Publisher<AthleticCreatedEvent> {
  subject: Subjects.AthleticCreated = Subjects.AthleticCreated;
}
