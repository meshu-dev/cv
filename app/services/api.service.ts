const sendRequest = async <TypedResponse>(url: string, config?: RequestInit): Promise<TypedResponse> => {
  const response = await fetch(url, config);

  console.log('sendRequest', url, response);

  return await response.json();
}

const ApiService = {
  sendRequest
};

export default ApiService;
