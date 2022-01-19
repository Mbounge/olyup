import { app } from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

// telling typescript that there is a global property called signup, but only works in auth service!!!
declare global {
  namespace NodeJS {
    interface Global {
      signupUser(): Promise<string[]>; // this is how we resolve a promise with a value in it
    }
  }
}

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
global.signupUser = async () => {
  const email = 'test@test.com';
  const password = 'password';
  const userType = 'Coach';
  const firstName = 'John';
  const lastName = 'Joe';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
      userType,
      firstName,
      lastName,
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
