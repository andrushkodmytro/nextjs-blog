import { NextResponse } from 'next/server';
import dbConnect from '@/configs/dbConnect';
import Post from '@/app/models/Post';
import slug from 'slug';
import { addPostScheme } from './validation';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    body.slug = slug(body.title || '');

    const validatedData = await addPostScheme.validate(body, {
      stripUnknown: true,
      abortEarly: false,
    });

    await dbConnect();
    const post = await Post.create(validatedData);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
  }
}
