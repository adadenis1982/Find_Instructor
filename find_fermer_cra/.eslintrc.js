module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'react-app', 'airbnb', 'prettier'],
  rules: {
    'no-param-reassign': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-unused-vars': 'warn',
    'react/jsx-no-constructed-context-values': 'off',
    'import/prefer-default-export': 'off',
    'default-param-last': 'off',
    'react/self-closing-comp': 'off',
    'consistent-return': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    camelcase: 0,
    'react/no-array-index-key': 0,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
};
