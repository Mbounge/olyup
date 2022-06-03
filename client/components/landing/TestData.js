// Aiming for at least 50 data points

export const data = [
  {
    id: '123',
    exerciseName: 'snatch',
    exerciseName2: ['snatch'],
    exerciseNameFinal: [{ value: 'snatch', tally: 0 }],
    sets: 2,
    reps: {
      snatch: {
        data: [
          { value: 6, tally: 0 },
          { value: 6, tally: 1 },
        ],
      },
    },
    groupNumber: 0,
    cellNumber: 3,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      { value: 0, tally: 0 },
      { value: 0, tally: 1 },
    ],
    checkmark: false,
    coachId: '',
    athleteId: '700',
    userName: 'sam',
    measurement: 'kg',
    session: 'uuid',
    date: '2020-01-01T04:00:00.000Z', // '2020-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '123',
    exerciseName: 'snatch',
    exerciseName2: ['snatch'],
    exerciseNameFinal: [{ value: 'snatch', tally: 0 }],
    sets: 2,
    reps: {
      snatch: {
        data: [
          { value: 6, tally: 0 },
          { value: 8, tally: 1 },
        ],
      },
    },
    groupNumber: 0,
    cellNumber: 2,
    effort: [
      { value: 60, tally: 0 },
      { value: 61, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      { value: 200, tally: 0 },
      { value: 120, tally: 1 },
    ],
    checkmark: false,
    athleteId: '700',
    coachId: 'coachId',
    userName: 'sam', // joe
    measurement: 'kg',
    session: 'uuid',
    date: '2021-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'front squat',
    exerciseName2: ['front squat'],
    exerciseNameFinal: [{ value: 'front squat', tally: 0 }],
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: {
      'front squat': {
        data: [
          { value: 6, tally: 0 },
          { value: 7, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 100, tally: 0 },
      { value: 120, tally: 1 },
    ],
    checkmark: false,
    athleteId: '456',
    coachId: 'coachId',
    userName: 'john',
    measurement: 'kg',
    session: 'uuid',
    date: '2021-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'front squat',
    exerciseName2: ['front squat'],
    exerciseNameFinal: [{ value: 'front squat', tally: 0 }],
    sets: 2,
    reps: {
      'front squat': {
        data: [
          { value: 10, tally: 0 },
          { value: 12, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 200, tally: 0 },
      { value: 200, tally: 1 },
    ],
    checkmark: false,
    athleteId: '456',
    coachId: 'coachId',
    userName: 'john',
    measurement: 'kg',
    session: 'uuid',
    date: '2022-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'front squat',
    exerciseName2: ['front squat'],
    exerciseNameFinal: [{ value: 'front squat', tally: 0 }],
    sets: 2,
    reps: {
      'front squat': {
        data: [
          { value: 5, tally: 0 },
          { value: 5, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 100, tally: 0 },
      { value: 100, tally: 1 },
    ],
    checkmark: false,
    athleteId: '456',
    coachId: 'coachId',
    userName: 'john',
    measurement: 'kg',
    session: 'uuid',
    date: '2022-05-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'front squat',
    exerciseName2: ['front squat'],
    exerciseNameFinal: [{ value: 'front squat', tally: 0 }],
    sets: 2,
    reps: {
      'front squat': {
        data: [
          { value: 3, tally: 0 },
          { value: 3, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 50, tally: 0 },
      { value: 40, tally: 1 },
    ],
    checkmark: false,
    athleteId: '456',
    coachId: 'coachId',
    userName: 'john',
    measurement: 'kg',
    session: 'uuid',
    date: '2023-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'front squat',
    exerciseName2: ['front squat'],
    exerciseNameFinal: [{ value: 'front squat', tally: 0 }],
    sets: 2,
    reps: {
      'front squat': {
        data: [
          { value: 2, tally: 0 },
          { value: 3, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 20, tally: 0 },
      { value: 20, tally: 1 },
    ],
    checkmark: false,
    athleteId: '700',
    coachId: 'coachId',
    userName: 'sam',
    measurement: 'kg',
    session: 'uuid',
    date: '2024-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'clean',
    exerciseName2: ['clean'],
    exerciseNameFinal: [{ value: 'clean', tally: 0 }],
    complex: [{ exercise: 'snatch', tally: 1 }],
    sets: 2,
    reps: {
      clean: {
        data: [
          { value: 3, tally: 0 },
          { value: 3, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 70, tally: 0 },
      { value: 72, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 200, tally: 0 },
      { value: 205, tally: 1 },
    ],
    checkmark: false,
    athleteId: '700', // get actual id from coach1
    coachId: 'coachId', //
    userName: 'sam',
    measurement: 'kg',
    session: 'uuid',
    date: '2022-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'bench press',
    exerciseName2: ['bench press'],
    exerciseNameFinal: [{ value: 'bench press', tally: 0 }],
    sets: 2,
    reps: {
      'bench press': {
        data: [
          { value: 2, tally: 0 },
          { value: 2, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 80, tally: 0 },
      { value: 80, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 195, tally: 0 },
      { value: 215, tally: 1 },
    ],
    checkmark: false,
    athleteId: '600',
    coachId: 'coachId',
    userName: 'joe',
    measurement: 'kg',
    session: 'uuid',
    date: '2022-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'bench press',
    exerciseName2: ['bench press'],
    exerciseNameFinal: [{ value: 'bench press', tally: 0 }],
    sets: 2,
    reps: {
      'bench press': {
        data: [
          { value: 5, tally: 0 },
          { value: 5, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 75, tally: 0 },
      { value: 75, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 160, tally: 0 },
      { value: 180, tally: 1 },
    ],
    checkmark: false,
    athleteId: '456',
    coachId: 'coachId',
    userName: 'john',
    measurement: 'kg',
    session: 'uuid',
    date: '2021-04-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },

  {
    id: '1234',
    exerciseName: 'back squat',
    exerciseName2: ['back squat'],
    exerciseNameFinal: [{ value: 'back squat', tally: 0 }],
    sets: 2,
    reps: {
      'back squat': {
        data: [
          { value: 4, tally: 0 },
          { value: 4, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 70, tally: 0 },
      { value: 70, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 200, tally: 0 },
      { value: 100, tally: 1 },
    ],
    checkmark: false,
    athleteId: '456',
    coachId: 'coachId',
    userName: 'john',
    measurement: 'kg',
    session: 'uuid',
    date: '2021-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'back squat',
    exerciseName2: ['back squat'],
    exerciseNameFinal: [{ value: 'back squat', tally: 0 }],
    sets: 2,
    reps: {
      'back squat': {
        data: [
          { value: 4, tally: 0 },
          { value: 4, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 70, tally: 0 },
      { value: 70, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 120, tally: 0 },
      { value: 120, tally: 1 },
    ],
    checkmark: false,
    athleteId: '700',
    coachId: 'coachId',
    userName: 'sam',
    measurement: 'kg',
    session: 'uuid',
    date: '2021-04-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'back squat',
    exerciseName2: ['back squat'],
    exerciseNameFinal: [{ value: 'back squat', tally: 0 }],
    sets: 2,
    reps: {
      'back squat': {
        data: [
          { value: 3, tally: 0 },
          { value: 3, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 80, tally: 0 },
      { value: 80, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 220, tally: 0 },
      { value: 230, tally: 1 },
    ],
    checkmark: false,
    athleteId: '456',
    coachId: 'coachId',
    userName: 'john',
    measurement: 'kg',
    session: 'uuid',
    date: '2021-06-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'back squat',
    exerciseName2: ['back squat'],
    exerciseNameFinal: [{ value: 'back squat', tally: 0 }],
    sets: 2,
    reps: {
      'back squat': {
        data: [
          { value: 2, tally: 0 },
          { value: 2, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 80, tally: 0 },
      { value: 80, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 240, tally: 0 },
      { value: 245, tally: 1 },
    ],
    checkmark: false,
    athleteId: '456',
    coachId: 'coachId',
    userName: 'john',
    measurement: 'kg',
    session: 'uuid',
    date: '2021-08-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'back squat',
    exerciseName2: ['back squat'],
    exerciseNameFinal: [{ value: 'back squat', tally: 0 }],
    sets: 2,
    reps: {
      'back squat': {
        data: [
          { value: 4, tally: 0 },
          { value: 4, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 50, tally: 0 },
      { value: 50, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 160, tally: 0 },
      { value: 160, tally: 1 },
    ],
    checkmark: false,
    athleteId: '700',
    coachId: 'coachId',
    userName: 'sam',
    measurement: 'kg',
    session: 'uuid',
    date: '2021-10-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'power clean',
    exerciseName2: ['power clean'],
    exerciseNameFinal: [{ value: 'power clean', tally: 0 }],
    sets: 2,
    reps: {
      'power clean': {
        data: [
          { value: 3, tally: 0 },
          { value: 3, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 80, tally: 0 },
      { value: 80, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 205, tally: 0 },
      { value: 225, tally: 1 },
    ],
    checkmark: false,
    athleteId: '700',
    coachId: 'coachId',
    userName: 'sam',
    measurement: 'kg',
    session: 'uuid',
    date: '2022-08-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'power snatch',
    exerciseName2: ['power snatch'],
    exerciseNameFinal: [{ value: 'power snatch', tally: 0 }],
    sets: 2,
    reps: {
      'power snatch': {
        data: [
          { value: 4, tally: 0 },
          { value: 4, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 80, tally: 0 },
      { value: 80, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 150, tally: 0 },
      { value: 150, tally: 1 },
    ],
    checkmark: false,
    athleteId: '456',
    coachId: 'coachId',
    userName: 'john',
    measurement: 'kg',
    session: 'uuid',
    date: '2023-05-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'box jump',
    exerciseName2: ['box jump'],
    exerciseNameFinal: [{ value: 'box jump', tally: 0 }],
    sets: 2,
    reps: {
      'box jump': {
        data: [
          { value: 5, tally: 0 },
          { value: 5, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 0, tally: 0 },
      { value: 0, tally: 1 },
    ],
    checkmark: false,
    athleteId: '700',
    coachId: 'coachId',
    userName: 'sam',
    measurement: 'kg',
    session: 'uuid',
    date: '2021-10-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'push press',
    exerciseName2: ['push press'],
    exerciseNameFinal: [{ value: 'push press', tally: 0 }],
    sets: 2,
    reps: {
      'push press': {
        data: [
          { value: 4, tally: 0 },
          { value: 4, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 70, tally: 0 },
      { value: 70, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 90, tally: 0 },
      { value: 100, tally: 1 },
    ],
    checkmark: false,
    athleteId: '600',
    coachId: 'coachId',
    userName: 'joe',
    measurement: 'kg',
    session: 'uuid',
    date: '2021-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
  {
    id: '1234',
    exerciseName: 'push press',
    exerciseName2: ['push press'],
    exerciseNameFinal: [{ value: 'push press', tally: 0 }],
    sets: 2,
    reps: {
      'push press': {
        data: [
          { value: 4, tally: 0 },
          { value: 4, tally: 1 },
        ],
      },
    },
    groupNumber: 1,
    cellNumber: 1,
    effort: [
      { value: 60, tally: 0 },
      { value: 60, tally: 1 },
    ],
    effortOption: 'Percent (%)',
    coachNotes: 'Pause at Bottom',
    athleteNotes: '',
    results: [
      // TODO:  on date of creation, create template {value: '', tally: #} and so on!!! based on sets
      { value: 80, tally: 0 },
      { value: 90, tally: 1 },
    ],
    checkmark: false,
    athleteId: '600',
    coachId: 'coachId',
    userName: 'joe',
    measurement: 'kg',
    session: 'uuid',
    date: '2022-01-01T04:00:00.000Z', // '2021-01-01', '2021-10-20T00:19:50.773Z'
  },
];
