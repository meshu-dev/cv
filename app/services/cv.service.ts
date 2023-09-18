import Profile from '../interfaces/profile.interface';
import ProfileIcon from '../interfaces/profile-icon.interface';
import SkillGroup from '../interfaces/skill-group.interface';
import Skill from '../interfaces/skill.interface';
import WorkExperienceTask from '../interfaces/work-experience-task.interface';
import WorkExperience from '../interfaces/work-experience.interface';

const getProfile = (): Profile => {
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

const getSkillGroups = (): SkillGroup[] => {
  const skills: Skill[] = [
    { name: 'PHP' },
    { name: 'PHP' },
    { name: 'PHP' },
    { name: 'PHP' }
  ];
  
  const skillGroups: SkillGroup[] = [
    { title: 'Backend', list: skills },
    { title: 'Frontend', list: skills },
    { title: 'Frameworks', list: skills },
    { title: 'Other', list: skills }
  ];
  
  return skillGroups;
};

const getWorkExperiences = (): WorkExperience[] => {
  const tasks: WorkExperienceTask[] = [
    { text: 'Majority of work has been on the seat planner app built in a custom PHP framework.' },
    { text: 'Worked on a laravel REST API to centralise school data.' },
    { text: 'Developed Angular frontend school apps which interact with API.' },
    { text: 'Built an Android / iOS homework web app using Ionic framework.' },
    { text: 'Recently switched to Java as school payment apps are built with it.' }
  ]
  
  const entries: WorkExperience[] = [
    {
      title: 'Software Developer - Tucasi',
      description: 'Currently working on school payment apps, previously worked on a seat planner app.',
      location: 'Eastleigh',
      date: 'Nov 20 – Present',
      tasks: tasks
    }
  ];
  
  return entries;
};

const CvService = {
  getProfile,
  getSkillGroups,
  getWorkExperiences
};

export default CvService;
