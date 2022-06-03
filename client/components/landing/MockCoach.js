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
    { id: '600', userName: 'joe', discipline: 'Hockey', userId: '600' },
    { id: '700', userName: 'sam', discipline: 'Football', userId: '700' },
    { id: '456', userName: 'john', discipline: 'Soccer', userId: '456' },
  ],
  rosterTeam: [
    {
      team: 'Soccer (M)',
      athletes: [
        { id: '600', userName: 'joe', discipline: 'Hockey', userId: '600' },
        { id: '700', userName: 'sam', discipline: 'Football', userId: '700' },
      ],
    },
    {
      team: 'Football',
      athletes: [
        { id: '600', userName: 'joe', discipline: 'Hockey', userId: '600' },
        { id: '456', userName: 'john', discipline: 'Soccer', userId: '456' },
      ],
    },
    {
      team: 'Hockey (F)',
      athletes: [
        { id: '456', userName: 'john', discipline: 'Soccer', userId: '456' },
      ],
    },
  ],
  rosterSearch: [
    { id: '600', userName: 'joe', discipline: 'Hockey', userId: '600' },
    { id: '700', userName: 'sam', discipline: 'Football', userId: '700' },
    { id: '456', userName: 'john', discipline: 'Soccer', userId: '456' },
  ],
};
