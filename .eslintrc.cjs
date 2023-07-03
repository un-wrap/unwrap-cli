/**
 * @type {import('eslint').Linter.Config}
 * @see https://eslint.org/docs/user-guide/configuring
 */
const config = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'import'],
  settings: {
    'import/resolver': {
      node: true,
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-absolute-path': 'error',
    'prettier/prettier': 2,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/jsx-wrap-multilines': 'error',
    'react/jsx-tag-spacing': 'error',
    'react/jsx-sort-props': 'error',
    'react/jsx-curly-newline': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/namespace': 'off',
    'import/no-unresolved': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    es2020: true,
  },
  root: true,
}

module.exports = config
