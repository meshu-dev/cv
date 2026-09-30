import { describe, expect, test } from 'vitest'
import { ToastType } from './enums'

describe('ToastType', () => {
  test.each([
    ['Success', 'success'],
    ['Error', 'error'],
    ['Warning', 'warning'],
    ['Info', 'info'],
  ] as const)('%s has the value "%s"', (key, value) => {
    // Act
    const actual = ToastType[key]

    // Assert
    expect(actual).toBe(value)
  })

  test('has exactly four members', () => {
    // Act
    const keys = Object.keys(ToastType)

    // Assert
    expect(keys).toEqual(['Success', 'Error', 'Warning', 'Info'])
  })
})
