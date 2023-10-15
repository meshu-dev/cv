export async function GET() {
  const data = { foo: 'bar' };
  return Response.json({ data })
}
