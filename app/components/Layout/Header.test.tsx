import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@/components/Layout/Header'

describe('Header tests', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('renders header with download and contact buttons', () => {
    const pdfUrl = 'https://example.com/resume.pdf'

    vi.stubEnv('NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY', 'test-recaptcha-key')

    render(
      <Header pdfUrl={pdfUrl} />
    )

    const pdfButton = screen.getByTestId('pdf-link')
    const contactButton = screen.getByTestId('contact-button')

    expect(pdfButton).toHaveAttribute('href', pdfUrl)
    expect(contactButton).toBeInTheDocument()
  })

  it('renders header with no buttons', () => {
    render(
      <Header pdfUrl={null} />
    )

    const pdfButton = screen.queryByTestId('pdf-link')
    const contactButton = screen.queryByTestId('contact-button')

    expect(pdfButton).not.toBeInTheDocument()
    expect(contactButton).not.toBeInTheDocument()
  })
})
