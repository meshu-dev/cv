// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ToastType } from '@/enums'
import { closeDialog, showToast } from './common'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  document.body.innerHTML = ''
})

describe('showToast', () => {
  test('shows the message with the type class', () => {
    // Arrange
    document.body.innerHTML = '<div id="toast"></div>'

    // Act
    showToast(ToastType.Success, 'Saved')

    // Assert
    const toast = document.getElementById('toast')!
    expect(toast.textContent).toBe('Saved')
    expect(toast.classList.contains('show')).toBe(true)
    expect(toast.classList.contains('success')).toBe(true)
  })

  test('replaces the previous type class', () => {
    // Arrange
    document.body.innerHTML = '<div id="toast"></div>'
    showToast(ToastType.Success, 'Saved')

    // Act
    showToast(ToastType.Error, 'Failed')

    // Assert
    const toast = document.getElementById('toast')!
    expect(toast.classList.contains('error')).toBe(true)
    expect(toast.classList.contains('success')).toBe(false)
  })

  test('hides the toast after 3 seconds', () => {
    // Arrange
    document.body.innerHTML = '<div id="toast"></div>'
    showToast(ToastType.Info, 'Hi')

    // Act
    vi.advanceTimersByTime(3000)

    // Assert
    expect(document.getElementById('toast')!.classList.contains('show')).toBe(false)
  })

  test('restarts the timer when called again', () => {
    // Arrange
    document.body.innerHTML = '<div id="toast"></div>'
    showToast(ToastType.Info, 'First')
    vi.advanceTimersByTime(2000)

    // Act
    showToast(ToastType.Info, 'Second')
    vi.advanceTimersByTime(2000)

    // Assert
    const toast = document.getElementById('toast')!
    expect(toast.classList.contains('show')).toBe(true)
    expect(toast.textContent).toBe('Second')
  })

  test('does nothing when there is no toast element', () => {
    // Act
    const act = () => showToast(ToastType.Info, 'Hi')

    // Assert
    expect(act).not.toThrow()
  })
})

describe('closeDialog', () => {
  test('closes the matching dialog', () => {
    // Arrange
    document.body.innerHTML = '<dialog id="d" open></dialog>'
    const dialog = document.querySelector('dialog')!
    const closeSpy = vi.spyOn(dialog, 'close')

    // Act
    closeDialog('#d')

    // Assert
    expect(closeSpy).toHaveBeenCalledOnce()
  })

  test('does nothing when the dialog is missing', () => {
    // Act
    const act = () => closeDialog('#missing')

    // Assert
    expect(act).not.toThrow()
  })
})
