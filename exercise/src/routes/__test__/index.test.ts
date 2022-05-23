import request from 'supertest';
import { app } from '../../app';
import { Exercise } from '../../models/exercise';
import { Athletic } from '../../models/athletic';
import mongoose from 'mongoose';

it('fetch exercises for particular users', async () => {
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
    .send({
      exerciseName: 'Squat',
      exerciseName2: ['Squat'],
      exerciseNameFinal: [{ value: 'Squat', tally: 0 }],
      cellNumber: 1,
      groupNumber: 0,
      date: new Date(2022, 1, 15).toISOString(),
      athleteId: athleteOne.id,
      reps: {
        squat: { data: [{ value: 2, tally: 4 }] },
        front: { data: [{ value: 2, tally: 4 }] },
      },
      coachInfo: athleteOne,
    })
    .expect(201);

  // Create two exercises as User #2
  const { body: exerciseOne } = await request(app)
    .post('/api/exercise')
    .set('Cookie', userTwo)
    .send({
      exerciseName: 'Deadlift',
      exerciseName2: ['Deadlift'],
      exerciseNameFinal: [{ value: 'Deadlift', tally: 0 }],
      cellNumber: 1,
      groupNumber: 1,
      date: new Date(2022, 1, 1).toISOString(),
      athleteId: athleteOne.id,
      coachInfo: athleteOne,
    })
    .expect(201);

  const { body: exerciseTwo } = await request(app)
    .post('/api/exercise')
    .set('Cookie', userTwo)
    .send({
      exerciseName: 'Snatch',
      exerciseName2: ['Snatch'],
      exerciseNameFinal: [{ value: 'Snatch', tally: 0 }],
      groupNumber: 0,
      cellNumber: 1,
      date: new Date(2021, 1, 1).toISOString(),
      athleteId: athleteTwo.id,
      coachInfo: athleteTwo,
    })
    .expect(201);

  const { body: exerciseThree } = await request(app)
    .post('/api/exercise')
    .set('Cookie', userTwo)
    .send({
      exerciseName: 'Push Press',
      exerciseName2: ['Push Press'],
      exerciseNameFinal: [{ value: 'Push Press', tally: 0 }],
      groupNumber: 3,
      cellNumber: 1,
      date: new Date(2020, 1, 1).toISOString(),
      athleteId: athleteOne.id,
      coachInfo: athleteOne,
    })
    .expect(201);

  const { body: exerciseFour } = await request(app)
    .post('/api/exercise')
    .set('Cookie', userTwo)
    .send({
      exerciseName: 'Pull Ups',
      exerciseName2: ['Pull Ups'],
      exerciseNameFinal: [{ value: 'Pull Ups', tally: 0 }],
      groupNumber: 4,
      cellNumber: 1,
      date: new Date(2022, 2, 1).toISOString(),
      athleteId: athleteOne.id,
      coachInfo: athleteOne,
    })
    .expect(201);

  // Make request to get exercises for User #2
  const response = await request(app)
    .post('/api/exercise/index')
    .set('Cookie', userTwo)
    .send({
      athleteIds: [athleteTwo.id, athleteOne.id],
      fromDate: new Date(2020, 1, 1).toISOString(),
      toDate: new Date(2023, 1, 1).toISOString(),
    })
    .expect(200);

  // Make sure only got the exercises for User #2
  //console.log('%j', response.body);
  //console.log(response.body);
  expect(response.body[0].length).toEqual(5);
  // expect(response.body[0].id).toEqual(exerciseOne.id);
  // expect(response.body[1].id).toEqual(exerciseTwo.id);
});
