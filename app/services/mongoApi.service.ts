import ApiService from './api.service';

const getData = async (
  url: string,
  token: string,
  database: string,
  collection: string,
  dataSource: string
): Promise<any> => {
  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": token
    },
    body: JSON.stringify({ database, collection, dataSource })
  };
  const response = await ApiService.sendRequest<any>(url, requestInit);

  console.log('MongoDB Data API', response);

  return response['document'] ?? null;
};

const MongoApiService = {
  getData
};

export default MongoApiService;
