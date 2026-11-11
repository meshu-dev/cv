// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ToastType } from '@/enums'
import { closeDialog, showToast } from './common'
import { sendMessage } from './portfolioApi'
import { getRecaptchaToken } from './recaptcha'
import { submitForm } from './contactForm'

vi.mock('./common', () => ({ closeDialog: vi.fn(), showToast: vi.fn() }))
vi.mock('./portfolioApi', () => ({ sendMessage: vi.fn() }))
vi.mock('./recaptcha', () => ({ getRecaptchaToken: vi.fn() }))

const sendMessageMock = vi.mocked(sendMessage)
const getTokenMock = vi.mocked(getRecaptchaToken)

beforeEach(() => {
  vi.stubEnv('PUBLIC_GOOGLE_RECAPTCHA_KEY', 'site-key')
  getTokenMock.mockResolvedValue('captcha-token')
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
  test('sends the form values with a reCAPTCHA token', async () => {
    // Arrange
    sendMessageMock.mockResolvedValue({ success: true, message: 'Sent' })

    // Act
    await submitForm()

    // Assert
    expect(getTokenMock).toHaveBeenCalledWith('site-key', 'contact')
    expect(sendMessageMock).toHaveBeenCalledWith(
      'captcha-token',
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

  test('shows an error toast and does not send when reCAPTCHA fails', async () => {
    // Arrange
    getTokenMock.mockRejectedValue(new Error('Failed to load reCAPTCHA'))

    // Act
    await submitForm()

    // Assert
    expect(showToast).toHaveBeenCalledWith(
      ToastType.Error,
      'Failed to load reCAPTCHA',
    )
    expect(sendMessageMock).not.toHaveBeenCalled()
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
