import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Exercise, ExerciseStatus } from './exercise';

interface AthleticAttrs {
  id: string;
  discipline: string;
  type: string;
  userId: string;
  version?: number;
  userName?: string;
}

export interface AthleticDoc extends mongoose.Document {
  discipline: string;
  type: string;
  userId: string;
  version: number;
  userName: string;
}

interface AthleticModel extends mongoose.Model<AthleticDoc> {
  build(attrs: AthleticAttrs): AthleticDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<AthleticDoc | null>;
}

const AthleticSchema = new mongoose.Schema(
  {
    discipline: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
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

// because _id!
AthleticSchema.statics.build = (attrs: AthleticAttrs) => {
  return new Athletic({
    _id: attrs.id,
    discipline: attrs.discipline,
    type: attrs.type,
    userId: attrs.userId,
    userName: attrs.userName,
  });
};

AthleticSchema.statics.findByEvent = (event: {
  id: string;
  version: number;
}) => {
  return Athletic.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

const Athletic = mongoose.model<AthleticDoc, AthleticModel>(
  'Athletic',
  AthleticSchema
);

export { Athletic };
