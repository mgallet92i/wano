module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
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
    rules: {
        'react/jsx-filename-extension': 0,
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
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
        '@typescript-eslint/comma-dangle': [
            'error',
            {objects: 'never'}
        ],
        '@typescript-eslint/no-inferrable-types': 0,
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                'multiline': {
                    'delimiter': 'comma',
                    'requireLast': false
                },
                'singleline': {
                    'delimiter': 'comma',
                    'requireLast': false
                },
                'overrides': {
                    'interface': {
                        'multiline': {
                            'delimiter': 'semi',
                            'requireLast': true
                        }
                    }
                }
            }],

    }
};
