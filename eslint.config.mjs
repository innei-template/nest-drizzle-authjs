import react from '@eslint-react/eslint-plugin'
import { sxzz } from '@sxzz/eslint-config'
import reactHooks from 'eslint-plugin-react-hooks'

export default sxzz(
  [
    {
      files: ['apps/web/**/*.{ts,tsx}'],
      ...react.configs.recommended,
    },
    {
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      files: ['apps/web/**/*.{ts,tsx}'],
      plugins: {
        'react-hooks': reactHooks,
      },
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
    {
      files: ['apps/core/src/**/*.{ts,tsx}'],
      languageOptions: {
        parserOptions: {
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
        },
      },
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
    {
      ignores: [
        'external/**/*',
        'test/**/*.{ts,tsx}',
        'drizzle/**/*.js',
        'drizzle/meta/**',
        'drizzle.config.ts',
        'apps/web/cssAsPlugin.js',
      ],
    },
    {
      files: [
        'packages/**/*.{ts,tsx}',
        'drizzle/**/*.{ts,tsx}',
        'apps/**/*.{ts,tsx}',
      ],

      rules: {
        'import/order': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',

        eqeqeq: 'off',

        'no-void': 0,
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/consistent-type-assertions': 0,
        'no-restricted-syntax': 0,
        'unicorn/filename-case': 0,
        'unicorn/prefer-math-trunc': 0,

        'unused-imports/no-unused-imports': 'error',

        'unused-imports/no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],

        // for node server runtime
        'require-await': 0,
        'unicorn/no-array-callback-reference': 0,

        'node/prefer-global/process': 0,
        'node/prefer-global/buffer': 'off',
        'no-duplicate-imports': 'off',
        'unicorn/explicit-length-check': 0,
        'unicorn/prefer-top-level-await': 0,
        // readable push syntax
        'unicorn/no-array-push-push': 0,
        'unicorn/custom-error-definition': 0,
      },
    },
  ],
  {
    prettier: true,
    markdown: true,
    vue: false,
    unocss: false,
  },
)
