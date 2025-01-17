module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'next',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'custom-formatter.js', 'tailwind.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react-refresh', 'unused-imports', 'react-compiler'],
  rules: {
    'no-case-declarations': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-compiler/react-compiler': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    'max-lines': ['error', 300],
    'import/named': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    // '@typescript-eslint/no-unused-vars': [
    //   'warn',
    //   {
    //     argsIgnorePattern: '^',
    //     varsIgnorePattern: '^',
    //     caughtErrorsIgnorePattern: '^_',
    //   },
    // ],
  },
};
