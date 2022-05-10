import mongoose from 'mongoose';
import { ExerciseStatus } from '@olyup/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export { ExerciseStatus };

interface ExerciseAttrs {
  id: string;
  exerciseName: string; // might be the only attr we need here // quality of life props should be here!
  exerciseName2?: [string];
  exerciseNameFinal?: [{ value: string; tally: number }];
  sets?: number;
  effort?: [{ value: number; tally: number }];
  effortOption?: string;
  effortAggregation?: number;
  athleteId?: string;
  coachId?: string;
  userName?: string;
  session?: string;
  date?: Date;
  cellNumber?: number;
  groupNumber?: number;
  coachNotes?: string;
  athleteNotes?: string;
  measurement?: string; // coaches measurement
  reps?: Map<string, object>;
  range?: boolean;
  effortRange?: [{ min: number; max: number; tally: number }];
  results?: [{ value: number; tally: number; metric: number }];
}

export interface ExerciseDoc extends mongoose.Document {
  exerciseName: string;
  exerciseName2?: [string];
  exerciseNameFinal?: [{ value: string; tally: number }];
  sets?: number;
  cellNumber?: number;
  groupNumber?: number;
  effort?: [{ value: number; tally: number }];
  effortOption: string;
  effortAggregation: number;
  coachNotes?: string;
  athleteNotes?: string;
  date?: Date;
  results?: [{ value: number; tally: number; metric: number }];
  version?: number;
  athleteId?: string;
  coachId?: string;
  userName?: string;
  session?: string;
  measurement?: string;
  reps?: Map<string, object>;
  range?: boolean;
  effortRange?: [{ min: number; max: number; tally: number }];
  coachInfo?: object;
}

interface ExerciseModel extends mongoose.Model<ExerciseDoc> {
  build(attrs: ExerciseAttrs): ExerciseDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<ExerciseDoc | null>;
}
// Need to implement a findByEvent method

const ExerciseSchema = new mongoose.Schema(
  {
    groupNumber: {
      type: Number,
      required: true,
    },
    cellNumber: {
      type: Number,
      required: true,
    },
    exerciseName: {
      type: String,
      required: true,
    },
    exerciseName2: [
      {
        type: String,
      },
    ],
    exerciseNameFinal: [{ value: { type: String }, tally: { type: Number } }],
    sets: {
      type: Number,
    },
    effort: [{ value: { type: Number }, tally: { type: Number } }],
    effortOption: {
      type: String,
    },
    effortAggregation: {
      type: Number,
    },
    coachNotes: {
      type: String,
    },
    athleteNotes: {
      type: String,
    },
    date: {
      type: mongoose.Schema.Types.Date,
    },
    athleteId: {
      type: String,
    },
    coachId: {
      type: String,
    },
    userName: {
      type: String,
    },
    measurement: {
      type: String,
    },
    session: {
      type: String,
    },
    results: [
      {
        value: { type: Number },
        tally: { type: Number },
        metric: { type: Number },
      },
    ],
    reps: {
      type: Map,
      of: {
        data: [{ value: { type: Number }, tally: { type: Number } }],
      },
    },
    range: {
      type: Boolean,
    },
    effortRange: [
      { min: { type: Number }, max: { type: Number }, tally: { type: Number } },
    ],
    coachInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Athletic',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ExerciseSchema.set('versionKey', 'version');
ExerciseSchema.plugin(updateIfCurrentPlugin);

ExerciseSchema.statics.build = (attrs: ExerciseAttrs) => {
  return new Exercise({
    _id: attrs.id,
    exerciseName: attrs.exerciseName,
    exerciseName2: attrs.exerciseName2,
    exerciseNameFinal: attrs.exerciseNameFinal,
    sets: attrs.sets,
    reps: attrs.reps,
    effort: attrs.effort,
    effortOption: attrs.effortOption,
    effortAggregation: attrs.effortAggregation,
    athleteId: attrs.athleteId,
    coachId: attrs.coachId,
    userName: attrs.userName,
    session: attrs.session,
    date: attrs.date,
    groupNumber: attrs.groupNumber,
    cellNumber: attrs.cellNumber,
    coachNotes: attrs.coachNotes,
    athleteNotes: attrs.athleteNotes,
    measurement: attrs.measurement,
    range: attrs.range,
    effortRange: attrs.effortRange,
    results: attrs.results,
  });
};

ExerciseSchema.statics.findByEvent = (event: {
  id: string;
  version: number;
}) => {
  return Exercise.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

const Exercise = mongoose.model<ExerciseDoc, ExerciseModel>(
  'Exercise',
  ExerciseSchema
);

export { Exercise };
