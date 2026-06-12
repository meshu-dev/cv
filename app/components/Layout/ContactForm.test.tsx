import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

describe('ContactForm tests', () => {
  beforeEach(() => {
    vi.mock('react-google-recaptcha-v3', () => {
      return {
        // 1. Mock the hook to return a fake executeRecaptcha function
        useGoogleReCaptcha: () => ({
          executeRecaptcha: vi.fn().mockResolvedValue('mock-recaptcha-token'),
        }),
        // 2. Mock the Provider as a plain wrapper that just passes through children
        GoogleReCaptchaProvider: ({ children }: { children: React.ReactNode }) => children,
      }
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
    vi.unstubAllEnvs()
  })

  it('renders form and submits a contact message', async () => {
    const apiUrl = 'https://example.com'

    vi.stubEnv('NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY', 'test-recaptcha-key')
    vi.stubEnv('NEXT_PUBLIC_PORTFOLIO_API_URL', apiUrl)

    const mockResponse = {
      ok: true,
      json: async () => ({ success: true, message: 'Message sent successfully' }),
    }

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse))

    render(
      <ContactForm
       isOpen={true}
       onClose={() => {}} />
    )

    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const messageInput = screen.getByRole('textbox', { name: /message/i })
    const submitButton = screen.getByRole('button', { name: /submit/i })

    const contactFormData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'Hello, this is a test message.',
    }

    fireEvent.change(nameInput, { target: { value: contactFormData.name } })
    fireEvent.change(emailInput, { target: { value: contactFormData.email } })
    fireEvent.change(messageInput, { target: { value: contactFormData.message } })

    await userEvent.click(submitButton)

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${apiUrl}/contact`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify({
          token: 'mock-recaptcha-token',
          name: contactFormData.name,
          email: contactFormData.email,
          message: contactFormData.message
        })
      })
    )
  })

  it('hides form when isOpen is false', () => {
    const { container } = render(
      <ContactForm
        isOpen={false}
        onClose={() => {}} />
    )

    expect(container.firstChild).toBeNull()
    expect(container).toBeEmptyDOMElement()
  })
})
