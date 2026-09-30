import { expect, test } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import ProfileSection from './ProfileSection.astro'

const container = await AstroContainer.create()

const profile = {
  fullname: 'Jane Doe',
  intro: 'Software engineer',
  location: 'London',
  sites: [
    {
      name: 'GitHub',
      url: 'https://github.com/x',
      icon: 'simple-icons:github',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/x',
      icon: 'simple-icons:linkedin',
    },
  ],
}

test('renders profile details', async () => {
  // Arrange
  const props = { profile }

  // Act
  const html = await container.renderToString(ProfileSection, { props })

  // Assert
  expect(html).toContain('<h1>Jane Doe</h1>')
  expect(html).toContain('Software engineer')
  expect(html).toContain('London')
})

test('renders one link per site', async () => {
  // Arrange
  const props = { profile }

  // Act
  const html = await container.renderToString(ProfileSection, { props })

  // Assert
  expect(html.match(/<a /g)).toHaveLength(2)
  expect(html).toContain('aria-label="LinkedIn"')
})

test('renders without links when there are no sites', async () => {
  // Arrange
  const props = { profile: { ...profile, sites: [] } }

  // Act
  const html = await container.renderToString(ProfileSection, { props })

  // Assert
  expect(html).not.toContain('<a ')
})
