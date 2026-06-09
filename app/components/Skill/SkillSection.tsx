import SkillList from './SkillList'
import type { Skill } from '@/types'

type Props = {
  skills: Skill[]
}

const SkillSection = ({ skills }: Props) => {
  if (!skills) {
    return null
  }

  return (
    <section id="skills">
      <h2>Skills</h2>
      <div id="skills-sections">
        {skills.map((skill) => (
          <SkillList key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  )
}

export default SkillSection
