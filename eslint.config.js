import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: [
            '.svelte-kit/**',
            'build/**',
            'dist/**',
            'node_modules/**',
            'public/**',
            'src/**/*.svelte',
            '*.config.js',
        ],
    },
    {
        files: ['**/*.ts'],
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
        },
        rules: {
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
