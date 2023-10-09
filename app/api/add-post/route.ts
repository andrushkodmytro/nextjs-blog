import { NextResponse } from 'next/server';
import dbConnect from '@/configs/dbConnect';
import Post from '@/app/models/Post';
import slug from 'slug';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // TODO add some validation
    await dbConnect();
    body.slug = slug(body.title);
    const post = await Post.create(body);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
  }
}
