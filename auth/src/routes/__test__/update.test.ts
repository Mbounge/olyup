import request from 'supertest';
import { app } from '../../app';

it('returns an updated auth profile', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      userType: 'Athlete',
      firstName: 'John',
      lastName: 'Doe',
    })
    .expect(201); // assertion

  const response = await request(app)
    .put(`/api/users/update`)
    .send({
      email: 'test@test.com',
      userType: 'Coach',
      firstName: 'Bo',
      lastName: 'Ndlovu',
    })
    .expect(201);

  expect(response.body.userType).toEqual('Coach');
});
