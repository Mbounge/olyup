import mongoose, { model, Schema } from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the
// props to create a new user
interface UserAttrs {
  email: string;
  password: string;
  userType: string;
  firstName: string;
  lastName: string;
}

// An interface that describes the props/methods
// that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the props
// that a User document has
// could have first name and last name - for analytics purposes
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  userType: string;
  firstName: string;
  lastName: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      // things we don't want to be sent back to the client
      // don't want some of these to be exposed to the frontend and remap _id to id
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// used the function keyword so that the this prop
// which contains the context of the user, is not overwritten
// with the context of this file

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  console.log('done!!!!!');
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  // custom function
  return new User(attrs);
};

const User = model<UserDoc, UserModel>('User', userSchema);

export { User, userSchema };
