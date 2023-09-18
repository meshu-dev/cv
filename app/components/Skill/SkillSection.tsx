import SkillList from './SkillList';

import SkillGroup from '../../interfaces/skill-group.interface';
import Skill from '../../interfaces/skill.interface';

const skillGroupElements: React.ReactElement[] = [];

const skills: Skill[] = [
  { name: 'PHP' },
  { name: 'PHP' },
  { name: 'PHP' },
  { name: 'PHP' }
];

const skillGroups: SkillGroup[] = [
  { title: 'Backend', list: skills },
  { title: 'Frontend', list: skills },
  { title: 'Frameworks', list: skills },
  { title: 'Other', list: skills }
];

if (skillGroups) {
  for (let skillGroup of skillGroups) {
    skillGroupElements.push(
      <SkillList skillGroup={ skillGroup } />
    );
  }
}

const SkillSection: React.FC = () => {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div id="skills-sections">
        { skillGroupElements }
      </div>
    </section>
  );
};

export default SkillSection;
