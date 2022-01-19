import mongoose from 'mongoose';
import { ExerciseStatus } from '@olyup/common';
import { AthleticDoc } from './athletic';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export { ExerciseStatus };

interface ExerciseAttrs {
  exerciseName: string; // might be the only attr we need here // quality of life props should be here!
  complex?: [{ exercise: string; tally: number }];
  sets?: number;
  reps?: [{ value: number; tally: number }];
  effort?: [{ value: number; tally: number }];
  effortOption?: string;
  effortAggregation?: number;
  athleteId?: string;
  coachId?: string;
  userName?: string;
  session?: string;
  date?: Date;
  checkmark?: boolean;
  cellNumber?: number;
  groupNumber?: number;
  notes?: [string];
}

interface ExerciseDoc extends mongoose.Document {
  exerciseName: string;
  complex?: [{ exercise: string; tally: number }];
  sets?: number;
  reps?: [{ value: number; tally: number }];
  cellNumber?: number;
  groupNumber?: number;
  effort?: [{ value: number; tally: number }];
  effortOption?: string;
  effortAggregation?: number;
  athleteId?: string;
  coachId?: string;
  session?: string;
  userName?: string;
  notes?: [string];
  date?: Date;
  results?: [{ value: number; tally: number }];
  checkmark?: boolean;
  version: number;
}

interface ExerciseModel extends mongoose.Model<ExerciseDoc> {
  build(attrs: ExerciseAttrs): ExerciseDoc;
}

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
    complex: [{ exercise: { type: String }, tally: { type: Number } }],
    sets: {
      type: Number,
    },
    reps: [{ value: { type: Number }, tally: { type: Number } }],
    effort: [{ value: { type: Number }, tally: { type: Number } }],
    effortOption: {
      type: String,
    },
    effortAggregation: {
      type: Number,
    },
    notes: [
      {
        type: String,
      },
    ],
    date: {
      type: mongoose.Schema.Types.Date,
    },
    checkmark: {
      type: Boolean,
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
    session: {
      type: String,
    },
    results: [{ value: { type: Number }, tally: { type: Number } }],
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
  return new Exercise(attrs);
};

const Exercise = mongoose.model<ExerciseDoc, ExerciseModel>(
  'Exercise',
  ExerciseSchema
);

export { Exercise };
