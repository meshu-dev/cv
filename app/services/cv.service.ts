import Cv from '../interfaces/cv.interface';
import ApiService from './api.service';

const getData = async (url: string): Promise<Cv> => {
  return await ApiService.sendRequest<Cv>(url);
};

const CvService = {
  getData
};

export default CvService;
