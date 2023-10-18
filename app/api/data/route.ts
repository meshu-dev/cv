import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongoDb';

export async function GET() {
  const client: any = await clientPromise;

  const db = client.db(process.env.MONGODB_COLLECTION);
  const data = await db.collection('cvs').findOne();

  return NextResponse.json(data);
}
