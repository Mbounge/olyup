// Aiming for at least 50 data points

export const data = [
  {
    id: '123',
    exerciseName: 'snatch',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 6, tally: 0 },
      { value: 6, tally: 1 },
    ],
    groupNumber: 0,
    cellNumber: 3,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 60,
    notes: ['Pause at Bottom'],
    results: [
      { value: 0, tally: 0 },
      { value: 0, tally: 1 },
    ],
    checkmark: false,
    userId: ['coachId', 'athleteId'],
    userName: 'sam',
    session: 'uuid',
    date: '2020-01-01T04:00:00.000Z', // '2020-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '123',
    exerciseName: 'snatch',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 6, tally: 0 },
      { value: 8, tally: 1 },
    ],
    groupNumber: 0,
    cellNumber: 2,
    effort: [
      { value: 60, tally: 0 },
      { value: 61, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 61,
    notes: ['Pause at Bottom'],
    results: [
      { value: 200, tally: 0 },
      { value: 120, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'sam', // joe
    session: 'uuid',
    date: '2021-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'front squat',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 6, tally: 0 },
      { value: 7, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 60,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 100, tally: 0 },
      { value: 120, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'john',
    session: 'uuid',
    date: '2021-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'front squat',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 10, tally: 0 },
      { value: 12, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 60,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 200, tally: 0 },
      { value: 200, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'john',
    session: 'uuid',
    date: '2022-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'front squat',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 5, tally: 0 },
      { value: 5, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 60,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 100, tally: 0 },
      { value: 100, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'john',
    session: 'uuid',
    date: '2022-05-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'front squat',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 3, tally: 0 },
      { value: 3, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 60,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 50, tally: 0 },
      { value: 40, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'john',
    session: 'uuid',
    date: '2023-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'front squat',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 1, tally: 0 },
      { value: 1, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 60,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 20, tally: 0 },
      { value: 20, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'john',
    session: 'uuid',
    date: '2024-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'clean',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 3, tally: 0 },
      { value: 3, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 70, tally: 0 },
      { value: 72, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 60,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 200, tally: 0 },
      { value: 205, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'sam',
    session: 'uuid',
    date: '2022-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'bench press',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 2, tally: 0 },
      { value: 2, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 80, tally: 0 },
      { value: 80, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 60,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 195, tally: 0 },
      { value: 215, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'joe',
    session: 'uuid',
    date: '2022-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'bench press',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 5, tally: 0 },
      { value: 5, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 75, tally: 0 },
      { value: 75, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 75,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 160, tally: 0 },
      { value: 180, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'joe',
    session: 'uuid',
    date: '2021-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'back squat',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 6, tally: 0 },
      { value: 6, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 65, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 62,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 100, tally: 0 },
      { value: 120, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'sam',
    session: 'uuid',
    date: '2023-03-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'back squat',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 4, tally: 0 },
      { value: 4, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 70, tally: 0 },
      { value: 70, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 70,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 200, tally: 0 },
      { value: 200, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'john',
    session: 'uuid',
    date: '2021-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'back squat',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 4, tally: 0 },
      { value: 4, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 70, tally: 0 },
      { value: 70, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 70,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 120, tally: 0 },
      { value: 120, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'john',
    session: 'uuid',
    date: '2021-04-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'back squat',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 3, tally: 0 },
      { value: 3, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 80, tally: 0 },
      { value: 80, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 70,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 220, tally: 0 },
      { value: 230, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'john',
    session: 'uuid',
    date: '2021-06-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'back squat',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 2, tally: 0 },
      { value: 2, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 80, tally: 0 },
      { value: 80, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 70,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 240, tally: 0 },
      { value: 245, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'john',
    session: 'uuid',
    date: '2021-08-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'back squat',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 4, tally: 0 },
      { value: 4, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 50, tally: 0 },
      { value: 50, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 50,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 160, tally: 0 },
      { value: 160, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'john',
    session: 'uuid',
    date: '2021-10-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'power clean',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 3, tally: 0 },
      { value: 3, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 80, tally: 0 },
      { value: 80, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 80,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 205, tally: 0 },
      { value: 225, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'sam',
    session: 'uuid',
    date: '2022-08-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'power snatch',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 4, tally: 0 },
      { value: 4, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 80, tally: 0 },
      { value: 80, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 80,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 150, tally: 0 },
      { value: 150, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'john',
    session: 'uuid',
    date: '2023-05-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'box jump',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 5, tally: 0 },
      { value: 5, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 70,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 0, tally: 0 },
      { value: 0, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'sam',
    session: 'uuid',
    date: '2021-10-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'push press',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 4, tally: 0 },
      { value: 4, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 70, tally: 0 },
      { value: 70, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 70,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 90, tally: 0 },
      { value: 100, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'joe',
    session: 'uuid',
    date: '2021-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'push press',
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: [
      { value: 4, tally: 0 },
      { value: 4, tally: 1 },
    ],
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    effortAggregation: 60,
    notes: ['Pause at Bottom'],
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 80, tally: 0 },
      { value: 90, tally: 1 },
    ],
    checkmark: false,
    athelteId: 'athleteId',
    coachId: 'coachId',
    userName: 'joe',
    session: 'uuid',
    date: '2022-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
];
