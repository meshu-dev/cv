import { expect, test } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import SkillList from './SkillList.astro'

const container = await AstroContainer.create()

test('renders the skill name and technologies', async () => {
  // Arrange
  const props = {
    skill: { name: 'Languages', technologies: ['TypeScript', 'Go'] },
  }

  // Act
  const html = await container.renderToString(SkillList, { props })

  // Assert
  expect(html).toMatch(/<h3[^>]*>Languages<\/h3>/)
  expect(html).toMatch(/<li[^>]*>TypeScript<\/li>/)
  expect(html).toMatch(/<li[^>]*>Go<\/li>/)
})

test('renders an empty list without technologies', async () => {
  // Arrange
  const props = { skill: { name: 'Empty', technologies: [] } }

  // Act
  const html = await container.renderToString(SkillList, { props })

  // Assert
  expect(html).not.toMatch(/<li[\s>]/)
})
