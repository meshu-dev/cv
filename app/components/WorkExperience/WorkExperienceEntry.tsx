import WorkExperience from '../../interfaces/work-experience.interface';

interface Props {
  workExperience: WorkExperience;
};

const WorkExperienceEntry = ({ workExperience }: Props) => {
  const taskElements: React.ReactElement[] = [];

  if (workExperience.tasks) {
    workExperience.tasks.forEach((task, taskIndex) => {
      taskElements.push(<li key={ `task-${taskIndex}` }>{ task }</li>)
    })
  }

  return (
    <div id="workexp-entry-tucasi" className="workexp-entry">
      <div className="workexp-entry-header">
        <h3 className="workexp-entry-title">{ workExperience.title }</h3>
        <div className="workexp-entry-datelocation">
          <span className="workexp-entry-location">{ workExperience.location }</span>
          &nbsp;
          <span>{ workExperience.date }</span>
        </div>
      </div>
      <div className="workexp-entry-info">{ workExperience.description }</div>
      <div className="workexp-entry-tasks">
        <ul>
          { taskElements }
        </ul>
      </div>
    </div>
  );
};
  
export default WorkExperienceEntry;
