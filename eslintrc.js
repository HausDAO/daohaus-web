module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'standard',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': 'warn',
    // TODO: this really should be active... (add prop types to components)
    'react/prop-types': 'off',
    'no-unused-vars': 'error',
  },
};
