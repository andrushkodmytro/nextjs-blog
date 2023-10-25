import { NextResponse } from 'next/server';
import dbConnect from '@/configs/dbConnect';
import User from '@/app/models/User';

// export async function GET() {
//   await dbConnect();

//   const user = await User.find({});

//   return NextResponse.json({ user });
// }

export async function POST(req: Request) {
  const body = await req.json();
  await dbConnect();

  const user = await User.create(body);

  return NextResponse.json(user, { status: 201 });
}
