import Profile from './profile.interface';
import SkillGroup from './skill-group.interface';
import WorkExperience from './work-experience.interface';

export default interface Cv {
  profile: Profile
  skills: SkillGroup[]
  workExperience: WorkExperience[]
  pdf: string
}
