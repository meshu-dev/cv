import WorkExperienceTask from './work-experience-task.interface';

export default interface WorkExperience {
  title: string,
  description: string,
  location: string,
  date: string,
  tasks: WorkExperienceTask[]
}
