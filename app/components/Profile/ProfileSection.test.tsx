import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProfileSection from '@/components/Profile/ProfileSection'

describe('ProfileSection', () => {
  it('renders profile icon', () => {
    render(
      <ProfileSection
        profile={{
          fullname: 'https://github.com',
          intro: 'GitHub',
          location: 'mdi:github',
          sites: [{
            url: 'https://github.com',
            name: 'GitHub',
            icon: 'mdi:github',
          }],
        }}
      />
    )

    const linkElement = screen.getByRole('link')

    expect(linkElement)
      .toHaveAttribute('href', 'https://github.com')
      .toHaveAttribute('title', 'GitHub')
      .toHaveAttribute('aria-label', 'GitHub')

    const iconElement = screen.getByTestId('profile-icon')

    expect(iconElement).toHaveAttribute('icon', 'mdi:github')
  })
})
