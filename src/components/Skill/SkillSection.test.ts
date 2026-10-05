import { expect, test } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import SkillSection from './SkillSection.astro'

const container = await AstroContainer.create()

test('renders heading and a list per skill', async () => {
  // Arrange
  const props = {
    skills: [
      { name: 'Languages', technologies: ['TS'] },
      { name: 'Tools', technologies: ['Git'] },
    ],
  }

  // Act
  const html = await container.renderToString(SkillSection, { props })

  // Assert
  expect(html).toMatch(/<h2[^>]*>Skills<\/h2>/)
  expect(html.match(/class="skills-section /g)).toHaveLength(2)
})

test('renders nothing when empty', async () => {
  // Arrange
  const props = { skills: [] }

  // Act
  const html = await container.renderToString(SkillSection, { props })

  // Assert
  expect(html.trim()).toBe('')
})
