import { NextResponse } from 'next/server'
import MeshApiService from '@/services/meshApi.service'

export async function GET() {
  const url: string = process.env.MESH_API_URL as string
  const cvData = await MeshApiService.getData(url)

  return NextResponse.json(cvData)
}
