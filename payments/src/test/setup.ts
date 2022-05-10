import { app } from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';

// telling typescript that there is a global property called signup
declare global {
  var signupUser: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
  'sk_test_51KRfmDHZOgjHxVL7PZomKJUR1bFXS3VU0vebZ8ZCaJShBwIbDZYlnQ64iV1BuG2UM9RTdhBmJw237oYsfRdeuIOW00WKZ04nTe';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdf'; // not the best way of handling this

  mongo = new MongoMemoryServer();
  const mongoURI = await mongo.getUri();
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// We are doing this, because cookie's are not included in the following requests
// Full proof way of simulating auth in a test environment -- remember we don't want to comms to auth directly
// Might want to set up a different signup function for athletes
global.signupUser = (id?: string) => {
  // Build a JWT payload { id, email, userType }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
    userType: 'Coach',
    firstName: 'John',
    lastName: 'Doe',
  };
  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build Session object/ { jwt: myJWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return string with encoded cookie data
  return [`express:sess=${base64}`];
};
