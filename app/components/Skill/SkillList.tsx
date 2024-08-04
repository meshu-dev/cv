import { SkillGroup } from '@/types'

type Props = {
  skillGroup: SkillGroup
}

const SkillList = ({ skillGroup }: Props) => {
  const skillElements: React.ReactElement[] = []

  if (skillGroup.technologies) {
    skillGroup.technologies.forEach((name: string, index: number) => {
      skillElements.push(
        <li key={`skill-${index}`}>{name}</li>
      );
    })
  }

  return (
    <div className="skills-section">
      <h3>{skillGroup.name}</h3>
      <ul>
        {skillElements}
      </ul>
    </div>
  );
};

export default SkillList
