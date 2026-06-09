import { Skill } from '@/types'

type Props = {
  skill: Skill
}

const SkillList = ({ skill }: Props) => {
  return (
    <div className="skills-section">
      <h3>{skill.name}</h3>
      <ul>
        {skill.technologies?.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export default SkillList
