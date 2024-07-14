

import Cv from '@/interfaces/cv.interface'
import ProfileSection from '@/components/Profile/ProfileSection'
import SkillSection from '@/components/Skill/SkillSection'
import WorkExperienceSection from '@/components/WorkExperience/WorkExperienceSection'

import { getCv } from '@/actions'

interface Props {
  cv: Cv | null
};

export async function getStaticProps() {
  let cv: Cv | null = null;

  try {
    cv = await getCv()
  } catch (e) {
    // Exception
    console.error(e)
  }

  return {
    props: {
      cv
    }
  }
};

export default (props: Props) => {
  const sectionElements: React.ReactElement[] = []

  if (props.cv?.profile) {
    sectionElements.push(
      <ProfileSection key="profile" profile={props.cv.profile} />
    );
  }

  if (props.cv?.skills) {
    sectionElements.push(
      <SkillSection key="skills" skillGroups={props.cv.skills} />
    );
  }

  if (props.cv?.workExperience) {
    sectionElements.push(
      <WorkExperienceSection key="workExperience" workExperiences={props.cv.workExperience} />
    );
  }

  return (
    <>
      {sectionElements}
    </>
  );
};

