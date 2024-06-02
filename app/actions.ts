import CvService from '@/app/services/cv.service';

export const getCv = async () => {
  return await CvService.getData('http://localhost:8000/api/cv')
}