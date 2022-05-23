import mongoose from 'mongoose';
import { Athletic } from '../../models/athletic';
import request from 'supertest';
import { app } from '../../app';
import { Exercise } from '../../models/exercise';
import { natsWrapper } from '../../nats-wrapper';

it('Updates the exercise, and publishes a exercise updated event', async () => {
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    discipline: 'Hockey',
    type: 'Coach',
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await athletic.save();

  const user = global.signupUser(athletic.id);

  const responseExercise = await request(app)
    .post('/api/exercise')
    .set('Cookie', user)
    .send({
      exerciseName: 'Clean@Jerk',
      cellNumber: 0,
      groupNumber: 2,
      athleteId: athletic.id,
      coachInfo: athletic,
    })
    .expect(201);

  const responseUpdated = await request(app)
    .put(`/api/exercise/${responseExercise.body.id}`)
    .set('Cookie', user)
    .send({
      exerciseName: 'Clean Deadlift',
      cellNumber: 0,
      groupNumber: 2,
      athleteId: athletic.id,
      coachInfo: athletic,
    })
    .expect(200);

  console.log(responseUpdated.body);

  expect(responseUpdated.body.exerciseName).toEqual('Clean Deadlift');
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
