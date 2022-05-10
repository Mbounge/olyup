import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';
import { Athletic } from '../../models/athletic';
import { Exercise } from '../../models/exercise';

it('return a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/athletic/${id}`)
    .set('Cookie', global.signupUser())
    .send({
      discipline: 'Hockey',
    })
    .expect(404);
});

it('return a 401 if a user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/athletic/${id}`)
    .send({
      discipline: 'Hockey',
    })
    .expect(401);
});

it('return a 401 if a user does not own the athletic', async () => {
  const response = await request(app)
    .post('/api/athletic')
    .set('Cookie', global.signupUser())
    .send({
      discipline: 'Hockey',
    });

  await request(app)
    .put(`/api/athletic/${response.body.userId}`)
    .set('Cookie', global.signupUser())
    .send({
      discipline: 'Hockey',
    })
    .expect(401);
});

it('return a 400 if the user provided an invalid discipline', async () => {
  const cookie = global.signupUser();

  const response = await request(app)
    .post('/api/athletic')
    .set('Cookie', cookie)
    .send({
      discipline: 'Hockey',
    });

  await request(app)
    .put(`/api/athletic/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      discipline: '',
    })
    .expect(400);
});

it('updates the athletic provided valid inputs', async () => {
  const cookie = global.signupUser();

  const response = await request(app)
    .post('/api/athletic')
    .set('Cookie', cookie)
    .send({
      discipline: 'Hockey',
    })
    .expect(201);

  // To make sure the exercises db exists
  const exercise = Exercise.build({
    id: mongoose.Types.ObjectId().toHexString(),
    exerciseName: 'Clean',
    cellNumber: 1,
    groupNumber: 0,
  });

  await exercise.save();

  const update = await request(app)
    .put(`/api/athletic/${response.body.userId}`)
    .set('Cookie', cookie)
    .send({
      discipline: 'Football',
    })
    .expect(200);

  const athleticResponse = await request(app)
    .get(`/api/athletic/${response.body.userId}`)
    .send()
    .expect(200);

  expect(athleticResponse.body[0].discipline).toEqual('Football');
});

// updates an athletic with an exercise

// updates the exercise in a athletic

// it('publishes an event', async () => {
//   const cookie = global.signupUser();

//   const response = await request(app)
//     .post('/api/athletic')
//     .set('Cookie', cookie)
//     .send({
//       title: 'title',
//       price: 20,
//     })
//     .expect(201);

//   await request(app)
//     .put(`/api/athletic/${response.body.id}`)
//     .set('Cookie', cookie)
//     .send({
//       title: 'title2',
//       price: 10,
//     })
//     .expect(200);

//   expect(natsWrapper.client.publish).toHaveBeenCalled();
// });

// Make this one about updating the exercise field
// it('rejects updates if the athletic is reserved', async () => {
//   const cookie = global.signupUser();

//   const response = await request(app)
//     .post('/api/athletic')
//     .set('Cookie', cookie)
//     .send({
//       title: 'title',
//       price: 20,
//     })
//     .expect(201);

//   const athletic = await Athletic.findById(response.body.id);
//   athletic!.set({ exerciseId: mongoose.Types.ObjectId().toHexString() });
//   await athletic!.save();

//   await request(app)
//     .put(`/api/athletic/${response.body.id}`)
//     .set('Cookie', cookie)
//     .send({
//       title: 'title2',
//       price: 10,
//     })
//     .expect(400);
// });
