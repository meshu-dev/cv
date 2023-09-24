import ProfileIcon from '../../interfaces/profile-icon.interface';

interface Props {
  profileIcon: ProfileIcon
};

const ProfileIconView: React.FC<Props> = ({ profileIcon }) => {
  return (
    <a href={ profileIcon.url } target="_blank" title={ profileIcon.title }>
      <img src={ profileIcon.imageUrl } />
    </a>
  );
};

export default ProfileIconView;
