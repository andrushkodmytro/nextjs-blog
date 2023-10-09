import { Schema, Document, model, models, Types } from 'mongoose';

export interface ICategoryInit {
  title: string;
  img: string;
  categorySlug: string;
  bgColor: string;
}

export interface ICategoryDocument extends ICategoryInit, Document {
  _id: Types.ObjectId;
}

export interface ICategory extends ICategoryDocument {}

const CategorySchema = new Schema<ICategoryDocument>({
  title: {
    type: String,
    required: [true, 'title is required'],
    maxlength: [100, 'title specified cannot be more than 100 characters'],
  },
  img: {
    type: String,
    required: [true, 'img name is required'],
  },
  categorySlug: {
    type: String,
    required: [true, 'categorySlug is required'],
    maxlength: [
      100,
      'categorySlug specified cannot be more than 100 characters',
    ],
  },
  bgColor: {
    type: String,
    required: [true, 'bgColor name is required'],
  },
});

export default models.Category ||
  model<ICategoryDocument>('Category', CategorySchema);
