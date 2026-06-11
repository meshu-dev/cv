import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import dayjs from 'dayjs'
import { WorkExperience } from '@/types'
import WorkExperienceSection from '@/components/WorkExperience/WorkExperienceSection'

describe('WorkExperienceSection tests', () => {
  it('renders list of work experiences', () => {
    const workExperiences: WorkExperience[] = [
      {
        title: 'Software Engineer',
        location: 'Remote',
        start_date: '2026-01-01',
        end_date: '2023-05-01',
        description: 'Worked on backend development',
        responsibilities: ['Developed APIs', 'Maintained database'],
      },
      {
        title: 'PHP Engineer',
        location: 'London',
        start_date: '2023-04-01',
        end_date: '2021-10-01',
        description: 'Worked on PHP development',
        responsibilities: ['Planned and created new features', 'Fixed bugs'],
      }
    ]

    render(
      <WorkExperienceSection workExperiences={workExperiences} />
    )

    for (const workExperience of workExperiences) {
      const jobDate = dayjs(workExperience.start_date).format('MMM YY') + ' - ' + dayjs(workExperience.end_date).format('MMM YY')

      expect(screen.getByRole('heading', { name: workExperience.title })).toBeInTheDocument()
      expect(screen.getByText(workExperience.location)).toBeInTheDocument()
      expect(screen.getByText(jobDate)).toBeInTheDocument()
      expect(screen.getByText(workExperience.description)).toBeInTheDocument()
      expect(screen.getByText(workExperience.responsibilities[0])).toBeInTheDocument()
      expect(screen.getByText(workExperience.responsibilities[1])).toBeInTheDocument()
    }
  })

  it('renders when no work experiences are provided', () => {
    const workExperiences: WorkExperience[] = []

    const { container } = render(
      <WorkExperienceSection workExperiences={workExperiences} />
    )

    expect(container.firstChild).toBeNull()
    expect(container).toBeEmptyDOMElement()
  })
})
