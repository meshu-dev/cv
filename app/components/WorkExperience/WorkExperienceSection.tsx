import WorkExperienceEntry from './WorkExperienceEntry';
import WorkExperience from '../../interfaces/work-experience.interface';

interface Props {
  workExperiences: WorkExperience[]
};

const WorkExperienceSection: React.FC<Props> = ({ workExperiences }) => {
  if (workExperiences) {
    const workExpElements: React.ReactElement[] = [];
    workExperiences = workExperiences.filter((workExp: WorkExperience) => workExp.isActive);

    for (const workExperienceIndex in workExperiences) {
      const entryCount = parseInt(workExperienceIndex) + 1;
      const elementKey = `workExperienceEntry${entryCount}`;
      const workExperience = workExperiences[workExperienceIndex];

      workExpElements.push(
        <WorkExperienceEntry key={ elementKey } workExperience={ workExperience } />
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