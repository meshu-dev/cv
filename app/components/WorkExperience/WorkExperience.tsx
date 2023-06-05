import SkillGroup from './SkillGroup';

const skillGroups: React.ReactElement[] = [];
const skillGroupData = [
  { title: 'Backend', list: [] },
  { title: 'Backend', list: [] }
];

if (skillGroupData) {
  for (const skillGroup of skillGroupData) {
    skillGroups.push(
      <SkillGroup />
    );
  }
}

const WorkExperience = () => {
  return (
    <section>
      <h2>Work Experience</h2>
      <div id="skills-sections">
        { skillGroups }
      </div>
    </section>
  );
};

export default WorkExperience;
