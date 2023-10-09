import { NextResponse } from 'next/server';
import dbConnect from '@/configs/dbConnect';
import Post from '@/app/models/Post';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    await dbConnect();
    const post = await Post.findOne({ slug }).populate([
      {
        path: 'author',
        model: 'User',
      },
      {
        path: 'categoryId',
        model: 'Category',
      },
    ]);

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
  }
}
