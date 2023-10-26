module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', 'prettier', '@typescript-eslint', 'simple-import-sort'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'app'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.d.ts',
          '.android.js',
          '.android.jsx',
          '.android.ts',
          '.android.tsx',
          '.ios.js',
          '.ios.jsx',
          '.ios.ts',
          '.ios.tsx',
        ],
      },
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    // -- Prettier
    'prettier/prettier': ['error'],
    // -- TypeScript
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    // -- React
    'react/jsx-filename-extension': ['error', {extensions: ['.tsx']}],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandLast: true,
      },
    ],
    'react/prop-types': ['off', {}],
    'react/no-unused-prop-types': 'warn',
    'react/require-default-props': 'off',
    // -- JSX A11y
    'jsx-a11y/anchor-is-valid': 'off',
    // -- Import
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        jsx: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    // -- ESlint
    'no-bitwise': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    // -- Simple import sort
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Side effect imports
          ['^\\u0000'],
          // React and Packages
          ['^react$', '^react-native$', '^@?[a-zA-Z0-9]'],
          // "lodash" related packages
          ['^lodash'],
          // Internal packages
          ['^assets(/.*|$)'],
          ['^config(/.*|$)'],
          ['^constants(/.*|$)'],
          ['^services(/.*|$)'],
          ['^utils(/.*|$)'],
          ['^hooks(/.*|$)'],
          ['^navigation(/.*|$)'],
          ['^coordinators(/.*|$)'],
          ['^theme(/.*|$)'],
          ['^screens(/.*|$)'],
          ['^components(/.*|$)', '^components/blocks(/.*|$)', '^components/ui(/.*|$)'],
          // Other relative imports. Put same-folder imports and `.` last
          ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
  },
};
