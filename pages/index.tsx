import ProfileSection from '../app/components/Profile/ProfileSection';
import SkillSection from '../app/components/Skill/SkillSection';
import WorkExperienceSection from '../app/components/WorkExperience/WorkExperienceSection';

import Profile from '../app/interfaces/profile.interface';
import ProfileIcon from '../app/interfaces/profile-icon.interface';

export async function getStaticProps() {
  console.log('TEST 1');
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

  //const res = await fetch('https://.../posts');
  //const posts = await res.json();
 
  console.log('TEST 2', profile);

  return {
    props: {
      profile
    }
  }
};

export interface Props {
  profile: Profile
};

export default function Home(props: Props) {

  if (props.profile) {
    console.log('TEST 3', props.profile);

    return (
      <>
        <ProfileSection profile={ props.profile } />
        <SkillSection />
        <WorkExperienceSection />
      </>
    )
  }
  return null;
};

