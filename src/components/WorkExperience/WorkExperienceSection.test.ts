import { expect, test } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import WorkExperienceSection from './WorkExperienceSection.astro'

const container = await AstroContainer.create()

const entry = (title: string) => ({
  title,
  description: 'd',
  location: 'l',
  start_date: '2020-03-15',
  end_date: '2021-03-15',
  responsibilities: [],
})

test('renders heading and an entry per experience', async () => {
  // Arrange
  const props = { workExperiences: [entry('First'), entry('Second')] }

  // Act
  const html = await container.renderToString(WorkExperienceSection, { props })

  // Assert
  expect(html).toMatch(/<h2[^>]*>\s*Work experience\s*<\/h2>/)
  expect(html.match(/class="workexp-entry /g)).toHaveLength(2)
  expect(html).toContain('First')
  expect(html).toContain('Second')
})

test('renders nothing when empty', async () => {
  // Arrange
  const props = { workExperiences: [] }

  // Act
  const html = await container.renderToString(WorkExperienceSection, { props })

  // Assert
  expect(html.trim()).toBe('')
})
