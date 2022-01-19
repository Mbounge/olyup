import request from 'supertest';
import { app } from '../../app';
import { Exercise } from '../../models/exercise';
import { Athletic } from '../../models/athletic';
import mongoose from 'mongoose';

it('fetch exercises for a particular user', async () => {
  const buildAthlete = async () => {
    const athlete = Athletic.build({
      id: mongoose.Types.ObjectId().toHexString(),
      discipline: 'Hockey',
      type: 'Coach',
      userId: mongoose.Types.ObjectId().toHexString(),
    });
    await athlete.save();

    return athlete;
  };

  // Create 3 athletic's
  const athleteOne = await buildAthlete();
  const athleteTwo = await buildAthlete();
  const athleteThree = await buildAthlete();
  console.log(athleteOne.id);

  const userOne = global.signupUser();
  const userTwo = global.signupUser();

  console.log(userOne);

  // Create one exercise as User #1
  await request(app)
    .post('/api/exercise')
    .set('Cookie', userOne)
    .send({ exerciseName: 'Squat' })
    .expect(201);

  // Create two exercises as User #2
  const { body: exerciseOne } = await request(app)
    .post('/api/exercise')
    .set('Cookie', userTwo)
    .send({ exerciseName: 'Deadlift' })
    .expect(201);

  const { body: exerciseTwo } = await request(app)
    .post('/api/exercise')
    .set('Cookie', userTwo)
    .send({ exerciseName: 'Snatch' })
    .expect(201);

  // Make request to get exercises for User #2
  const response = await request(app)
    .get('/api/exercise')
    .set('Cookie', userTwo)
    .expect(200);

  // Make sure only got the exercises for User #2
  console.log(response.body);
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(exerciseOne.id);
  expect(response.body[1].id).toEqual(exerciseTwo.id);
});
