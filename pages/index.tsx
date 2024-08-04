

import Header from '@/components/Layout/Header'
import ProfileSection from '@/components/Profile/ProfileSection'
import SkillSection from '@/components/Skill/SkillSection'
import WorkExperienceSection from '@/components/WorkExperience/WorkExperienceSection'
import MeshApiService from '@/services/meshApi.service'
import { CV } from '@/types'

type Props = {
  cv: CV | null
}

export async function getStaticProps() {
  let cv: CV | null = null

  try {
    cv = await MeshApiService.getData()
  } catch (e) {
    // Exception
    console.log('ERROR!')
    console.error(e)
  }

  console.log('DATA!', cv)

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

  if (props.cv?.skill_groups) {
    sectionElements.push(
      <SkillSection key="skills" skillGroups={props.cv.skill_groups} />
    );
  }

  if (props.cv?.work_experiences) {
    sectionElements.push(
      <WorkExperienceSection key="workExperience" workExperiences={props.cv.work_experiences} />
    );
  }

  return (
    <>
      <Header pdfUrl={props.cv?.pdf || null} />
      <main id="body-wrapper">
        {sectionElements}
      </main>
    </>
  );
};

