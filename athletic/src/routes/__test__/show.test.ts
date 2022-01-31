import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Athletic } from '../../models/athletic';
import { Exercise } from '../../models/exercise';

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

  //console.log(response.body);

  const athleticResponse = await request(app)
    .get(`/api/athletic/${response.body.userId}`)
    .send()
    .expect(200);

  expect(athleticResponse.body[0].discipline).toEqual(discipline);
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
    groupNumber: 0,
    cellNumber: 1,
  });

  exercise.set({ checkmark: true });

  await exercise.save();

  athletic!.set({
    rosterInd: athletic,
  });

  athletic?.exercises?.push(exercise.id);

  athletic?.rosterTeam?.push({ team: 'Hockey', athletes: [athletic.id] });

  await athletic!.save(); // versioning is also working FYI

  const athleticResponse = await request(app)
    .get(`/api/athletic/${response.body.userId}`)
    .send()
    .expect(200);

  console.log('%j', athleticResponse.body[0].rosterTeam);

  expect(athleticResponse.body[0].exercises[0].exerciseName).toEqual('Snatch');
});

// testing updateAthleticTeamRouter
