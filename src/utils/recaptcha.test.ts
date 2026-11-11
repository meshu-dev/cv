// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

type Recaptcha = NonNullable<Window['grecaptcha']>

const loadModule = async () => {
  vi.resetModules()
  return await import('./recaptcha')
}

const stubGrecaptcha = (token = 'token') => {
  const grecaptcha: Recaptcha = {
    ready: vi.fn((callback: () => void) => callback()),
    execute: vi.fn().mockResolvedValue(token),
  }
  window.grecaptcha = grecaptcha
  return grecaptcha
}

let appended: HTMLScriptElement[]

beforeEach(() => {
  appended = []
  vi.stubEnv('PUBLIC_GOOGLE_RECAPTCHA_URL', 'https://example.test/api.js')
  vi.spyOn(document.head, 'appendChild').mockImplementation((node) => {
    appended.push(node as HTMLScriptElement)
    return node
  })
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
  delete window.grecaptcha
})

describe('getRecaptchaToken', () => {
  test('loads the script with the encoded site key and returns the token', async () => {
    // Arrange
    const { getRecaptchaToken } = await loadModule()

    // Act
    const result = getRecaptchaToken('key&1', 'contact')
    expect(appended).toHaveLength(1)
    const grecaptcha = stubGrecaptcha('abc')
    appended[0].onload?.(new Event('load'))

    // Assert
    expect(await result).toBe('abc')
    expect(appended[0].src).toBe('https://example.test/api.js?render=key%261')
    expect(appended[0].async).toBe(true)
    expect(grecaptcha.execute).toHaveBeenCalledWith('key&1', {
      action: 'contact',
    })
  })

  test('does not add a script when grecaptcha is already loaded', async () => {
    // Arrange
    const { getRecaptchaToken } = await loadModule()
    const grecaptcha = stubGrecaptcha('abc')

    // Act
    const result = await getRecaptchaToken('key', 'contact')

    // Assert
    expect(result).toBe('abc')
    expect(appended).toHaveLength(0)
    expect(grecaptcha.ready).toHaveBeenCalledOnce()
  })

  test('adds only one script for concurrent calls', async () => {
    // Arrange
    const { getRecaptchaToken } = await loadModule()

    // Act
    const first = getRecaptchaToken('key', 'contact')
    const second = getRecaptchaToken('key', 'contact')
    stubGrecaptcha('abc')
    appended[0].onload?.(new Event('load'))

    // Assert
    expect(await Promise.all([first, second])).toEqual(['abc', 'abc'])
    expect(appended).toHaveLength(1)
  })

  test('rejects when the script fails to load', async () => {
    // Arrange
    const { getRecaptchaToken } = await loadModule()

    // Act
    const result = getRecaptchaToken('key', 'contact')
    appended[0].onerror?.(new Event('error'))

    // Assert
    await expect(result).rejects.toThrow('Failed to load reCAPTCHA')
  })

  test('retries loading the script after a failure', async () => {
    // Arrange
    const { getRecaptchaToken } = await loadModule()
    const failed = getRecaptchaToken('key', 'contact')
    appended[0].onerror?.(new Event('error'))
    await expect(failed).rejects.toThrow()

    // Act
    const result = getRecaptchaToken('key', 'contact')
    stubGrecaptcha('abc')
    appended[1].onload?.(new Event('load'))

    // Assert
    expect(await result).toBe('abc')
    expect(appended).toHaveLength(2)
  })

  test('throws when the script loads but grecaptcha is missing', async () => {
    // Arrange
    const { getRecaptchaToken } = await loadModule()

    // Act
    const result = getRecaptchaToken('key', 'contact')
    appended[0].onload?.(new Event('load'))

    // Assert
    await expect(result).rejects.toThrow('reCAPTCHA is unavailable')
  })
})
