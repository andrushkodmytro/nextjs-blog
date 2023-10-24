import bcrypt from 'bcrypt';
import { Schema, Document, model, models, Types, Model, } from 'mongoose';

export interface IUserInit {
  firstName: string;
  lastName: string;
  img?: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUserInit, Document {
  _id: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface IUser extends IUserDocument {}

interface IUserModel extends Model<IUserDocument> {
  findByCredentials(email: string, password: string): any;
}

const UserSchema = new Schema<IUserDocument>(
  {
    firstName: {
      type: String,
      required: [true, 'firstName is required'],
      maxlength: [40, 'firstName cannot be more than 40 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'lastName is required'],
      maxlength: [40, 'lastName cannot be more than 60 characters'],
    },
    img: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'email is required'],
      maxlength: [40, 'email cannot be more than 40 characters'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      maxlength: [40, 'password cannot be more than 40 characters'],
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await models.User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

export default (models.User as IUserModel) ||
  model<IUserDocument, IUserModel>('User', UserSchema);
