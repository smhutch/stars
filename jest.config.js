/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testMatch: ["**/*.test.js"],
  transform: {
    "^.+\\.js$": "esbuild-jest",
  },
};
