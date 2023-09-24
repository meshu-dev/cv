import ProfileIconView from './ProfileIconView';
import Profile from '../../interfaces/profile.interface';

interface Props {
  profile: Profile
};

const ProfileSection: React.FC<Props> = ({ profile }) => {
  if (!profile) {
    return null;
  }

  const iconElements: React.ReactElement[] = [];

  if (profile.icons) {
    for (const profileIcon of profile.icons) {
      iconElements.push(
        <ProfileIconView key={ profileIcon.title } profileIcon={ profileIcon } />
      );
    }
  }

  return (
    <section id="profile">
      <div id="profile-info">
        <h1>{ profile.name }</h1>
        <p>{ profile.description }</p>
        <p><span>Location:&nbsp;</span>{ profile.location }</p>
        <div id="profile-links">
          { iconElements }
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
