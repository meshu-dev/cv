import SkillList from './SkillList';
import SkillGroup from '../../interfaces/skill-group.interface';

export interface Props {
  skillGroups: SkillGroup[]
};

const SkillSection: React.FC<Props> = ({ skillGroups }) => {
  if (skillGroups) {
    const skillGroupElements: React.ReactElement[] = [];

    for (let skillGroup of skillGroups) {
      skillGroupElements.push(
        <SkillList key={ skillGroup.title } skillGroup={ skillGroup } />
      );
    }

    return (
      <section id="skills">
        <h2>Skills</h2>
        <div id="skills-sections">
          { skillGroupElements }
        </div>
      </section>
    );
  }
  return null;
};

export default SkillSection;
