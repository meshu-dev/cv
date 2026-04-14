import { Skill } from '@/types'

type Props = {
  skill: Skill
}

const SkillList = ({ skill }: Props) => {
  const skillElements: React.ReactElement[] = []

  if (skill.technologies) {
    skill.technologies.forEach((name: string, index: number) => {
      skillElements.push(
        <li key={`skill-${index}`}>{name}</li>
      );
    })
  }

  return (
    <div className="skills-section">
      <h3>{skill.name}</h3>
      <ul>
        {skillElements}
      </ul>
    </div>
  )
}

export default SkillList
