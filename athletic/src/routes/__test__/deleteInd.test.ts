import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Athletic } from '../../models/athletic';
import { Exercise } from '../../models/exercise';

it('returns an athletic with deleted team roster', async () => {
  const discipline = 'Soccer';
  const discipline2 = 'Football';

  const user = global.signupUser();

  const response = await request(app)
    .post('/api/athletic')
    .set('Cookie', global.signupUser())
    .send({
      discipline: discipline,
    })
    .expect(201);

  const response2 = await request(app)
    .post('/api/athletic')
    .set('Cookie', user)
    .send({
      discipline: discipline2,
    })
    .expect(201);

  const athletic = await Athletic.findById(response.body.id);
  const athletic2 = await Athletic.findById(response2.body.id);

  //@ts-ignore
  athletic?.rosterTeam?.push({ team: 'Hockey', athletes: [] });
  athletic?.rosterTeam?.push({
    team: 'Weightlifting',
    athletes: [athletic.id],
  });

  await athletic!.save(); // versioning is also working FYI
  console.log(response.body.userId);

  const athleticResponse = await request(app)
    .put(`/api/athletic/team/${response.body.userId}`)
    .send({
      athleteIds: [athletic2?.id],
      teamName: 'Hockey',
    })
    .expect(200);

  const responseDelete = await request(app)
    .delete(`/api/athletic/ind/${response.body.id}`)
    .send({ athleteId: athletic?.id, teamName: 'Weightlifting' })
    .expect(204);

  const athletic3 = await Athletic.findById(response.body.id).populate({
    path: 'rosterTeam',
    populate: 'athletes',
  });

  console.log('%j', athletic3?.rosterTeam); // runs correctly
});
