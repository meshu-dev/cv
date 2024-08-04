import WorkExperienceEntry from './WorkExperienceEntry'
import { WorkExperience } from '@/types'

interface Props {
  workExperiences: WorkExperience[]
};

const WorkExperienceSection = ({ workExperiences }: Props) => {
  if (workExperiences) {
    const workExpElements: React.ReactElement[] = []

    for (const workExperienceIndex in workExperiences) {
      const entryCount = parseInt(workExperienceIndex) + 1;
      const elementKey = `workExperienceEntry${entryCount}`;
      const workExperience = workExperiences[workExperienceIndex];

      workExpElements.push(
        <WorkExperienceEntry key={elementKey} workExperience={workExperience} />
      )
    }

    return (
      <section id="workexp">
        <h2>Work Experience</h2>
        {workExpElements}
      </section>
    );
  }
  return null;
};

export default WorkExperienceSection
