import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Athletic } from '../../models/athletic';
import { stripe } from '../../stripe';

it('returns a 404, when purchasing with an athletic that doesnt exist', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signupUser())
    .send({
      token: 'sdjskdj',
      athleteId: mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it('returns a 401 when purchasing a sub which does not belong to the user', async () => {
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userName: 'Bo Ndlovu',
    version: 0,
    userId: mongoose.Types.ObjectId().toHexString(),
  });

  await athletic.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signupUser())
    .send({
      token: 'assd',
      athleteId: athletic.id,
    })
    .expect(401);
});

it('returns a 204 with valid inputs', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const price = Math.floor(Math.random() * 100000);
  const athletic = Athletic.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userName: 'Bo Ndlovu',
    version: 0,
    userId,
  });

  await athletic.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signupUser(userId))
    .send({
      token: 'tok_visa',
      athleteId: athletic.id,
      price,
    })
    .expect(201);

  const stripeCharges = await stripe.charges.list({ limit: 50 });

  const stripeCharge = stripeCharges.data.find((charge) => {
    return charge.amount === price * 100;
  });

  expect(stripeCharge).toBeDefined();
});
