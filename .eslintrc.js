module.exports = {
  env: {
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/strict",
    "plugin:jest/recommended",
    "plugin:jest/style",
  ],
  plugins: ["jest"],
  rules: {
    // Off because I function name, and jest calls `toString()` on it.
    // This is more convenient than duplicating the function name as the title.
    "jest/valid-title": "off",
    // Enforce use of `it` instead of `test`
    "jest/consistent-test-it": [
      "error",
      {
        withinDescribe: "it",
      },
    ],
    // Always write `describe` and `it` in the same style
    "jest/lowercase-name": "error",
    // Avoid nested describes. It gets messy fast.
    "jest/max-nested-describe": [
      "error",
      {
        max: 1,
      },
    ],
    // Always use a single describe block.
    "jest/require-top-level-describe": "error",
    "react/prop-types": "off",
  },
  parserOptions: {
    ecmaVersion: 2020,
    jsx: true,
    sourceType: "module",
  },
};
