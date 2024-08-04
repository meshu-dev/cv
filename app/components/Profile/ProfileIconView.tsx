import { ProfileSite } from '@/types'

type Props = {
  profileSite: ProfileSite
}

const ProfileIconView = ({ profileSite }: Props) => {
  return (
    <a href={profileSite.url} target="_blank" title={profileSite.name}>
      <img src={profileSite.image} />
    </a>
  );
};

export default ProfileIconView
