import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { getData, login } from '@/utils/portfolioApi'
import type { CV } from '@/types'
import Index from './index.astro'

vi.mock('@/utils/portfolioApi', () => ({ login: vi.fn(), getData: vi.fn() }))

const container = await AstroContainer.create()

const loginMock = vi.mocked(login)
const getDataMock = vi.mocked(getData)

const cv: CV = {
  profile: {
    fullname: 'Jane Doe',
    intro: 'Engineer',
    location: 'London',
    sites: [],
  },
  skills: [{ name: 'Languages', technologies: ['TypeScript'] }],
  work_experiences: [
    {
      title: 'Developer',
      description: 'Built things',
      location: 'Remote',
      start_date: '2020-03-15',
      end_date: '2022-07-15',
      responsibilities: [],
    },
  ],
  pdf: 'https://example.com/cv.pdf',
}

const unavailable = 'CV content is currently unavailable'

beforeEach(() => {
  vi.stubEnv('PORTFOLIO_API_EMAIL', 'a@b.com')
  vi.stubEnv('PORTFOLIO_API_PASSWORD', 'secret')
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
  vi.resetAllMocks()
})

describe('index page', () => {
  test('logs in with the env credentials and fetches the cv with the token', async () => {
    // Arrange
    loginMock.mockResolvedValue({ token: 'token' })
    getDataMock.mockResolvedValue(cv)

    // Act
    await container.renderToString(Index)

    // Assert
    expect(loginMock).toHaveBeenCalledWith('a@b.com', 'secret')
    expect(getDataMock).toHaveBeenCalledWith('token')
  })

  test('renders every cv section', async () => {
    // Arrange
    loginMock.mockResolvedValue({ token: 'token' })
    getDataMock.mockResolvedValue(cv)

    // Act
    const html = await container.renderToString(Index)

    // Assert
    expect(html).toContain('<h1>Jane Doe</h1>')
    expect(html).toContain('<h2>Skills</h2>')
    expect(html).toContain('<h2>Work Experience</h2>')
    expect(html).not.toContain(unavailable)
  })

  test('renders the layout components', async () => {
    // Arrange
    loginMock.mockResolvedValue({ token: 'token' })
    getDataMock.mockResolvedValue(cv)

    // Act
    const html = await container.renderToString(Index)

    // Assert
    expect(html).toContain('<html lang="en">')
    expect(html).toContain('id="body-wrapper"')
    expect(html).toContain('id="contactform"')
    expect(html).toContain('id="toast"')
  })

  test('passes the cv pdf to the header', async () => {
    // Arrange
    loginMock.mockResolvedValue({ token: 'token' })
    getDataMock.mockResolvedValue(cv)

    // Act
    const html = await container.renderToString(Index)

    // Assert
    expect(html).toContain('href="https://example.com/cv.pdf"')
  })

  test('skips sections missing from the cv', async () => {
    // Arrange
    loginMock.mockResolvedValue({ token: 'token' })
    getDataMock.mockResolvedValue({ pdf: null } as CV)

    // Act
    const html = await container.renderToString(Index)

    // Assert
    expect(html).not.toContain('<h1>')
    expect(html).not.toContain('<h2>Skills</h2>')
    expect(html).not.toContain('<h2>Work Experience</h2>')
    expect(html).not.toContain(unavailable)
  })

  test('shows the unavailable message when login returns no token', async () => {
    // Arrange
    loginMock.mockResolvedValue(null)

    // Act
    const html = await container.renderToString(Index)

    // Assert
    expect(html).toContain(unavailable)
    expect(getDataMock).not.toHaveBeenCalled()
  })

  test('shows the unavailable message when the cv is null', async () => {
    // Arrange
    loginMock.mockResolvedValue({ token: 'token' })
    getDataMock.mockResolvedValue(null)

    // Act
    const html = await container.renderToString(Index)

    // Assert
    expect(html).toContain(unavailable)
  })

  test('shows the unavailable message and logs when the api throws', async () => {
    // Arrange
    const error = new Error('boom')
    loginMock.mockRejectedValue(error)

    // Act
    const html = await container.renderToString(Index)

    // Assert
    expect(html).toContain(unavailable)
    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch CV data:',
      error,
    )
  })
})
