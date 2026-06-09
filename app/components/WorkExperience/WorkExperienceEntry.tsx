import { WorkExperience } from '@/types'
import dayjs from 'dayjs'

type Props = {
  workExperience: WorkExperience
}

const WorkExperienceEntry = ({ workExperience }: Props) => {
  return (
    <div className="workexp-entry">
      <div className="workexp-entry-header">
        <h3 className="workexp-entry-title">{workExperience.title}</h3>
        <div className="workexp-entry-datelocation">
          <span className="workexp-entry-location">{workExperience.location}</span>
          &nbsp;
          <span>
            {dayjs(workExperience.start_date).format('MMM YY')}&nbsp;-&nbsp;
            {workExperience.end_date ? dayjs(workExperience.end_date).format('MMM YY') : 'Present'}
          </span>
        </div>
      </div>
      <div className="workexp-entry-info">{workExperience.description}</div>
      <div className="workexp-entry-tasks">
        <ul>
          {workExperience.responsibilities?.map((responsibility) => (
            <li key={responsibility}>{responsibility}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default WorkExperienceEntry
