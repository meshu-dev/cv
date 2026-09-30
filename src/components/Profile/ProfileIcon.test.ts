import { expect, test } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import ProfileIcon from './ProfileIcon.astro'

const container = await AstroContainer.create()

test('renders an external link with accessible labels', async () => {
  // Arrange
  const profileSite = { name: 'GitHub', url: 'https://github.com/x', icon: 'simple-icons:github' }

  // Act
  const html = await container.renderToString(ProfileIcon, { props: { profileSite } })

  // Assert
  expect(html).toContain('href="https://github.com/x"')
  expect(html).toContain('target="_blank"')
  expect(html).toContain('rel="noopener noreferrer"')
  expect(html).toContain('title="GitHub"')
  expect(html).toContain('aria-label="GitHub"')
  expect(html).toContain('<svg')
})
