const sendRequest = async <TypedResponse>(url: string, config?: RequestInit): Promise<TypedResponse> => {
  const response = await fetch(url, config)
  const data = await response.json()

  if (!response.ok) {
    const message = typeof data?.message === 'string'
      ? data.message
      : `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return data as TypedResponse
}

const ApiService = {
  sendRequest
}

export default ApiService
