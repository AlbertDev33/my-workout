module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin', 
    'eslint-plugin-import-helpers',
    'prettier'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'lines-between-class-members': 'off',
    'import/extensions': [
        'error',
        'ignorePackages',
        {
            'ts': 'never'
        }
    ],
    'import-helpers/order-imports': [
        'warn',
        {
            newlinesBetween: 'always',
            groups: [
                'module',
                '/^@/',
                [
                    'parent',
                    'sibling',
                    'index'
                ]
            ],
            alphabetize: {
                'order': 'asc',
                'ignoreCase': true
            }
        }
    ],
    settings: {
        'import/resolver': {
            'typescript': {}
        }
    },
  },
};
