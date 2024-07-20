import Cv from '@/interfaces/cv.interface'
import Profile from '@/interfaces/profile.interface'
import ProfileIcon from '@/interfaces/profile-icon.interface'
import SkillGroup from '@/interfaces/skill-group.interface'
import WorkExperience from '@/interfaces/work-experience.interface'

const makeCv = (apiData: any): Cv => {
  const data = apiData.data

  console.log('data', data)

  const apiProfileLinks = data.profile.sites
  const profileIcons: ProfileIcon[] = []

  for (const profileLink of apiProfileLinks) {
    profileIcons.push({
      title: profileLink.name,
      url: profileLink.url,
      imageUrl: profileLink.image
    })
  }

  const profile: Profile = {
    name: data.profile.details.fullname,
    description: data.profile.details.intro,
    location: data.profile.details.location,
    icons: profileIcons
  }

  const apiSkillGroups = data['skill_groups']
  const skills: SkillGroup[] = []

  for (const apiSkillGroup of apiSkillGroups) {
    skills.push({
      name: apiSkillGroup.name,
      list: apiSkillGroup.technologies
    })
  }

  const apiWorkExperiences = data['work_experiences']
  const workExperience: WorkExperience[] = []

  for (const apiWorkExperience of apiWorkExperiences) {
    workExperience.push({
      title: apiWorkExperience.title,
      description: apiWorkExperience.description,
      location: apiWorkExperience.location,
      date: apiWorkExperience.date,
      tasks: apiWorkExperience.responsibilities,
      isActive: true
    })
  }

  return {
    profile,
    skills,
    workExperience
  } as Cv;
}

export default makeCv
