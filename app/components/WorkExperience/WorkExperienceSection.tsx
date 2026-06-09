import WorkExperienceEntry from './WorkExperienceEntry'
import { WorkExperience } from '@/types'

type Props = {
  workExperiences: WorkExperience[]
}

const WorkExperienceSection = ({ workExperiences }: Props) => {
  if (!workExperiences) {
    return null
  }

  return (
    <section id="workexp">
      <h2>Work Experience</h2>
      {workExperiences.map((workExperience) => (
        <WorkExperienceEntry key={workExperience.title} workExperience={workExperience} />
      ))}
    </section>
  )
}

export default WorkExperienceSection
