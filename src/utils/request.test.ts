import { afterEach, describe, expect, test, vi } from 'vitest'
import { sendRequest } from './request'

const mockFetch = (body: unknown, init: { ok: boolean; status: number }) => {
  const fetchMock = vi.fn().mockResolvedValue({ ...init, json: async () => body })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

afterEach(() => vi.unstubAllGlobals())

describe('sendRequest', () => {
  test('calls fetch with the url and config', async () => {
    // Arrange
    const fetchMock = mockFetch({}, { ok: true, status: 200 })
    const config = { method: 'POST' }

    // Act
    await sendRequest('https://api.test/x', config)

    // Assert
    expect(fetchMock).toHaveBeenCalledWith('https://api.test/x', config)
  })

  test('returns the parsed body when the response is ok', async () => {
    // Arrange
    mockFetch({ data: 'value' }, { ok: true, status: 200 })

    // Act
    const result = await sendRequest<{ data: string }>('https://api.test/x')

    // Assert
    expect(result).toEqual({ data: 'value' })
  })

  test('throws the API message when the response is not ok', async () => {
    // Arrange
    mockFetch({ message: 'Invalid token' }, { ok: false, status: 401 })

    // Act
    const act = sendRequest('https://api.test/x')

    // Assert
    await expect(act).rejects.toThrow('Invalid token')
  })

  test('throws a status message when the error body has no message', async () => {
    // Arrange
    mockFetch({}, { ok: false, status: 500 })

    // Act
    const act = sendRequest('https://api.test/x')

    // Assert
    await expect(act).rejects.toThrow('Request failed with status 500')
  })

  test('throws a status message when the error body is null', async () => {
    // Arrange
    mockFetch(null, { ok: false, status: 404 })

    // Act
    const act = sendRequest('https://api.test/x')

    // Assert
    await expect(act).rejects.toThrow('Request failed with status 404')
  })
})
