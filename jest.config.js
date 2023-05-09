module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  globals: {
    'process.env.PORT': process.env.PORT || '3000'
  },
  testEnvironmentOptions: {
    url: process.env.TEST_URL || 'http://localhost:3000'
  },
  moduleNameMapper: {
    '^modules/(.*)$': '<rootDir>/src/modules/$1',
    '^core/(.*)$': '<rootDir>/src/core/$1',
    '^layout/(.*)$': '<rootDir>/src/layout/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^@mui/x-date-pickers/internals/demo$': '<rootDir>/__mocks__/@mui/x-date-pickers/internals/demo.js'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts?$': 'ts-jest'
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
