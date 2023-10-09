import { NextResponse } from 'next/server';
import dbConnect from '@/configs/dbConnect';
import User from '@/app/models/User';

// export async function GET() {
//   await dbConnect();

//   const user = await User.find({});

//   return NextResponse.json({ user });
// }

export async function POST() {
  await dbConnect();

  const user = await User.create({
    firstName: 'Dima',
    lastName: 'Andrushko',
    email: 'email@email.com',
    password: '12345678',
  });

  return NextResponse.json({ user });
}
