import SkillGroup from '../../interfaces/skill-group.interface';

export interface Props {
  skillGroup: SkillGroup;
};

const SkillList: React.FC<Props> = ({ skillGroup }) => {
  const skillElements: React.ReactElement[] = [];

  if (skillGroup.list) {
    for (const skill of skillGroup.list) {
      skillElements.push(
        <li>{ skill.name }</li>
      );
    }
  }

  return (
    <div className="skills-section">
      <h3>{ skillGroup.title }</h3>
      <ul>
        { skillElements }
      </ul>
    </div>
  );
};
  
export default SkillList;
