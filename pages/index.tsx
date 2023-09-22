import Cv from '../app/interfaces/cv.interface';
import CvService from '../app/services/cv.service';
import ProfileSection from '../app/components/Profile/ProfileSection';
import SkillSection from '../app/components/Skill/SkillSection';
import WorkExperienceSection from '../app/components/WorkExperience/WorkExperienceSection';

interface Props {
  cv: Cv
};

export async function getStaticProps() {
  const cv: Cv = await CvService.getData(`${process.env.API_URL}/cv`);

  return {
    props: {
      cv
    }
  }
};

export default (props: Props) => {
  const sectionElements: React.ReactElement[] = [];

  if (props.cv.profile) {
    sectionElements.push(
      <ProfileSection profile={ props.cv.profile } />
    );
  }

  if (props.cv.skills) {
    sectionElements.push(
      <SkillSection skillGroups={ props.cv.skills } />
    );
  }

  if (props.cv.workExperience) {
    sectionElements.push(
      <WorkExperienceSection workExperiences={ props.cv.workExperience } />
    );
  }

  return (
    <>
      { sectionElements }
    </>
  );
};

