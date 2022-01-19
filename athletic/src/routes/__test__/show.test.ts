import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Athletic } from '../../models/athletic';
import { Exercise } from '../../models/exercise';
import { isDoStatement } from 'typescript';

it('returns a 404 if the athletic is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/athletic/${id}`).send().expect(404);
});

it('returns a athletic, if a dicipline is found', async () => {
  const discipline = 'Hockey';

  const response = await request(app)
    .post('/api/athletic')
    .set('Cookie', global.signupUser())
    .send({
      discipline,
    })
    .expect(201);

  const athleticResponse = await request(app)
    .get(`/api/athletic/${response.body.id}`)
    .send()
    .expect(200);

  expect(athleticResponse.body.discipline).toEqual(discipline);
});

// returns a specific athletic with exercises in it

it('returns a specific athletic with exercises in it', async () => {
  const discipline = 'Soccer';

  const response = await request(app)
    .post('/api/athletic')
    .set('Cookie', global.signupUser())
    .send({
      discipline: discipline,
    })
    .expect(201);

  const athletic = await Athletic.findById(response.body.id);

  const exercise = Exercise.build({
    id: mongoose.Types.ObjectId().toHexString(),
    exerciseName: 'Snatch',
  });

  exercise.set({ checkmark: true });

  await exercise.save();

  athletic!.set({
    exercises: exercise,
  });

  await athletic!.save(); // versioning is also working FYI

  const athleticResponse = await request(app)
    .get(`/api/athletic/${response.body.id}`)
    .send()
    .expect(200);

  const date = new Date();

  console.log(date.getFullYear());

  console.log(athleticResponse.body);
  expect(athleticResponse.body.exercises[0].exerciseName).toEqual('Snatch');
});
