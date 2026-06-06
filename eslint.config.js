import globals from 'globals';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            'public/**',
            '.vike/**',
            '*.config.js',
        ],
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            ...tseslint.configs.recommended,
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            'jsx-a11y': jsxA11y,
            'react-hooks': reactHooks,
        },
        rules: {
            ...jsxA11y.configs.recommended.rules,
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', {
                argsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }],
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
        },
    },
    {
        files: ['scripts/**/*.ts', 'plugins/**/*.ts'],
        rules: {
            'no-console': 'off',
        },
    },
);
