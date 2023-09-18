import WorkExperienceEntry from './WorkExperienceEntry';
import WorkExperience from '../../interfaces/work-experience.interface';

export interface Props {
  workExperiences: WorkExperience[]
};

const WorkExperienceSection: React.FC<Props> = ({ workExperiences }) => {
  if (workExperiences) {
    const workExpElements: React.ReactElement[] = [];

    for (const workExperience of workExperiences) {
      workExpElements.push(
        <WorkExperienceEntry key={ workExperience.title } workExperience={ workExperience } />
      );
    }

    return (
      <section id="workexp">
        <h2>Work Experience</h2>
        { workExpElements }
      </section>
    );
  }
  return null;
};

export default WorkExperienceSection;
