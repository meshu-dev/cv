

import Header from '@/components/Layout/Header'
import ProfileSection from '@/components/Profile/ProfileSection'
import SkillSection from '@/components/Skill/SkillSection'
import WorkExperienceSection from '@/components/WorkExperience/WorkExperienceSection'
import PortfolioApiService from '@/services/portfolioApi.service'
import { Auth, CV } from '@/types'

type Props = {
  cv: CV | null
}

export async function getStaticProps() {
  const userEmail: string = process.env.PORTFOLIO_API_EMAIL as string
  const userPassword: string = process.env.PORTFOLIO_API_PASSWORD as string

  let auth: Auth | null = null
  let cv: CV | null = null

  try {
    auth = await PortfolioApiService.login(userEmail, userPassword)

    if (auth?.token) {
      cv = await PortfolioApiService.getData(auth.token)
    }
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
}

export default (props: Props) => {
  const sectionElements: React.ReactElement[] = []

  if (props.cv?.profile) {
    sectionElements.push(
      <ProfileSection key="profile" profile={props.cv.profile} />
    )
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

