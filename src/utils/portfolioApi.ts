import { sendRequest } from '@/utils/request'
import type { ApiResponse, Auth, ContactResponse, CV } from '@/types'

export const login = async (
  email: string,
  password: string,
): Promise<Auth | null> => {
  const apiUrl: string = import.meta.env.PUBLIC_PORTFOLIO_API_URL as string
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

  const response = await sendRequest<ApiResponse<Auth>>(loginUrl, requestInit)
  return response.data ?? null
}

export const getData = async (token: string): Promise<CV | null> => {
  const apiUrl: string = import.meta.env.PUBLIC_PORTFOLIO_API_URL as string
  const requestInit: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const cvUrl = `${apiUrl}/cv`

  const response = await sendRequest<ApiResponse<CV>>(cvUrl, requestInit)
  return response.data ?? null
}

export const sendMessage = async (
  token: string,
  name: string,
  email: string,
  message: string,
): Promise<ContactResponse> => {
  const apiUrl: string = import.meta.env.PUBLIC_PORTFOLIO_API_URL as string
  const requestInit: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ token, name, email, message }),
  }
  const contactUrl = `${apiUrl}/contact`
  return await sendRequest<ContactResponse>(contactUrl, requestInit)
}
