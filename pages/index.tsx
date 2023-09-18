import ProfileSection from '../app/components/Profile/ProfileSection';
import SkillSection from '../app/components/Skill/SkillSection';
import WorkExperienceSection from '../app/components/WorkExperience/WorkExperienceSection';
import Profile from '../app/interfaces/profile.interface';
import SkillGroup from '../app/interfaces/skill-group.interface';
import WorkExperience from '../app/interfaces/work-experience.interface';
import CvService from '../app/services/cv.service';

export async function getStaticProps() {
  return {
    props: {
      profile: CvService.getProfile(),
      skillGroups: CvService.getSkillGroups(),
      workExperienceEntries: CvService.getWorkExperiences()
    }
  }
};

export interface Props {
  profile: Profile,
  skillGroups: SkillGroup[]
  workExperienceEntries: WorkExperience[]
};

export default (props: Props) => {

  const sectionElements: React.ReactElement[] = [];

  if (props.profile) {
    sectionElements.push(
      <ProfileSection profile={ props.profile } />
    );
  }

  if (props.skillGroups) {
    sectionElements.push(
      <SkillSection skillGroups={ props.skillGroups } />
    );
  }

  if (props.workExperienceEntries) {
    sectionElements.push(
      <WorkExperienceSection workExperiences={ props.workExperienceEntries } />
    );
  }

  return (
    <>
      { sectionElements }
    </>
  );
};

