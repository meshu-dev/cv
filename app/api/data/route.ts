import { NextResponse } from 'next/server';
import MongoApiService from '../../services/mongoApi.service';

export async function GET() {
  const url: string        = process.env.MONGODB_URL as string;
  const token: string      = process.env.MONGODB_TOKEN as string;
  const database: string   = process.env.MONGODB_DATABASE as string;
  const collection: string = process.env.MONGODB_COLLECTION as string;
  const dataSource: string = process.env.MONGODB_DATA_SOURCE as string;

  const cvData = await MongoApiService.getData(url, token, database, collection, dataSource);

  return NextResponse.json(cvData);
}
