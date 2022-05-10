import request from 'supertest';
import { app } from '../../app';
import { Athletic } from '../../models/athletic';
import { Exercise } from '../../models/exercise';
import mongoose from 'mongoose';

const createAthletic = async () => {
  const athleticResponse = await request(app)
    .post('/api/athletic')
    .set('Cookie', global.signupUser())
    .send({
      discipline: 'Hockey',
    });

  //console.log(athleticResponse.body);

  return athleticResponse;
};

it('can fetch a list of athletics', async () => {
  await createAthletic();
  await createAthletic();
  await createAthletic();

  const response = await request(app).get('/api/athletic').send().expect(200);

  expect(response.body.length).toEqual(3);
});

// fetch an athletic with an exercise saved in it
it('can fetch a list of athletic with exercise in them', async () => {
  const exercise = Exercise.build({
    id: mongoose.Types.ObjectId().toHexString(),
    exerciseName: 'Squat',
    cellNumber: 1,
    groupNumber: 0,
  });
  await exercise.save();

  console.log(exercise.id);

  // Need to use the Athletic Model file to put data into and append exerciseId from there!
  const athletic = Athletic.build({
    discipline: 'Hockey',
  });

  athletic.exercises?.push(exercise);

  await athletic.save();

  //console.log(athletic);

  //const ath = await Athletic.find({}).populate('exercises');

  //console.log(ath[0].exercise);

  const response = await request(app).get('/api/athletic').send().expect(200);

  console.log(response.body[0]);
  expect(response.body.length).toEqual(1);
});
