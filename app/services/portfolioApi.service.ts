import ApiService from '@/services/api.service'
import { ApiResponse, Auth, ContactResponse, CV } from '@/types'

const login = async (email: string, password: string): Promise<Auth | null> => {
  const apiUrl: string = process.env.NEXT_PUBLIC_PORTFOLIO_API_URL as string
  const requestInit: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }
  const loginUrl = `${apiUrl}/auth/login`

  const response = await ApiService.sendRequest<ApiResponse<Auth>>(loginUrl, requestInit)
  return response.data ?? null
}

const getData = async (token: string): Promise<CV | null> => {
  const apiUrl: string = process.env.NEXT_PUBLIC_PORTFOLIO_API_URL as string
  const requestInit: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const cvUrl = `${apiUrl}/cv`

  const response = await ApiService.sendRequest<ApiResponse<CV>>(cvUrl, requestInit)
  return response.data ?? null
}

const sendMessage = async (
  token: string,
  name: string,
  email: string,
  message: string
): Promise<ContactResponse> => {
  const apiUrl: string = process.env.NEXT_PUBLIC_PORTFOLIO_API_URL as string
  const requestInit: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ token, name, email, message }),
  }
  const contactUrl = `${apiUrl}/contact`
  return await ApiService.sendRequest<ContactResponse>(contactUrl, requestInit)
}

const PortfolioApiService = {
  login,
  getData,
  sendMessage,
}

export default PortfolioApiService
