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
    { id: '600', userName: 'joe', discipline: 'Hockey' },
    { id: '700', userName: 'sam', discipline: 'Football' },
    { id: '456', userName: 'john', discipline: 'Soccer' },
  ],
  rosterTeam: [
    {
      team: 'Soccer (M)',
      athletes: [
        { id: '600', userName: 'joe', discipline: 'Hockey' },
        { id: '700', userName: 'sam', discipline: 'Football' },
      ],
    },
    {
      team: 'Football',
      athletes: [
        { id: '800', userName: 'joe', discipline: 'Hockey' },
        { id: '900', userName: 'john', discipline: 'Soccer' },
      ],
    },
    {
      team: 'Hockey (F)',
      athletes: [{ id: '500', userName: 'john', discipline: 'Soccer' }],
    },
  ],
  rosterSearch: [
    { id: '220', userName: 'joe', discipline: 'Hockey' },
    { id: '330', userName: 'sam', discipline: 'Football' },
    { id: '446', userName: 'john', discipline: 'Soccer' },
  ],
};
