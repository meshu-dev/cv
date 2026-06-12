import { describe, it, expect, beforeEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'
import { vi } from 'vitest'

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

  it('renders form and submits a contact message', async () => {
    render(
      <ContactForm
       isOpen={true}
       onClose={() => {}} />
    )

    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const messageInput = screen.getByRole('textbox', { name: /message/i })
    const submitButton = screen.getByRole('button', { name: /submit/i })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Hello, this is a test message.' } })

    await userEvent.click(submitButton)

    //console.log('nameInput:', nameInput)
    //console.log('emailInput:', emailInput)
    //console.log('messageInput:', messageInput)
  })

  it('renders form when isOpen is false', () => {
    const { container } = render(
      <ContactForm
        isOpen={false}
        onClose={() => {}} />
    )

    expect(container.firstChild).toBeNull()
    expect(container).toBeEmptyDOMElement()
  })
})
