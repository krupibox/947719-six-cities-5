module.exports = {
  verbose: true,
  setupFiles: [`<rootDir>jest.setup.js`],
  testURL: `http://localhost/`,
  testRegex: `(/tests/.|(\.|/)(test|spec))\.(jsx?|tsx?)$`,
  moduleFileExtensions: [`ts`, `tsx`, `js`, `jsx`, `json`, `node`],
  moduleNameMapper: {
    "^@root(.*)$": "<rootDir>/src$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
  }
};
