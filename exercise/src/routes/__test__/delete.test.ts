import request from 'supertest';
import { app } from '../../app';
import { Athletic } from '../../models/athletic';
import { ExerciseStatus, Exercise } from '../../models/exercise';
import { natsWrapper } from '../../nats-wrapper';
import mongoose from 'mongoose';

it('marks an exercise as cancelled', async () => {
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    discipline: 'Hockey',
    type: 'Coach',
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await athletic.save();

  const user = global.signupUser(athletic.id);

  const { body: exercise } = await request(app)
    .post('/api/exercise')
    .set('Cookie', user)
    .send({
      exerciseName: 'Clean',
      cellNumber: 0,
      groupNumber: 1,
      athleteId: athletic.id,
      coachId: athletic.id,
      coachInfo: athletic,
    })
    .expect(201);

  const response = await request(app)
    .delete(`/api/exercise/${exercise.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  const updatedExercise = await Exercise.findById(exercise.id);
  updatedExercise!.athleteId! = athletic.userId;
  await updatedExercise!.save();

  expect(updatedExercise!.athleteId!).toContain(athletic.userId);
  expect(updatedExercise!.athleteId!).not.toContain(exercise.athleteId);
});

it('emits an exercise updated event', async () => {
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    discipline: 'Hockey',
    type: 'Coach',
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await athletic.save();

  const user = global.signupUser(athletic.id);

  const { body: exercise } = await request(app)
    .post('/api/exercise')
    .set('Cookie', user)
    .send({
      exerciseName: 'Pull up',
      cellNumber: 0,
      groupNumber: 1,
      athleteId: athletic.id,
      coachId: athletic.id,
      coachInfo: athletic,
    })
    .expect(201);

  await request(app)
    .delete(`/api/exercise/${exercise.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
