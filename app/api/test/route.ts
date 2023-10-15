import { NextResponse } from 'next/server';

export async function GET() {
  const data = { foo: 'bar' };
  return NextResponse.json({ data })
}
