// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ToastType } from '@/enums'
import { closeDialog, showToast } from './common'
import { sendMessage } from './portfolioApi'
import { submitForm } from './contactForm'

vi.mock('./common', () => ({ closeDialog: vi.fn(), showToast: vi.fn() }))
vi.mock('./portfolioApi', () => ({ sendMessage: vi.fn() }))

const sendMessageMock = vi.mocked(sendMessage)

beforeEach(() => {
  vi.stubEnv('PUBLIC_GOOGLE_RECAPTCHA_KEY', 'site-key')
  document.body.innerHTML = `
    <form id="contactform-form">
      <input name="name" value="Jane" />
      <input name="email" value="jane@x.com" />
      <textarea name="message">Hello</textarea>
    </form>`
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetAllMocks()
  document.body.innerHTML = ''
})

describe('submitForm', () => {
  test('sends the form values with the reCAPTCHA key', async () => {
    // Arrange
    sendMessageMock.mockResolvedValue({ success: true, message: 'Sent' })

    // Act
    await submitForm()

    // Assert
    expect(sendMessageMock).toHaveBeenCalledWith(
      'site-key',
      'Jane',
      'jane@x.com',
      'Hello',
    )
  })

  test('closes the dialog and shows a success toast on success', async () => {
    // Arrange
    sendMessageMock.mockResolvedValue({ success: true, message: 'Sent' })

    // Act
    await submitForm()

    // Assert
    expect(closeDialog).toHaveBeenCalledWith('#contactform')
    expect(showToast).toHaveBeenCalledWith(ToastType.Success, 'Sent')
  })

  test('shows an error toast when the API reports failure', async () => {
    // Arrange
    sendMessageMock.mockResolvedValue({ success: false, message: 'Rejected' })

    // Act
    await submitForm()

    // Assert
    expect(showToast).toHaveBeenCalledWith(ToastType.Error, 'Rejected')
    expect(closeDialog).not.toHaveBeenCalled()
  })

  test('shows nothing when failure has no message', async () => {
    // Arrange
    sendMessageMock.mockResolvedValue({ success: false, message: '' })

    // Act
    await submitForm()

    // Assert
    expect(showToast).not.toHaveBeenCalled()
    expect(closeDialog).not.toHaveBeenCalled()
  })

  test('shows an error toast when the request throws exception', async () => {
    // Arrange
    sendMessageMock.mockRejectedValue('Network down')

    // Act
    await submitForm()

    // Assert
    expect(showToast).toHaveBeenCalledWith(ToastType.Error, 'Network down')
  })

  test('does nothing when the form is missing', async () => {
    // Arrange
    document.body.innerHTML = ''

    // Act
    await submitForm()

    // Assert
    expect(sendMessageMock).not.toHaveBeenCalled()
  })
})
