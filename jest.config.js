const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'app/**/*.tsx',
    'pages/**/*.tsx',
    '!**/*.test.tsx',
    '!**/*.d.ts',
  ],
  coverageReporters: ['text', 'text-summary'],
  coverageThreshold: {
    global: {
      lines: 80
    }
  },
}

module.exports = createJestConfig(customJestConfig)
