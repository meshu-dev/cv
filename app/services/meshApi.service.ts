import ApiService from '@/services/api.service'

const apiUrl: string = process.env.MESH_API_URL as string

const getData = async (
  url: string
): Promise<any> => {
  const requestInit: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*"
    }
  }
  const cvUrl = `${apiUrl}/cv`
  const response = await ApiService.sendRequest<any>(cvUrl, requestInit)

  return response['document'] ?? null
};

const MeshApiService = {
  getData
}

export default MeshApiService
