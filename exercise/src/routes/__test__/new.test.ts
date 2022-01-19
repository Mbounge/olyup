import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Exercise } from '../../models/exercise';
import { Athletic } from '../../models/athletic';
import { ExerciseStatus } from '@olyup/common';
import { natsWrapper } from '../../nats-wrapper';

it('return a 401 if the user is not signed in', async () => {
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    discipline: 'Hockey',
    type: 'Coach',
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await athletic.save();

  await request(app)
    .post('/api/exercise')
    .send({ exerciseName: 'Deadlift' })
    .expect(401);
});

it('returns a 400 if the user provides invalid inputs', async () => {
  await request(app)
    .post('/api/exercise')
    .set('Cookie', global.signupUser())
    .send({ exerciseName: '' })
    .expect(400);
});

it('creates an exercise, provided valid inputs', async () => {
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    discipline: 'Hockey',
    type: 'Coach',
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await athletic.save();

  await request(app)
    .post('/api/exercise')
    .set('Cookie', global.signupUser())
    .send({ exerciseName: 'Clean@Jerk' })
    .expect(201);
});

it('emits an exercise created Event', async () => {
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    discipline: 'Hockey',
    type: 'Coach',
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await athletic.save();

  await request(app)
    .post('/api/exercise')
    .set('Cookie', global.signupUser())
    .send({ exerciseName: 'Snatch Deadlift' })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
