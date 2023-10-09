import { NextResponse } from 'next/server';
import dbConnect from '@/configs/dbConnect';
import Post from '@/app/models/Post';
import Category from '@/app/models/Category';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get('categorySlug');
  const page = searchParams.get('page') || 1;
  const limit = 4;

  const obj: any = {};

  try {
    await dbConnect();

    if (categorySlug) {
      const category = await Category.findOne({ categorySlug });
      obj.categoryId = category._id;
    }

    const posts = await Post.find(obj)
      .populate([
        { path: 'categoryId', model: 'Category' },
        { path: 'author', model: 'User' },
      ])
      .limit(limit)
      .skip((+page - 1) * limit)
      .exec();

    const total = await Post.countDocuments(obj);

    return NextResponse.json({ posts, total });
  } catch (error) {
    console.error(error);
  }
}
