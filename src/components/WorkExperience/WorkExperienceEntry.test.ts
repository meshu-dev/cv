import { describe, expect, test } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import WorkExperienceEntry from './WorkExperienceEntry.astro'

const container = await AstroContainer.create()

const workExperience = {
  title: 'Developer',
  description: 'Built things',
  location: 'Remote',
  start_date: '2020-03-15',
  end_date: '2022-07-15',
  responsibilities: ['Wrote code', 'Reviewed code'],
}

describe('WorkExperienceEntry', () => {
  test('renders title, location, description and responsibilities', async () => {
    // Arrange
    const props = { workExperience }

    // Act
    const html = await container.renderToString(WorkExperienceEntry, { props })

    // Assert
    expect(html).toContain('Developer')
    expect(html).toContain('Remote')
    expect(html).toContain('Built things')
    expect(html).toMatch(/<li[^>]*>Wrote code<\/li>/)
    expect(html).toMatch(/<li[^>]*>Reviewed code<\/li>/)
  })

  test('formats the date range', async () => {
    // Arrange
    const props = { workExperience }

    // Act
    const html = await container.renderToString(WorkExperienceEntry, { props })

    // Assert
    expect(html).toContain('Mar 2020')
    expect(html).toContain('Jul 2022')
    expect(html).not.toContain('Present')
  })

  test('shows Present when there is no end date', async () => {
    // Arrange
    const props = { workExperience: { ...workExperience, end_date: '' } }

    // Act
    const html = await container.renderToString(WorkExperienceEntry, { props })

    // Assert
    expect(html).toContain('Present')
  })
})
