module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  "plugins": [
    "react"
  ],
  "rules": {
    indent: ["warn", 2, {
      "SwitchCase": 1
    }],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 0,
        "maxBOF": 0
      }
    ],
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
    curly: ["warn", "all"],
    "react/display-name": "off",
    "no-var": "error",
    "eol-last": ["warn", "always"],
    "linebreak-style": ["warn", "unix"],
    "prefer-const": [
      "warn",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      }
    ],
  }
};
