module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    testPathIgnorePatterns: ["/node_modules/", "/tests/e2e/", "/e2e/", "/tests-examples/"]
  };
  