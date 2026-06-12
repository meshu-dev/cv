import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import WorkExperienceEntry from '@/components/WorkExperience/WorkExperienceEntry'
import dayjs from 'dayjs'
import { WorkExperience } from '@/types'

describe('WorkExperienceEntry tests', () => {
  type WorkExperienceContext = {
    workExperience: WorkExperience // Change 'any' to the actual type of your work experience data
  }

  beforeEach((context: WorkExperienceContext) => {
    context.workExperience = {
      title: 'Software Engineer',
      location: 'Remote',
      start_date: '2020-01-01',
      end_date: '2021-01-01',
      description: 'Worked on backend development',
      responsibilities: ['Developed APIs', 'Maintained database'],
    }
  })

  it('renders work experience', ({ workExperience }: WorkExperienceContext) => {
    render(<WorkExperienceEntry workExperience={workExperience} />)

    const jobDate =
      dayjs(workExperience.start_date).format('MMM YY') +
      ' - ' +
      dayjs(workExperience.end_date).format('MMM YY')

    expect(screen.getByRole('heading', { name: workExperience.title })).toBeInTheDocument()
    expect(screen.getByText(workExperience.location)).toBeInTheDocument()
    expect(screen.getByText(jobDate)).toBeInTheDocument()
    expect(screen.getByText(workExperience.description)).toBeInTheDocument()
    expect(screen.getByText(workExperience.responsibilities[0])).toBeInTheDocument()
    expect(screen.getByText(workExperience.responsibilities[1])).toBeInTheDocument()
  })

  it('renders work experience with no end date', ({ workExperience }: WorkExperienceContext) => {
    workExperience.end_date = ''

    render(<WorkExperienceEntry workExperience={workExperience} />)

    const jobDate = `${dayjs(workExperience.start_date).format('MMM YY')} - Present`

    expect(screen.getByText(jobDate)).toBeInTheDocument()
  })
})
