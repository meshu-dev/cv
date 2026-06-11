import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '@/components/Layout/Header'

describe('Header tests', () => {
  it('renders header with PDF download button', () => {
    const pdfUrl = 'https://example.com/resume.pdf'

    render(
      <Header pdfUrl={pdfUrl} />
    )

    const pdfButton = screen.getByTestId('pdf-link')

    expect(pdfButton).toHaveAttribute('href', pdfUrl)
  })

  it('renders header with no PDF download button when URL is null', () => {
    render(
      <Header pdfUrl={null} />
    )

    const pdfButton = screen.queryByTestId('pdf-link')

    expect(pdfButton).not.toBeInTheDocument()
  })
})
