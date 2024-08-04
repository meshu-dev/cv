import ApiService from '@/services/api.service'
import { ApiResponse, CV } from '@/types';

const apiUrl: string = process.env.MESH_API_URL as string

const getData = async (): Promise<CV | null> => {
  const requestInit: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
  const cvUrl = `${apiUrl}/cv`

  const response = await ApiService.sendRequest<ApiResponse>(cvUrl, requestInit)
  return response.data as CV ?? null
}

const MeshApiService = {
  getData
}

export default MeshApiService
