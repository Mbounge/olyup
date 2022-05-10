import mongoose, { plugin } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface AthleticAttrs {
  id: string;
  userId: string;
  version: number;
  userName: string;
}

interface AthleticDoc extends mongoose.Document {
  version: number;
  userId: string;
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
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
      },
    },
  }
);

AthleticSchema.set('versionKey', 'version');
AthleticSchema.plugin(updateIfCurrentPlugin);

AthleticSchema.statics.build = (attrs: AthleticAttrs) => {
  return new Athletic({
    _id: attrs.id,
    version: attrs.version,
    userId: attrs.userId,
    userName: attrs.userName,
  });
};

AthleticSchema.statics.findByEvent = (event: {
  id: string;
  version: number;
}) => {
  if (event.version === 0) {
    console.log('version is 0');
    return Athletic.findOne({
      _id: event.id,
    });
  } else if (event.version > 0) {
    console.log('version is 1');
    console.log(event);
    return Athletic.findOne({
      _id: event.id,
      version: event.version - 1,
    });
  }
};

const Athletic = mongoose.model<AthleticDoc, AthleticModel>(
  'Athletic',
  AthleticSchema
);

export { Athletic };
