module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './server/tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-misused-promises': 'off'
  }
}
