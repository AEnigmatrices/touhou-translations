import globals from 'globals';

export default [
    {
        ignores: [
            '.svelte-kit/**',
            'build/**',
            'dist/**',
            'node_modules/**',
            'public/**',
            // Restore TypeScript and Svelte linting when the parser supports TypeScript 7.
            '**/*.svelte',
            '**/*.ts',
        ],
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            'no-unused-vars': ['warn', {
                argsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
        },
    },
];
