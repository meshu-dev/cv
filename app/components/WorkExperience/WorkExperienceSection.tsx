import WorkExperienceEntry from './WorkExperienceEntry';
import WorkExperience from '../../interfaces/work-experience.interface';
import WorkExperienceTask from '../../interfaces/work-experience-task.interface';

const workExpElements: React.ReactElement[] = [];

const tasks: WorkExperienceTask[] = [
  { text: 'Majority of work has been on the seat planner app built in a custom PHP framework.' },
  { text: 'Worked on a laravel REST API to centralise school data.' },
  { text: 'Developed Angular frontend school apps which interact with API.' },
  { text: 'Built an Android / iOS homework web app using Ionic framework.' },
  { text: 'Recently switched to Java as school payment apps are built with it.' }
]

const entries: WorkExperience[] = [
  {
    title: 'Software Developer - Tucasi',
    description: 'Currently working on school payment apps, previously worked on a seat planner app.',
    location: 'Eastleigh',
    date: 'Nov 20 – Present',
    tasks: tasks
  }
];

if (entries) {
  for (let entry of entries) {
    workExpElements.push(
      <WorkExperienceEntry workExperience={ entry } />
    );
  }
}

const WorkExperienceSection: React.FC = () => {
  return (
    <section id="workexp">
      <h2>Work Experience</h2>
      { workExpElements }
    </section>
  );
};

export default WorkExperienceSection;
