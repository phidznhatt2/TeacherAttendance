module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-native', 'import'],
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'airbnb-base',
  ],
  rules: {
    'global-require': 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false },
    ],
    'linebreak-style': [2, 'windows'],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-param-reassign': 0,
    'import/no-unresolved': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'operator-linebreak': [
      'error',
      'after',
      { overrides: { '?': 'ignore', ':': 'ignore' } },
    ],
    'implicit-arrow-linebreak': 'off',
    'no-case-declarations': 'off',
    'no-confusing-arrow': ['error', { allowParens: false }],

    'react/jsx-curly-spacing': [2, 'never'],
    'react/prop-types': 'warn',

    'object-curly-newline': 'off',
    'arrow-parens': 'off',
    'import/prefer-default-export': 'off',

    'react-native/no-inline-styles': 'off',
    'react-native/no-raw-text': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/split-platform-components': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _api: './src/api',
          _assets: './src/assets',
          _components: './src/components',
          _constant: './src/constant',
          _atoms: './src/components/atoms',
          _molecules: './src/components/molecules',
          _organisms: './src/components/organisms',
          _redux: './src/redux',
          _screens: './src/screens',
          _navigation: './src/navigation',
          _services: './src/services',
          _styles: './src/styles',
          _utils: './src/utils',
          _hook: './src/hook',
        },
      },
    },
  },
  env: {
    jest: true,
    browser: true,
  },
};
