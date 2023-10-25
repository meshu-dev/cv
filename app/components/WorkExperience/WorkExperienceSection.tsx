import WorkExperienceEntry from './WorkExperienceEntry';
import WorkExperience from '../../interfaces/work-experience.interface';

interface Props {
  workExperiences: WorkExperience[]
};

const WorkExperienceSection = ({ workExperiences }: Props) => {
  if (workExperiences) {
    const workExpElements: React.ReactElement[] = [];
    workExperiences = workExperiences.filter((workExp: WorkExperience) => workExp.isActive);

    for (const workExperienceIndex in workExperiences) {
      const entryCount = parseInt(workExperienceIndex) + 1;
      const elementKey = `workExperienceEntry${entryCount}`;
      const workExperience = workExperiences[workExperienceIndex];

      if (workExperience.isActive) {
        workExpElements.push(
          <WorkExperienceEntry key={ elementKey } workExperience={ workExperience } />
        );
      }
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
