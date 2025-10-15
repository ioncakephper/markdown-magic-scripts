const eslint = require('@eslint/js');
const eslintPluginJson = require('eslint-plugin-json');
const jsoncParser = require('jsonc-eslint-parser');
const eslintPluginYaml = require('eslint-plugin-yaml');
const yamlParser = require('yaml-eslint-parser');
const markdownParser = require('markdown-eslint-parser');

module.exports = [
  {
    files: ['**/*.js'],
    ...eslint.configs.recommended,
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      ...eslint.configs.recommended.rules,
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      json: eslintPluginJson,
    },
    rules: {
      ...eslintPluginJson.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.yaml', '**/*.yml'],
    languageOptions: {
      parser: yamlParser,
    },
    plugins: {
      yaml: eslintPluginYaml,
    },
    rules: {
      ...eslintPluginYaml.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.md'],
    languageOptions: {
      parser: markdownParser,
    },
  },

  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        // Tell ESLint that Jest globals exist
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  },
];
