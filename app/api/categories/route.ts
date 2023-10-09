import { NextResponse } from 'next/server';
import dbConnect from '@/configs/dbConnect';
import Category, { ICategoryDocument } from '@/app/models/Category';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const categories: ICategoryDocument[] = await Category.find();

    return NextResponse.json({ categories }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
