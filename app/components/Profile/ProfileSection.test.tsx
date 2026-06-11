import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProfileSection from '@/components/Profile/ProfileSection'
import { Profile } from '@/types'

describe('ProfileSection tests', () => {
  it('renders profile icon', () => {
    const profile: Profile = {
      fullname: 'https://github.com',
      intro: 'GitHub',
      location: 'mdi:github',
      sites: [{
        url: 'https://github.com',
        name: 'GitHub',
        icon: 'mdi:github',
      }],
    }

    render(
      <ProfileSection profile={profile} />
    )

    const linkElement = screen.getByRole('link')

    expect(linkElement)
      .toHaveAttribute('href', 'https://github.com')
      .toHaveAttribute('title', 'GitHub')
      .toHaveAttribute('aria-label', 'GitHub')

    const iconElement = screen.getByTestId('profile-icon')

    expect(iconElement).toHaveAttribute('icon', 'mdi:github')
  })

  it('renders when no skills are provided', () => {
    const profile: Profile = null

    const { container } = render(
      <ProfileSection profile={profile} />
    )

    expect(container.firstChild).toBeNull()
    expect(container).toBeEmptyDOMElement()
  })
})
