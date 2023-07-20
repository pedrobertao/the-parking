module.exports = {
  preset: ['ts-jest', "@shelf/jest-mongodb"],
  collectCoverage: true,
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  }
};