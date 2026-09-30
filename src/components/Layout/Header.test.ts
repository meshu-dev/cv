import { afterEach, describe, expect, test, vi } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import Header from './Header.astro'

const container = await AstroContainer.create()

afterEach(() => vi.unstubAllEnvs())

describe('Header', () => {
  test('renders skip link and logo', async () => {
    // Act
    const html = await container.renderToString(Header)

    // Assert
    expect(html).toContain('href="#body-wrapper"')
    expect(html).toContain('Skip to content')
    expect(html).toContain('Mesh&apos;s CV')
  })

  test('renders the download link when a pdfUrl is given', async () => {
    // Arrange
    const props = { pdfUrl: 'https://example.com/cv.pdf' }

    // Act
    const html = await container.renderToString(Header, { props })

    // Assert
    expect(html).toContain('href="https://example.com/cv.pdf"')
    expect(html).toContain('data-testid="pdf-link"')
  })

  test('omits the download link without a pdfUrl', async () => {
    // Act
    const html = await container.renderToString(Header)

    // Assert
    expect(html).not.toContain('pdf-link')
  })

  test('renders the contact button when the reCAPTCHA key is set', async () => {
    // Arrange
    vi.stubEnv('PUBLIC_GOOGLE_RECAPTCHA_KEY', 'key')

    // Act
    const html = await container.renderToString(Header)

    // Assert
    expect(html).toContain('commandfor="contactform"')
  })

  test('omits the contact button when the reCAPTCHA key is empty', async () => {
    // Arrange
    vi.stubEnv('PUBLIC_GOOGLE_RECAPTCHA_KEY', '')

    // Act
    const html = await container.renderToString(Header)

    // Assert
    expect(html).not.toContain('commandfor="contactform"')
  })
})
