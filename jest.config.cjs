module.exports = {
  testEnvironment: 'jsdom',
  transform: { '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest' },
  moduleNameMapper: { '\\.(css|scss|sass)$': 'identity-obj-proxy' },
  testMatch: ['**/src/**/*.test.ts', '**/src/**/*.test.tsx'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.*',
    '!src/index.ts',
  ],
};
