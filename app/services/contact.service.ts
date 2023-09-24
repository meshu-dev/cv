import Cv from '../interfaces/cv.interface';
import ApiService from './api.service';

const sendMessage = async (
  url: string,
  name: string,
  email: string,
  message: string
): Promise<any> => {
  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  };
  return await ApiService.sendRequest<any>(url, requestInit);
};

const ContactService = {
  sendMessage
};

export default ContactService;
