import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { getData, login, sendMessage } from './portfolioApi'
import { sendRequest } from './request'

vi.mock('./request', () => ({ sendRequest: vi.fn() }))

const sendRequestMock = vi.mocked(sendRequest)

beforeEach(() => {
  vi.stubEnv('PUBLIC_PORTFOLIO_API_URL', 'https://api.test')
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetAllMocks()
})

describe('login', () => {
  test('posts the credentials to the login endpoint', async () => {
    // Arrange
    sendRequestMock.mockResolvedValue({ data: { token: 't' } })

    // Act
    await login('a@b.com', 'secret')

    // Assert
    expect(sendRequestMock).toHaveBeenCalledWith(
      'https://api.test/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: 'a@b.com', password: 'secret' }),
      },
    )
  })

  test('returns the auth data', async () => {
    // Arrange
    sendRequestMock.mockResolvedValue({ data: { token: 't' } })

    // Act
    const result = await login('a@b.com', 'secret')

    // Assert
    expect(result).toEqual({ token: 't' })
  })

  test('returns null when the response has no data', async () => {
    // Arrange
    sendRequestMock.mockResolvedValue({})

    // Act
    const result = await login('a@b.com', 'secret')

    // Assert
    expect(result).toBeNull()
  })
})

describe('getData', () => {
  test('requests the cv with a bearer token', async () => {
    // Arrange
    sendRequestMock.mockResolvedValue({ data: {} })

    // Act
    await getData('token')

    // Assert
    expect(sendRequestMock).toHaveBeenCalledWith('https://api.test/cv', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer token',
      },
    })
  })

  test('returns the cv data', async () => {
    // Arrange
    const cv = { pdf: null }
    sendRequestMock.mockResolvedValue({ data: cv })

    // Act
    const result = await getData('token')

    // Assert
    expect(result).toBe(cv)
  })

  test('returns null when the response has no data', async () => {
    // Arrange
    sendRequestMock.mockResolvedValue({})

    // Act
    const result = await getData('token')

    // Assert
    expect(result).toBeNull()
  })
})

describe('sendMessage', () => {
  test('posts the message to the contact endpoint', async () => {
    // Arrange
    sendRequestMock.mockResolvedValue({ success: true, message: 'ok' })

    // Act
    await sendMessage('token', 'Jane', 'j@x.com', 'Hello')

    // Assert
    expect(sendRequestMock).toHaveBeenCalledWith('https://api.test/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        token: 'token',
        name: 'Jane',
        email: 'j@x.com',
        message: 'Hello',
      }),
    })
  })

  test('returns the contact response', async () => {
    // Arrange
    const response = { success: true, message: 'Sent' }
    sendRequestMock.mockResolvedValue(response)

    // Act
    const result = await sendMessage('token', 'Jane', 'j@x.com', 'Hello')

    // Assert
    expect(result).toBe(response)
  })
})
