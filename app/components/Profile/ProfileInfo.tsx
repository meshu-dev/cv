import ProfileIcon from './ProfileIcon';

const ProfileInfo = () => {
  return (
    <div id="profile-info">
      <h1>Harmesh Uppal</h1>
      <p>
        Full-stack developer with over 12 years experience in PHP and
        JavaScript
      </p>
      <p><span>Location:&nbsp;</span>West Bromwich, UK</p>
      <div id="profile-links">
        <ProfileIcon
          url="https://github.com/meshu-dev"
          title="Github"
          imgUrl="/assets/images/github-icon.png" />
        <ProfileIcon
          url="https://www.linkedin.com/in/harmeshuppal"
          title="LinkedIn"
          imgUrl="/assets/images/linkedin-icon.png" />
        <ProfileIcon
          url="https://portfolio.meshu.app"
          title="Portfolio"
          imgUrl="/assets/images/site-icon.png" />
      </div>
    </div>
  );
};

export default ProfileInfo;
