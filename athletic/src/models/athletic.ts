import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { ExerciseDoc } from './exercise';

interface AthleticAttrs {
  discipline: string;
  position?: string;
  height?: number;
  weight?: number;
  DOB?: Date;
  type?: string;
  sex?: string;
  userName?: string;
}

interface AthleticDoc extends mongoose.Document {
  discipline: string;
  type: string; // Coach or Athlete
  position: string;
  userId: string;
  height: number;
  weight: number;
  DOB: Date;
  sex: string;
  version: number;
  exercises?: [ExerciseDoc];
  rosterInd?: [AthleticDoc]; // individual athletic profiles - subscribed athletes
  rosterTeam?: [{ team: string; athletes: [AthleticDoc] }];
  rosterSearch?: [AthleticDoc];
  userName: string;
}

interface AthleticModel extends mongoose.Model<AthleticDoc> {
  build(attrs: AthleticAttrs): AthleticDoc;
}

const AthleticSchema = new mongoose.Schema(
  {
    discipline: {
      type: String,
      required: true,
    },
    type: {
      // can get within the jwt - Coach or Athlete
      type: String,
    },
    userId: {
      type: String,
    },
    position: {
      type: String,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    DOB: {
      type: mongoose.Schema.Types.Date,
    },
    sex: {
      type: String,
    },
    rosterInd: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athletic',
      },
    ],
    rosterSearch: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athletic',
      },
    ],
    rosterTeam: [
      {
        team: {
          type: String,
        },
        athletes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Athletic',
          },
        ],
      },
    ],
    exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
      },
    ],
    userName: {
      type: String,
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

AthleticSchema.set('versionKey', 'version');
AthleticSchema.plugin(updateIfCurrentPlugin);

AthleticSchema.statics.build = (attrs: AthleticAttrs) => {
  return new Athletic(attrs);
};

const Athletic = mongoose.model<AthleticDoc, AthleticModel>(
  'Athletic',
  AthleticSchema
);

export { Athletic };
