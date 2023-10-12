import ProfileIcon from './profile-icon.interface';

export default interface Profile {
  name: string;
  description: string;
  location: string;
  icons: ProfileIcon[]
}
