module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'react/jsx-filename-extension': 0,
    allowTemplateLiterals: 0,
    consistentReturn: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
