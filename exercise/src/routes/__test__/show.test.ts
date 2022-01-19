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

  const { body: exercise } = await request(app)
    .post('/api/exercise')
    .set('Cookie', user)
    .send({ exerciseName: 'Squat' })
    .expect(201);

  const { body: fetchedExercise } = await request(app)
    .get(`/api/exercise/${exercise.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedExercise.id).toEqual(exercise.id);
});

it('returns an error when one user tries to fetch another users exercise', async () => {
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    discipline: 'Football',
    type: 'Coach',
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await athletic.save();

  const user = global.signupUser();

  const { body: exercise } = await request(app)
    .post('/api/exercise')
    .set('Cookie', user)
    .send({ exerciseName: 'Snatch' })
    .expect(201);

  await request(app)
    .get(`/api/exercise/${exercise.id}`)
    .set('Cookie', global.signupUser())
    .send()
    .expect(401);
});

it('contains the athletes userId in the exercise', async () => {
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    discipline: 'Football',
    type: 'Athlete',
    userId: mongoose.Types.ObjectId().toHexString(),
  });
  await athletic.save();

  const user = global.signupUser();

  const { body: exercise } = await request(app)
    .post('/api/exercise')
    .set('Cookie', user)
    .send({ exerciseName: 'Snatch' })
    .expect(201);

  const responseExercise = await Exercise.findById(exercise.id);

  responseExercise!.userId.push(athletic.userId);

  await responseExercise!.save();

  const response = await request(app)
    .get(`/api/exercise/${exercise.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  console.log(response.body);

  expect(response.body.userId).toContain(athletic.userId);
});
