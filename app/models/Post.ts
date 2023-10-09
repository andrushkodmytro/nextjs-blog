import { Schema, Document, model, models, Types } from 'mongoose';
import { IUser } from './User';
import { ICategory } from './Category';

export interface IPostInit {
  title: string;
  body: string;
  slug: string;
  author: Types.ObjectId;
  img: string;
  categoryId: Types.ObjectId;
}
export interface IPostDocument extends IPostInit, Document {
  _id: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface IPost extends Omit<IPostDocument, 'author' | 'categoryId'> {
  author: IUser;
  categoryId: ICategory;
}

const PostSchema = new Schema<IPostDocument>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      maxlength: [100, 'title cannot be more than 100 characters'],
    },
    body: {
      type: String,
      required: [true, 'body is required'],
    },
    slug: {
      type: String,
      required: [true, 'slug is required'],
      maxlength: [100, 'slug cannot be more than 100 characters'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'author is required'],
    },
    img: {
      type: String,
      required: [true, 'img is required'],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'categoryId is required'],
    },
  },
  { timestamps: true }
);

export default models.Post || model<IPostDocument>('Post', PostSchema);
