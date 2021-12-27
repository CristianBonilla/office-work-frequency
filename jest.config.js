const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');
const { defaults } = require('jest-config');
const { resolve } = require('path');

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    'node_modules',
    '.module.ts',
    '<rootDir>/src/main.ts',
  ],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      statements: 70,
      lines: 70,
      branches: 70,
      functions: 70
    }
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
  }
};
