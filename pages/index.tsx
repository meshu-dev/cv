
import Head from 'next/head'
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
    console.error('Failed to fetch CV data:', e)
  }

  return {
    props: {
      cv
    }
  }
}

export default function HomePage({ cv }: Props) {
  const pageTitle = cv?.profile?.fullname ? `${cv.profile.fullname} — CV` : 'CV'
  const pageDescription = cv?.profile?.intro || 'Professional CV'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {cv?.profile?.fullname && (
          <meta property="og:title" content={pageTitle} />
        )}
        {cv?.profile?.intro && (
          <meta property="og:description" content={cv.profile.intro} />
        )}
      </Head>
      <Header pdfUrl={cv?.pdf || null} />
      <main id="body-wrapper">
        {!cv ? (
          <p>CV content is currently unavailable. Please try again later.</p>
        ) : (
          <>
            {cv.profile && <ProfileSection profile={cv.profile} />}
            {cv.skills && <SkillSection skills={cv.skills} />}
            {cv.work_experiences && (
              <WorkExperienceSection workExperiences={cv.work_experiences} />
            )}
          </>
        )}
      </main>
    </>
  )
}
