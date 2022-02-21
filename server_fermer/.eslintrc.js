module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-underscore-dangle': 0,
    'no-console': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'no-unused-vars': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    camelcase: 0,
    'no-await-in-loop': 0,
    'consistent-return': 0,
  },
};
