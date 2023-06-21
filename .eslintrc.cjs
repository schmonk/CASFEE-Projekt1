module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "no-console": 0,
    "allowTemplateLiterals": 0,
    "import/extensions": 0,
    "comments": 150
  },
};
