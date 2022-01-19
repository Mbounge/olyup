import { Publisher, ExerciseUpdatedEvent, Subjects } from '@olyup/common';

export class ExerciseUpdatedPublisher extends Publisher<ExerciseUpdatedEvent> {
  subject: Subjects.ExerciseUpdated = Subjects.ExerciseUpdated;
}
