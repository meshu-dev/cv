import ApiService from '@/services/api.service'
import { ApiResponse, Auth, CV } from '@/types';

const apiUrl: string = process.env.NEXT_PUBLIC_PORTFOLIO_API_URL as string

const login = async (email: string, password: string): Promise<Auth | null> => {
  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    })
  }
  const loginUrl = `${apiUrl}/auth/login`

  const response = await ApiService.sendRequest<ApiResponse>(loginUrl, requestInit)
  return response.data as Auth ?? null
}

const getData = async (token: string): Promise<CV | null> => {
  const requestInit: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`, 
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
      "Accept": "application/json",
    },
    body: JSON.stringify({ token, name, email, message })
  }
  const contactUrl = `${apiUrl}/contact`
  return await ApiService.sendRequest<any>(contactUrl, requestInit)
}

const PortfolioApiService = {
  login,
  getData,
  sendMessage
}

export default PortfolioApiService
