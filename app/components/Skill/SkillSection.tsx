import SkillList from './SkillList'
import { SkillGroup } from '@/types'

type Props = {
  skillGroups: SkillGroup[]
}

const SkillSection = ({ skillGroups }: Props) => {
  if (skillGroups) {
    const skillGroupElements: React.ReactElement[] = []

    for (let skillGroup of skillGroups) {
      skillGroupElements.push(
        <SkillList key={skillGroup.name} skillGroup={skillGroup} />
      )
    }

    return (
      <section id="skills">
        <h2>Skills</h2>
        <div id="skills-sections">
          {skillGroupElements}
        </div>
      </section>
    );
  }
  return null
}

export default SkillSection
