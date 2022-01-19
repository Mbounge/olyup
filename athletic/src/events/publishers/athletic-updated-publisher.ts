import { Publisher, Subjects, AthleticUpdatedEvent } from '@olyup/common';

export class AthleticUpdatedPublisher extends Publisher<AthleticUpdatedEvent> {
  subject: Subjects.AthleticUpdated = Subjects.AthleticUpdated;
}
