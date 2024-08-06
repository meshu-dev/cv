import ApiService from '@/services/api.service'
import { ApiResponse, CV } from '@/types';

const apiUrl: string = process.env.NEXT_PUBLIC_MESH_API_URL as string

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

const sendMessage = async (
  token: string,
  name: string,
  email: string,
  message: string
): Promise<any> => {
  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, name, email, message })
  }
  const contactUrl = `${apiUrl}/contact`
  return await ApiService.sendRequest<any>(contactUrl, requestInit)
}

const MeshApiService = {
  getData,
  sendMessage
}

export default MeshApiService
