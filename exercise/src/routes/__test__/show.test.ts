import request from 'supertest';
import { app } from '../../app';
import { Athletic } from '../../models/athletic';
import { Exercise } from '../../models/exercise';
import mongoose from 'mongoose';

it('fetches the exercise', async () => {
  // There's currently no use for building the AP
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    discipline: 'Hockey',
    type: 'Coach',
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await athletic.save();

  const user = global.signupUser();

  const exercise = await request(app)
    .post('/api/exercise')
    .set('Cookie', user)
    .send({
      exerciseName: 'front squat',
      cellNumber: 1,
      groupNumber: 3,
      athleteId: athletic.id,
      results: [{ value: 100, tally: 0, metric: 0 }],
      coachInfo: athletic,
    })
    .expect(201);

  const exercise2 = await request(app)
    .post('/api/exercise')
    .set('Cookie', user)
    .send({
      exerciseName: 'back squat',
      cellNumber: 1,
      groupNumber: 4,
      athleteId: athletic.id,
      results: [{ value: 100, tally: 0, metric: 0.56 }],
      coachInfo: athletic,
    })
    .expect(201);

  const { body: fetchedExercise } = await request(app)
    .post(`/api/exercise/show`)
    .set('Cookie', user)
    .send({ athleteIds: [athletic.id] })
    .expect(200);

  console.log('%j', fetchedExercise);
  expect(fetchedExercise.length).toEqual(2);
  //expect(fetchedExercise.id).toEqual(exercise.id);
});

it('returns a 404 when exercises cannot be found', async () => {
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    discipline: 'Football',
    type: 'Coach',
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await athletic.save();

  const user = global.signupUser();

  // const { body: exercise } = await request(app)
  //   .post('/api/exercise')
  //   .set('Cookie', user)
  //   .send({ exerciseName: 'Snatch', cellNumber: 1, groupNumber: 3, athleteId: athletic.id })
  //   .expect(201);

  await request(app)
    .post(`/api/exercise/show`)
    .set('Cookie', global.signupUser())
    .send({ athleteIds: [athletic.id] })
    .expect(404);
});
