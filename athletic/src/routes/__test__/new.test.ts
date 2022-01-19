import request from 'supertest';
import { app } from '../../app';
import { Athletic } from '../../models/athletic';
import { natsWrapper } from '../../nats-wrapper';

it('Has a route handler listening to /api/athletic for post requests', async () => {
  const response = await request(app).post('/api/athletic').send({});

  expect(response.status).not.toEqual(404);
});

it('Can only be accessed when the user is signed in', async () => {
  const response = await request(app)
    .post('/api/athletic')
    .send({})
    .expect(401);
});

it('It returns a status code other than 401, if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/athletic')
    .set('Cookie', global.signupUser())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('It returns an error when an invalid discipline is provided', async () => {
  const response = await request(app)
    .post('/api/athletic')
    .set('Cookie', global.signupUser())
    .send({
      discipline: '',
    })
    .expect(400);
});

it('Creates an athletic with valid inputs', async () => {
  let athletics = await Athletic.find({});
  expect(athletics.length).toEqual(0);

  await request(app)
    .post('/api/athletic')
    .set('Cookie', global.signupUser())
    .send({
      discipline: 'Hockey',
    })
    .expect(201);

  athletics = await Athletic.find({});
  expect(athletics.length).toEqual(1);
});

// it('publishes an event', async () => {
//   const title = 'title';

//   await request(app)
//     .post('/api/athletic')
//     .set('Cookie', global.signupUser())
//     .send({
//       title,
//       price: 20,
//     })
//     .expect(201);

//   expect(natsWrapper.client.publish).toHaveBeenCalled();
// });
