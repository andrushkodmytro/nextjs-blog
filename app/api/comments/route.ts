import { NextResponse } from 'next/server';
import dbConnect from '@/configs/dbConnect';
import Comment, { ICommentDocument } from '@/app/models/Comment';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const postSlug: string = searchParams.get('postSlug')!;

  try {
    await dbConnect();

    const comments: ICommentDocument[] = await Comment.find({
      postSlug,
    }).populate({
      path: 'author',
      model: 'User',
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await dbConnect();

    let comment: ICommentDocument = await Comment.create(body).then((c) =>
      c.populate({
        path: 'author',
        model: 'User',
      })
    );

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error(error);
  }
}
