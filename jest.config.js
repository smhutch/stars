/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.js"],
  transform: {
    "^.+\\.js$": "esbuild-jest",
  },
};
