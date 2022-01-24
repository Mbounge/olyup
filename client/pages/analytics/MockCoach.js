export const coach1 = {
  id: '1234',
  userName: 'hello hello',
  discipline: 'Oly',
  height: '178',
  weight: '67',
  sex: 'Male',
  type: 'Coach',
  DOB: '2022-02-01',
  userId: '123',
  exercises: [],
  rosterInd: [
    { id: '600', userName: 'joe' },
    { id: '700', userName: 'sam' },
    { id: '456', userName: 'john' },
  ],
  rosterTeam: [
    {
      team: 'Soccer (M)',
      athletes: [
        { id: '600', userName: 'joe' },
        { id: '700', userName: 'sam' },
      ],
    },
    {
      team: 'Football',
      athletes: [
        { id: '800', userName: 'joe' },
        { id: '900', userName: 'john' },
      ],
    },
    { team: 'Hockey (F)', athletes: [{ id: '500', userName: 'john' }] },
  ],
};
