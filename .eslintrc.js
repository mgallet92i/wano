module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: 'tsconfig.json'
    },
    plugins: [
        '@typescript-eslint',
        'jest'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'airbnb-typescript',
        'plugin:import/recommended',
        'plugin:import/typescript'
    ],
    ignorePatterns: ['.eslintrc.js'],
    "rules": {
        'react/jsx-filename-extension': 0,
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/object-curly-spacing': ['error', 'never'],
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/typedef': [
            'error',
            {
                arrayDestructuring: true,
                arrowCallSignature: true,
                arrowParameter: true,
                callSignature: true,
                memberVariableDeclaration: true,
                parameter: true,
                propertyDeclaration: true,
                objectDestructuring: true,
                variableDeclaration: true,
                variableDeclarationIgnoreFunction: true,
            },
        ],
        '@typescript-eslint/no-inferrable-types': 0
    }
};
