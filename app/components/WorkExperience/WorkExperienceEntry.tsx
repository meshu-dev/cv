import { WorkExperience } from '@/types'
import dayjs from 'dayjs';

dayjs().format()

type Props = {
  workExperience: WorkExperience
};

const WorkExperienceEntry = ({ workExperience }: Props) => {
  const taskElements: React.ReactElement[] = []

  console.log('workExperience', workExperience)

  if (workExperience.responsibilities) {
    workExperience.responsibilities.forEach((responsibility, taskIndex) => {
      taskElements.push(<li key={`task-${taskIndex}`}>{responsibility}</li>)
    })
  }

  return (
    <div id="workexp-entry-tucasi" className="workexp-entry">
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
          {taskElements}
        </ul>
      </div>
    </div>
  );
};

export default WorkExperienceEntry
