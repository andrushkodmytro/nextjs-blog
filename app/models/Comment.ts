import { Schema, Document, model, models } from 'mongoose';
import { IUser } from './User';

export interface ICommentInit {
  author: Schema.Types.ObjectId;
  body: string;
  postSlug: string;
}

export interface ICommentDocument extends ICommentInit, Document {
  _id: Schema.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface IComment extends Omit<ICommentDocument, 'author'> {
  author: IUser;
}

const CommentSchema = new Schema<ICommentDocument>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'author is required'],
    },
    body: {
      type: String,
      required: [true, 'body is required'],
      minlength: [1, 'body specified cannot be less than 1 character'],
      maxlength: [500, 'body specified cannot be more than 500 character'],
    },
    postSlug: {
      type: String,
      require: [true, 'postSlug is required'],
    },
  },
  { timestamps: true }
);

export default models.Comment ||
  model<ICommentDocument>('Comment', CommentSchema);
