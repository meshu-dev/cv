import Cv from '../interfaces/cv.interface'
import ApiService from './api.service'
import makeCv from '../factories/cv.factory'

const getData = async (url: string): Promise<any> => {
  const result = await ApiService.sendRequest<any>(url);
  return makeCv(result);
};

const CvService = {
  getData
};

export default CvService;
