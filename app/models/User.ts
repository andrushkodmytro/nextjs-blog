import { Schema, Document, model, models, Types } from 'mongoose';

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

export default models.User || model<IUserDocument>('User', UserSchema);
