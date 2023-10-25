import SkillGroup from '../../interfaces/skill-group.interface';

interface Props {
  skillGroup: SkillGroup;
};

const SkillList = ({ skillGroup }: Props) => {
  const skillElements: React.ReactElement[] = [];

  if (skillGroup.list) {
    skillGroup.list.forEach((skillName, skillNameIndex) => {
      skillElements.push(
        <li key={ `skill-${skillNameIndex}` }>{ skillName }</li>
      );
    })
  }

  return (
    <div className="skills-section">
      <h3>{ skillGroup.name }</h3>
      <ul>
        { skillElements }
      </ul>
    </div>
  );
};
  
export default SkillList;
