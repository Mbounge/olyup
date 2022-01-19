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

  const user = global.signupUser();

  const { body: exercise } = await request(app)
    .post('/api/exercise')
    .set('Cookie', user)
    .send({
      exerciseName: 'Clean',
    })
    .expect(201);

  const response = await request(app)
    .delete(`/api/exercise/${exercise.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  const updatedExercise = await Exercise.findById(exercise.id);
  updatedExercise!.userId.push(athletic.userId);
  await updatedExercise!.save();

  expect(updatedExercise!.userId).toContain(athletic.userId);
  expect(updatedExercise!.userId).not.toContain(exercise.userId[0]);
});

it('emits an exercise updated event', async () => {
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    discipline: 'Hockey',
    type: 'Coach',
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await athletic.save();

  const user = global.signupUser();

  const { body: exercise } = await request(app)
    .post('/api/exercise')
    .set('Cookie', user)
    .send({
      exerciseName: 'Pull up',
    })
    .expect(201);

  await request(app)
    .delete(`/api/exercise/${exercise.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
