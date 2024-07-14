const sendRequest = async <TypedResponse>(url: string, config?: RequestInit): Promise<TypedResponse> => {
  const response = await fetch(url, config);
  //const data = await response.json()

  //console.log('sendRequest', url, data);

  return await response.json();
}

const ApiService = {
  sendRequest
};

export default ApiService;
