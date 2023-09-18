import Profile from '../interfaces/profile.interface';
import ProfileIcon from '../interfaces/profile-icon.interface';

const make = (): Profile => {
  const profileIcons: ProfileIcon[] = [
    { url: 'https://github.com/meshu-dev', title: 'Github', imageUrl: '/images/github-icon.png' },
    { url: 'https://www.linkedin.com/in/harmeshuppal', title: 'LinkedIn', imageUrl: '/images/linkedin-icon.png' },
    { url: 'https://portfolio.meshu.app', title: 'Portfolio', imageUrl: '/images/site-icon.png' }
  ];
  
  const profile: Profile = {
    name: 'Harmesh Uppal',
    description: 'Full-stack developer with over 12 years experience in PHP and JavaScript',
    location: 'West Bromwich, UK',
    icons: profileIcons
  };

  return profile;
};

const get = (id: any) => {
  return http.get<ITutorialData>(`/tutorials/${id}`);
};

const create = (data: ITutorialData) => {
  return http.post<ITutorialData>("/tutorials", data);
};

const update = (id: any, data: ITutorialData) => {
  return http.put<any>(`/tutorials/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/tutorials`);
};

const findByTitle = (title: string) => {
  return http.get<Array<ITutorialData>>(`/tutorials?title=${title}`);
};

const CvService = {
  getAll
};

export default CvService;
