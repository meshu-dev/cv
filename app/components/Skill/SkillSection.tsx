import SkillList from './SkillList'
import type { Skill } from '@/types'

type Props = {
  skills: Skill[]
}

const Skill = ({ skills }: Props) => {
  if (skills) {
    const skillGroupElements: React.ReactElement[] = []

    for (let skill of skills) {
      skillGroupElements.push(
        <SkillList key={skill.name} skill={skill} />
      )
    }

    return (
      <section id="skills">
        <h2>Skills</h2>
        <div id="skills-sections">
          {skillGroupElements}
        </div>
      </section>
    )
  }
  return null
}

export default Skill
