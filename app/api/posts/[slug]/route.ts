import { NextResponse } from 'next/server';
import dbConnect from '@/configs/dbConnect';
import Post, { IPostDocument } from '@/app/models/Post';

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

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();

    // TODO add some validation
    await dbConnect();
    const { slug } = params;
    const post = await Post.findOne({ slug });

    for (let key in body) {
      post[key] = body[key];
    }

    await post.save();

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
