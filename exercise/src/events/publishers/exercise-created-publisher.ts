import { Publisher, ExerciseCreatedEvent, Subjects } from '@olyup/common';

export class ExerciseCreatedPublisher extends Publisher<ExerciseCreatedEvent> {
  subject: Subjects.ExerciseCreated = Subjects.ExerciseCreated;
}
